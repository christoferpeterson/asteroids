import GameElement from './GameElement';

class Hazard extends GameElement {
	constructor() {
		super();
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
	}
}

export default Hazard;