var PLAYERS = [
    {
        name: "Ozzy Osbourne",
        score: 666,
    },
    {
        name: "Bob Marley",
        score: 8,
    },
    {
        name: "Tina Turner",
        score: 55,
    }
];

// definition of component
// we pass the props object to it

// STATS --> stateless component
function Stats(props){
    var totalPlayers = props.players.length;
    var totalPoints = props.players.reduce(function(total, player){
        return total + player.score;
    }, 0)

    return (
        <table className="stats">
            <tbody>
                <tr>
                    <td>Players:</td>
                    <td>{totalPlayers}</td>
                </tr>
                <tr>
                    <td>Total Points:</td>
                    <td>{totalPoints}</td>
                </tr>
            </tbody>
        </table>
    )
}

Stats.propTypes = {
    players: React.PropTypes.array.isRequired
};

// HEADER --> stateless component
function Header(props){
    return(
        <div className="header">
            <Stats players={props.players}/>
            <h1>{props.title}</h1>
        </div>
    );
}

Header.propTypes = {
    title: React.PropTypes.string.isRequired,
    players: React.PropTypes.array.isRequired
};

// COUNTER --> stateless component
function Counter(props){
    return(
        <div className="counter">
            <button className="counter-action decrement" onClick={function(){props.onChange(-1);}}> - </button>
            <div className="counter-score">{props.score}</div>
            <button className="counter-action increment" onClick={function(){props.onChange(+1);}}> + </button>
        </div>
    );
}

Counter.propTypes = {
    score: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired
}

// PLAYER --> stateless component
function Player(props){
    return(
        <div className="player">
            <div className="player-name">{props.name}</div>
            <div className="player-score">
                <Counter score={props.score} onChange={props.onScoreChange} />
            </div>
        </div>
    )
}

Player.propTypes = {
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    onScoreChange: React.PropTypes.func.isRequired
}

// APPLICATION --> statefull component
var Application = React.createClass({
    // the declaration of the propTypes is useful when debugging and for doument the code
    propTypes: {
        title: React.PropTypes.string,
        initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            score: React.PropTypes.number.isRequired,
        })).isRequired
    },

    getDefaultProps: function(){
        return {
            title: "Score board"
        }
    },

    getInitialState: function(){
        return {
            players: this.props.initialPlayers
        };
    },

    onScoreChange: function(index, delta){
        console.log(index, delta);
        this.state.players[index].score += delta;
        this.setState(this.state);
    },

    render: function(){
        return(
            <div className="scoreboard">
                <Header title={this.props.title} players={this.state.players}/>
                <div className="players">
                    {this.state.players.map(function(player, index){
                        return (
                            <Player
                                onScoreChange={function(delta) {this.onScoreChange(index, delta)}.bind(this)}
                                name={player.name}
                                score={player.score}
                                key={index}/>
                        );
                    }.bind(this))}
                </div>
            </div>
        );
    }
});

ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'));
