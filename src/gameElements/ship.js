import GameElement from './GameElement';

class Ship extends GameElement {
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

export default Ship;