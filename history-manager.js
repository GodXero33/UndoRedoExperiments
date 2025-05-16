class LinearHistoryNode {
	constructor (value) {
		this.value = value;
		this.child = null;
		this.parent = null;
	}
}

class TreeHistoryNode {
	constructor (value) {
		this.value = value;
		this.children = [];
		this.parent = null;
		this.currentIndex = -1;
	}
}

class LinearHistoryManager {
	constructor (defaultValue) {
		const defaultNode = new LinearHistoryNode(defaultValue);

		this.head = defaultNode;
		this.leaf = defaultNode;
		this.current = defaultNode;
	}

	change (value) {
		const newNode = new LinearHistoryNode(value);

		if (!this.head) {
			this.head = newNode;
			this.leaf = newNode;
			this.current = newNode;

			return newNode.value;
		}

		newNode.parent = this.current;
		this.current.child = newNode;
		this.current = newNode;
		this.leaf = newNode;

		return newNode.value;
	}

	undo () {
		if (this.current != this.head) this.current = this.current.parent;
		return this.current ? this.current.value : null;
	}

	redo () {
		if (this.current != this.leaf) this.current = this.current.child;
		return this.current ? this.current.value : null;
	}
}

class TreeHistoryManager {
	constructor (defaultValue) {
		const defaultNode = new TreeHistoryNode(defaultValue);

		this.head = defaultNode;
		this.current = defaultNode;
	}

	change (value) {
		const newNode = new TreeHistoryNode(value);

		if (!this.head) {
			this.head = newNode;
			this.current = newNode;

			return newNode.value;
		}

		newNode.parent = this.current;

		this.current.children.push(newNode);

		this.current.currentIndex = this.current.children.length - 1;
		this.current = newNode;

		return newNode.value;
	}

	undo () {
		if (this.current != this.head) this.current = this.current.parent;
		return this.current ? this.current.value : null;
	}

	redo () {
		if (this.current.children[this.current.currentIndex]) this.current = this.current.children[this.current.currentIndex];
		return this.current ? this.current.value : null;
	}
}

export {
	LinearHistoryManager,
	LinearHistoryNode,
	TreeHistoryManager,
	TreeHistoryNode
};
