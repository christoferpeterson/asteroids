import CONST from './constants';
import { Canvas, gameMath } from './libs';
import { Background, Ship, Sound, UserShip } from './gameElements';

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
	const fxLaser = new Sound("laser.m4a", 5, .5);
	const fxExplode = new Sound("explode.m4a");
	const fxHit = new Sound("hit.m4a", 5);

	// set up music
	const music = new Music("music-low.m4a", "music-high.m4a");
	let roidsLeft, roidsTotal;

	// set up game parameters
	newGame();

	// setup event handlers
	document.addEventListener("keydown", keyDown);
	document.addEventListener("keyup", keyUp);

	// game loop
	setInterval(gameLoop, 1000 / CONST.FPS);

	function newGame() {
		level = 0;
		score = 0;
		lives = CONST.GAME_LIVES;

		gameElements = [];
		gameElements.push(new Background());

		// draw triangluar ship
		ship = new UserShip({
			x: canv.width / 2,
			y: canv.height / 2,
			shipSize: CONST.SHIP_SIZE,
			angle: Math.PI / 2,
			shootLaser
		});
		
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

		// set up asteroids
		roids = [];
		createAsteroidBelt();
	}
	
	function createAsteroidBelt() {
		roids = [];
		let x, y;
		for(var i = 0; i < CONST.ROIDS_NUM + level; i++) {
			do {
				x = Math.floor(Math.random() * canv.width);
				y = Math.floor(Math.random() * canv.height);
			} while (gameMath.distBetweenPoints(ship.xPosition, ship.yPosition, x, y) < CONST.ROIDS_SIZE * 2 + ship.radius);
			roids.push(newAsteroid(x, y, Math.ceil(CONST.ROIDS_SIZE / 2)));
		}
		roidsTotal = roids.length * 7;
		roidsLeft = roidsTotal;
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

	function shootLaser() {
		// create laser
		if(ship.canShoot && ship.lasers.length < CONST.LASER_MAX) {
			ship.lasers.push({ // from nose of ship
				x: ship.xPosition + 4 / 3 * ship.radius * Math.cos(ship.angle),
				y: ship.yPosition - 4 / 3 * ship.radius * Math.sin(ship.angle),
				xv: (CONST.LASER_SPD * Math.cos(ship.angle) / CONST.FPS) + ship.thrust.x,
				yv: (-CONST.LASER_SPD * Math.sin(ship.angle) / CONST.FPS) + ship.thrust.y,
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
			xv: Math.random() * CONST.ROIDS_SPD * lvlMult / CONST.FPS * (Math.random() < .5 ? 1 : -1),
			yv: Math.random() * CONST.ROIDS_SPD * lvlMult / CONST.FPS * (Math.random() < .5 ? 1 : -1),
			r: r,
			a: Math.random() * Math.PI * 2, // in radians
			vert: Math.floor(Math.random() * (CONST.ROIDS_VERT + 1) + CONST.ROIDS_VERT / 2),
			offs: []
		};

		// create vertex offsets array
		for(var i = 0; i < roid.vert; i++) {
			roid.offs.push(Math.random() * CONST.ROIDS_JAG * 2 + 1 - CONST.ROIDS_JAG);
		}

		return roid;
	}

	function destroyAsteroid(index) {
		var x = roids[index].x;
		var y = roids[index].y;
		var r = roids[index].r;

		// split asteroid in two (if necessary)
		if(r == Math.ceil(CONST.ROIDS_SIZE / 2)) {
			score += CONST.ROIDS_PTS_LG;
			roids.push(newAsteroid(x, y, Math.ceil(CONST.ROIDS_SIZE / 4)))
			roids.push(newAsteroid(x, y, Math.ceil(CONST.ROIDS_SIZE / 4)))
		} else if(r == Math.ceil(CONST.ROIDS_SIZE / 4)) {
			score += CONST.ROIDS_PTS_MD;
			roids.push(newAsteroid(x, y, Math.ceil(CONST.ROIDS_SIZE / 8)))
			roids.push(newAsteroid(x, y, Math.ceil(CONST.ROIDS_SIZE / 8)))
		} else {
			score += CONST.ROIDS_PTS_SM;
		}

		// check high score
		if(score > scoreHigh) {
			scoreHigh = score;
			localStorage.setItem(CONST.SAVE_KEY_SCORE, scoreHigh);
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
		this.soundLow = new Audio(`${CONST.SOUND_DIR}/${srcLow}`);
		this.soundHigh = new Audio(`${CONST.SOUND_DIR}/${srcHigh}`);
		this.low = true;
		this.tempo = 1.0; // seconds per beat
		this.beatTime = 0; // frames left until next beat

		this.play = function() {
			if(!CONST.MUSIC_ON) {
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
				this.beatTime = Math.ceil(this.tempo * CONST.FPS);
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
		canvas.ctx.clearRect(0, 0, CONST.SCREEN_WIDTH, CONST.SCREEN_HEIGHT);
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
			drawShip(CONST.SHIP_SIZE + i * CONST.SHIP_SIZE * 1.2, CONST.SHIP_SIZE, gameMath.toRadians(90), lifeColor);
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
			if(ship.lasers[i].dist > CONST.LASER_DIST * canv.width) {
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
		canvas.ctx.lineWidth = CONST.SHIP_SIZE * .05;
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
			canvas.ctx.lineWidth = CONST.SHIP_SIZE * .05;
			
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

			if(CONST.SHOW_BOUNDING) {
				canvas.drawCircle(x, y, r, "lime", "");
			}

	}

	function drawLaser(laser) {
		if(laser.explodeTime == 0) {
			canvas.drawCircle(laser.x, laser.y, CONST.SHIP_SIZE / 15, "", "salmon");
		} else {
			// draw explosion
			canvas.drawCircle(laser.x, laser.y, ship.radius * .75, "", "orangered");
			canvas.drawCircle(laser.x, laser.y, ship.radius * .5, "", "salmon");
			canvas.drawCircle(laser.x, laser.y, ship.radius * .25, "", "pink");
		}
	}
}