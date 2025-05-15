import { LinearHistoryManager } from "./history-manager.js";

const historyManager = new LinearHistoryManager('');
console.log(historyManager);
updateTreeView();

function updateTreeView () {
	let cur = historyManager.head;
	let html = '';
	let nodeCount = 0;

	while (cur) {
		html += `<div class="node${cur === historyManager.current ? ' current' : ''}"><div class="value">${cur.value}</div>`;
		nodeCount++;
		cur = cur.child;
	}

	html += '</div>'.repeat(nodeCount);
	document.getElementById('tree-view-cont').innerHTML = html;
}

function change () {
	if (input.value == '') return;

	const change = historyManager.change(input.value);
	input.value = '';

	updateTreeView();
	input.focus();
	console.log(change);
}

input.addEventListener('keydown', event => {
	if (event.code === 'Enter') change();
});

changeBtn.addEventListener('click', change);

undoBtn.addEventListener('click', () => {
	const change = historyManager.undo();

	updateTreeView();
	console.log(change);
});

redoBtn.addEventListener('click', () => {
	const change = historyManager.redo();

	updateTreeView();
	console.log(change);
});
