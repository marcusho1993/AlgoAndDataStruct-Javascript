// Doubly Linked List
class Node {
	constructor(val) {
		this.val = val
		this.prev = null
		this.next = null
	}
}

class DoublyLinkedList {
	constructor() {
		this.head = null
		this.tail = null
		this.length = 0
	}

	traverse() {
		let current = this.head
		while (current) {
			console.log(
				`Node Value: ${current.val}\nList Head: ${
					this.head ? this.head.val : undefined
				}\nList Tail: ${this.tail ? this.tail.val : undefined}\nNode Prev: ${
					current.prev ? current.prev.val : null
				}\nNode Next: ${current.next ? current.next.val : null}\nList Length: ${
					this.length
				}`
			)
			current = current.next
		}
	}

	push(val) {
		let newNode = new Node(val)
		if (!this.head || this.length === 0) {
			this.head = newNode
			this.tail = newNode
		} else {
			this.tail.next = newNode
			newNode.prev = this.tail
			this.tail = newNode
		}
		this.length++
		return this
	}

	pop() {
		if (!this.head || this.length === 0) return null

		if (this.length === 1) {
			this.head = null
			this.tail = null
		}

		let oldTail = this.tail
		this.tail = oldTail.prev
		this.tail.next = null
		oldTail.prev = null
		this.length--
		return oldTail
	}

	shift() {
		if (!this.head || this.length === 0) return null

		let oldHead = this.head

		if (this.length === 1) {
			this.head = null
			this.tail = null
		} else {
			this.head = oldHead.next
			this.head.prev = null
			oldHead.next = null
		}

		this.length--
		return oldHead
	}

	unshift(val) {
		let newNode = new Node(val)
		if (!this.head || this.length === 0) {
			this.head = newNode
			this.tail = newNode
		} else {
			let oldHead = this.head
			oldHead.prev = newNode
			newNode.next = oldHead
			this.head = newNode
		}
		this.length++
		return this
	}

	get(index) {
		if (!this.head || this.length === 0) return null
		if (index < 0 || index > this.length) return undefined
		if (index === this.length) return this.tail.next

		let count, current
		if (index <= this.length / 2) {
			count = 0
			current = this.head
			while (count !== index) {
				current = current.next
				count++
			}
		} else {
			count = this.length - 1
			current = this.tail
			while (count !== index) {
				current = current.prev
				count--
			}
		}

		return current
	}

	set(index, val) {
		let node = this.get(index)
		if (node) {
			node.val = val
		}
		return node
	}

	insert(index, val) {
		if (index < 0 || index > this.length) return undefined
		if (index === 0) return this.unshift(val)
		if (index === this.length) return this.push(val)

		let newNode = new Node(val)
		let beforeNode = this.get(index - 1)
		let afterNode = beforeNode.next

		beforeNode.next = newNode
		newNode.prev = beforeNode

		newNode.next = afterNode
		afterNode.prev = newNode

		this.length++
		return this
	}

	remove(index) {
		if (index < 0 || index > this.length) return undefined
		if (index === 0) return this.shift()
		if (index === this.length - 1) return this.pop()

		let removedNode = this.get(index)
		let beforeNode = removedNode.prev
		let afterNode = removedNode.next

		beforeNode.next = afterNode
		afterNode.prev = beforeNode

		removedNode.prev = null
		removedNode.next = null
		this.length--

		return removedNode
	}
}

let list = new DoublyLinkedList()
list.push('a')
list.push('b')
list.push('c')
list.push('d')
list.traverse()

console.log('--------------------------')
// console.log(list.pop())

// list.unshift('b')
// list.unshift('a')

// console.log(list.get(3))

// console.log(list.set(5, 'e'))
list.insert(2, 'e')
list.remove(2)

list.traverse()
console.log(list)
