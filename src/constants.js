export default {
	FPS: 30, // frames per second
	SCREEN_WIDTH: 640, // screen height in pixels
	SCREEN_HEIGHT: 480, // screen height in pixels
	SHIP_SIZE: 30, // ship radius in pixels
	TURN_SPEED: 360, // ship turn speed in degrees per second
	SHIP_THRUST: 5, // acceleration of ship in pixels per second per second
	FRICTION: .7, // friction coefficient of space (0 = no friction, 1 = lots of friction)
	ROIDS_NUM: 3, // starting number of asteroids
	ROIDS_JAG: .25, // jaggedness of the asteroids (0 = none, 1 = lots)
	ROIDS_SIZE: 100, // starting size of asteroids in pixels
	ROIDS_SPD: 50, // max starting speed of asteroids in pixels per second
	ROIDS_VERT: 12, // average number of vertices on each asteroid
	SHOW_BOUNDING: false, // show or hide collision boundaries
	SHOW_CENTER_DOT: false, // show or hide ship's center dot
	SHIP_EXPLODE_DUR: .3, // duration of the ship's explosion
	SHIP_INV_DUR: 3, // ship's invulnerability duration in seconds
	SHIP_BLINK_DUR: .1, // duration of ship's blink during invulnerability in seconds
	LASER_MAX: 10, // max number of lasers on screen at once
	LASER_SPD: 500, // speed of lasers in pixels per second
	LASER_DIST: 0.6, // max distance laser can travel as fraction of screen width
	LASER_EXPLODE_DUR: 0.1, // duration of laser's explosion in seconds
	TEXT_FADE_TIME: 2.5, // text fade time in seconds
	TEXT_SIZE: 40, // text font height in pixels
	GAME_LIVES: 3, // starting # of lives
	ROIDS_PTS_LG: 20, // points scored for large asteroids
	ROIDS_PTS_MD: 50, // points scored for medium asteroids
	ROIDS_PTS_SM: 100, // points scored for small asteroids
	SAVE_KEY_SCORE: "highscore", // local storage save key for high score
	SOUND_ON: true, // turn sound on or off
	MUSIC_ON: true, // turn music on or off
	SOUND_DIR: "sounds" // directory where sounds are located
};