class LinearHistoryNode {
	constructor (value) {
		this.value = value;
		this.child = null;
		this.parent = null;
	}
}

const ctx = canvas.getContext('2d');
let width = 0;
let height = 0;
let headNode = null;
let leafNode = null;
let currentNode = null;
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
		currentNode = newNode;
		return;
	}

	newNode.parent = currentNode;
	currentNode.child = newNode;
	currentNode = newNode;
	leafNode = newNode;
}

function undo () {
	if (currentNode != headNode) currentNode = currentNode.parent;
	draw();
}

function redo () {
	if (currentNode != leafNode) currentNode = currentNode.child;
	draw();
}

function draw () {
	ctx.clearRect(0, 0, width, height);

	let colsCount = 0;

	while (colsCount * nodeWidth + (colsCount - 1) * gap <= width - padX * 2) {
		colsCount++;
	}

	colsCount--;

	if (colsCount < 1) colsCount = 1;

	let checkNode = headNode;
	let x = 0;
	let y = 0;
	let px = 0;
	let py = 0;
	let dir = true;

	ctx.strokeStyle = '#ffffff';

	ctx.beginPath();

	while (checkNode) {
		if (checkNode !== headNode) {
			ctx.moveTo(px + nodeWidth * 0.5, py + nodeHeight * 0.5);
			ctx.lineTo(x * (nodeWidth + gap) + padX + nodeWidth * 0.5, y * (nodeHeight + gap) + padY + nodeHeight * 0.5);
		}

		ctx.fillStyle = checkNode === currentNode ? '#ff8899' : '#ffffff';
		ctx.fillRect(x * (nodeWidth + gap) + padX, y * (nodeHeight + gap) + padY, nodeWidth, nodeHeight);

		ctx.fillStyle = '#ff00ff';
		ctx.fillText(checkNode.value, x * (nodeWidth + gap) + padX + nodeWidth * 0.1, y * (nodeHeight + gap) + padY + nodeHeight * 0.1);

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

		checkNode = checkNode.child;
	}

	ctx.stroke();
}

function resize () {
	width = window.innerWidth;
	height = window.innerHeight;

	canvas.width = width;
	canvas.height = height;

	ctx.font = `${nodeHeight * 0.8}px Arial`;
	ctx.textBaseline = 'hanging';

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

	undoBtn.addEventListener('click', undo);
	redoBtn.addEventListener('click', redo);
}

init();
