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
]

// HEADER is a STATELESS COMPONENT
function Header(props) {
    return(
        <div className="header">
            <h1>{props.title}</h1>
        </div>
    );
}

Header.propTypes = {
    title: React.PropTypes.string.isRequired
};

// COUNTER is a COMPONENT CLASS --> this for adding state to our component
var Counter = React.createClass({
    //for component class we pass the propTypes inside it
    propTypes: {
        initialScore: React.PropTypes.number.isRequired
    },

    // getInitialState is a method build in React, used in Component Class
    getInitialState: function(){
        return {
            score: this.props.initialScore
        }
    },

    // we use setState property to update the value of our state, in this case "score"
    incrementScore: function(){
        // "this.setState" must be called in order to tell React to render itself
        this.setState({
            score: (this.state.score + 1)
        })
    },

    // we use setState property to update the value of our state, in this case "score"
    decrementScore: function(){
        // "this.setState" must be called in order to tell React to render itself
        this.setState({
            score: (this.state.score -1)
        })
    },

    // in the render method we fetch the score value using "this.state.score"
    render: function(){
        return (
            <div className="counter">
                <button className="counter-action decrement" onClick={this.decrementScore}> - </button>
                <div className="counter-score"> {this.state.score} </div>
                <button className="counter-action increment" onClick={this.incrementScore}> + </button>
            </div>
        )
    }
});

// PLAYER is a STATELESS COMPONENT
function Player(props) {
    return (
        <div className="player">
            <div className="player-name">
                <p>{props.name}</p>
            </div>
            <div className="player-score">
                <Counter initialScore={props.score}/>
            </div>
        </div>
    );
}

Player.propTypes = {
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired
};

// APPLICATION is a STATELESS COMPONENT
function Application(props) {
    return(
        <div className="scoreboard">
            <Header title={props.title}/>
            <div className="players">
                {props.players.map(function(player){
                    return <Player name={player.name} score={player.score} key={player.id} />
                })}
            </div>
        </div>
    );
}

// Each keys in the propTypes object are the property the component can take (e.i title)
// this is useful for document the compnent and help for debugging
Application.propTypes = {
    title: React.PropTypes.string,
    players: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        score: React.PropTypes.number.isRequired,
        id: React.PropTypes.number.isRequired
    })).isRequired
};

Application.defaultProps = {
    title: "Scoreboard"
}

// ReactDOM.render is a function we use to render specific HTML tag into a selected element
ReactDOM.render(<Application players={PLAYERS}/>,document.getElementById("container"));
