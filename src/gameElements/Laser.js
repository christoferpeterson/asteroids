import CONST from "../constants";
import Projectile from "./Projectile";


const LASER_SPD = 500; // speed of lasers in pixels per second
const LASER_DIST = 0.6; // max distance laser can travel as fraction of screen width

class Laser extends Projectile {
	constructor({ x, y, angle, xv, yv }) {
        xv = (LASER_SPD * Math.cos(angle) / CONST.FPS) + xv;
        yv = (-LASER_SPD * Math.sin(angle) / CONST.FPS) + yv;
        super({ x, y, angle, xv, yv });
    }

	keyDown	(/** @type {KeyboardEvent} */ ev) {
		super.keyDown(ev);
	}

	keyUp(/** @type {KeyboardEvent} */ ev) {
		super.keyUp(ev);
	}

	update() {
		super.update();

        // remove the laser when it is done exploding
        if(this.explodeTime > 0) {
            this.explodeTime--;
            if(this.explodeTime == 0) {
                this.deleted = true;
            }
            return;
        }

        // remove the laser after it goes beyond the max distance
        if(this.dist > LASER_DIST * CONST.SCREEN_WIDTH) {
            this.deleted = true;
            return;
        }

        // calculate distance travelled
        this.dist += Math.sqrt(Math.pow(this.xv, 2) + Math.pow(this.yv, 2))

        // handle edge of screen
        if(this.x < 0) {
            this.x = CONST.SCREEN_WIDTH;
        } else if(this.x > CONST.SCREEN_WIDTH) {
            this.x = 0;
        }

        if(this.y < 0) {
            this.y = CONST.SCREEN_HEIGHT;
        } else if(this.y > CONST.SCREEN_HEIGHT) {
            this.y = 0;
        }
	}

    draw(canvas) {
        super.draw(canvas);

		if(this.explodeTime == 0) {
			canvas.drawCircle(this.x, this.y, CONST.SHIP_SIZE / 15, "", "salmon");
		} else {
			// draw explosion
			canvas.drawCircle(this.x, this.y, this.radius * .75, "", "orangered");
			canvas.drawCircle(this.x, this.y, this.radius * .5, "", "salmon");
			canvas.drawCircle(this.x, this.y, this.radius * .25, "", "pink");
		}
    }
}

export default Laser;