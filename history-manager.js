class LinearHistoryNode {
	constructor (value) {
		this.value = value;
		this.child = null;
		this.parent = null;
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

export {
	LinearHistoryManager,
	LinearHistoryNode
};
