import { VisualizerConfig } from '../types';

export const TOPIC_VISUALIZERS: Record<string, VisualizerConfig> = {
  'linked-list': {
    type: 'linked-list',
    operations: [
      {
        id: 'reverse-list',
        name: 'Reverse List (3 Pointers)',
        description: 'Invert pointer orientations in-place using prev, curr, and nextTemp references.',
        complexity: 'Time: O(n) | Space: O(1)',
        codeSnippet: `let prev = null;
let curr = head;
while (curr !== null) {
  let nextTemp = curr.next; // 1. Save upcoming node
  curr.next = prev;         // 2. Reverse current pointer
  prev = curr;              // 3. Move prev forward
  curr = nextTemp;          // 4. Move curr forward
}
return prev; // New head`,
        steps: [
          {
            stepIndex: 0,
            title: 'Initial State',
            description: 'Initialize prev = NULL and curr = HEAD (Node 1). The list initially points forward: 1 -> 2 -> 3 -> 4 -> NULL.',
            codeLineHighlight: 1,
            pointers: { prev: 'NULL', curr: '1', next: null },
            listNodes: [
              { id: '1', value: 1, nextId: '2', isCurrent: true, isHead: true },
              { id: '2', value: 2, nextId: '3' },
              { id: '3', value: 3, nextId: '4' },
              { id: '4', value: 4, nextId: null }
            ],
            stats: { 'Nodes Visited': 0, 'Pointer Inversions': 0 }
          },
          {
            stepIndex: 1,
            title: 'Step 1: Save nextTemp (Node 2)',
            description: 'Before breaking the pointer from Node 1, store nextTemp = curr.next (Node 2) so we do not lose access to the remaining list.',
            codeLineHighlight: 4,
            pointers: { prev: 'NULL', curr: '1', next: '2' },
            listNodes: [
              { id: '1', value: 1, nextId: '2', isCurrent: true, isHead: true },
              { id: '2', value: 2, nextId: '3', isNext: true },
              { id: '3', value: 3, nextId: '4' },
              { id: '4', value: 4, nextId: null }
            ],
            stats: { 'Nodes Visited': 1, 'Pointer Inversions': 0 }
          },
          {
            stepIndex: 2,
            title: 'Step 2: Reverse Node 1 -> NULL',
            description: 'Reassign curr.next = prev. Node 1 now points to NULL (becoming the new tail of the reversed list).',
            codeLineHighlight: 5,
            pointers: { prev: 'NULL', curr: '1', next: '2' },
            listNodes: [
              { id: '1', value: 1, nextId: null, isCurrent: true },
              { id: '2', value: 2, nextId: '3', isNext: true },
              { id: '3', value: 3, nextId: '4' },
              { id: '4', value: 4, nextId: null }
            ],
            stats: { 'Nodes Visited': 1, 'Pointer Inversions': 1 }
          },
          {
            stepIndex: 3,
            title: 'Step 3: Advance prev and curr to Node 2',
            description: 'Slide prev = curr (prev is now Node 1) and curr = nextTemp (curr is now Node 2). Prepare for the next node.',
            codeLineHighlight: 6,
            pointers: { prev: '1', curr: '2', next: null },
            listNodes: [
              { id: '1', value: 1, nextId: null, isPrev: true },
              { id: '2', value: 2, nextId: '3', isCurrent: true },
              { id: '3', value: 3, nextId: '4' },
              { id: '4', value: 4, nextId: null }
            ],
            stats: { 'Nodes Visited': 2, 'Pointer Inversions': 1 }
          },
          {
            stepIndex: 4,
            title: 'Step 4: Save nextTemp (Node 3) & Invert Node 2 -> Node 1',
            description: 'Save nextTemp = Node 3. Point Node 2 back to Node 1 (curr.next = prev). Now: 2 -> 1 -> NULL.',
            codeLineHighlight: 5,
            pointers: { prev: '1', curr: '2', next: '3' },
            listNodes: [
              { id: '2', value: 2, nextId: '1', isCurrent: true },
              { id: '1', value: 1, nextId: null, isPrev: true },
              { id: '3', value: 3, nextId: '4', isNext: true },
              { id: '4', value: 4, nextId: null }
            ],
            stats: { 'Nodes Visited': 2, 'Pointer Inversions': 2 }
          },
          {
            stepIndex: 5,
            title: 'Step 5: Advance pointers to Node 3',
            description: 'Set prev = Node 2 and curr = Node 3. Save nextTemp = Node 4. Invert pointer: Node 3 now points to Node 2.',
            codeLineHighlight: 5,
            pointers: { prev: '2', curr: '3', next: '4' },
            listNodes: [
              { id: '3', value: 3, nextId: '2', isCurrent: true },
              { id: '2', value: 2, nextId: '1', isPrev: true },
              { id: '1', value: 1, nextId: null },
              { id: '4', value: 4, nextId: null, isNext: true }
            ],
            stats: { 'Nodes Visited': 3, 'Pointer Inversions': 3 }
          },
          {
            stepIndex: 6,
            title: 'Step 6: Advance pointers to Node 4 (Last Node)',
            description: 'Set prev = Node 3 and curr = Node 4. Save nextTemp = NULL. Invert pointer: Node 4 now points to Node 3.',
            codeLineHighlight: 5,
            pointers: { prev: '3', curr: '4', next: 'NULL' },
            listNodes: [
              { id: '4', value: 4, nextId: '3', isCurrent: true },
              { id: '3', value: 3, nextId: '2', isPrev: true },
              { id: '2', value: 2, nextId: '1' },
              { id: '1', value: 1, nextId: null }
            ],
            stats: { 'Nodes Visited': 4, 'Pointer Inversions': 4 }
          },
          {
            stepIndex: 7,
            title: 'Completed: Return prev (New Head: Node 4)',
            description: 'curr advances to NULL. Loop terminates! prev points to Node 4, which is the head of the reversed list: 4 -> 3 -> 2 -> 1 -> NULL.',
            codeLineHighlight: 9,
            pointers: { prev: '4 (New Head)', curr: 'NULL', next: null },
            listNodes: [
              { id: '4', value: 4, nextId: '3', isPrev: true, isHead: true },
              { id: '3', value: 3, nextId: '2' },
              { id: '2', value: 2, nextId: '1' },
              { id: '1', value: 1, nextId: null }
            ],
            stats: { 'Nodes Visited': 4, 'Pointer Inversions': 4, 'Result': 'Fully Reversed' }
          }
        ]
      },
      {
        id: 'prepend-node',
        name: 'Prepend Node at Head',
        description: 'Insert a new node at the beginning in constant O(1) time without shifting elements.',
        complexity: 'Time: O(1) | Space: O(1)',
        codeSnippet: `const newNode = new ListNode(val, this.head);
this.head = newNode;
this.size++;`,
        steps: [
          {
            stepIndex: 0,
            title: 'Existing List: 10 -> 20 -> 30',
            description: 'Current head points to Node 10. We want to insert value 5 at the front.',
            codeLineHighlight: 1,
            pointers: { head: '10' },
            listNodes: [
              { id: '10', value: 10, nextId: '20', isHead: true },
              { id: '20', value: 20, nextId: '30' },
              { id: '30', value: 30, nextId: null }
            ]
          },
          {
            stepIndex: 1,
            title: 'Allocate New Node 5 pointing to Old Head',
            description: 'Create newNode with value 5 and set its next pointer directly to current head (Node 10).',
            codeLineHighlight: 1,
            pointers: { head: '10', curr: '5 (New)' },
            listNodes: [
              { id: '5', value: 5, nextId: '10', isCurrent: true },
              { id: '10', value: 10, nextId: '20', isHead: true },
              { id: '20', value: 20, nextId: '30' },
              { id: '30', value: 30, nextId: null }
            ]
          },
          {
            stepIndex: 2,
            title: 'Update Head Reference to Node 5',
            description: 'Reassign this.head = newNode. Node 5 is now the new official head! Done in O(1) time.',
            codeLineHighlight: 2,
            pointers: { head: '5' },
            listNodes: [
              { id: '5', value: 5, nextId: '10', isHead: true },
              { id: '10', value: 10, nextId: '20' },
              { id: '20', value: 20, nextId: '30' },
              { id: '30', value: 30, nextId: null }
            ]
          }
        ]
      }
    ]
  },
  'arrays': {
    type: 'array',
    operations: [
      {
        id: 'two-sum-sorted',
        name: 'Two Pointers Convergence (Target = 9)',
        description: 'Converge inward from left and right boundaries on sorted array [2, 7, 11, 15].',
        complexity: 'Time: O(n) | Space: O(1)',
        codeSnippet: `let left = 0, right = nums.length - 1;
while (left < right) {
  const sum = nums[left] + nums[right];
  if (sum === target) return [left + 1, right + 1];
  else if (sum < target) left++;
  else right--;
}`,
        steps: [
          {
            stepIndex: 0,
            title: 'Initialize Boundaries: left = 0, right = 3',
            description: 'Left points to index 0 (val = 2), right points to index 3 (val = 15). Target = 9.',
            codeLineHighlight: 1,
            pointers: { left: 0, right: 3 },
            arrayElements: [
              { index: 0, value: 2, state: 'active' },
              { index: 1, value: 7, state: 'default' },
              { index: 2, value: 11, state: 'default' },
              { index: 3, value: 15, state: 'active' }
            ],
            stats: { 'Current Sum': '2 + 15 = 17', 'Comparison': '17 > 9 (Too Large)' }
          },
          {
            stepIndex: 1,
            title: 'Sum (17) > Target (9) -> Decrement Right',
            description: 'Since 17 is greater than target 9, decrement right to 2 (val = 11) to reduce the sum.',
            codeLineHighlight: 6,
            pointers: { left: 0, right: 2 },
            arrayElements: [
              { index: 0, value: 2, state: 'active' },
              { index: 1, value: 7, state: 'default' },
              { index: 2, value: 11, state: 'active' },
              { index: 3, value: 15, state: 'discarded' }
            ],
            stats: { 'Current Sum': '2 + 11 = 13', 'Comparison': '13 > 9 (Still Too Large)' }
          },
          {
            stepIndex: 2,
            title: 'Sum (13) > Target (9) -> Decrement Right Again',
            description: '13 is still greater than 9, so decrement right to 1 (val = 7).',
            codeLineHighlight: 6,
            pointers: { left: 0, right: 1 },
            arrayElements: [
              { index: 0, value: 2, state: 'active' },
              { index: 1, value: 7, state: 'active' },
              { index: 2, value: 11, state: 'discarded' },
              { index: 3, value: 15, state: 'discarded' }
            ],
            stats: { 'Current Sum': '2 + 7 = 9', 'Comparison': '9 === 9 (Match Found!)' }
          },
          {
            stepIndex: 3,
            title: 'Match Found! Return 1-based indices [1, 2]',
            description: 'nums[0] + nums[1] = 2 + 7 = 9. Return [1, 2] in 1-indexed format. Found in just 3 checks instead of 16 brute force comparisons!',
            codeLineHighlight: 4,
            pointers: { left: 0, right: 1 },
            arrayElements: [
              { index: 0, value: 2, state: 'matched' },
              { index: 1, value: 7, state: 'matched' },
              { index: 2, value: 11, state: 'discarded' },
              { index: 3, value: 15, state: 'discarded' }
            ],
            stats: { 'Result': 'Indices [1, 2]', 'Status': 'Accepted' }
          }
        ]
      }
    ]
  },
  'stacks': {
    type: 'stack',
    operations: [
      {
        id: 'valid-parentheses',
        name: 'Valid Parentheses: "({[]})"',
        description: 'Verify bracket matching using Last-In-First-Out (LIFO) stack evaluation.',
        complexity: 'Time: O(n) | Space: O(n)',
        codeSnippet: `for (let char of s) {
  if (pairs[char]) {
    if (stack.pop() !== pairs[char]) return false;
  } else {
    stack.push(char);
  }
}
return stack.length === 0;`,
        steps: [
          {
            stepIndex: 0,
            title: 'Read "(" -> Push to Stack',
            description: 'First character is open parenthesis "(". Push onto stack.',
            codeLineHighlight: 5,
            pointers: { curr: '"("' },
            stackElements: [
              { value: '(', state: 'push' }
            ],
            stats: { 'Stack Size': 1, 'Top Element': '(' }
          },
          {
            stepIndex: 1,
            title: 'Read "{" -> Push to Stack',
            description: 'Second character is "{". Push onto stack above "(".',
            codeLineHighlight: 5,
            pointers: { curr: '"{"' },
            stackElements: [
              { value: '(', state: 'default' },
              { value: '{', state: 'push' }
            ],
            stats: { 'Stack Size': 2, 'Top Element': '{' }
          },
          {
            stepIndex: 2,
            title: 'Read "[" -> Push to Stack',
            description: 'Third character is "[". Push onto stack above "{".',
            codeLineHighlight: 5,
            pointers: { curr: '"["' },
            stackElements: [
              { value: '(', state: 'default' },
              { value: '{', state: 'default' },
              { value: '[', state: 'push' }
            ],
            stats: { 'Stack Size': 3, 'Top Element': '[' }
          },
          {
            stepIndex: 3,
            title: 'Read "]" -> Match and Pop "["',
            description: 'Closing bracket "]" matches top of stack "[". Pop "[" successfully!',
            codeLineHighlight: 3,
            pointers: { curr: '"]"' },
            stackElements: [
              { value: '(', state: 'default' },
              { value: '{', state: 'default' }
            ],
            stats: { 'Stack Size': 2, 'Popped': '[', 'Match': 'Valid Pair' }
          },
          {
            stepIndex: 4,
            title: 'Read "}" -> Match and Pop "{"',
            description: 'Closing bracket "}" matches top of stack "{". Pop "{" successfully!',
            codeLineHighlight: 3,
            pointers: { curr: '"}"' },
            stackElements: [
              { value: '(', state: 'default' }
            ],
            stats: { 'Stack Size': 1, 'Popped': '{', 'Match': 'Valid Pair' }
          },
          {
            stepIndex: 5,
            title: 'Read ")" -> Match and Pop "("',
            description: 'Closing bracket ")" matches remaining "(". Pop "(". Stack is now empty!',
            codeLineHighlight: 3,
            pointers: { curr: '")"' },
            stackElements: [],
            stats: { 'Stack Size': 0, 'Popped': '(', 'Match': 'Valid Pair' }
          },
          {
            stepIndex: 6,
            title: 'Stack Empty -> Return true',
            description: 'All opening brackets were properly closed in reverse order. Output is true!',
            codeLineHighlight: 7,
            pointers: { curr: 'EOF' },
            stackElements: [],
            stats: { 'Result': 'Valid Parentheses (true)', 'Status': 'Optimal' }
          }
        ]
      }
    ]
  },
  'queues': {
    type: 'queue',
    operations: [
      {
        id: 'circular-queue',
        name: 'Circular Queue (k = 5)',
        description: 'Demonstrate FIFO enqueue and dequeue with modulo pointer arithmetic.',
        complexity: 'Time: O(1) for both | Space: O(k)',
        codeSnippet: `enQueue(val) {
  this.queue[this.tail] = val;
  this.tail = (this.tail + 1) % capacity;
}
deQueue() {
  this.head = (this.head + 1) % capacity;
}`,
        steps: [
          {
            stepIndex: 0,
            title: 'Empty Queue: Head = 0, Tail = 0',
            description: 'Ring buffer initialized with 5 slots. Both head and tail point to index 0.',
            codeLineHighlight: 1,
            pointers: { head: 0, tail: 0 },
            queueElements: [
              { index: 0, value: '-', isEmptySlot: true, isHead: true, isTail: true },
              { index: 1, value: '-', isEmptySlot: true },
              { index: 2, value: '-', isEmptySlot: true },
              { index: 3, value: '-', isEmptySlot: true },
              { index: 4, value: '-', isEmptySlot: true }
            ],
            stats: { 'Capacity': 5, 'Size': 0, 'Head Index': 0, 'Tail Index': 0 }
          },
          {
            stepIndex: 1,
            title: 'enQueue(10), enQueue(20), enQueue(30)',
            description: 'Enqueue items at tail position and increment tail modulo 5. Tail advances to index 3.',
            codeLineHighlight: 2,
            pointers: { head: 0, tail: 3 },
            queueElements: [
              { index: 0, value: 10, isHead: true },
              { index: 1, value: 20 },
              { index: 2, value: 30 },
              { index: 3, value: '-', isEmptySlot: true, isTail: true },
              { index: 4, value: '-', isEmptySlot: true }
            ],
            stats: { 'Capacity': 5, 'Size': 3, 'Head Index': 0, 'Tail Index': 3 }
          },
          {
            stepIndex: 2,
            title: 'deQueue() -> Removes 10 from Head',
            description: 'First-In-First-Out: Dequeue removes value 10 at head (index 0). Head pointer moves to index 1.',
            codeLineHighlight: 6,
            pointers: { head: 1, tail: 3 },
            queueElements: [
              { index: 0, value: '-', isEmptySlot: true },
              { index: 1, value: 20, isHead: true },
              { index: 2, value: 30 },
              { index: 3, value: '-', isEmptySlot: true, isTail: true },
              { index: 4, value: '-', isEmptySlot: true }
            ],
            stats: { 'Capacity': 5, 'Size': 2, 'Removed Item': 10, 'Head Index': 1 }
          },
          {
            stepIndex: 3,
            title: 'enQueue(40), enQueue(50), enQueue(60) [Wraparound!]',
            description: 'Tail wraps around the end of the array using (tail + 1) % 5, landing back at index 0 without reallocating!',
            codeLineHighlight: 3,
            pointers: { head: 1, tail: 1 },
            queueElements: [
              { index: 0, value: 60 },
              { index: 1, value: 20, isHead: true },
              { index: 2, value: 30 },
              { index: 3, value: 40 },
              { index: 4, value: 50 }
            ],
            stats: { 'Capacity': 5, 'Size': 5, 'Status': 'Queue is Full' }
          }
        ]
      }
    ]
  },
  'trees': {
    type: 'tree',
    operations: [
      {
        id: 'inorder-traversal',
        name: 'In-Order Traversal (Left -> Root -> Right)',
        description: 'Yields BST values in sorted ascending order: [2, 5, 7, 10, 15].',
        complexity: 'Time: O(n) | Space: O(h)',
        codeSnippet: `function inOrder(node) {
  if (!node) return;
  inOrder(node.left);  // 1. Visit Left
  visit(node.val);     // 2. Process Current
  inOrder(node.right); // 3. Visit Right
}`,
        steps: [
          {
            stepIndex: 0,
            title: 'Start at Root (10)',
            description: 'Recursion begins at root node 10. In-order mandates visiting left subtree first.',
            codeLineHighlight: 3,
            pointers: { curr: 10 },
            treeNodes: [
              { id: '10', value: 10, leftId: '5', rightId: '15', x: 50, y: 15, state: 'current' },
              { id: '5', value: 5, leftId: '2', rightId: '7', x: 25, y: 45, state: 'default' },
              { id: '15', value: 15, x: 75, y: 45, state: 'default' },
              { id: '2', value: 2, x: 12, y: 80, state: 'default' },
              { id: '7', value: 7, x: 38, y: 80, state: 'default' }
            ],
            stats: { 'Sorted Output': '[]' }
          },
          {
            stepIndex: 1,
            title: 'Descend to Leftmost Leaf (Node 2)',
            description: 'Recurse into node 5, then into node 2. Node 2 has no left child, so emit value 2!',
            codeLineHighlight: 4,
            pointers: { curr: 2 },
            treeNodes: [
              { id: '10', value: 10, leftId: '5', rightId: '15', x: 50, y: 15, state: 'visiting' },
              { id: '5', value: 5, leftId: '2', rightId: '7', x: 25, y: 45, state: 'visiting' },
              { id: '15', value: 15, x: 75, y: 45, state: 'default' },
              { id: '2', value: 2, x: 12, y: 80, state: 'current' },
              { id: '7', value: 7, x: 38, y: 80, state: 'default' }
            ],
            stats: { 'Sorted Output': '[2]' }
          },
          {
            stepIndex: 2,
            title: 'Backtrack to Parent (Node 5)',
            description: 'Left child finished. Process current node 5 and add to output sequence.',
            codeLineHighlight: 4,
            pointers: { curr: 5 },
            treeNodes: [
              { id: '10', value: 10, leftId: '5', rightId: '15', x: 50, y: 15, state: 'visiting' },
              { id: '5', value: 5, leftId: '2', rightId: '7', x: 25, y: 45, state: 'current' },
              { id: '15', value: 15, x: 75, y: 45, state: 'default' },
              { id: '2', value: 2, x: 12, y: 80, state: 'visited' },
              { id: '7', value: 7, x: 38, y: 80, state: 'default' }
            ],
            stats: { 'Sorted Output': '[2, 5]' }
          },
          {
            stepIndex: 3,
            title: 'Visit Right Child of 5 (Node 7)',
            description: 'Recurse into node 7. Node 7 is a leaf, so emit value 7.',
            codeLineHighlight: 4,
            pointers: { curr: 7 },
            treeNodes: [
              { id: '10', value: 10, leftId: '5', rightId: '15', x: 50, y: 15, state: 'visiting' },
              { id: '5', value: 5, leftId: '2', rightId: '7', x: 25, y: 45, state: 'visited' },
              { id: '15', value: 15, x: 75, y: 45, state: 'default' },
              { id: '2', value: 2, x: 12, y: 80, state: 'visited' },
              { id: '7', value: 7, x: 38, y: 80, state: 'current' }
            ],
            stats: { 'Sorted Output': '[2, 5, 7]' }
          },
          {
            stepIndex: 4,
            title: 'Backtrack to Root (Node 10)',
            description: 'Entire left subtree is completed. Now process root node 10 and add to output!',
            codeLineHighlight: 4,
            pointers: { curr: 10 },
            treeNodes: [
              { id: '10', value: 10, leftId: '5', rightId: '15', x: 50, y: 15, state: 'current' },
              { id: '5', value: 5, leftId: '2', rightId: '7', x: 25, y: 45, state: 'visited' },
              { id: '15', value: 15, x: 75, y: 45, state: 'default' },
              { id: '2', value: 2, x: 12, y: 80, state: 'visited' },
              { id: '7', value: 7, x: 38, y: 80, state: 'visited' }
            ],
            stats: { 'Sorted Output': '[2, 5, 7, 10]' }
          },
          {
            stepIndex: 5,
            title: 'Visit Right Subtree (Node 15) -> Done!',
            description: 'Recurse into node 15. In-order traversal produces guaranteed ascending order: 2, 5, 7, 10, 15.',
            codeLineHighlight: 5,
            pointers: { curr: 15 },
            treeNodes: [
              { id: '10', value: 10, leftId: '5', rightId: '15', x: 50, y: 15, state: 'visited' },
              { id: '5', value: 5, leftId: '2', rightId: '7', x: 25, y: 45, state: 'visited' },
              { id: '15', value: 15, x: 75, y: 45, state: 'current' },
              { id: '2', value: 2, x: 12, y: 80, state: 'visited' },
              { id: '7', value: 7, x: 38, y: 80, state: 'visited' }
            ],
            stats: { 'Sorted Output': '[2, 5, 7, 10, 15]', 'Verification': 'Sorted BST' }
          }
        ]
      }
    ]
  },
  'graphs': {
    type: 'graph',
    operations: [
      {
        id: 'number-of-islands-dfs',
        name: 'Number of Islands (Grid DFS Flood Fill)',
        description: 'Sink connected land cells ("1") using Depth-First Search in 2D grid.',
        complexity: 'Time: O(M * N) | Space: O(M * N)',
        codeSnippet: `if (grid[r][c] === '1') {
  islandCount++;
  dfs(r, c); // Sink adjacent '1's into '0's
}`,
        steps: [
          {
            stepIndex: 0,
            title: 'Initial 3x3 Grid with 2 Distinct Islands',
            description: 'Grid has land ("1") and water ("0"). We scan row by row from top-left (0, 0).',
            codeLineHighlight: 1,
            gridCells: [
              [{ value: '1', state: 'land' }, { value: '1', state: 'land' }, { value: '0', state: 'water' }],
              [{ value: '1', state: 'land' }, { value: '0', state: 'water' }, { value: '0', state: 'water' }],
              [{ value: '0', state: 'water' }, { value: '0', state: 'water' }, { value: '1', state: 'land' }]
            ],
            stats: { 'Islands Discovered': 0, 'Scanning Cell': '(0, 0)' }
          },
          {
            stepIndex: 1,
            title: 'Found Land at (0, 0) -> Start Island #1',
            description: 'Encountered "1" at (0, 0). Increment count = 1. Launch DFS to sink all connected land neighbors.',
            codeLineHighlight: 2,
            gridCells: [
              [{ value: '1', state: 'visiting' }, { value: '1', state: 'land' }, { value: '0', state: 'water' }],
              [{ value: '1', state: 'land' }, { value: '0', state: 'water' }, { value: '0', state: 'water' }],
              [{ value: '0', state: 'water' }, { value: '0', state: 'water' }, { value: '1', state: 'land' }]
            ],
            stats: { 'Islands Discovered': 1, 'DFS Depth': 1 }
          },
          {
            stepIndex: 2,
            title: 'DFS Sinks Connected Neighbors of Island #1',
            description: 'Cells (0, 1) and (1, 0) are connected. Mark them visited so they are not recounted.',
            codeLineHighlight: 3,
            gridCells: [
              [{ value: '0', state: 'visited_island' }, { value: '0', state: 'visited_island' }, { value: '0', state: 'water' }],
              [{ value: '0', state: 'visited_island' }, { value: '0', state: 'water' }, { value: '0', state: 'water' }],
              [{ value: '0', state: 'water' }, { value: '0', state: 'water' }, { value: '1', state: 'land' }]
            ],
            stats: { 'Islands Discovered': 1, 'Status': 'Island #1 Fully Explored' }
          },
          {
            stepIndex: 3,
            title: 'Scan reaches (2, 2) -> Discover Island #2!',
            description: 'Scanning reaches bottom-right cell (2, 2) which is "1". Increment count = 2.',
            codeLineHighlight: 2,
            gridCells: [
              [{ value: '0', state: 'visited_island' }, { value: '0', state: 'visited_island' }, { value: '0', state: 'water' }],
              [{ value: '0', state: 'visited_island' }, { value: '0', state: 'water' }, { value: '0', state: 'water' }],
              [{ value: '0', state: 'water' }, { value: '0', state: 'water' }, { value: '1', state: 'visiting' }]
            ],
            stats: { 'Islands Discovered': 2, 'Status': 'Island #2 Found' }
          },
          {
            stepIndex: 4,
            title: 'Grid Traversal Complete: Return 2',
            description: 'Entire grid scanned. Exactly 2 disjoint island components found in O(M * N) single pass.',
            codeLineHighlight: 1,
            gridCells: [
              [{ value: '0', state: 'visited_island' }, { value: '0', state: 'visited_island' }, { value: '0', state: 'water' }],
              [{ value: '0', state: 'visited_island' }, { value: '0', state: 'water' }, { value: '0', state: 'water' }],
              [{ value: '0', state: 'water' }, { value: '0', state: 'water' }, { value: '0', state: 'visited_island' }]
            ],
            stats: { 'Total Islands': 2, 'Result': 'Completed' }
          }
        ]
      }
    ]
  },
  'dynamic-programming': {
    type: 'dp',
    operations: [
      {
        id: 'climbing-stairs-tabulation',
        name: 'Climbing Stairs DP Tabulation (n = 5)',
        description: 'Fill dp table iteratively using dp[i] = dp[i-1] + dp[i-2].',
        complexity: 'Time: O(n) | Space: O(1) space optimized',
        codeSnippet: `dp[1] = 1; dp[2] = 2;
for (let i = 3; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}`,
        steps: [
          {
            stepIndex: 0,
            title: 'Base Cases: dp[1] = 1, dp[2] = 2',
            description: 'For 1 step: 1 way (1). For 2 steps: 2 ways (1+1, 2).',
            codeLineHighlight: 1,
            dpTable: [
              { index: 1, label: 'dp[1]', value: 1, state: 'base', formula: 'Base Case' },
              { index: 2, label: 'dp[2]', value: 2, state: 'base', formula: 'Base Case' },
              { index: 3, label: 'dp[3]', value: '?', state: 'empty' },
              { index: 4, label: 'dp[4]', value: '?', state: 'empty' },
              { index: 5, label: 'dp[5]', value: '?', state: 'empty' }
            ],
            stats: { 'Current Subproblem': 'i = 3', 'Formula': 'dp[3] = dp[2] + dp[1]' }
          },
          {
            stepIndex: 1,
            title: 'Compute dp[3] = dp[2] + dp[1] = 2 + 1 = 3',
            description: 'Ways to reach step 3 equals ways to reach step 2 plus ways to reach step 1.',
            codeLineHighlight: 3,
            dpTable: [
              { index: 1, label: 'dp[1]', value: 1, state: 'computed' },
              { index: 2, label: 'dp[2]', value: 2, state: 'computed' },
              { index: 3, label: 'dp[3]', value: 3, state: 'current', formula: '2 + 1 = 3' },
              { index: 4, label: 'dp[4]', value: '?', state: 'empty' },
              { index: 5, label: 'dp[5]', value: '?', state: 'empty' }
            ],
            stats: { 'Current Subproblem': 'i = 4', 'Ways to step 3': 3 }
          },
          {
            stepIndex: 2,
            title: 'Compute dp[4] = dp[3] + dp[2] = 3 + 2 = 5',
            description: 'Ways to reach step 4 equals 5 distinct combinations.',
            codeLineHighlight: 3,
            dpTable: [
              { index: 1, label: 'dp[1]', value: 1, state: 'computed' },
              { index: 2, label: 'dp[2]', value: 2, state: 'computed' },
              { index: 3, label: 'dp[3]', value: 3, state: 'computed' },
              { index: 4, label: 'dp[4]', value: 5, state: 'current', formula: '3 + 2 = 5' },
              { index: 5, label: 'dp[5]', value: '?', state: 'empty' }
            ],
            stats: { 'Current Subproblem': 'i = 5', 'Ways to step 4': 5 }
          },
          {
            stepIndex: 3,
            title: 'Compute dp[5] = dp[4] + dp[3] = 5 + 3 = 8 (Final Answer)',
            description: 'Total distinct ways to climb 5 stairs is 8. Calculated in linear O(n) without exponential 2^n recursion tree!',
            codeLineHighlight: 3,
            dpTable: [
              { index: 1, label: 'dp[1]', value: 1, state: 'computed' },
              { index: 2, label: 'dp[2]', value: 2, state: 'computed' },
              { index: 3, label: 'dp[3]', value: 3, state: 'computed' },
              { index: 4, label: 'dp[4]', value: 5, state: 'computed' },
              { index: 5, label: 'dp[5]', value: 8, state: 'current', formula: '5 + 3 = 8' }
            ],
            stats: { 'Answer': '8 distinct paths', 'Time Complexity': 'O(n)' }
          }
        ]
      }
    ]
  },
  'sorting': {
    type: 'sorting',
    operations: [
      {
        id: 'merge-step',
        name: 'Merge Sort: Merge Two Sorted Halves',
        description: 'Combine sorted arrays [2, 5] and [1, 3] into [1, 2, 3, 5] in linear O(n) pass.',
        complexity: 'Time: O(n log n) | Space: O(n)',
        codeSnippet: `while (l < left.length && r < right.length) {
  if (left[l] <= right[r]) result.push(left[l++]);
  else result.push(right[r++]);
}`,
        steps: [
          {
            stepIndex: 0,
            title: 'Initial Subarrays: Left [2, 5] and Right [1, 3]',
            description: 'Two sorted halves ready to be merged. Compare Left[0] (2) and Right[0] (1).',
            codeLineHighlight: 2,
            pointers: { left: '2', right: '1' },
            arrayElements: [
              { index: 0, value: 2, state: 'comparing' },
              { index: 1, value: 5, state: 'default' },
              { index: 2, value: 1, state: 'comparing' },
              { index: 3, value: 3, state: 'default' }
            ],
            stats: { 'Merged Array': '[]', 'Comparison': '1 < 2 -> Take 1' }
          },
          {
            stepIndex: 1,
            title: '1 is smaller -> Push 1 to result',
            description: 'Right[0] is 1. Push 1 into result and advance right pointer to 3.',
            codeLineHighlight: 3,
            pointers: { left: '2', right: '3' },
            arrayElements: [
              { index: 0, value: 2, state: 'comparing' },
              { index: 1, value: 5, state: 'default' },
              { index: 2, value: 1, state: 'sorted' },
              { index: 3, value: 3, state: 'comparing' }
            ],
            stats: { 'Merged Array': '[1]', 'Comparison': '2 < 3 -> Take 2' }
          },
          {
            stepIndex: 2,
            title: '2 is smaller -> Push 2 to result',
            description: 'Left[0] is 2. Push 2 into result and advance left pointer to 5.',
            codeLineHighlight: 2,
            pointers: { left: '5', right: '3' },
            arrayElements: [
              { index: 0, value: 2, state: 'sorted' },
              { index: 1, value: 5, state: 'comparing' },
              { index: 2, value: 1, state: 'sorted' },
              { index: 3, value: 3, state: 'comparing' }
            ],
            stats: { 'Merged Array': '[1, 2]', 'Comparison': '3 < 5 -> Take 3' }
          },
          {
            stepIndex: 3,
            title: '3 is smaller -> Push 3, then remaining 5',
            description: 'Right[1] is 3. Push 3, then exhaust remaining left element 5. Result is fully sorted: [1, 2, 3, 5]!',
            codeLineHighlight: 3,
            pointers: { left: 'Done', right: 'Done' },
            arrayElements: [
              { index: 0, value: 1, state: 'sorted' },
              { index: 1, value: 2, state: 'sorted' },
              { index: 2, value: 3, state: 'sorted' },
              { index: 3, value: 5, state: 'sorted' }
            ],
            stats: { 'Merged Array': '[1, 2, 3, 5]', 'Status': 'Sorted' }
          }
        ]
      }
    ]
  },
  'searching': {
    type: 'searching',
    operations: [
      {
        id: 'binary-search-steps',
        name: 'Binary Search (Target = 9 in [-1, 0, 3, 5, 9, 12])',
        description: 'Halve the search space at each iteration using low, mid, and high pointers.',
        complexity: 'Time: O(log n) | Space: O(1)',
        codeSnippet: `let low = 0, high = nums.length - 1;
while (low <= high) {
  const mid = low + Math.floor((high - low) / 2);
  if (nums[mid] === target) return mid;
  else if (nums[mid] < target) low = mid + 1;
  else high = mid - 1;
}`,
        steps: [
          {
            stepIndex: 0,
            title: 'Iteration 1: low = 0, high = 5 -> mid = 2 (val = 3)',
            description: 'Inspect middle element at index 2 (val = 3). Target = 9. Since 3 < 9, target must be in right half!',
            codeLineHighlight: 3,
            pointers: { left: 0, mid: 2, right: 5 },
            arrayElements: [
              { index: 0, value: -1, state: 'default' },
              { index: 1, value: 0, state: 'default' },
              { index: 2, value: 3, state: 'active' },
              { index: 3, value: 5, state: 'default' },
              { index: 4, value: 9, state: 'default' },
              { index: 5, value: 12, state: 'default' }
            ],
            stats: { 'Search Range': 'Indices 0 to 5', 'Mid Value': 3, 'Action': 'Eliminate Left Half' }
          },
          {
            stepIndex: 1,
            title: 'Iteration 2: low = 3, high = 5 -> mid = 4 (val = 9)',
            description: 'Search range narrowed to indices [3, 4, 5]. Compute mid = 3 + 1 = 4. Element at index 4 is 9!',
            codeLineHighlight: 4,
            pointers: { left: 3, mid: 4, right: 5 },
            arrayElements: [
              { index: 0, value: -1, state: 'discarded' },
              { index: 1, value: 0, state: 'discarded' },
              { index: 2, value: 3, state: 'discarded' },
              { index: 3, value: 5, state: 'default' },
              { index: 4, value: 9, state: 'matched' },
              { index: 5, value: 12, state: 'default' }
            ],
            stats: { 'Search Range': 'Indices 3 to 5', 'Mid Value': 9, 'Action': 'Target Matched!' }
          },
          {
            stepIndex: 2,
            title: 'Target Found at Index 4 in only 2 comparisons!',
            description: 'nums[4] === 9. Linear search would have taken 5 comparisons. Binary search completed in logarithmic time.',
            codeLineHighlight: 4,
            pointers: { mid: 4 },
            arrayElements: [
              { index: 0, value: -1, state: 'discarded' },
              { index: 1, value: 0, state: 'discarded' },
              { index: 2, value: 3, state: 'discarded' },
              { index: 3, value: 5, state: 'discarded' },
              { index: 4, value: 9, state: 'matched' },
              { index: 5, value: 12, state: 'discarded' }
            ],
            stats: { 'Found Index': 4, 'Comparisons': 2, 'Max Comparisons Needed': 3 }
          }
        ]
      }
    ]
  }
};
