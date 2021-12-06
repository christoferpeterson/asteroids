import GameElement from "./GameElement";

class Projectile extends GameElement {
	constructor({ x = 0, y = 0, angle = 0, xv = 0, yv = 0 }) {
		super();
        this.x = x;
        this.y = y;
        this.xv = xv;
        this.yv = yv;
        this.angle = angle;
        this.dist = 0;
        this.explodeTime = 0;
	}

	keyDown	(/** @type {KeyboardEvent} */ ev) {

	}

	keyUp(/** @type {KeyboardEvent} */ ev) {
		
	}

	update() {
        // move laser
        this.x += this.xv;
        this.y += this.yv;
	}

	draw(canvas) {
        
	}
};

export default Projectile;