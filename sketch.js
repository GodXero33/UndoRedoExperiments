class LinearHistoryNode {
	constructor (value, parent, child) {
		this.value = value;
		this.parent = parent;
		this.child = child;
	}
}

const ctx = canvas.getContext('2d');
let width = 0;
let height = 0;
let headNode = null;
let leafNode = null;
const padX = 50;
const padY = 50;
const gap = 50;
const nodeHeight = 50;
const nodeWidth = 100;

function makeChange (value) {
	const newNode = new LinearHistoryNode(value);

	if (!headNode) {
		headNode = newNode;
		leafNode = newNode;
		return;
	}

	leafNode.child = newNode;
	leafNode = newNode;
}

function draw () {
	ctx.clearRect(0, 0, width, height);

	let colsCount = 0;

	while (colsCount * nodeWidth + (colsCount - 1) * gap <= width - padX * 2) {
		colsCount++;
	}

	colsCount--;

	if (colsCount < 1) colsCount = 1;

	let currentNode = headNode;
	let x = 0;
	let y = 0;
	let px = 0;
	let py = 0;
	let dir = true;

	ctx.fillStyle = '#ffffff';
	ctx.strokeStyle = '#ffffff';

	ctx.beginPath();

	while (currentNode) {
		ctx.fillRect(x * (nodeWidth + gap) + padX, y * (nodeHeight + gap) + padY, nodeWidth, nodeHeight);

		if (currentNode !== headNode) {
			ctx.moveTo(px + nodeWidth * 0.5, py + nodeHeight * 0.5);
			ctx.lineTo(x * (nodeWidth + gap) + padX + nodeWidth * 0.5, y * (nodeHeight + gap) + padY + nodeHeight * 0.5);
		}

		px = x * (nodeWidth + gap) + padX;
		py = y * (nodeHeight + gap) + padY;

		if (dir) {
			x++;

			if (x == colsCount) {
				x = colsCount - 1;
				y++;
				dir = !dir;
			}
		} else {
			x--;

			if (x == -1) {
				x = 0;
				y++;
				dir = !dir;
			}
		}

		currentNode = currentNode.child;
	}

	ctx.stroke();
}

function resize () {
	width = window.innerWidth;
	height = window.innerHeight;

	canvas.width = width;
	canvas.height = height;

	draw();
}

function init () {
	resize();
	window.addEventListener('resize', resize);

	input.addEventListener('keydown', event => {
		if (event.code === 'Enter' && input.value !== '') {
			makeChange(input.value);
			draw();

			input.value = '';
		}
	});
}

init();
