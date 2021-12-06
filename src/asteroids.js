import CONST from './constants';
import { Canvas, gameMath } from './libs';
import { Background, Sound, UserShip, Music, Ship } from './gameElements';
import AsteroidBelt from './gameElements/AsteroidBelt';

export default function() {
	function component() {
		let element = document.createElement('canvas');
		element.setAttribute("id", "gameCanvas");
		element.setAttribute("width", CONST.SCREEN_WIDTH);
		element.setAttribute("height", CONST.SCREEN_HEIGHT);
		return element;
	}

	const canv = component();
	
	document.body.appendChild(canv);
	const ctx = canv.getContext("2d");
	const canvas = new Canvas(ctx);
		
	let level, roids, ship, text, textAlpha, lives, score, scoreHigh;
	let gameElements = [];

	// set up sound effects 
	const fxExplode = new Sound("explode.m4a");
	const fxHit = new Sound("hit.m4a", 5);

	// set up music
	const music = new Music("music-low.m4a", "music-high.m4a");

	// set up game parameters
	newGame();

	// setup event handlers
	document.addEventListener("keydown", keyDown);
	document.addEventListener("keyup", keyUp);

	// game loop
	setInterval(gameLoop, 1000 / CONST.FPS);

	function updateScore(dScore = 0) {
		score += dScore
		// check high score
		if(score > scoreHigh) {
			scoreHigh = score;
			localStorage.setItem(CONST.SAVE_KEY_SCORE, scoreHigh);
		}
	}

	function newGame() {
		level = 0;
		score = 0;
		lives = CONST.GAME_LIVES;

		gameElements = [];
		gameElements.push(new Background());
		gameElements.push()

		// draw triangluar ship
		ship = new UserShip({
			x: canv.width / 2,
			y: canv.height / 2,
			shipSize: CONST.SHIP_SIZE,
			angle: Math.PI / 2
		});
		gameElements.push(ship);
		
		// get the high score from local storage
		var scoreStr = localStorage.getItem(CONST.SAVE_KEY_SCORE);
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

		const belt = new AsteroidBelt({ level, userShip: ship, updateScore });
		roids = belt.asteroids;
		// set up asteroids
		gameElements.push(belt);
	}

	function explodeShip() {
		ship.dead = true;
		ship.explodeTime = Math.ceil(CONST.SHIP_EXPLODE_DUR * CONST.FPS);
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

	function update() {
		gameElements.forEach(e => e.update());
	}

	function draw(canvas) {
		canvas.ctx.clearRect(0, 0, CONST.SCREEN_WIDTH, CONST.SCREEN_HEIGHT);
		gameElements.forEach(e => e.draw(canvas));
	}

	function clean() {
		for (let i = gameElements.length - 1; i >= 0; i--) {
			if(typeof(gameElements[i].clean) === typeof(()=>{}))
				gameElements[i].clean();
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

		// draw asteroids

		if(textAlpha > 0) {
			canvas.ctx.textAlign = "center";
			canvas.ctx.textBaseline = "middle";
			canvas.ctx.fillStyle = `rgba(255,255,255,${textAlpha})`;
			canvas.ctx.font = `small-caps ${CONST.TEXT_SIZE}px mono`;
			canvas.ctx.fillText(text, canv.width / 2, canv.height * .75);
			textAlpha -= (1.0 / CONST.TEXT_FADE_TIME / CONST.FPS);
		} else if(lives == 0 && ship.dead) {
			newGame();
		}

		// draw remaining lives
		var lifeColor;
		for (let i = 0; i < lives; i++) {
			lifeColor = exploding && i == lives - 1 ? "red" : "white";
			const life = new Ship({
				xPosition: CONST.SHIP_SIZE + i * CONST.SHIP_SIZE * 1.2,
				yPosition: CONST.SHIP_SIZE,
				angle: gameMath.toRadians(90),
				color: lifeColor
			});
			life.draw(canvas);
		}

		// draw score
		canvas.ctx.textAlign = "right";
		canvas.ctx.textBaseline = "middle";
		canvas.ctx.fillStyle = `white`;
		canvas.ctx.font = `${CONST.TEXT_SIZE}px mono`;
		canvas.ctx.fillText(score, canv.width - CONST.SHIP_SIZE / 2, CONST.SHIP_SIZE);

		// draw high score
		canvas.ctx.textAlign = "right";
		canvas.ctx.textBaseline = "middle";
		canvas.ctx.fillStyle = `slategrey`;
		canvas.ctx.font = `${(CONST.TEXT_SIZE * .5)}px mono`;
		canvas.ctx.fillText(`HI SCORE: ${scoreHigh}`, canv.width - CONST.SHIP_SIZE / 2, CONST.SHIP_SIZE * 2);

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
					ship.lasers[j].explodeTime = Math.ceil(CONST.LASER_EXPLODE_DUR * CONST.FPS);
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
					ship = new UserShip({
						x: canv.width / 2,
						y: canv.height / 2,
						shipSize: CONST.SHIP_SIZE,
						angle: Math.PI / 2
					});
					gameElements.push(ship);
				}
			}
		}
	}
}