// Singly Linked List
class Node {
	constructor(val) {
		this.val = val
		this.next = null
	}
}

class SinglyLinkedList {
	constructor() {
		this.head = null
		this.tail = null
		this.length = 0
	}

	push(val) {
		let newNode = new Node(val)
		if (!this.head) {
			this.head = newNode
			this.tail = this.head
		} else {
			this.tail.next = newNode // current tail's next node
			this.tail = newNode // update current tail to be the new Node
		}
		this.length++
		return this
	}

	traverse() {
		let current = this.head
		while (current) {
			console.log(
				`Node Value: ${current.val}\nList Head: ${
					this.head ? this.head.val : undefined
				}\nList Tail: ${this.tail ? this.tail.val : undefined}\nNode Next: ${
					current.next ? current.next.val : null
				}\nList Length: ${this.length}`
			)
			current = current.next
		}
	}

	pop() {
		if (!this.head || this.length === 0) return undefined

		let current = this.head
		let newTail = current
		while (current.next) {
			newTail = current
			current = current.next
		}
		this.tail = newTail
		this.tail.next = null
		this.length--

		if (this.length === 0) {
			this.head = null
			this.tail = null
		}

		return current
	}

	shift() {
		if (!this.head || this.length === 0) return undefined

		let currentHead = this.head
		this.head = currentHead.next
		this.length--

		return currentHead
	}

	unshift(val) {
		let newNode = new Node(val)

		if (!this.head || this.length === 0) {
			this.head = newNode
			this.tail = this.head
		} else {
			newNode.next = this.head
			this.head = newNode
		}
		this.length++
		return this
	}

	get(index) {
		if (index < 0 || index >= this.length) return null
		let counter = 0
		let current = this.head
		while (counter !== index) {
			current = current.next
			counter++
		}
		return current
	}

	set(index, val) {
		this.get(index) ? (this.get(index).val = val) : undefined
	}

	insert(index, val) {
		if (index < 0 || index > this.length) return undefined
		if (index === this.length) return !!this.push(val)
		if (index === 0) return !!this.unshift(val)

		let newNode = new Node(val)
		let prev = this.get(index - 1)
		let temp = prev.next
		prev.next = newNode
		newNode.next = temp
		this.length++
		return true
	}

	remove(index) {
		if (index < 0 || index >= this.length) return undefined
		if (index === this.length - 1) return !!this.pop()
		if (index === 0) return !!this.shift()
		let prev = this.get(index - 1)
		let removedNode = prev.next
		prev.next = removedNode.next
		this.length--
		return removedNode
	}

	reserve() {
		let node = this.head
		this.head = this.tail
		this.tail = node

		let next
		let prev = null
		for (let i = 0; i < this.length; i++) {
			next = node.next
			node.next = prev
			prev = node
			node = next
		}
		return this
	}
}

// Test harness
let list = new SinglyLinkedList()
list.push('a')
list.push('b')
list.push('c')

// list.traverse()

// console.log(list.get(1))
// list.push('d')
// console.log(list.get(list.length - 2))
// console.log(list.get(list.length - 1))
// list.set(10, 'z')
list.insert(3, 'd')
list.insert(4, 'e')

list.reserve()
list.traverse()
