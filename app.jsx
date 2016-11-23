const PLAYERS = [
  {
    name: "Jim Hoskins",
    score: 31,
    id: 1
  },
  {
    name: "Andrew Chalkley",
    score: 35,
    id: 2
  },
  {
    name: "Alena Holligan",
    score: 42,
    id: 3
  }
]
// This should be a random number that does not conflict with
// `player.id` defined in PLAYERS
let nextId = 4

class Stopwatch extends React.Component {
  constructor(props) {
    super(props)
    // Set default state
    this.state = {
      running: false,
      elapsedTime: 0,
      previousTime: 0
    }
    // Bind custom methods
    this._onTick = this._onTick.bind(this)
    this._onStart = this._onStart.bind(this)
    this._onStop = this._onStop.bind(this)
    this._onReset = this._onReset.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(this._onTick, 100)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  _onTick() {
    if (this.state.running) {
      const now = Date.now()
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime)
      })
    }
  }

  _onStart() {
    this.setState({
      running: true,
      previousTime: Date.now()
    })
  }

  _onStop() {
    this.setState({ running: false })
  }

  _onReset() {
    this.setState({
      elapsedTime: 0,
      previousTime: Date.now()
    })
  }

  render() {
    const seconds = Math.floor(this.state.elapsedTime / 1000)

    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">{seconds}</div>
        { this.state.running
          ? <button onClick={this._onStop}>Stop</button>
          : <button onClick={this._onStart}>Start</button>
        }
        <button onClick={this._onReset}>Reset</button>
      </div>
    );
  }
}

class AddPlayerForm extends React.Component {
  constructor(props) {
    super(props)
    // Set default state
    this.state = { name: '' }
    // Bind custom methods
    this._onNameChange = this._onNameChange.bind(this)
    this._onSubmit = this._onSubmit.bind(this)
  }

  _onNameChange(e) {
    this.setState({name: e.target.value})
  }

  _onSubmit(e) {
    e.preventDefault()
    this.props.onAdd(this.state.name)
    this.setState({name: ''})
  }

  render () {
    return (
      <div className="add-player-form">
        <form onSubmit={this._onSubmit}>
          <input type="text" value={this.state.name} onChange={this._onNameChange} />
          <input type="submit" value="Add Player" />
        </form>
      </div>
    )
  }
}
// Define proptypes fpr a stateless component
AddPlayerForm.propTypes = {
  onAdd: React.PropTypes.func.isRequired
}

// Es6 Stateless component
const Stats = (props) => {
  const totalPlayers = props.players.length
  let totalPoints = props.players.reduce((total, player) => total + player.score, 0)

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
// Define proptypes fpr a stateless component
Stats.propTypes = {
  players: React.PropTypes.array.isRequired
};

// Es6 Stateless component
const Header = (props) => (
  <div className="header">
    <Stats players={props.players}/>
    <h1>{props.title}</h1>
    <Stopwatch />
  </div>
)
// Define proptypes fpr a stateless component
Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired
};

// Es6 Stateless component
const Counter = (props) => (
  <div className="counter">
    <button className="counter-action decrement" onClick={function() {props.onChange(-1);}} > - </button>
    <div className="counter-score"> {props.score} </div>
    <button className="counter-action increment" onClick={function() {props.onChange(1);}}> + </button>
  </div>
)
// Define proptypes fpr a stateless component
Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
}

// Es6 Stateless component
const Player = (props) => (
  <div className="player">
    <div className="player-name">
      <a className="remove-player" onClick={props.onRemove}>✖</a>
      {props.name}
    </div>
    <div className="player-score">
      <Counter score={props.score} onChange={props.onScoreChange} />
    </div>
  </div>
)
// Define proptypes fpr a stateless component
Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired
};

class Application extends React.Component {
  constructor(props) {
    super(props)
    // Set the initial state
    this.state = { players: this.props.initialPlayers }
    // Bind custom methods
    this._onScoreChange = this._onScoreChange.bind(this)
    this._onPlayerAdd = this._onPlayerAdd.bind(this)
    this._onRemovePlayer = this._onRemovePlayer.bind(this)
  }

  _onScoreChange (index, delta) {
    this.state.players[index].score += delta
    this.setState(this.state)
  }

  _onPlayerAdd (name) {
    this.state.players.push({
      name: name,
      score: 0,
      id: nextId
    });
    this.setState(this.state)
    nextId += 1
  }

  _onRemovePlayer (index) {
    this.state.players.splice(index, 1)
    this.setState(this.state)
  }

  render () {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} players={this.state.players} />

        <div className="players">
          {this.state.players.map((player, index) =>
            <Player
              onScoreChange={(delta) => this._onScoreChange(index, delta)}
              onRemove={() => this._onRemovePlayer(index)}
              name={player.name}
              score={player.score}
              key={player.id} />
          )}
        </div>
        <AddPlayerForm onAdd={this._onPlayerAdd} />
      </div>
    );
  }
}

Application.propTypes = {
  title: React.PropTypes.string,
  initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    id: React.PropTypes.number.isRequired
  })).isRequired
}

Application.defaultProps = {
  title: "Scoreboard"
}

// Load the app into the DOM
ReactDOM.render(
  <Application initialPlayers={PLAYERS} />,
  document.getElementById('container');
)
