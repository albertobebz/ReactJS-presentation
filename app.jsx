// JSX is a extension of JavaScript language that allows us to use an XML style syntax to build our React.createElement calls
// We need a compilere to transform JSX into JavaScript code, in this case we use Babel

/////
// we define a component and then this will be injected into the render function
/////

var PLAYERS = [
    {
        name: "jim",
        score: 32,
        id: 1
    },
    {
        name: "bill",
        score: 22,
        id: 2
    },
    {
        name: "tim",
        score: 1,
        id: 3
    }
];

var nextId = 4;

var AddPlayerForm = React.createClass({

    propTypes: {
        onAdd: React.PropTypes.func.isRequired
    },

    getInitialState: function(){
        return {
            name: "",
        };
    },

    onNameChange: function(e){
        this.setState({name: e.target.value});
    },

    onSubmit: function(e){
        e.preventDefault();
        this.props.onAdd(this.state.name);
        this.setState({name: ""});
    },

    render: function(){
        return (
            <div className="add-player-form">
                <form onSubmit={this.onSubmit}>
                    <input type="text" value={this.state.name} onChange={this.onNameChange}/>
                    <input type="submit" value="Add player" />
                </form>
            </div>
        );
    }
});

function Stats(props) {
    var totalPlayers = props.players.length;
    var totalPoints = props.players.reduce(function(total, player){
        return total + player.score;
    }, 0);

    return (
        <table className="stats">
            <tbody>
                <tr>
                    <td>Players:</td>
                    <td>{totalPlayers}</td>
                </tr>
                <tr>
                    <td>Total points:</td>
                    <td>{totalPoints}</td>
                </tr>
            </tbody>
        </table>
    )
}

Stats.propTypes = {
    players: React.PropTypes.array.isRequired
};

// HEADER is a STATELESS FUNCTIONAL COMPONENT
function Header(props) {
    return(
        <div className="header">
            <Stats players={props.players}/>
            <h1>{props.title}</h1>
        </div>
    );
}

// Each keys in the propTypes object are the property the component can take (e.i title)
// this is useful for document the compnent and help for debugging
Header.propTypes = {
    title: React.PropTypes.string.isRequired,
    players: React.PropTypes.array.isRequired
};

// COUNTER is a STATELESS FUNCTIONAL COMPONENT
function Counter(props) {
    return (
        <div className="counter">
            <button className="counter-action decrement" onClick={function() {props.onChange(-1);}} > - </button>
            <div className="counter-score"> {props.score} </div>
            <button className="counter-action increment" onClick={function() {props.onChange(+1);}} > + </button>
        </div>
    )
}

Counter.propTypes = {
    score: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired
}

// PLAYER is a STATELESS FUNCTIONAL COMPONENT
function Player(props) {
    return (
        <div className="player">
            <div className="player-name">
                <p>{props.name}</p>
            </div>
            <div className="player-score">
                <Counter score={props.score} onChange={props.onScoreChange}/>
            </div>
        </div>
    );
}

Player.propTypes = {
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    onScoreChange: React.PropTypes.func.isRequired
};

// APPLICATION is a COMPONENT CLASS --> this for adding state to our component
var Application = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            score: React.PropTypes.number.isRequired,
            id: React.PropTypes.number.isRequired
        })).isRequired
    },

    getDefaultProps: function(){
        return {
            title: "Scoreboard"
        }
    },

    getInitialState: function(){
        return {
            players: this.props.initialPlayers
        }
    },

    onScoreChange: function(index, delta){
        this.state.players[index].score += delta;
        this.setState(this.state);
    },

    onPlayerAdd: function(name){
        console.log("player added:", name);
        this.state.players.push({
            name: name,
            score: 0,
            id: nextId
        });
        this.setState(this.state);
        nextId += 1;
    },

    render: function(){
        return (
            <div className="scoreboard">
                <Header title={this.props.title} players={this.state.players}/>
                <div className="players">
                    {this.state.players.map(function(player, index){
                        return (
                            <Player
                                onScoreChange={function(delta) {this.onScoreChange(index, delta)}.bind(this)}
                                name={player.name}
                                score={player.score}
                                key={player.id} />
                        )
                    }.bind(this))}
                </div>
                <AddPlayerForm onAdd={this.onPlayerAdd} />
            </div>
        )
    }
})

// ReactDOM.render is a function we use to render specific HTML tag into a selected element
ReactDOM.render(<Application initialPlayers={PLAYERS}/>,document.getElementById("container"));
