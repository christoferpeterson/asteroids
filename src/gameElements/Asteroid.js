import CONST from '../constants';
import Hazard from './Hazard';

class Asteroid extends Hazard {
	constructor({ x, y, r, lvlMult }) {
		super();
        this.x = x;
        this.y = y;
        this.xv = Math.random() * CONST.ROIDS_SPD * lvlMult / CONST.FPS * (Math.random() < .5 ? 1 : -1);
        this.yv = Math.random() * CONST.ROIDS_SPD * lvlMult / CONST.FPS * (Math.random() < .5 ? 1 : -1);
        this.r = r;
        this.a = Math.random() * Math.PI * 2, // in radian;
        this.vert = Math.floor(Math.random() * (CONST.ROIDS_VERT + 1) + CONST.ROIDS_VERT / 2);
        this.offs = [];

		// create vertex offsets array
		for(var i = 0; i < this.vert; i++) {
			this.offs.push(Math.random() * CONST.ROIDS_JAG * 2 + 1 - CONST.ROIDS_JAG);
		}
	}

	keyDown	(/** @type {KeyboardEvent} */ ev) {
		super.keyDown(ev);
	}

	keyUp(/** @type {KeyboardEvent} */ ev) {
		super.keyUp(ev);
	}

	update() {
		super.update();

        // move asteroid
        this.x += this.xv;
        this.y += this.yv;

        // handle edge of screen
        if(this.x < 0 - this.r) {
            this.x = CONST.SCREEN_WIDTH + this.r;
        } else if(this.x > CONST.SCREEN_WIDTH + this.r) {
            this.x = 0 - this.r;
        }

        if(this.y < 0 - this.r) {
            this.y = CONST.SCREEN_HEIGHT + this.r;
        } else if(this.y > CONST.SCREEN_HEIGHT + this.r) {
            this.y = 0 - this.r;
        }
	}

	draw(canvas) {
		super.draw(canvas);
		canvas.ctx.strokeStyle = "slategrey";
        canvas.ctx.lineWidth = CONST.SHIP_SIZE * .05;
        
        // get asteroid properties
        const x = this.x;
        const y = this.y;
        const r = this.r;
        const a = this.a;
        const vert = this.vert;
        const offs = this.offs;

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
}

export default Asteroid;