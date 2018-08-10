// various methods for interacting with a canvas element
class Canvas {
	constructor(ctx) {
		this.ctx = ctx;
	}

	drawIsoscelesTriangle(x, y, height, angle, strokeColor, strokeWidth, fillColor) {
		this.ctx.beginPath();
		this.ctx.moveTo( // nose of ship
			x + 4 / 3 * height * Math.cos(angle),
			y - 4 / 3 * height * Math.sin(angle)
		);
		this.ctx.lineTo( /// rear left
			x - height * (2 / 3 * Math.cos(angle) + Math.sin(angle)),
			y + height * (2 / 3 * Math.sin(angle) - Math.cos(angle))
		);
	
		this.ctx.lineTo( /// rear left
			x - height * (2 / 3 * Math.cos(angle) - Math.sin(angle)),
			y + height * (2 / 3 * Math.sin(angle) + Math.cos(angle))
		);
		this.ctx.closePath();

		if(!!strokeColor && !!strokeWidth) {
			this.ctx.strokeStyle = strokeColor;
			this.ctx.lineWidth = strokeWidth;
			this.ctx.stroke();
		}

		if(!!fillColor) {
			this.ctx.fillColor = fillColor;
			this.ctx.fill();
		}
	}
}

export default Canvas;