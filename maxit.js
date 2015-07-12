var ctx;
var rndCur = 0;
var w = 300;
var h = 250;

var game = {
	size: 4,
	left: 15,
	curx: 0,
	cury: 0,
	field: [],
	score: 0
	
};
var inp = document.getElementById('input');

function rnd() {
	rndCur = parseFloat('0.' + Math.sin(rndCur + .314159).toString().substr(6));
	return rndCur;
}

function rndInt(n) {
	return Math.floor(rnd() * n); 
}

function init() {
	var canvas = document.getElementById('demo');
	window.ctx = canvas.getContext('2d');
	initGame();
	draw();
}

function initGame() {
	game.size = 4;
	game.left = game.size * game.size - 1;
	game.score = 0;
	game.field = [];
	for (var i = 0; i != game.size; i++) {
		var row = [];
		for (var j = 0; j != game.size; j++) {
			row.push((rndInt(game.size * 2) + 1) * (1 - 2 * rndInt(2)));
		}
		game.field.push(row);
	}
	game.curx = 0;
	game.cury = 0;
	game.field[game.cury][game.curx] = 0;
}

function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "#F00";
    ctx.font = "20pt Arial";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	var ystep = h / (game.size + 1);
	var xstep = w / (game.size + 1);
    for (var y = 0; y != game.size; y++) {
		var cy = ystep * (y + 1);
		for (var x = 0; x != game.size; x++) {
			var val = game.field[y][x];
			var cx = xstep * (x + 1);
			if (val > 0) {
				ctx.fillStyle = "#F00";
			} else if (0 > val) {
				ctx.fillStyle = "#22F";
			} else {
				if (x != game.curx || y != game.cury) {
					ctx.fillStyle = "#0C0";
				} else {
					ctx.fillStyle = "#FF0";
					ctx.lineWidth = 3;
					if (game.left % 2 == 1) {
						ctx.strokeStyle = "#F55";
						ctx.strokeRect(xstep / 2, cy - ystep / 2, w - xstep, ystep);
					} else {
						ctx.strokeStyle = "#77F";
						ctx.strokeRect(cx - xstep / 2, ystep / 2, xstep, h - ystep);
					}
				}
				ctx.beginPath();
				ctx.arc(cx, cy, 12, 0, Math.PI * 2, false);
				ctx.closePath();
				ctx.fill();
				continue;
			}
			ctx.fillText(game.field[y][x], cx, cy);
		}
	}
	ctx.textAlign = "right";
	ctx.textBaseline = "bottom";
	ctx.font = "10px Arial";
	ctx.fillStyle = "#CCC";
	ctx.fillText('Score: ' + game.score, w - 5, h - 5);
}

function clickMove(event) {
	var cx = event.offsetX - 5;
	var cy = event.offsetY - 5;
	var stepx = w / (game.size + 1);
	var stepy = h / (game.size + 1);
	var x = Math.round(cx / stepx) - 1;
	var y = Math.round(cy / stepy) - 1;
	if (0 > x || x >= game.size || 0 > y || y >= game.size) {
		return;
	}
	if (game.left % 2 == 0) {
		if (x != game.curx) {
			return;
		}
	} else {
		if (y != game.cury) {
			return;
		}
	}
	var val = game.field[y][x];
	if (val == 0) {
		return;
	}
	game.score += (game.left % 2 == 1) ? val : -val;
	game.field[y][x] = 0;
	game.curx = x;
	game.cury = y;
	game.left--;
	draw();
	if (game.left == 0) {
		alert('Game ended with score: ' + game.score);
	}
}

function setvals() {
	var v = document.getElementById('input').value;
	rndCur = (Number.isNaN(v)) ? 0 : v;
	initGame();
	draw();
}

init();
