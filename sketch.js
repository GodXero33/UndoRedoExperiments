import { LinearHistoryManager, TreeHistoryManager } from "./history-manager.js";

const historyManager = new TreeHistoryManager('');
console.log(historyManager);

document.getElementById('tree-view-cont').innerHTML = updateTreeView();

function updateTreeView (node = historyManager.head) {
	if (!node) return '';

	const isCurrent = node === historyManager.current;
	let html = `<div class="node${isCurrent ? ' current' : ''}">`;
	html += `<div class="value">${node.value}</div>`;

	for (const child of node.children) html += updateTreeView(child);

	html += `</div>`;
	return html;
}

function change () {
	if (input.value == '') return;

	const change = historyManager.change(input.value);
	input.value = '';

	const html = updateTreeView();
	document.getElementById('tree-view-cont').innerHTML = html;

	input.focus();
	console.log(change);
}

input.addEventListener('keydown', event => {
	if (event.code === 'Enter') change();
});

changeBtn.addEventListener('click', change);

undoBtn.addEventListener('click', () => {
	const change = historyManager.undo();

	document.getElementById('tree-view-cont').innerHTML = updateTreeView();
	console.log(change);
});

redoBtn.addEventListener('click', () => {
	const change = historyManager.redo();

	document.getElementById('tree-view-cont').innerHTML = updateTreeView();
	console.log(change);
});
