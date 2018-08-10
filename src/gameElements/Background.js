import GameElement from './GameElement';
import CONST from '../constants';

class Background extends GameElement {
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
		canvas.ctx.fillRect(0, 0, CONST.SCREEN_WIDTH, CONST.SCREEN_HEIGHT);
	}
};

export default Background;