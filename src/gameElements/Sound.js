import CONST from '../constants';

class Sound {
	constructor(src, maxStreams = 1, vol = 1) {
		this.streamNum = 0;
		this.streams = [];
		this.maxStreams = maxStreams;
		for (let i = 0; this.streams.length < this.maxStreams; i++) {
			this.streams.push(new Audio(`${CONST.SOUND_DIR}/${src}`));
			this.streams[i].volume = vol;                    
		}
	}

	play() {
		if(!CONST.SOUND_ON) {
			return;
		}
		this.streamNum = (this.streamNum + 1) % this.maxStreams;
		this.streams[this.streamNum].play();
	}

	stop() {
		this.streams[this.streamNum].pause();
		this.streams[this.streamNum].currentTime = 0;
	}
}

export default Sound;