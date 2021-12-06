import React, {Component} from "react"

class Clap extends Component {
  constructor(props) {
    super(props);
    this.intervalID = null;
    this.minValue = 10;
    this.maxValue = 218;
    this.ini     = "null"
    this.state = { inputValue: 100, isPlaying: false };
    this.increaseCount = this.increaseCount.bind(this);
    this.decreaseCount = this.decreaseCount.bind(this);
    this.handleRangeInput = this.handleRangeInput.bind(this);
    this.handleAudioControl = this.handleAudioControl.bind(this);
    this.playBeat = this.playBeat.bind(this);
  }

  increaseCount() {
    function updateValue(state) {
      if (this.state.inputValue < this.maxValue) {
        const newValue = Number(state.inputValue) + 5;

        return { inputValue: newValue };
      } else {
        return state;
      }
    }

    this.setState(updateValue);
    if (this.state.isPlaying) {
      clearInterval(this.intervalID);
      this.playBeat();
    }
  }

  decreaseCount() {
    function updateValue(state) {
      if (this.state.inputValue > 0) {
        const newValue = Number(state.inputValue) - 5;

        return { inputValue: newValue };
      } else {
        return state;
      }
    }

    this.setState(updateValue);
    if (this.state.isPlaying) {
      clearInterval(this.intervalID);
      this.playBeat();
    }
  }

  handleRangeInput(event) {
    this.setState({ inputValue: event.target.value });
    if (this.state.isPlaying) {
      clearInterval(this.intervalID);
      this.playBeat();
    }
  }

  handleAudioControl() {
    this.state.isPlaying ? clearInterval(this.intervalID) : this.playBeat();
    function updatePlaying(state) {
      return { isPlaying: !state.isPlaying };
    }
    this.setState(updatePlaying);
  }

  playBeat() {
    const intervalSec = 60 / this.state.inputValue;
    const intervalMilSec = intervalSec * 1000;
    function soundPlayer() {
      const beat = new Audio("/clap2.mp3");
      beat.play();
    }
    this.intervalID = setInterval(soundPlayer, intervalMilSec);
  }

  render() {
    return (
      <div className="card">
        <h2>Metronome</h2>
        <h1>{this.state.inputValue}BPM</h1>
        <div className="rangeContainer">
          <button className="count" onClick={this.decreaseCount}>
            -
          </button>
          <input
            type="range"
            className="range"
            value={this.state.inputValue}
            onChange={this.handleRangeInput}
            min={this.minValue}
            max={this.maxValue}
          />
          <button className="count" onClick={this.increaseCount}>
            +
          </button>
        </div>
        <button
          onClick={this.handleAudioControl}
          className="btn btn-primary audioControlButton"
        >
          {this.state.isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    );
  }
}

export default Clap;
