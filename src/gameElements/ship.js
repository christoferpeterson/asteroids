import {gameMath} from '../libs';
import CONST from '../constants';

class Ship {
	constructor(params) {
		this.xPosition = params.x;
		this.yPosition = params.y;
		this.shipSize = params.shipSize;
		this.radius = this.shipSize / 2;
		this.angle = params.angle;
		this.rotationSpeed = params.rotationSpeed;
		this.thrusting = false;
		this.thrust = { x: 0, y: 0 };
		this.explodeTime = 0;
		this.blinkTime = Math.ceil(CONST.SHIP_BLINK_DUR * CONST.FPS);
		this.blinkNum = Math.ceil(CONST.SHIP_INV_DUR / CONST.SHIP_BLINK_DUR);
		this.canShoot = true;
		this.lasers = [];
		this.dead = false;
		this.color = "white";
	}

	update() {
		// rotate ship
		this.angle += this.rotationSpeed;
	}

	draw(canvas) {
		canvas.drawIsoscelesTriangle(this.xPosition, this.yPosition, this.radius, this.angle, this.color, this.shipSize * .05);
	}
}

export default Ship;