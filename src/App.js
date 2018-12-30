import React, { Component } from 'react';
import './App.css';

class GameTile extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		var size = 1 / this.props.numTiles * 100 + "%";
		return <button onClick={ this.props.onClick } className={ this.props.lit? "gametile light" : "gametile dark" } style={ {width: size, height: size } } />
	}
}

class GameBoard extends Component {
	constructor(props) {
		super(props);
		var lights = [];
		for (var i = 0; i < this.props.size * this.props.size; i++) {
			lights.push(false);
		}
		this.state = { size: this.props.size, lights: lights, clicks: [], numClicks: this.props.numClicks };
		this.init = this.init.bind(this);
		this.reset = this.reset.bind(this);
		this.increaseClicks = this.increaseClicks.bind(this);
		this.decreaseClicks = this.decreaseClicks.bind(this);
		this.increaseSize = this.increaseSize.bind(this);
		this.decreaseSize = this.decreaseSize.bind(this);
		this.flipPos = this.flipPos.bind(this);
	}
	
	init() {
		var lights = [];
		var clicks = [];

		for (let i = 0; i < this.state.size * this.state.size; i++) {
			lights.push(false);
		}

		for (let i = 0; i < this.state.numClicks; i++) {
			clicks.push(Math.floor(Math.random() * this.state.size * this.state.size));
			this.flipPos(lights, clicks[i]);
		}

		this.setState({ size: this.state.size, lights: lights, clicks: clicks, numClicks: this.state.numClicks });
	}

	reset() {
		var lights = [];

		for (let i = 0; i < this.state.size * this.state.size; i++) {
			lights.push(false);
		}

		for (let i = 0; i < this.state.numClicks; i++) {
			this.flipPos(lights, this.state.clicks[i]);
		}

		this.setState({ size: this.state.size, lights: lights, clicks: this.state.clicks, numClicks: this.state.numClicks});
	}

	flipPos(lights, index) {
		var x = index % this.state.size;
		var y = Math.floor(index / this.state.size);
		for (var i = -1; i < 2; i++) {
			for (var j = -1; j < 2; j++) {
				if (x + i >= 0 && x + i < this.state.size && y + j >= 0 && y + j < this.state.size) {
					lights[(y + j) * this.state.size + x + i] = !lights[(y + j) * this.state.size + x + i];
				}
			}
		}
		return lights;
	}

	getEmptyLightsArray(size) {
		var lights = [];

		for (let i = 0; i < size * size; i++) {
			lights.push(false);
		}
		return lights;
	}

	increaseClicks() {
		const lights = this.getEmptyLightsArray(this.state.size);
		this.setState({ size: this.state.size, lights: lights, clicks: this.state.clicks, numClicks: this.state.numClicks + 1 });
	}

	decreaseClicks() {
		const lights = this.getEmptyLightsArray(this.state.size);
		this.setState({ size: this.state.size, lights: lights, clicks: this.state.clicks, numClicks: this.state.numClicks - 1 });
	}
	
	increaseSize() {
		const lights = this.getEmptyLightsArray(this.state.size + 1);
		this.setState({ size: this.state.size + 1, lights: lights, clicks: this.state.clicks, numClicks: this.state.numClicks });
	}

	decreaseSize() {
		const lights = this.getEmptyLightsArray(this.state.size - 1);
		this.setState({ size: this.state.size - 1, lights: lights, clicks: this.state.clicks, numClicks: this.state.numClicks });
	}

	getClickHandler(light, index) {
		var parentElement = this;
		function generatedOnClick() {
			var lights = parentElement.flipPos(parentElement.state.lights, index);
			parentElement.setState({ size: parentElement.state.size, lights: lights, clicks: parentElement.state.clicks });
		}
		return generatedOnClick;
	}

	render() {
		const lightObjects = this.state.lights.map((light, index) => 
				<GameTile 
					numTiles={ this.state.size }
					key={ index }
					lit={ light }
					onClick={ this.getClickHandler(light, index) }
				/>
			);
		const width10 = { width: "10em" };
		const width9 = { width: "9em" };

		return (
			<div id="Container">
			<div
				id="GameBoard"
			>
				{ lightObjects }
			</div>
			<div>
				<div className="flexContainer">
					<button className="shrinkable50" onClick={ this.init }>New Game</button>
					<button className="shrinkable50" onClick={ this.reset }>Reset</button>
				</div>
				<div className="flexContainer">
					<button className="shrinkable50" onClick={ this.decreaseClicks }>Decrease clicks</button>
					<span className="width2em">{ this.state.numClicks }</span>
					<button className="shrinkable50" onClick={ this.increaseClicks }>Increase clicks</button>
				</div>
				<div className="flexContainer">
					<button className="shrinkable50" onClick={ this.decreaseSize }>Decrease size</button>
					<span className="width2em">{ this.state.size }</span>
					<button className="shrinkable50" onClick={ this.increaseSize }>Increase size</button>
				</div>
			</div>
			</div>
			);
	}
}

class App extends Component {
	constructor() {
		super();

	}
	render() {
		return <GameBoard size={ 6 } numClicks={ 3 }/>
	}
}

export default App;
