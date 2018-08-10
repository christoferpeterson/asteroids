/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/constants.js
/* harmony default export */ var constants = ({
	FPS: 30, // frames per second
	SCREEN_WIDTH: 640, // screen height in pixels
	SCREEN_HEIGHT: 480, // screen height in pixels
	SHIP_SIZE: 30, // ship radius in pixels
	TURN_SPEED: Math.PI * 3 / 2, // ship turn speed in degrees per second
	SHIP_THRUST: 5, // acceleration of ship in pixels per second per second
	FRICTION: .7, // friction coefficient of space (0 = no friction, 1 = lots of friction)
	ROIDS_NUM: 3, // starting number of asteroids
	ROIDS_JAG: .25, // jaggedness of the asteroids (0 = none, 1 = lots)
	ROIDS_SIZE: 100, // starting size of asteroids in pixels
	ROIDS_SPD: 50, // max starting speed of asteroids in pixels per second
	ROIDS_VERT: 12, // average number of vertices on each asteroid
	SHOW_BOUNDING: true, // show or hide collision boundaries
	SHOW_CENTER_DOT: true, // show or hide ship's center dot
	SHIP_EXPLODE_DUR: .3, // duration of the ship's explosion
	SHIP_INV_DUR: 3, // ship's invulnerability duration in seconds
	SHIP_BLINK_DUR: .1, // duration of ship's blink during invulnerability in seconds
	LASER_MAX: 10, // max number of lasers on screen at once
	LASER_SPD: 500, // speed of lasers in pixels per second
	LASER_DIST: 0.6, // max distance laser can travel as fraction of screen width
	LASER_EXPLODE_DUR: 0.1, // duration of laser's explosion in seconds
	TEXT_FADE_TIME: 2.5, // text fade time in seconds
	TEXT_SIZE: 40, // text font height in pixels
	GAME_LIVES: 3, // starting # of lives
	ROIDS_PTS_LG: 20, // points scored for large asteroids
	ROIDS_PTS_MD: 50, // points scored for medium asteroids
	ROIDS_PTS_SM: 100, // points scored for small asteroids
	SAVE_KEY_SCORE: "highscore", // local storage save key for high score
	SOUND_ON: true, // turn sound on or off
	MUSIC_ON: true, // turn music on or off
	SOUND_DIR: "sounds" // directory where sounds are located
});
// CONCATENATED MODULE: ./src/libs/canvas.js
// various methods for interacting with a canvas element
class Canvas {
	constructor(ctx) {
		this.ctx = ctx;
	}

	drawIsoscelesTriangle(x, y, height, angle, strokeColor, strokeWidth, fillColor) {
		this.ctx.beginPath();
		this.ctx.moveTo( // nose of ship
			x + 4 / 3 * height * Math.cos(angle),
			y - 4 / 3 * height * Math.sin(angle)
		);
		this.ctx.lineTo( /// rear left
			x - height * (2 / 3 * Math.cos(angle) + Math.sin(angle)),
			y + height * (2 / 3 * Math.sin(angle) - Math.cos(angle))
		);
	
		this.ctx.lineTo( /// rear left
			x - height * (2 / 3 * Math.cos(angle) - Math.sin(angle)),
			y + height * (2 / 3 * Math.sin(angle) + Math.cos(angle))
		);
		this.ctx.closePath();

		if(!!strokeColor && !!strokeWidth) {
			this.ctx.strokeStyle = strokeColor;
			this.ctx.lineWidth = strokeWidth;
			this.ctx.stroke();
		}

		if(!!fillColor) {
			this.ctx.fillColor = fillColor;
			this.ctx.fill();
		}
	}

	drawCircle(x, y, radius, strokeColor, fillColor) {
		if(!!strokeColor) this.ctx.strokeStyle = strokeColor;
		if(!!fillColor) this.ctx.fillStyle = fillColor;
		this.ctx.beginPath();
		this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
		if(!!strokeColor) this.ctx.stroke();
		if(!!fillColor) this.ctx.fill();
	}
}

/* harmony default export */ var libs_canvas = (Canvas);
// CONCATENATED MODULE: ./src/libs/gameMath.js
/* harmony default export */ var gameMath = ({
	toRadians: (angle) => angle / 180 * Math.PI,	
	distBetweenPoints: (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
});
// CONCATENATED MODULE: ./src/libs/index.js




// CONCATENATED MODULE: ./src/gameElements/GameElement.js
class GameElement {
	constructor() {
		
	}

	keyDown	(/** @type {KeyboardEvent} */ ev) {

	}

	keyUp(/** @type {KeyboardEvent} */ ev) {
		
	}

	update() {

	}

	draw(canvas) {

	}
};

/* harmony default export */ var gameElements_GameElement = (GameElement);
// CONCATENATED MODULE: ./src/gameElements/Background.js



class Background_Background extends gameElements_GameElement {
	constructor() {
		super();
	}

	update() {
		super.update();
	}

	draw(canvas) {
		super.draw(canvas);
		
		// draw background (space)
		canvas.ctx.fillStyle = "black";
		canvas.ctx.fillRect(0, 0, constants.SCREEN_WIDTH, constants.SCREEN_HEIGHT);
	}
};

/* harmony default export */ var gameElements_Background = (Background_Background);
// CONCATENATED MODULE: ./src/gameElements/Ship.js


class Ship_Ship extends gameElements_GameElement {
	constructor(params) {
		super();
		this.xPosition = params.x;
		this.yPosition = params.y;
		this.shipSize = params.shipSize;
		this.radius = this.shipSize / 2;
		this.angle = params.angle;
		this.color = "white";
	}

	keyDown	(/** @type {KeyboardEvent} */ ev) {
		super.keyDown(ev);
	}

	keyUp(/** @type {KeyboardEvent} */ ev) {
		super.keyUp(ev);
	}

	update() {
		super.update();
	}

	draw(canvas) {
		super.draw(canvas);
		canvas.drawIsoscelesTriangle(this.xPosition, this.yPosition, this.radius, this.angle, this.color, this.shipSize * .05);
	}
}

/* harmony default export */ var gameElements_Ship = (Ship_Ship);
// CONCATENATED MODULE: ./src/gameElements/Sound.js


class Sound_Sound {
	constructor(src, maxStreams = 1, vol = 1) {
		this.streamNum = 0;
		this.streams = [];
		this.maxStreams = maxStreams;
		for (let i = 0; this.streams.length < this.maxStreams; i++) {
			this.streams.push(new Audio(`${constants.SOUND_DIR}/${src}`));
			this.streams[i].volume = vol;                    
		}
	}

	play() {
		if(!constants.SOUND_ON) {
			return;
		}
		this.streamNum = (this.streamNum + 1) % this.maxStreams;
		this.streams[this.streamNum].play();
	}

	stop() {
		this.streams[this.streamNum].pause();
		this.streams[this.streamNum].currentTime = 0;
	}
}

/* harmony default export */ var gameElements_Sound = (Sound_Sound);
// CONCATENATED MODULE: ./src/gameElements/UserShip.js




class UserShip_UserShip extends gameElements_Ship {
	constructor(params) {
		super(params);

		this.rotationSpeed = 0;
		this.thrusting = false;
		this.thrust = { x: 0, y: 0 };
		this.explodeTime = 0;
		this.blinkTime = Math.ceil(constants.SHIP_BLINK_DUR * constants.FPS);
		this.blinkNum = Math.ceil(constants.SHIP_INV_DUR / constants.SHIP_BLINK_DUR);
		this.canShoot = true;
		this.lasers = [];
		this.dead = false;
		this.shootLaser = params.shootLaser;

		this.fxThrust = new gameElements_Sound("thrust.m4a");
	}

	keyDown(/** @type {KeyboardEvent} */ ev) {
		super.keyDown(ev);

		if(this.dead) {
			return;
		}

		switch(ev.keyCode) {
			case 37: // left arrow (rotate ship left)
				this.rotationSpeed = constants.TURN_SPEED / constants.FPS;
				break;
			case 38: // up arrow (thrust ship forward)
				this.thrusting = true;
				break;
			case 39: // right arrow (rotate ship right)
				this.rotationSpeed = -constants.TURN_SPEED / constants.FPS;
				break;
			case 32: // space bar (shoot laswer)
				this.shootLaser();
				break;
		}
	}

	keyUp(/** @type {KeyboardEvent} */ ev) {
		super.keyUp(ev);

		if(this.dead) {
			return;
		}

		switch(ev.keyCode) {
			case 37: // left arrow (stop rotate ship left)
				this.rotationSpeed = 0;
				break;
			case 38: // up arrow (stop thrust ship forward)
				this.thrusting = false;
				break;
			case 39: // right arrow (stop rotate ship right)
				this.rotationSpeed = 0;
				break;
			case 32: // space bar (shoot laswer)
				this.canShoot = true;
				break;
		}
	}

	update() {
		super.update();

		if(this.blinkNum > 0) {
			// reduce blink time
			this.blinkTime--;

			// reduce the blink num
			if(this.blinkTime == 0) {
				this.blinkTime = Math.ceil(constants.SHIP_BLINK_DUR * constants.FPS);
				this.blinkNum--;
			}
		}
		
		if(this.thrusting && !this.dead) {
			this.thrust.x += constants.SHIP_THRUST * Math.cos(this.angle) / constants.FPS;
			this.thrust.y -= constants.SHIP_THRUST * Math.sin(this.angle) / constants.FPS;
			this.fxThrust.play();
		} else {
			this.thrust.x -= constants.FRICTION * this.thrust.x / constants.FPS;
			this.thrust.y -= constants.FRICTION * this.thrust.y / constants.FPS;
			this.fxThrust.stop();
		}

		// rotate ship
		this.angle += this.rotationSpeed;

		// move ship
		this.xPosition += this.thrust.x;
		this.yPosition += this.thrust.y;

		// handle edge of screen
		if(this.xPosition < 0 - this.radius) {
			this.xPosition = constants.SCREEN_WIDTH + this.radius;
		} else if(this.xPosition > constants.SCREEN_WIDTH + this.radius) {
			this.xPosition = 0 - this.radius;
		}
		
		// handle edge of screen
		if(this.yPosition < 0 - this.radius) {
			this.yPosition = constants.SCREEN_HEIGHT + this.radius;
		} else if(this.yPosition > constants.SCREEN_HEIGHT + this.radius) {
			this.yPosition = 0 - this.radius;
		}
	}

	draw(canvas) {
		if(this.explodeTime > 0) {
			this.drawExplosion(canvas);
		}

		if(this.dead || (this.blinkNum > 0 && this.blinkNum % 2 == 0)) {
			return;
		}

		super.draw(canvas);

		if(this.thrusting) {
			this.drawThrust(canvas, this.xPosition, this.yPosition, this.angle);
		}

		if(constants.SHOW_CENTER_DOT) {
			canvas.ctx.fillStyle = "red";
			canvas.ctx.fillRect(this.xPosition - 1, this.yPosition - 1, 2, 2);
		}

		if(constants.SHOW_BOUNDING) {
			canvas.drawCircle(this.xPosition, this.yPosition, this.radius, "lime", "");
		}
	}	
	
	drawThrust(canvas, x, y, a) {
		// draw thruster
		canvas.ctx.strokeStyle = "pink";
		canvas.ctx.fillStyle = "blue";
		canvas.ctx.lineWidth = constants.SHIP_SIZE * .1;
		canvas.ctx.beginPath();
		canvas.ctx.moveTo( // rear left
			x - this.radius * (2 / 3 * Math.cos(a) + .5 * Math.sin(a)),
			y + this.radius * (2 / 3 * Math.sin(a) - .5 * Math.cos(a))
		);
		canvas.ctx.lineTo( // rear center (behind ship)
			x - this.radius * 6 / 3 * Math.cos(a),
			y + this.radius * 6 / 3 * Math.sin(a)
		);

		canvas.ctx.lineTo( /// rear left
			x - this.radius * (2 / 3 * Math.cos(a) - .5 * Math.sin(a)),
			y + this.radius * (2 / 3 * Math.sin(a) + .5 * Math.cos(a))
		);
		canvas.ctx.closePath();
		canvas.ctx.fill();
		canvas.ctx.stroke();
	}
	
	drawExplosion(canvas) {
		canvas.drawCircle(this.xPosition, this.yPosition, this.radius * 1.7, "", "darkred");
		canvas.drawCircle(this.xPosition, this.yPosition, this.radius * 1.4, "", "red");
		canvas.drawCircle(this.xPosition, this.yPosition, this.radius * 1.1, "", "orange");
		canvas.drawCircle(this.xPosition, this.yPosition, this.radius * .8, "", "yellow");
		canvas.drawCircle(this.xPosition, this.yPosition, this.radius * .5, "", "white");
	}
}

/* harmony default export */ var gameElements_UserShip = (UserShip_UserShip);
// CONCATENATED MODULE: ./src/gameElements/index.js






// CONCATENATED MODULE: ./src/asteroids.js




/* harmony default export */ var asteroids = (function() {
	function component() {
		let element = document.createElement('canvas');
		element.setAttribute("id", "gameCanvas");
		element.setAttribute("width", constants.SCREEN_WIDTH);
		element.setAttribute("height", constants.SCREEN_HEIGHT);
		return element;
	}

	const canv = component();
	
	document.body.appendChild(canv);
	const ctx = canv.getContext("2d");
	const canvas = new libs_canvas(ctx);
		
	let level, roids, ship, text, textAlpha, lives, score, scoreHigh;
	let gameElements = [];

	// set up sound effects 
	const fxLaser = new gameElements_Sound("laser.m4a", 5, .5);
	const fxExplode = new gameElements_Sound("explode.m4a");
	const fxHit = new gameElements_Sound("hit.m4a", 5);

	// set up music
	const music = new Music("music-low.m4a", "music-high.m4a");
	let roidsLeft, roidsTotal;

	// set up game parameters
	newGame();

	// setup event handlers
	document.addEventListener("keydown", keyDown);
	document.addEventListener("keyup", keyUp);

	// game loop
	setInterval(gameLoop, 1000 / constants.FPS);

	function newGame() {
		level = 0;
		score = 0;
		lives = constants.GAME_LIVES;

		gameElements = [];
		gameElements.push(new gameElements_Background());

		// draw triangluar ship
		ship = new gameElements_UserShip({
			x: canv.width / 2,
			y: canv.height / 2,
			shipSize: constants.SHIP_SIZE,
			angle: Math.PI / 2,
			shootLaser
		});
		
		// get the high score from local storage
		var scoreStr = localStorage.getItem(constants.SAVE_KEY_SCORE);
		if(scoreStr == null) {
			scoreHigh = 0;
		} else {
			scoreHigh = parseInt(scoreStr, 10);
		}

		newLevel();
	}

	function newLevel() {
		text = `Level ${level+1}`;
		textAlpha = 1.0;

		// set up asteroids
		roids = [];
		createAsteroidBelt();
	}
	
	function createAsteroidBelt() {
		roids = [];
		let x, y;
		for(var i = 0; i < constants.ROIDS_NUM + level; i++) {
			do {
				x = Math.floor(Math.random() * canv.width);
				y = Math.floor(Math.random() * canv.height);
			} while (gameMath.distBetweenPoints(ship.xPosition, ship.yPosition, x, y) < constants.ROIDS_SIZE * 2 + ship.radius);
			roids.push(newAsteroid(x, y, Math.ceil(constants.ROIDS_SIZE / 2)));
		}
		roidsTotal = roids.length * 7;
		roidsLeft = roidsTotal;
	}

	function explodeShip() {
		ship.dead = true;
		ship.explodeTime = Math.ceil(constants.SHIP_EXPLODE_DUR * constants.FPS);
		fxExplode.play();
	}

	function gameOver() {
		// to do: game over
		ship.dead = true;
		text = "Game Over";
		textAlpha = 1.0;
	}

	function keyDown(/** @type {KeyboardEvent} */ ev) {
		ship.keyDown(ev);
	}

	function keyUp(/** @type {KeyboardEvent} */ ev) {
		ship.keyUp(ev);
	}

	function shootLaser() {
		// create laser
		if(ship.canShoot && ship.lasers.length < constants.LASER_MAX) {
			ship.lasers.push({ // from nose of ship
				x: ship.xPosition + 4 / 3 * ship.radius * Math.cos(ship.angle),
				y: ship.yPosition - 4 / 3 * ship.radius * Math.sin(ship.angle),
				xv: (constants.LASER_SPD * Math.cos(ship.angle) / constants.FPS) + ship.thrust.x,
				yv: (-constants.LASER_SPD * Math.sin(ship.angle) / constants.FPS) + ship.thrust.y,
				dist: 0,
				explodeTime: 0
			});

			fxLaser.play();
		}

		// prevent further shooting
		ship.canShoot = false;
	}

	function newAsteroid(x, y, r) {
		var lvlMult = 1 + 0.1 * level;
		var roid = {
			x: x,
			y: y,
			xv: Math.random() * constants.ROIDS_SPD * lvlMult / constants.FPS * (Math.random() < .5 ? 1 : -1),
			yv: Math.random() * constants.ROIDS_SPD * lvlMult / constants.FPS * (Math.random() < .5 ? 1 : -1),
			r: r,
			a: Math.random() * Math.PI * 2, // in radians
			vert: Math.floor(Math.random() * (constants.ROIDS_VERT + 1) + constants.ROIDS_VERT / 2),
			offs: []
		};

		// create vertex offsets array
		for(var i = 0; i < roid.vert; i++) {
			roid.offs.push(Math.random() * constants.ROIDS_JAG * 2 + 1 - constants.ROIDS_JAG);
		}

		return roid;
	}

	function destroyAsteroid(index) {
		var x = roids[index].x;
		var y = roids[index].y;
		var r = roids[index].r;

		// split asteroid in two (if necessary)
		if(r == Math.ceil(constants.ROIDS_SIZE / 2)) {
			score += constants.ROIDS_PTS_LG;
			roids.push(newAsteroid(x, y, Math.ceil(constants.ROIDS_SIZE / 4)))
			roids.push(newAsteroid(x, y, Math.ceil(constants.ROIDS_SIZE / 4)))
		} else if(r == Math.ceil(constants.ROIDS_SIZE / 4)) {
			score += constants.ROIDS_PTS_MD;
			roids.push(newAsteroid(x, y, Math.ceil(constants.ROIDS_SIZE / 8)))
			roids.push(newAsteroid(x, y, Math.ceil(constants.ROIDS_SIZE / 8)))
		} else {
			score += constants.ROIDS_PTS_SM;
		}

		// check high score
		if(score > scoreHigh) {
			scoreHigh = score;
			localStorage.setItem(constants.SAVE_KEY_SCORE, scoreHigh);
		}

		roids.splice(index, 1);
		fxHit.play()

		// calculate ratio
		roidsLeft--;
		music.setTempo(roidsLeft == 0 ? 1 : roidsLeft / roidsTotal);

		// new level when no more asteroids
		if(roids.length == 0) {
			level++;
			newLevel();
		}
	}

	function Music(srcLow, srcHigh) {
		this.soundLow = new Audio(`${constants.SOUND_DIR}/${srcLow}`);
		this.soundHigh = new Audio(`${constants.SOUND_DIR}/${srcHigh}`);
		this.low = true;
		this.tempo = 1.0; // seconds per beat
		this.beatTime = 0; // frames left until next beat

		this.play = function() {
			if(!constants.MUSIC_ON) {
				return;
			}

			if(this.low) {
				this.soundLow.play();
			} else {
				this.soundHigh.play();
			}
			this.low = !this.low;
		}

		this.tick = function() {
			if(this.beatTime == 0) {
				this.play();
				this.beatTime = Math.ceil(this.tempo * constants.FPS);
			} else {
				this.beatTime--;
			}
		}

		this.setTempo = function(ratio) {
			this.tempo = 1.0 - (.75 * (1.0 - ratio));
		}
	}

	function update() {
		for (let i = gameElements.length - 1; i >= 0; i--) {
			if(typeof gameElements[i].update === 'function') {
				gameElements[i].update();
			}
		}
	}

	function draw(canvas) {
		canvas.ctx.clearRect(0, 0, constants.SCREEN_WIDTH, constants.SCREEN_HEIGHT);
		for (let i = gameElements.length - 1; i >= 0; i--) {
			if(typeof gameElements[i].draw === 'function') {
				gameElements[i].draw(canvas);
			}
		}
	}

	function clean() {
		for (let i = gameElements.length - 1; i >= 0; i--) {
			if(!!gameElements[i].deleted) {
				gameElements[i].splice(i, 1);
			}
		}
	}

	function gameLoop() {
		update();
		draw(canvas);
		clean();

		var exploding = ship.explodeTime > 0;

		music.tick();
		drawPlayerShip();
		
		for (let i = 0; i < ship.lasers.length; i++) {
			drawLaser(ship.lasers[i])
		}

		// draw asteroids
		for(var i = 0; i < roids.length; i++) {
			drawAsteroid(roids[i]);
		}

		if(textAlpha > 0) {
			canvas.ctx.textAlign = "center";
			canvas.ctx.textBaseline = "middle";
			canvas.ctx.fillStyle = `rgba(255,255,255,${textAlpha})`;
			canvas.ctx.font = `small-caps ${constants.TEXT_SIZE}px mono`;
			canvas.ctx.fillText(text, canv.width / 2, canv.height * .75);
			textAlpha -= (1.0 / constants.TEXT_FADE_TIME / constants.FPS);
		} else if(lives == 0 && ship.dead) {
			newGame();
		}

		// draw remaining lives
		var lifeColor;
		for (let i = 0; i < lives; i++) {
			lifeColor = exploding && i == lives - 1 ? "red" : "white";
			drawShip(constants.SHIP_SIZE + i * constants.SHIP_SIZE * 1.2, constants.SHIP_SIZE, gameMath.toRadians(90), lifeColor);
		}

		// draw score
		canvas.ctx.textAlign = "right";
		canvas.ctx.textBaseline = "middle";
		canvas.ctx.fillStyle = `white`;
		canvas.ctx.font = `${constants.TEXT_SIZE}px mono`;
		canvas.ctx.fillText(score, canv.width - constants.SHIP_SIZE / 2, constants.SHIP_SIZE);

		// draw high score
		canvas.ctx.textAlign = "right";
		canvas.ctx.textBaseline = "middle";
		canvas.ctx.fillStyle = `slategrey`;
		canvas.ctx.font = `${(constants.TEXT_SIZE * .5)}px mono`;
		canvas.ctx.fillText(`HI SCORE: ${scoreHigh}`, canv.width - constants.SHIP_SIZE / 2, constants.SHIP_SIZE * 2);

		// detect laser hits on asteroid
		var ax, ay, ar, lx, ly;
		for (let i = roids.length - 1; i >= 0; i--) {
			ax = roids[i].x;
			ay = roids[i].y;
			ar = roids[i].r;

			for(let j = ship.lasers.length - 1; j >= 0; j--) {
				lx = ship.lasers[j].x;
				ly = ship.lasers[j].y;

				// detect hits
				if(ship.lasers[j].explodeTime == 0 && gameMath.distBetweenPoints(ax, ay, lx, ly) < ar) {
					destroyAsteroid(i);

					// explode laser
					ship.lasers[j].explodeTime = Math.ceil(constants.LASER_EXPLODE_DUR * constants.FPS);
					break;
				}
			}
		}

		if(!exploding) {
			if(ship.blinkNum == 0 && !ship.dead) {
				// check for asteroid collisions
				for (let i = 0; i < roids.length; i++) {
					if(gameMath.distBetweenPoints(ship.xPosition, ship.yPosition, roids[i].x, roids[i].y) < ship.radius + roids[i].r) {
						explodeShip();
						destroyAsteroid(i);
						break;
					}
				}
			}

			ship.update();
		} else {
			ship.explodeTime--;
			if(ship.explodeTime <= 0) {
				lives--;
				if(lives == 0) {
					gameOver();
				} else {
					ship = new gameElements_UserShip({
						x: canv.width / 2,
						y: canv.height / 2,
						shipSize: constants.SHIP_SIZE,
						angle: Math.PI / 2,
						shootLaser
					});
				}
			}
		}

		// move lasers
		for (let i = ship.lasers.length - 1; i >= 0; i--) {
			if(ship.lasers[i].explodeTime > 0) {
				ship.lasers[i].explodeTime--;
				if(ship.lasers[i].explodeTime == 0) {
					ship.lasers.splice(i, 1);
				}
				continue;
			}

			// check distance travelled
			if(ship.lasers[i].dist > constants.LASER_DIST * canv.width) {
				ship.lasers.splice(i, 1);
				continue;
			}

			// move laser
			ship.lasers[i].x += ship.lasers[i].xv;
			ship.lasers[i].y += ship.lasers[i].yv;

			// calculate distance travelled
			ship.lasers[i].dist += Math.sqrt(Math.pow(ship.lasers[i].xv, 2) + Math.pow(ship.lasers[i].yv, 2))

			// handle edge of screen
			if(ship.lasers[i].x < 0) {
				ship.lasers[i].x = canv.width;
			} else if(ship.lasers[i].x > canv.width) {
				ship.lasers[i].x = 0;
			}

			if(ship.lasers[i].y < 0) {
				ship.lasers[i].y = canv.height;
			} else if(ship.lasers[i].y > canv.height) {
				ship.lasers[i].y = 0;
			}
		}

		// move asteroids
		for (let i = 0; i < roids.length; i++) {
			// move asteroid
			roids[i].x += roids[i].xv;
			roids[i].y += roids[i].yv;

			// handle edge of screen
			if(roids[i].x < 0 - roids[i].r) {
				roids[i].x = canv.width + roids[i].r;
			} else if(roids[i].x > canv.width + roids[i].r) {
				roids[i].x = 0 - roids[i].r;
			}

			if(roids[i].y < 0 - roids[i].r) {
				roids[i].y = canv.height + roids[i].r;
			} else if(roids[i].y > canv.height + roids[i].r) {
				roids[i].y = 0 - roids[i].r;
			}
		}
	}

	function drawShip(x, y, a, color = "white") {
		// draw ship
		canvas.ctx.strokeStyle = color;
		canvas.ctx.lineWidth = constants.SHIP_SIZE * .05;
		canvas.ctx.beginPath();
		canvas.ctx.moveTo( // nose of ship
			x + 4 / 3 * ship.radius * Math.cos(a),
			y - 4 / 3 * ship.radius * Math.sin(a)
		);
		canvas.ctx.lineTo( /// rear left
			x - ship.radius * (2 / 3 * Math.cos(a) + Math.sin(a)),
			y + ship.radius * (2 / 3 * Math.sin(a) - Math.cos(a))
		);

		canvas.ctx.lineTo( /// rear left
			x - ship.radius * (2 / 3 * Math.cos(a) - Math.sin(a)),
			y + ship.radius * (2 / 3 * Math.sin(a) + Math.cos(a))
		);
		canvas.ctx.closePath();
		canvas.ctx.stroke();
	}

	function drawPlayerShip() {            
		ship.draw(canvas);
	}

	function drawAsteroid(asteroid) {
		canvas.ctx.strokeStyle = "slategrey";
			canvas.ctx.lineWidth = constants.SHIP_SIZE * .05;
			
			// get asteroid properties
			const x = asteroid.x;
			const y = asteroid.y;
			const r = asteroid.r;
			const a = asteroid.a;
			const vert = asteroid.vert;
			const offs = asteroid.offs;

			// draw path
			canvas.ctx.beginPath();
			canvas.ctx.moveTo(
				x + r * offs[0] * Math.cos(a),
				y + r * offs[0] * Math.sin(a)
			);

			// draw polygon
			for(var j = 1; j < vert; j++) {
				canvas.ctx.lineTo(
					x + r * offs[j] * Math.cos(a + j * Math.PI * 2 / vert),
					y + r * offs[j] * Math.sin(a + j * Math.PI * 2 / vert)
				);
			}
			canvas.ctx.closePath();
			canvas.ctx.stroke();

			if(constants.SHOW_BOUNDING) {
				canvas.drawCircle(x, y, r, "lime", "");
			}

	}

	function drawLaser(laser) {
		if(laser.explodeTime == 0) {
			canvas.drawCircle(laser.x, laser.y, constants.SHIP_SIZE / 15, "", "salmon");
		} else {
			// draw explosion
			canvas.drawCircle(laser.x, laser.y, ship.radius * .75, "", "orangered");
			canvas.drawCircle(laser.x, laser.y, ship.radius * .5, "", "salmon");
			canvas.drawCircle(laser.x, laser.y, ship.radius * .25, "", "pink");
		}
	}
});
// CONCATENATED MODULE: ./src/index.js


asteroids();

/***/ })
/******/ ]);