import { ProgressiveHint, QuizQuestion, ComplexityComparison } from '../types';

export const TOPIC_HINTS: Record<string, ProgressiveHint[]> = {
  'linked-list': [
    {
      level: 1,
      title: 'Level 1: Conceptual Nudge',
      content: 'Consider what happens when you alter a pointer in memory: if you redirect `curr.next` immediately, you will lose the address of the rest of the list. What must you do before changing any link?'
    },
    {
      level: 2,
      title: 'Level 2: Pointer Bookkeeping',
      content: 'You will need at least three variables to reverse the chain in a single pass: one to track the node you just reversed (`prev`), one for the current node (`curr`), and a temporary holder (`nextTemp`).'
    },
    {
      level: 3,
      title: 'Level 3: Algorithm Strategy',
      content: 'At each loop iteration:\n1. Save `nextTemp = curr.next`\n2. Invert link: `curr.next = prev`\n3. Slide `prev = curr`\n4. Slide `curr = nextTemp`\nRepeat until `curr` becomes null.'
    },
    {
      level: 4,
      title: 'Level 4: Edge Cases & Termination',
      content: 'Watch out for an empty list (`head === null`) and a single-node list (`head.next === null`). Both should return `head` directly without throwing a null reference exception. At loop termination, `prev` will be pointing to the new head.'
    },
    {
      level: 5,
      title: 'Level 5: Full Optimal Solution',
      content: `var reverseList = function(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
};

// Complexity: O(n) Time (single pass) | O(1) Space (3 auxiliary pointers)`
    }
  ],
  'arrays': [
    {
      level: 1,
      title: 'Level 1: Conceptual Nudge',
      content: 'Notice the vital problem constraint: the input array is ALREADY sorted in non-decreasing order. How can you use this order to avoid testing all O(n²) pairs?'
    },
    {
      level: 2,
      title: 'Level 2: Directional Movement',
      content: 'If you place pointers at the very beginning (smallest value) and very end (largest value), what happens when their sum is greater than the target? What if it is less?'
    },
    {
      level: 3,
      title: 'Level 3: Two-Pointer Strategy',
      content: 'If `sum > target`, only decrementing `right` can decrease the sum. If `sum < target`, only incrementing `left` can increase the sum. If `sum === target`, you found the unique pair!'
    },
    {
      level: 4,
      title: 'Level 4: 1-Indexed Output Warning',
      content: 'The problem requires 1-indexed output! Remember to return `[left + 1, right + 1]` rather than 0-indexed values `[left, right]`.'
    },
    {
      level: 5,
      title: 'Level 5: Full Optimal Solution',
      content: `var twoSum = function(numbers, target) {
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    else if (sum < target) left++;
    else right--;
  }
  return [];
};`
    }
  ],
  'stacks': [
    {
      level: 1,
      title: 'Level 1: Conceptual Nudge',
      content: 'Brackets must close in reverse order of how they opened: the most recently opened bracket must be the first one closed. Which data structure enforces Last-In-First-Out (LIFO)?'
    },
    {
      level: 2,
      title: 'Level 2: Hash Map Invariant',
      content: 'Use a dictionary/map where closing brackets are keys mapping to their matching opening brackets: `{ ")": "(", "}": "{", "]": "[" }`.'
    },
    {
      level: 3,
      title: 'Level 3: Stack Processing',
      content: 'Iterate through each character. If it is an opening bracket, push it onto the stack. If it is a closing bracket, pop from the stack and compare. If they don\'t match or stack is empty, return false.'
    },
    {
      level: 4,
      title: 'Level 4: Final Validation',
      content: 'Don\'t forget the final check! After processing the whole string, the stack must be empty (`stack.length === 0`). If opening brackets remain unclosed (e.g. `"((("`), it is invalid.'
    },
    {
      level: 5,
      title: 'Level 5: Full Optimal Solution',
      content: `var isValid = function(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if (map[char]) {
      if (stack.length === 0 || stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
};`
    }
  ]
};

export const TOPIC_QUIZZES: Record<string, QuizQuestion[]> = {
  'linked-list': [
    {
      id: 'll-q1',
      question: 'What is the primary advantage of a Singly Linked List over a fixed-size Array?',
      options: [
        'Instant O(1) random index access',
        'O(1) insertion/deletion at known pointer locations without memory shifting',
        'Better CPU cache locality and spatial contiguous memory',
        'Lower memory overhead per element'
      ],
      correctIndex: 1,
      explanation: 'Linked lists allow O(1) insertions and deletions at known node positions simply by relinking pointers, without shifting adjacent elements as required by contiguous arrays.'
    },
    {
      id: 'll-q2',
      question: 'When reversing a linked list iteratively, what would happen if you ran `curr.next = prev` before saving `curr.next` into a temporary variable?',
      options: [
        'The loop would immediately terminate',
        'You would lose access to all remaining downstream nodes in the list',
        'The list would automatically convert to a doubly linked list',
        'The list would duplicate the head node'
      ],
      correctIndex: 1,
      explanation: 'Because each node only stores a single pointer to its next neighbor, breaking that pointer before saving the upcoming address orphans the rest of the list in memory.'
    }
  ],
  'arrays': [
    {
      id: 'arr-q1',
      question: 'Why does accessing an array element by index `arr[i]` take guaranteed O(1) time?',
      options: [
        'Because JavaScript hashes every index',
        'Because memory addresses are contiguous: Memory Address = Base + i * ElementSize',
        'Because arrays store pointers in a binary tree',
        'Because the CPU executes binary search on index lookups'
      ],
      correctIndex: 1,
      explanation: 'Due to contiguous physical memory allocation, hardware computes the exact target RAM address via direct mathematical multiplication in a single CPU cycle.'
    },
    {
      id: 'arr-q2',
      question: 'In the Two Sum II (Sorted Array) two-pointer technique, why can we safely increment `left` when `sum < target`?',
      options: [
        'Because decrementing `right` would decrease the sum even further',
        'Because the array might have negative numbers',
        'Because `left` is always smaller than `target`',
        'Because sorted arrays only allow forward traversal'
      ],
      correctIndex: 0,
      explanation: 'Since the array is sorted in ascending order, decreasing `right` would produce an even smaller sum. The only mathematical way to increase the sum is incrementing `left`.'
    }
  ],
  'stacks': [
    {
      id: 'st-q1',
      question: 'Which behavioral policy governs a Stack data structure?',
      options: [
        'First-In-First-Out (FIFO)',
        'Last-In-First-Out (LIFO)',
        'Priority-Based Eviction',
        'Randomized Eviction'
      ],
      correctIndex: 1,
      explanation: 'Stacks enforce LIFO (Last-In-First-Out): the most recently pushed element is the first one popped.'
    },
    {
      id: 'st-q2',
      question: 'What is the time complexity of pushing and popping an element from a stack implemented with a dynamic array?',
      options: [
        'O(n) time',
        'O(log n) time',
        'O(1) time (amortized for push)',
        'O(n log n) time'
      ],
      correctIndex: 2,
      explanation: 'Push and Pop occur exclusively at the tail of the array, executing in O(1) time.'
    }
  ]
};

export const TOPIC_COMPLEXITY_DETAILS: Record<string, ComplexityComparison> = {
  'linked-list': {
    timeExplanation: 'Search requires sequential traversal from head O(n). Insertion or deletion at a known pointer is O(1).',
    spaceExplanation: 'O(n) memory to store nodes, with each node holding a value plus an extra 8-byte reference pointer.',
    whyTime: 'Unlike arrays, linked list nodes are dispersed across dynamic heap memory, so direct index math is impossible: to find node k, you must follow k pointers.',
    whySpace: 'Zero wasted over-allocation capacity, but incurs constant pointer overhead per element compared to raw primitive array buffers.',
    comparisons: [
      {
        operation: 'Index Access',
        thisStructure: 'O(n) - sequential walk',
        alternativeStructure: 'Array: O(1) - instant math',
        advantage: 'Array wins for random reads'
      },
      {
        operation: 'Insert at Head',
        thisStructure: 'O(1) - single pointer link',
        alternativeStructure: 'Array: O(n) - shift all elements',
        advantage: 'Linked list wins for prepending'
      },
      {
        operation: 'Delete known Node',
        thisStructure: 'O(1) - bypass pointer',
        alternativeStructure: 'Array: O(n) - shift trailing items',
        advantage: 'Linked list avoids expensive element copies'
      },
      {
        operation: 'Cache Locality',
        thisStructure: 'Dispersed heap (cache misses)',
        alternativeStructure: 'Contiguous buffer (high hit rate)',
        advantage: 'Array has superior cache performance'
      }
    ]
  },
  'arrays': {
    timeExplanation: 'Index lookup is instantaneous O(1). Insertion or deletion at arbitrary indices requires shifting elements in O(n).',
    spaceExplanation: 'O(n) contiguous RAM block. Dynamic arrays reserve extra capacity (usually 1.5x - 2x) to allow amortized O(1) appends.',
    whyTime: 'Contiguous memory layout allows hardware address calculation `base + i * size` in 1 machine instruction.',
    whySpace: 'Highly efficient with near-zero pointer overhead, but may temporarily waste unused buffer capacity until filled.',
    comparisons: [
      {
        operation: 'Index Access',
        thisStructure: 'O(1) - instant',
        alternativeStructure: 'Linked List: O(n)',
        advantage: 'Array is optimal for random access'
      },
      {
        operation: 'Prepend / Insert at 0',
        thisStructure: 'O(n) - must shift all n elements',
        alternativeStructure: 'Linked List: O(1)',
        advantage: 'Linked list is faster for frequent front insertions'
      },
      {
        operation: 'Append at End',
        thisStructure: 'Amortized O(1)',
        alternativeStructure: 'Linked List: O(1) with tail pointer',
        advantage: 'Both are O(1) at end'
      }
    ]
  },
  'stacks': {
    timeExplanation: 'Push, Pop, and Peek operate exclusively on the top element in guaranteed O(1) constant time.',
    spaceExplanation: 'O(n) auxiliary space to hold up to n items on the call stack or dynamic buffer.',
    whyTime: 'Only the topmost element is ever accessed or modified, eliminating any loop or traversal overhead.',
    whySpace: 'Linear with the number of pending unclosed operations or recursive function call frames.',
    comparisons: [
      {
        operation: 'Push / Pop',
        thisStructure: 'O(1) at Top',
        alternativeStructure: 'Queue: O(1) at Head/Tail',
        advantage: 'Strict LIFO discipline guarantees reverse matching'
      },
      {
        operation: 'Peek Top Item',
        thisStructure: 'O(1) instantaneous',
        alternativeStructure: 'Arbitrary Access: O(n)',
        advantage: 'Instant visibility of most recent state'
      }
    ]
  }
};

export function getTopicHints(topicId: string, topicTitle?: string): ProgressiveHint[] {
  if (TOPIC_HINTS[topicId]) {
    return TOPIC_HINTS[topicId];
  }
  const name = topicTitle || topicId;
  return [
    {
      level: 1,
      title: 'Level 1: Conceptual Nudge',
      content: `Consider the fundamental invariants of ${name}. What is the smallest subproblem or edge condition you must handle first?`
    },
    {
      level: 2,
      title: 'Level 2: Key Invariant',
      content: `Identify the state that must be preserved between steps. What data structure property or pointer boundary prevents redundant computations?`
    },
    {
      level: 3,
      title: 'Level 3: Algorithm Strategy',
      content: `Break the solution into 3 phases: 1) Initialize state/pointers, 2) Iterate or recurse while maintaining the invariant, 3) Return the accumulated result.`
    },
    {
      level: 4,
      title: 'Level 4: Edge Cases',
      content: `Check boundary limits: empty input, single element, negative numbers, or duplicate values. Ensure no index out of bounds or null pointer exceptions occur.`
    },
    {
      level: 5,
      title: 'Level 5: Optimal Implementation Guide',
      content: `Write a clean single-pass or logarithmic divide-and-conquer implementation. Strive for optimal time complexity while minimizing auxiliary space allocation.`
    }
  ];
}

export function getTopicQuiz(topicId: string, topicTitle?: string): QuizQuestion[] {
  if (TOPIC_QUIZZES[topicId]) {
    return TOPIC_QUIZZES[topicId];
  }
  const name = topicTitle || topicId;
  return [
    {
      id: `${topicId}-q1`,
      question: `What is the primary trade-off when choosing ${name} over alternative approaches?`,
      options: [
        'Optimal time complexity for core operations balanced against memory overhead',
        'Guaranteed zero memory usage in all cases',
        'Automatic sorting without comparisons',
        'Constant time random access across all elements'
      ],
      correctIndex: 0,
      explanation: `${name} is engineered to optimize specific access or manipulation patterns, trading off random flexibility or spatial cache locality.`
    },
    {
      id: `${topicId}-q2`,
      question: `Which asymptotic complexity tier best characterizes the optimal implementation for ${name}?`,
      options: [
        'O(1) to O(n) depending on operation type',
        'O(n!) factorial complexity',
        'O(2^n) exponential in all cases',
        'O(n^3) cubic complexity'
      ],
      correctIndex: 0,
      explanation: 'Optimal algorithms for this structure execute in linear, logarithmic, or constant time bounds.'
    }
  ];
}

export function getTopicComplexity(topicId: string, topicTitle?: string): ComplexityComparison {
  if (TOPIC_COMPLEXITY_DETAILS[topicId]) {
    return TOPIC_COMPLEXITY_DETAILS[topicId];
  }
  const name = topicTitle || topicId;
  return {
    timeExplanation: `Core operations are bounded between O(1) and O(n log n) depending on whether tree balancing or sorting is required.`,
    spaceExplanation: `Auxiliary memory scales with problem size O(n) or remains constant O(1) for in-place methods.`,
    whyTime: `Each step systematically reduces the remaining candidate space or performs constant-time state updates.`,
    whySpace: `Memory is dictated by call-stack recursion depth or dynamic buffer allocations.`,
    comparisons: [
      {
        operation: 'Core Query',
        thisStructure: 'Optimized asymptotic bound',
        alternativeStructure: 'Naive scan: O(n²)',
        advantage: `${name} provides scalable sub-quadratic performance`
      },
      {
        operation: 'Auxiliary Overhead',
        thisStructure: 'Controlled O(1) or O(n)',
        alternativeStructure: 'Unbounded allocation',
        advantage: 'Predictable memory consumption'
      }
    ]
  };
}

