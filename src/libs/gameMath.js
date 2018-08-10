export default {
	toRadians: (angle) => angle / 180 * Math.PI,	
	distBetweenPoints: (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
};