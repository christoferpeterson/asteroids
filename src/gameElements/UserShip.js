import Ship from './Ship';
import Sound from './Sound';
import CONST from '../constants';
import Laser from './Laser';

const fxLaser = new Sound("laser.m4a", 5, .5);

class UserShip extends Ship {
	constructor(params) {
		super(params);

		this.rotationSpeed = 0;
		this.thrusting = false;
		this.thrust = { x: 0, y: 0 };
		this.explodeTime = 0;
		this.blinkTime = Math.ceil(CONST.SHIP_BLINK_DUR * CONST.FPS);
		this.blinkNum = Math.ceil(CONST.SHIP_INV_DUR / CONST.SHIP_BLINK_DUR);
		this.canShoot = true;
		this.lasers = [];
		this.dead = false;

		this.fxThrust = new Sound("thrust.m4a");
	}

	keyDown(/** @type {KeyboardEvent} */ ev) {
		super.keyDown(ev);

		if(this.dead) {
			return;
		}

		switch(ev.key) {
			case "ArrowLeft": // left arrow (rotate ship left)
				this.rotationSpeed = CONST.TURN_SPEED / CONST.FPS;
				break;
			case "ArrowUp": // up arrow (thrust ship forward)
				this.thrusting = true;
				break;
			case "ArrowRight": // right arrow (rotate ship right)
				this.rotationSpeed = -CONST.TURN_SPEED / CONST.FPS;
				break;
			case "Spacebar":
			case " ": // space bar (shoot laser)
				this.shootLaser();
				break;
		}
	}

	keyUp(/** @type {KeyboardEvent} */ ev) {
		super.keyUp(ev);

		if(this.dead) {
			return;
		}

		switch(ev.key) {
			case "ArrowLeft": // left arrow (stop rotate ship left)
				this.rotationSpeed = 0;
				break;
			case "ArrowUp": // up arrow (stop thrust ship forward)
				this.thrusting = false;
				break;
			case "ArrowRight": // right arrow (stop rotate ship right)
				this.rotationSpeed = 0;
				break;
			case "Spacebar":
			case " ": // space bar (shoot laser)
				this.canShoot = true;
				break;
		}
	}

	shootLaser() {
		// create laser
		if(this.canShoot && this.lasers.length < CONST.LASER_MAX) {
			this.lasers.push(new Laser ({ // from nose of ship
				x: this.xPosition + 4 / 3 * this.radius * Math.cos(this.angle),
				y: this.yPosition - 4 / 3 * this.radius * Math.sin(this.angle),
				angle: this.angle,
				xv: this.thrust.x,
				yv: this.thrust.y
			}));

			fxLaser.play();
		}

		// prevent further shooting
		this.canShoot = false;
	}

	update() {
		super.update();

		if(this.blinkNum > 0) {
			// reduce blink time
			this.blinkTime--;

			// reduce the blink num
			if(this.blinkTime == 0) {
				this.blinkTime = Math.ceil(CONST.SHIP_BLINK_DUR * CONST.FPS);
				this.blinkNum--;
			}
		}
		
		if(this.thrusting && !this.dead) {
			this.thrust.x += CONST.SHIP_THRUST * Math.cos(this.angle) / CONST.FPS;
			this.thrust.y -= CONST.SHIP_THRUST * Math.sin(this.angle) / CONST.FPS;
			this.fxThrust.play();
		} else {
			this.thrust.x -= CONST.FRICTION * this.thrust.x / CONST.FPS;
			this.thrust.y -= CONST.FRICTION * this.thrust.y / CONST.FPS;
			this.fxThrust.stop();
		}

		// rotate ship
		this.angle += this.rotationSpeed;

		// move ship
		this.xPosition += this.thrust.x;
		this.yPosition += this.thrust.y;

		// handle edge of screen
		if(this.xPosition < 0 - this.radius) {
			this.xPosition = CONST.SCREEN_WIDTH + this.radius;
		} else if(this.xPosition > CONST.SCREEN_WIDTH + this.radius) {
			this.xPosition = 0 - this.radius;
		}
		
		// handle edge of screen
		if(this.yPosition < 0 - this.radius) {
			this.yPosition = CONST.SCREEN_HEIGHT + this.radius;
		} else if(this.yPosition > CONST.SCREEN_HEIGHT + this.radius) {
			this.yPosition = 0 - this.radius;
		}

		this.lasers.forEach(l => l.update());
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

		if(CONST.SHOW_CENTER_DOT) {
			canvas.ctx.fillStyle = "red";
			canvas.ctx.fillRect(this.xPosition - 1, this.yPosition - 1, 2, 2);
		}

		if(CONST.SHOW_BOUNDING) {
			canvas.drawCircle(this.xPosition, this.yPosition, this.radius, "lime", "");
		}

		this.lasers.forEach(l => l.draw(canvas));
	}
	
	drawThrust(canvas, x, y, a) {
		// draw thruster
		canvas.ctx.strokeStyle = "pink";
		canvas.ctx.fillStyle = "blue";
		canvas.ctx.lineWidth = CONST.SHIP_SIZE * .1;
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

	clean() {
		for (let i = this.lasers.length - 1; i >= 0; i--) {
			if(!!this.lasers[i].deleted) {
				this.lasers.splice(i, 1);
			}
		}
	}
}

export default UserShip;