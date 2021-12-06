import CONST from "../constants";

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

export default Music;