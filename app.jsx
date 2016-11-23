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

// HEADER --> stateless component
function Header(props){
    return(
        <div className="header">
            <h1>{props.title}</h1>
        </div>
    );
}

Header.propTypes = {
    title: React.PropTypes.string.isRequired
};

// COUNTER component create with Component CLASS
var Counter = React.createClass({
    propTypes: {
        initialScore: React.PropTypes.number.isRequired
    },

    getInitialState: function(){
        return {
            score: this.props.initialScore,
        }
    },

    incrementScore: function(e){
        this.setState({
            score: (this.state.score + 1)
        });
    },

    decrementScore: function(e){
        this.setState({
            score: (this.state.score -1)
        });
    },

    render: function(){
        return(
            <div className="counter">
                <button className="counter-action decrement" onClick={this.decrementScore}> - </button>
                <div className="counter-score">{this.state.score}</div>
                <button className="counter-action increment" onClick={this.incrementScore}> + </button>
            </div>
        )
    }
});

// PLAYER --> stateless component
function Player(props){
    return(
        <div className="player">
            <div className="player-name">{props.name}</div>
            <div className="player-score">
                <Counter initialScore={props.score}/>
            </div>
        </div>
    )
}

Player.propTypes = {
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired
}

// APPLICATION --> stateless component
function Application(props){
    return(
        <div className="scoreboard">
            <Header title={props.title} />
            <div className="players">
                {props.players.map(function(player, key){
                    return <Player name={player.name} score={player.score} key={key}/>
                })}
            </div>
        </div>
    );
}

// the declaration of the propTypes is useful when debugging and for doument the code
Application.propTypes = {
    title: React.PropTypes.string,
    players: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        score: React.PropTypes.number.isRequired,
    })).isRequired
};

Application.defaultProps = {
    title: "Score board"
}

ReactDOM.render(<Application players={PLAYERS}/>, document.getElementById('container'));
