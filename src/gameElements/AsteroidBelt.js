import CONST from "../constants";
import { gameMath } from "../libs";
import Asteroid from "./Asteroid";
import GameElement from "./GameElement";

class AsteroidBelt extends GameElement {
    constructor({ level, userShip, updateScore }) {
        super();
		let x, y;
        this.asteroids = [];
        this.roidsLeft = 0;
        this.updateScore = updateScore;
        const lvlMult = 1 + 0.1 * level;
		for(var i = 0; i < CONST.ROIDS_NUM + level; i++) {
			do {
				x = Math.floor(Math.random() * CONST.SCREEN_WIDTH)  ;
				y = Math.floor(Math.random() * CONST.SCREEN_HEIGHT);
			} while (gameMath.distBetweenPoints(userShip.xPosition, userShip.yPosition, x, y) < CONST.ROIDS_SIZE * 2 + userShip.radius);
			this.asteroids.push(new Asteroid({ x, y, r: Math.ceil(CONST.ROIDS_SIZE / 2), lvlMult}));
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
        this.asteroids.forEach(a => a.update());
	}

	draw(canvas) {
        super.draw(canvas);
        this.asteroids.forEach(a => a.draw(canvas));
	}

	destroyAsteroid(index) {
		var x = this.asteroids[index].x;
		var y = this.asteroids[index].y;
		var r = this.asteroids[index].r;

		// split asteroid in two (if necessary)
		if(r == Math.ceil(CONST.ROIDS_SIZE / 2)) {
			this.updateScore(CONST.ROIDS_PTS_LG);
			this.asteroids.push(new Asteroid({ x, y, r: Math.ceil(CONST.ROIDS_SIZE / 4) }))
			this.asteroids.push(new Asteroid({ x, y, r: Math.ceil(CONST.ROIDS_SIZE / 4) }))
		} else if(r == Math.ceil(CONST.ROIDS_SIZE / 4)) {
			this.updateScore(CONST.ROIDS_PTS_MD);
			this.asteroids.push(new Asteroid({ x, y, r: Math.ceil(CONST.ROIDS_SIZE / 8) }))
			this.asteroids.push(newAsteroid(x, y, Math.ceil(CONST.ROIDS_SIZE / 8)))
		} else {
            this.updateScore(CONST.ROIDS_PTS_SM);
		}

		this.asteroids.splice(index, 1);
		fxHit.play()

		// calculate ratio
		this.roidsLeft--;
		// music.setTempo(roidsLeft == 0 ? 1 : roidsLeft / roidsTotal);

		// new level when no more asteroids
		// if(roids.length == 0) {
		// 	level++;
		// 	newLevel();
		// }
	}
}

export default AsteroidBelt;