import { DSATopic } from '../types';
import { TOPIC_VISUALIZERS } from './visualizationsData';
import { getTopicHints, getTopicQuiz, getTopicComplexity } from './topicDetails';

const RAW_DSA_TOPICS: DSATopic[] = [
  {
    id: 'linked-list',
    title: 'Linked List',
    category: 'Linear Data Structures',
    iconName: 'GitCommit',
    completed: true,
    difficulty: 'Easy',
    shortDescription: 'Chained node structures with dynamic memory allocation',
    overview: [
      'A Linked List is a fundamental linear data structure where elements are not stored at contiguous memory locations. Instead, individual elements are linked together using pointers or node references. Each element, called a Node, contains two parts: the stored data payload and a reference (pointer) pointing to the next node in the sequence.',
      'The primary advantage of a linked list over a traditional fixed array is that elements can be effortlessly inserted or removed in O(1) time at known positions without reallocating or reorganizing the entire memory block. This dynamic resizing prevents large over-allocation penalties.',
      'However, linked lists trade off random index access: retrieving the k-th item requires sequential traversal starting from the head node, making search operations O(n). Understanding pointer manipulation, null-termination checks, and dummy head sentinel nodes is critical for solving interview problems like reversing, cycle detection, and merging lists.'
    ],
    keyConcept: {
      title: 'Head Sentinel & Pointer Swapping',
      description: 'The first node is designated as the head. To reverse a singly linked list in-place in O(n) time and O(1) space, maintain three moving pointers: prev (starts at null), curr (starts at head), and nextTemp (preserves the upcoming node prior to pointer reassignment).'
    },
    complexity: {
      time: 'Access: O(n) | Search: O(n) | Insertion: O(1) | Deletion: O(1)',
      space: 'O(n) auxiliary space for pointer storage',
      notes: 'Cache locality is worse than arrays due to dispersed heap node allocations.'
    },
    notesContent: {
      en: {
        shortDescription: 'Chained node structures with dynamic memory allocation',
        overview: [
          'A Linked List is a fundamental linear data structure where elements are not stored at contiguous memory locations. Instead, individual elements are linked together using pointers or node references. Each element, called a Node, contains two parts: the stored data payload and a reference (pointer) pointing to the next node in the sequence.',
          'The primary advantage of a linked list over a traditional fixed array is that elements can be effortlessly inserted or removed in O(1) time at known positions without reallocating or reorganizing the entire memory block. This dynamic resizing prevents large over-allocation penalties.',
          'However, linked lists trade off random index access: retrieving the k-th item requires sequential traversal starting from the head node, making search operations O(n). Understanding pointer manipulation, null-termination checks, and dummy head sentinel nodes is critical for solving interview problems like reversing, cycle detection, and merging lists.'
        ],
        keyConcept: {
          title: 'Head Sentinel & Pointer Swapping',
          description: 'The first node is designated as the head. To reverse a singly linked list in-place in O(n) time and O(1) space, maintain three moving pointers: prev (starts at null), curr (starts at head), and nextTemp (preserves the upcoming node prior to pointer reassignment).'
        },
        complexityNotes: 'Cache locality is worse than arrays due to dispersed heap node allocations.'
      },
      hinglish: {
        shortDescription: 'Chained nodes ka linear data structure jisme elements dynamic pointers ke through connected rehte hain',
        overview: [
          'Linked List ek linear data structure hai jisme elements memory ke andar contiguous (ek ke baad ek) store nahi hote. Har element ko hum Node kehte hain, jisme do parts hote hain: actual data value aur agle node ka pointer reference (`next`).',
          'Arrays ke comparison me iska sabse bada advantage ye hai ki elements ko insert ya delete karna O(1) time me ho jata hai bina puri memory reallocate ya shift kiye, jab tak aapke paas target location ka pointer ho.',
          'Lekin tradeoff ye hai ki random index access (jaise arr[i]) possible nahi hota. K-th element tak pahuchne ke liye head se traverse karna padta hai jisme O(n) time lagta hai. Dummy nodes, fast-slow pointers, aur null checks interview questions me bohot zyada kaam aate hain.'
        ],
        keyConcept: {
          title: 'Pointer Manipulation & In-Place Reversal',
          description: 'List ka entry point head hota hai. In-place reverse karne ke liye teen pointers use hote hain: prev (null se start), curr (head se start), aur nextTemp (jo aage ke node ko save rakhta hai taaki pointer modte waqt list break na ho).'
        },
        complexityNotes: 'Nodes memory me alag-alag bikhre hue (heap allocation) hone ki wajah se arrays jitni fast CPU cache locality nahi milti.'
      }
    },
    codeExample: {
      javascript: `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Prepend node in O(1) time
  prepend(val) {
    const newNode = new ListNode(val, this.head);
    this.head = newNode;
    this.size++;
  }

  // Delete node with given value in O(n)
  delete(val) {
    if (!this.head) return;
    if (this.head.val === val) {
      this.head = this.head.next;
      this.size--;
      return;
    }
    let curr = this.head;
    while (curr.next && curr.next.val !== val) {
      curr = curr.next;
    }
    if (curr.next) {
      curr.next = curr.next.next;
      this.size--;
    }
  }
}`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class LinkedList:
    def __init__(self):
        self.head = None
        self.size = 0

    # Prepend node in O(1) time
    def prepend(self, val: int) -> None:
        new_node = ListNode(val, self.head)
        self.head = new_node
        self.size += 1

    # Delete node with given value in O(n)
    def delete(self, val: int) -> None:
        if not self.head:
            return
        if self.head.val == val:
            self.head = self.head.next
            self.size -= 1
            return
        curr = self.head
        while curr.next and curr.next.val != val:
            curr = curr.next
        if curr.next:
            curr.next = curr.next.next
            self.size -= 1`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; this.next = null; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

public class LinkedList {
    private ListNode head;
    private int size;

    public LinkedList() {
        this.head = null;
        this.size = 0;
    }

    // Prepend node in O(1) time
    public void prepend(int val) {
        ListNode newNode = new ListNode(val, head);
        this.head = newNode;
        this.size++;
    }

    // Delete node with given value in O(n)
    public void delete(int val) {
        if (head == null) return;
        if (head.val == val) {
            head = head.next;
            size--;
            return;
        }
        ListNode curr = head;
        while (curr.next != null && curr.next.val != val) {
            curr = curr.next;
        }
        if (curr.next != null) {
            curr.next = curr.next.next;
            size--;
        }
    }
}`,
      cpp: `#include <iostream>

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode* nextNode) : val(x), next(nextNode) {}
};

class LinkedList {
public:
    ListNode* head;
    int size;

    LinkedList() : head(nullptr), size(0) {}

    // Prepend node in O(1) time
    void prepend(int val) {
        ListNode* newNode = new ListNode(val, head);
        head = newNode;
        size++;
    }

    // Delete node with given value in O(n)
    void remove(int val) {
        if (!head) return;
        if (head->val == val) {
            ListNode* temp = head;
            head = head->next;
            delete temp;
            size--;
            return;
        }
        ListNode* curr = head;
        while (curr->next && curr->next->val != val) {
            curr = curr->next;
        }
        if (curr->next) {
            ListNode* temp = curr->next;
            curr->next = curr->next->next;
            delete temp;
            size--;
        }
    }
};`
    },
    practiceProblem: {
      id: 'reverse-linked-list',
      title: 'Reverse Linked List',
      difficulty: 'Easy',
      description: 'Given the head of a singly linked list, reverse the list in-place, and return the new reversed list head.',
      exampleInput: 'head = [1, 2, 3, 4, 5]',
      exampleOutput: '[5, 4, 3, 2, 1]',
      constraints: [
        'The number of nodes in the list is in the range [0, 5000].',
        '-5000 <= Node.val <= 5000'
      ],
      starterCode: {
        javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  let prev = null;
  let curr = head;
  
  while (curr !== null) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  
  return prev;
};`,
        python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head
        while curr:
            next_temp = curr.next
            curr.next = prev
            prev = curr
            curr = next_temp
        return prev`,
        cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* nextTemp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
};`,
        java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`
      },
      sampleSolution: 'Iterative 3-pointer method swaps references sequentially until curr reaches null.'
    }
  },
  {
    id: 'arrays',
    title: 'Arrays',
    category: 'Linear Data Structures',
    iconName: 'LayoutGrid',
    completed: true,
    difficulty: 'Easy',
    shortDescription: 'Contiguous memory buffers and two-pointer techniques',
    overview: [
      'Arrays are the simplest and most widely used data structures in computing. An array is a collection of elements stored in contiguous blocks of memory, each identified by at least one index. Because memory addresses are contiguous and mathematically predictable (address = base + index * elementSize), element lookup by index executes in guaranteed O(1) time.',
      'Common algorithmic patterns built on arrays include Two Pointers, Sliding Window, Prefix Sum arrays, and Kadane\'s algorithm for maximum subarray problems. When an array is sorted, binary search allows logarithmic time retrieval.',
      'Dynamic arrays (like JavaScript Array, Python list, or C++ std::vector) automatically double their internal capacity when full. While insertion at the tail is amortized O(1), inserting or removing items from the beginning or middle requires shifting downstream elements, yielding O(n) worst-case time.'
    ],
    keyConcept: {
      title: 'Two-Pointer & Sliding Window',
      description: 'Use two pointers moving in the same or opposite directions to evaluate ranges without quadratic nested loops. In the Two Sum problem on sorted input, inward-moving pointers converge in O(n) single-pass time.'
    },
    complexity: {
      time: 'Index Access: O(1) | Search: O(n) | Insert/Delete (mid): O(n) | Append: Amortized O(1)',
      space: 'O(n) linear contiguous buffer',
      notes: 'Superb CPU cache spatial locality due to adjacent physical RAM addresses.'
    },
    notesContent: {
      en: {
        shortDescription: 'Contiguous memory buffers and two-pointer techniques',
        overview: [
          'Arrays are the simplest and most widely used data structures in computing. An array is a collection of elements stored in contiguous blocks of memory, each identified by at least one index. Because memory addresses are contiguous and mathematically predictable (address = base + index * elementSize), element lookup by index executes in guaranteed O(1) time.',
          'Common algorithmic patterns built on arrays include Two Pointers, Sliding Window, Prefix Sum arrays, and Kadane\'s algorithm for maximum subarray problems. When an array is sorted, binary search allows logarithmic time retrieval.',
          'Dynamic arrays (like JavaScript Array, Python list, or C++ std::vector) automatically double their internal capacity when full. While insertion at the tail is amortized O(1), inserting or removing items from the beginning or middle requires shifting downstream elements, yielding O(n) worst-case time.'
        ],
        keyConcept: {
          title: 'Two-Pointer & Sliding Window',
          description: 'Use two pointers moving in the same or opposite directions to evaluate ranges without quadratic nested loops. In the Two Sum problem on sorted input, inward-moving pointers converge in O(n) single-pass time.'
        },
        complexityNotes: 'Superb CPU cache spatial locality due to adjacent physical RAM addresses.'
      },
      hinglish: {
        shortDescription: 'Contiguous memory blocks jahan instant index lookup aur two-pointer techniques use hoti hain',
        overview: [
          'Array computing ka sabse fundamental data structure hai jisme elements memory ke andar bilkul bagal-bagal (contiguous memory) store hote hain. Is contiguous layout ki wajah se index ke through element access karna guaranteed O(1) instant time leta hai.',
          'Array problems me aksar Two Pointers, Sliding Window, Prefix Sum, aur Kadane\'s algorithm jaise core interview patterns use hote hain. Agar array pehle se sorted hai, toh hum O(log n) me binary search laga sakte hain.',
          'Dynamic arrays (jaise JS Arrays ya C++ vectors) jab full hote hain toh internally size double kar lete hain. End me push karna amortized O(1) hota hai, par shuru ya beech me insert/delete karne se baaki elements ko shift karna padta hai jo O(n) time leta hai.'
        ],
        keyConcept: {
          title: 'Two-Pointer Shrinking Strategy',
          description: 'Sorted array me do pointers (ek start pe, ek end pe) set karo. Agar current sum target se chhota hai toh left pointer badhao (`left++`), agar bada hai toh right pointer ghatao (`right--`). Isse quadratic O(n^2) ka nested loop O(n) me crack ho jata hai.'
        },
        complexityNotes: 'Physical memory me continuous address hone ki wajah se CPU cache spatial locality top-class milti hai.'
      }
    },
    codeExample: {
      javascript: `// Two-pointer search for target sum on sorted array
function twoSumSorted(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1]; // 1-indexed
    } else if (sum < target) {
      left++; // Need a larger value
    } else {
      right--; // Need a smaller value
    }
  }

  return [];
}`,
      python: `# Two-pointer search for target sum on sorted array
def two_sum_sorted(numbers: list[int], target: int) -> list[int]:
    left = 0
    right = len(numbers) - 1

    while left < right:
        current_sum = numbers[left] + numbers[right]
        if current_sum == target:
            return [left + 1, right + 1]  # 1-indexed
        elif current_sum < target:
            left += 1  # Need a larger value
        else:
            right -= 1  # Need a smaller value

    return []`,
      java: `// Two-pointer search for target sum on sorted array
public class TwoSumSorted {
    public static int[] twoSum(int[] numbers, int target) {
        int left = 0;
        int right = numbers.length - 1;

        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) {
                return new int[]{left + 1, right + 1}; // 1-indexed
            } else if (sum < target) {
                left++; // Need a larger value
            } else {
                right--; // Need a smaller value
            }
        }

        return new int[]{};
    }
}`,
      cpp: `#include <vector>

// Two-pointer search for target sum on sorted array
std::vector<int> twoSumSorted(const std::vector<int>& numbers, int target) {
    int left = 0;
    int right = static_cast<int>(numbers.size()) - 1;

    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) {
            return {left + 1, right + 1}; // 1-indexed
        } else if (sum < target) {
            left++; // Need a larger value
        } else {
            right--; // Need a smaller value
        }
    }

    return {};
}`
    },
    practiceProblem: {
      id: 'two-sum',
      title: 'Two Sum II - Input Array Is Sorted',
      difficulty: 'Medium',
      description: 'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.',
      exampleInput: 'numbers = [2, 7, 11, 15], target = 9',
      exampleOutput: '[1, 2]',
      constraints: [
        '2 <= numbers.length <= 3 * 10^4',
        '-1000 <= numbers[i] <= 1000',
        'numbers is sorted in non-decreasing order.',
        'Exactly one valid solution exists.'
      ],
      starterCode: {
        javascript: `/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;
  
  while (left < right) {
    let sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [];
};`,
        python: `class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        left, right = 0, len(numbers) - 1
        while left < right:
            s = numbers[left] + numbers[right]
            if s == target:
                return [left + 1, right + 1]
            elif s < target:
                left += 1
            else:
                right -= 1
        return []`,
        cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int left = 0, right = numbers.size() - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return {left + 1, right + 1};
            if (sum < target) left++;
            else right--;
        }
        return {};
    }
};`,
        java: `class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return new int[]{left + 1, right + 1};
            if (sum < target) left++;
            else right--;
        }
        return new int[]{};
    }
}`
      },
      sampleSolution: 'Dual convergence inward from array boundaries in O(n) runtime and O(1) space.'
    }
  },
  {
    id: 'stacks',
    title: 'Stacks',
    category: 'Linear Data Structures',
    iconName: 'Layers',
    completed: true,
    difficulty: 'Easy',
    shortDescription: 'LIFO collections, call stacks, and monotonic structures',
    overview: [
      'A Stack is an abstract data type that serves as a collection of elements with two principal operations: push (adds an item to the top) and pop (removes the most recently added item). This operates on the strict Last-In-First-Out (LIFO) behavioral rule.',
      'Stacks naturally represent recursive call environments, syntax parsing (such as matching brackets and quotes in compilers), undo/redo action histories, and graph depth-first searches.',
      'Advanced DSA techniques frequently employ a Monotonic Stack — a stack whose elements are always strictly increasing or decreasing. Monotonic stacks solve "Next Greater Element" and "Largest Rectangle in Histogram" in linear O(n) time, dramatically eliminating quadratic brute-force passes.'
    ],
    keyConcept: {
      title: 'Monotonic Stack Property',
      description: 'By popping elements off the stack as soon as they violate the desired monotonicity before inserting the current candidate, each element is pushed once and popped at most once across the entire algorithm, maintaining strict O(n) total runtime.'
    },
    complexity: {
      time: 'Push: O(1) | Pop: O(1) | Peek: O(1) | Search: O(n)',
      space: 'O(n) auxiliary stack memory',
      notes: 'Implemented cleanly on top of dynamic arrays or linked lists.'
    },
    notesContent: {
      en: {
        shortDescription: 'LIFO collections, call stacks, and monotonic structures',
        overview: [
          'A Stack is an abstract data type that serves as a collection of elements with two principal operations: push (adds an item to the top) and pop (removes the most recently added item). This operates on the strict Last-In-First-Out (LIFO) behavioral rule.',
          'Stacks naturally represent recursive call environments, syntax parsing (such as matching brackets and quotes in compilers), undo/redo action histories, and graph depth-first searches.',
          'Advanced DSA techniques frequently employ a Monotonic Stack — a stack whose elements are always strictly increasing or decreasing. Monotonic stacks solve "Next Greater Element" and "Largest Rectangle in Histogram" in linear O(n) time, dramatically eliminating quadratic brute-force passes.'
        ],
        keyConcept: {
          title: 'Monotonic Stack Property',
          description: 'By popping elements off the stack as soon as they violate the desired monotonicity before inserting the current candidate, each element is pushed once and popped at most once across the entire algorithm, maintaining strict O(n) total runtime.'
        },
        complexityNotes: 'Implemented cleanly on top of dynamic arrays or linked lists.'
      },
      hinglish: {
        shortDescription: 'LIFO (Last-In First-Out) data structure jo function call stacks aur bracket matching me kaam aata hai',
        overview: [
          'Stack ek linear data structure hai jo LIFO (Last In, First Out) principle pe kaam karta hai—jo element sabse aakhri me andar jaayega, wahi sabse pehle bahar aayega. Do main operations hote hain: push (element add karna) aur pop (top se element nikalna).',
          'Real-world me browser ka Back button, text editor ka Undo feature, aur compilers me parentheses validation Stack ke through hi implement hote hain. Programming languages me recursion bhi execution call stack se chalti hai.',
          'Advanced problems ke liye Monotonic Stack ka concept use hota hai, jisme elements humesha increasing ya decreasing order me rehte hain. Isse Next Greater Element jaise sawal O(n^2) brute force ke bajaye O(n) me crack ho jaate hain.'
        ],
        keyConcept: {
          title: 'LIFO & Balanced Bracket Matching',
          description: 'Har opening bracket ko stack me push karo. Jab closing bracket aaye, stack ke top element se match check karo aur pop kar do. Agar pure traversal ke baad stack empty ho jaye, toh syntax perfectly valid hai.'
        },
        complexityNotes: 'Dynamic array ya linked list ke upar isse easily O(1) push, pop aur peek operations ke sath banaya ja sakta hai.'
      }
    },
    codeExample: {
      javascript: `function isValidParentheses(s) {
  const stack = [];
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  for (const char of s) {
    if (char in map) {
      const top = stack.length > 0 ? stack.pop() : '#';
      if (top !== map[char]) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}`,
      python: `def is_valid_parentheses(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}

    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if top != mapping[char]:
                return False
        else:
            stack.append(char)

    return len(stack) == 0`,
      java: `import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;

public class ValidParentheses {
    public static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        Map<Character, Character> map = Map.of(')', '(', '}', '{', ']', '[');

        for (char c : s.toCharArray()) {
            if (map.containsKey(c)) {
                char top = stack.isEmpty() ? '#' : stack.pop();
                if (top != map.get(c)) return false;
            } else {
                stack.push(c);
            }
        }
        return stack.isEmpty();
    }
}`,
      cpp: `#include <string>
#include <stack>
#include <unordered_map>

bool isValidParentheses(const std::string& s) {
    std::stack<char> st;
    std::unordered_map<char, char> map = {
        {')', '('},
        {'}', '{'},
        {']', '['}
    };

    for (char c : s) {
        if (map.count(c)) {
            char top = st.empty() ? '#' : st.top();
            if (!st.empty()) st.pop();
            if (top != map[c]) return false;
        } else {
            st.push(c);
        }
    }

    return st.empty();
}`
    },
    practiceProblem: {
      id: 'valid-parentheses',
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid. Open brackets must be closed by the same type and in the correct order.',
      exampleInput: 's = "()[]{}"',
      exampleOutput: 'true',
      constraints: [
        '1 <= s.length <= 10^4',
        's consists of parentheses only "()[]{}"'
      ],
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const stack = [];
  const pairs = { ')': '(', '}': '{', ']': '[' };
  
  for (let char of s) {
    if (pairs[char]) {
      if (stack.pop() !== pairs[char]) return false;
    } else {
      stack.push(char);
    }
  }
  
  return stack.length === 0;
};`,
        python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {")": "(", "}": "{", "]": "["}
        for char in s:
            if char in mapping:
                top = stack.pop() if stack else '#'
                if mapping[char] != top:
                    return False
            else:
                stack.append(char)
        return not stack`,
        cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') st.push(c);
            else {
                if (st.empty()) return false;
                char top = st.top(); st.pop();
                if (c == ')' && top != '(') return false;
                if (c == '}' && top != '{') return false;
                if (c == ']' && top != '[') return false;
            }
        }
        return st.empty();
    }
};`,
        java: `class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`
      },
      sampleSolution: 'Bracket parity matching using LIFO stack verification.'
    }
  },
  {
    id: 'queues',
    title: 'Queues',
    category: 'Linear Data Structures',
    iconName: 'ListOrdered',
    completed: false,
    difficulty: 'Easy',
    shortDescription: 'FIFO structures, ring buffers, and breadth-first search',
    overview: [
      'A Queue adheres strictly to First-In-First-Out (FIFO) semantics. The element that enters first is the element processed and removed first. Core operations include enqueue (adding to tail) and dequeue (removing from head).',
      'Queues are the foundational engine behind Breadth-First Search (BFS) on graphs and trees, operating system CPU scheduling, event-driven request handlers, and rate limiting buffers.',
      'Circular Queues (or ring buffers) wrap pointer indices around fixed-size arrays using modulo arithmetic `(tail + 1) % capacity`, avoiding the costly element shifting associated with array unshift operations.'
    ],
    keyConcept: {
      title: 'Breadth-First Exploration',
      description: 'Because BFS processes nodes layer by layer in strictly increasing distance from the source, a queue guarantees the shortest path in unweighted graph topologies.'
    },
    complexity: {
      time: 'Enqueue: O(1) | Dequeue: O(1) | Peek: O(1) | Search: O(n)',
      space: 'O(n) queue buffer',
      notes: 'Priority queues depart from FIFO, prioritizing items by key weight using heaps.'
    },
    notesContent: {
      en: {
        shortDescription: 'FIFO structures, ring buffers, and breadth-first search',
        overview: [
          'A Queue adheres strictly to First-In-First-Out (FIFO) semantics. The element that enters first is the element processed and removed first. Core operations include enqueue (adding to tail) and dequeue (removing from head).',
          'Queues are the foundational engine behind Breadth-First Search (BFS) on graphs and trees, operating system CPU scheduling, event-driven request handlers, and rate limiting buffers.',
          'Circular Queues (or ring buffers) wrap pointer indices around fixed-size arrays using modulo arithmetic `(tail + 1) % capacity`, avoiding the costly element shifting associated with array unshift operations.'
        ],
        keyConcept: {
          title: 'Breadth-First Exploration',
          description: 'Because BFS processes nodes layer by layer in strictly increasing distance from the source, a queue guarantees the shortest path in unweighted graph topologies.'
        },
        complexityNotes: 'Priority queues depart from FIFO, prioritizing items by key weight using heaps.'
      },
      hinglish: {
        shortDescription: 'FIFO (First-In First-Out) data structure jo BFS aur asynchronous job queues ka foundation hai',
        overview: [
          'Queue ek First-In-First-Out (FIFO) data structure hai—matlab jo pehle aaya, wo pehle payega. Jaise ticket counter ki line: naya banda tail pe add hota hai (enqueue), aur front wala insaan service leke sabse pehle nikalta hai (dequeue).',
          'Graph aur Tree me Breadth-First Search (BFS) chalane ke liye Queue sabse critical component hai. OS level pe task scheduling aur backend architectures me message brokers (RabbitMQ/Kafka) isi structure pe chalte hain.',
          'Circular Queue (Ring Buffer) me hum modulo arithmetic `(tail + 1) % capacity` use karke fixed-size array ke start aur end ko connect kar dete hain, jisse bina array shifting ke O(1) enqueue-dequeue ho jata hai.'
        ],
        keyConcept: {
          title: 'Layer-by-Layer BFS Processing',
          description: 'Queue me current layer ke nodes pop hote hain aur unke immediate neighbors push hote hain. Ye guarantee karta hai ki unweighted graph me start se destination tak ka sabse shortest path hi pehle explore hoga.'
        },
        complexityNotes: 'Priority Queue FIFO se hatkar elements ko unke priority weight ke according heaps ke through process karti hai.'
      }
    },
    codeExample: {
      javascript: `class MyCircularQueue {
  constructor(k) {
    this.queue = new Array(k);
    this.head = 0;
    this.tail = 0;
    this.size = 0;
    this.capacity = k;
  }

  enQueue(value) {
    if (this.isFull()) return false;
    this.queue[this.tail] = value;
    this.tail = (this.tail + 1) % this.capacity;
    this.size++;
    return true;
  }

  deQueue() {
    if (this.isEmpty()) return false;
    this.head = (this.head + 1) % this.capacity;
    this.size--;
    return true;
  }

  Front() { return this.isEmpty() ? -1 : this.queue[this.head]; }
  Rear() { return this.isEmpty() ? -1 : this.queue[(this.tail - 1 + this.capacity) % this.capacity]; }
  isEmpty() { return this.size === 0; }
  isFull() { return this.size === this.capacity; }
}`,
      python: `class MyCircularQueue:
    def __init__(self, k: int):
        self.queue = [0] * k
        self.head = 0
        self.tail = 0
        self.size = 0
        self.capacity = k

    def enQueue(self, value: int) -> bool:
        if self.isFull():
            return False
        self.queue[self.tail] = value
        self.tail = (self.tail + 1) % self.capacity
        self.size += 1
        return True

    def deQueue(self) -> bool:
        if self.isEmpty():
            return False
        self.head = (self.head + 1) % self.capacity
        self.size -= 1
        return True

    def Front(self) -> int:
        return -1 if self.isEmpty() else self.queue[self.head]

    def Rear(self) -> int:
        return -1 if self.isEmpty() else self.queue[(self.tail - 1 + self.capacity) % self.capacity]

    def isEmpty(self) -> bool:
        return self.size == 0

    def isFull(self) -> bool:
        return self.size == self.capacity`,
      java: `public class MyCircularQueue {
    private int[] queue;
    private int head = 0, tail = 0, size = 0, capacity;

    public MyCircularQueue(int k) {
        this.capacity = k;
        this.queue = new int[k];
    }

    public boolean enQueue(int value) {
        if (isFull()) return false;
        queue[tail] = value;
        tail = (tail + 1) % capacity;
        size++;
        return true;
    }

    public boolean deQueue() {
        if (isEmpty()) return false;
        head = (head + 1) % capacity;
        size--;
        return true;
    }

    public int Front() { return isEmpty() ? -1 : queue[head]; }
    public int Rear() { return isEmpty() ? -1 : queue[(tail - 1 + capacity) % capacity]; }
    public boolean isEmpty() { return size == 0; }
    public boolean isFull() { return size == capacity; }
}`,
      cpp: `#include <vector>

class MyCircularQueue {
private:
    std::vector<int> queue;
    int head, tail, size, capacity;

public:
    MyCircularQueue(int k) : queue(k), head(0), tail(0), size(0), capacity(k) {}

    bool enQueue(int value) {
        if (isFull()) return false;
        queue[tail] = value;
        tail = (tail + 1) % capacity;
        size++;
        return true;
    }

    bool deQueue() {
        if (isEmpty()) return false;
        head = (head + 1) % capacity;
        size--;
        return true;
    }

    int Front() { return isEmpty() ? -1 : queue[head]; }
    int Rear() { return isEmpty() ? -1 : queue[(tail - 1 + capacity) % capacity]; }
    bool isEmpty() { return size == 0; }
    bool isFull() { return size == capacity; }
};`
    },
    practiceProblem: {
      id: 'design-circular-queue',
      title: 'Design Circular Queue',
      difficulty: 'Medium',
      description: 'Design your implementation of the circular queue with fixed capacity k. Support enQueue, deQueue, Front, Rear, isEmpty, and isFull.',
      exampleInput: '["MyCircularQueue","enQueue","enQueue","deQueue","Front"] [[3],[1],[2],[],[]]',
      exampleOutput: '[null,true,true,true,2]',
      constraints: ['1 <= k <= 1000', '0 <= value <= 1000', 'At most 3000 calls'],
      starterCode: {
        javascript: `var MyCircularQueue = function(k) {
  this.arr = new Array(k);
  this.head = 0;
  this.tail = 0;
  this.count = 0;
  this.capacity = k;
};
MyCircularQueue.prototype.enQueue = function(val) {
  if (this.isFull()) return false;
  this.arr[this.tail] = val;
  this.tail = (this.tail + 1) % this.capacity;
  this.count++;
  return true;
};
MyCircularQueue.prototype.deQueue = function() {
  if (this.isEmpty()) return false;
  this.head = (this.head + 1) % this.capacity;
  this.count--;
  return true;
};`,
        python: `class MyCircularQueue:
    def __init__(self, k: int):
        self.q = [0] * k
        self.head = 0
        self.tail = 0
        self.size = 0
        self.cap = k`,
        cpp: `class MyCircularQueue {
private:
    vector<int> q;
    int head = 0, tail = 0, size = 0, cap;
public:
    MyCircularQueue(int k) : q(k), cap(k) {}
};`,
        java: `class MyCircularQueue {
    private int[] q;
    private int head = 0, tail = 0, size = 0, cap;
    public MyCircularQueue(int k) { q = new int[k]; cap = k; }
}`
      },
      sampleSolution: 'Modulo arithmetic ring buffer in O(1) operations.'
    }
  },
  {
    id: 'trees',
    title: 'Trees',
    category: 'Hierarchical Structures',
    iconName: 'Network',
    completed: false,
    difficulty: 'Medium',
    shortDescription: 'Binary trees, binary search trees, and recursive traversals',
    overview: [
      'A Tree is a non-linear hierarchical data structure consisting of nodes connected by directed edges. The topmost node is the root, and nodes without children are leaf nodes. Each non-root node has exactly one parent.',
      'Binary Search Trees (BST) maintain the BST invariant: for every node, all values in its left subtree are strictly less than its value, and all values in its right subtree are strictly greater. In a balanced BST (AVL, Red-Black), search, insertion, and deletion run in O(log n) time.',
      'Tree traversals come in two forms: Depth-First Search (Pre-order, In-order, Post-order) and Breadth-First Search (Level-order). In-order traversal of a BST yields elements in sorted ascending order.'
    ],
    keyConcept: {
      title: 'BST Invariant & In-Order Traversal',
      description: 'Traversing left child, current node, then right child produces a sorted sequence. Validating a BST requires ensuring each node stays within a bounded range (-inf, +inf) inherited from parent ancestors.'
    },
    complexity: {
      time: 'Search/Insert/Delete: O(log n) balanced, O(n) skewed | Traversal: O(n)',
      space: 'O(h) recursion stack where h is tree height',
      notes: 'Self-balancing trees preserve O(log n) depth via tree rotations.'
    },
    notesContent: {
      en: {
        shortDescription: 'Binary trees, binary search trees, and recursive traversals',
        overview: [
          'A Tree is a non-linear hierarchical data structure consisting of nodes connected by directed edges. The topmost node is the root, and nodes without children are leaf nodes. Each non-root node has exactly one parent.',
          'Binary Search Trees (BST) maintain the BST invariant: for every node, all values in its left subtree are strictly less than its value, and all values in its right subtree are strictly greater. In a balanced BST (AVL, Red-Black), search, insertion, and deletion run in O(log n) time.',
          'Tree traversals come in two forms: Depth-First Search (Pre-order, In-order, Post-order) and Breadth-First Search (Level-order). In-order traversal of a BST yields elements in sorted ascending order.'
        ],
        keyConcept: {
          title: 'BST Invariant & In-Order Traversal',
          description: 'Traversing left child, current node, then right child produces a sorted sequence. Validating a BST requires ensuring each node stays within a bounded range (-inf, +inf) inherited from parent ancestors.'
        },
        complexityNotes: 'Self-balancing trees preserve O(log n) depth via tree rotations.'
      },
      hinglish: {
        shortDescription: 'Hierarchical node structure jisme Binary Search Trees aur recursive tree traversals aate hain',
        overview: [
          'Tree ek hierarchical (non-linear) data structure hai jisme sabse upar ek Root node hota hai, aur har child node kisi na kisi parent se connected hota hai. Jinke koi children nahi hote unhe Leaf nodes bolte hain.',
          'Binary Search Tree (BST) ka golden rule ye hai: har node ke left subtree ki saari values usse chhoti hongi, aur right subtree ki saari values usse badi hongi. Balanced BST me search, insert aur delete O(log n) time me complete ho jaate hain.',
          'Tree traversal do tarike se hoti hai: DFS (Pre-order, In-order, Post-order) aur BFS (Level-order). BST ka In-order traversal (Left -> Root -> Right) humesha values ko ascending sorted order me deta hai.'
        ],
        keyConcept: {
          title: 'BST Invariant & Range Bounding',
          description: 'Kisi tree ko validate karne ke liye sirf immediate parent se compare karna kaafi nahi hota; har node ke paas ek valid range (min, max) honi chahiye jo root se niche aate waqt inherit hoti hai.'
        },
        complexityNotes: 'Skewed tree me height O(n) tak degrade ho sakti hai, isliye production me AVL ya Red-Black balancing use hoti hai.'
      }
    },
    codeExample: {
      javascript: `function isValidBST(root) {
  function validate(node, low, high) {
    if (!node) return true;

    if ((low !== null && node.val <= low) ||
        (high !== null && node.val >= high)) {
      return false;
    }

    return validate(node.left, low, node.val) &&
           validate(node.right, node.val, high);
  }

  return validate(root, null, null);
}`,
      python: `def is_valid_bst(root) -> bool:
    def validate(node, low=float('-inf'), high=float('inf')) -> bool:
        if not node:
            return True
        if node.val <= low or node.val >= high:
            return False
        return validate(node.left, low, node.val) and validate(node.right, node.val, high)

    return validate(root)`,
      java: `public class ValidateBST {
    public boolean isValidBST(TreeNode root) {
        return validate(root, null, null);
    }
    private boolean validate(TreeNode node, Integer low, Integer high) {
        if (node == null) return true;
        if ((low != null && node.val <= low) || (high != null && node.val >= high)) return false;
        return validate(node.left, low, node.val) && validate(node.right, node.val, high);
    }
}`,
      cpp: `class Solution {
public:
    bool isValidBST(TreeNode* root) {
        return validate(root, nullptr, nullptr);
    }
private:
    bool validate(TreeNode* node, long* low, long* high) {
        if (!node) return true;
        if ((low && node->val <= *low) || (high && node->val >= *high)) return false;
        long val = node->val;
        return validate(node->left, low, &val) && validate(node->right, &val, high);
    }
};`
    },
    practiceProblem: {
      id: 'max-depth-binary-tree',
      title: 'Maximum Depth of Binary Tree',
      difficulty: 'Easy',
      description: 'Given the root of a binary tree, return its maximum depth. Maximum depth is the number of nodes along the longest path from the root down to the farthest leaf node.',
      exampleInput: 'root = [3, 9, 20, null, null, 15, 7]',
      exampleOutput: '3',
      constraints: ['0 <= Node count <= 10^4', '-100 <= Node.val <= 100'],
      starterCode: {
        javascript: `var maxDepth = function(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};`,
        python: `class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`,
        cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};`,
        java: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`
      },
      sampleSolution: 'Recursive divide and conquer computes 1 + max(left, right).'
    }
  },
  {
    id: 'graphs',
    title: 'Graphs',
    category: 'Non-Linear Structures',
    iconName: 'Share2',
    completed: false,
    difficulty: 'Medium',
    shortDescription: 'Vertices, edges, topological sort, and Dijkstra shortest path',
    overview: [
      'A Graph is a versatile mathematical structure composed of vertices (nodes) and edges (connections). Graphs can be directed or undirected, weighted or unweighted, cyclic or acyclic.',
      'Graph representation standardizes around Adjacency Lists (optimal for sparse graphs with O(V + E) space) and Adjacency Matrices (O(V^2) space with instantaneous O(1) edge existence queries).',
      'Essential algorithms include Dijkstra (single-source shortest path with non-negative weights), Bellman-Ford (negative weights), Kahn algorithm for Topological Sorting in Directed Acyclic Graphs (DAGs), and Union-Find for connected components.'
    ],
    keyConcept: {
      title: 'Visited Set & Cycle Detection',
      description: 'Always track visited vertices to avoid infinite cycles. In directed graphs, maintaining a state of Unvisited, Visiting (in active recursion stack), and Visited reliably detects back-edge cycles.'
    },
    complexity: {
      time: 'BFS/DFS: O(V + E) | Dijkstra: O((V + E) log V) | Floyd-Warshall: O(V^3)',
      space: 'O(V + E) adjacency list + O(V) visited tracker',
      notes: 'Topological sort requires a directed acyclic graph (DAG).'
    },
    notesContent: {
      en: {
        shortDescription: 'Vertices, edges, topological sort, and Dijkstra shortest path',
        overview: [
          'A Graph is a versatile mathematical structure composed of vertices (nodes) and edges (connections). Graphs can be directed or undirected, weighted or unweighted, cyclic or acyclic.',
          'Graph representation standardizes around Adjacency Lists (optimal for sparse graphs with O(V + E) space) and Adjacency Matrices (O(V^2) space with instantaneous O(1) edge existence queries).',
          'Essential algorithms include Dijkstra (single-source shortest path with non-negative weights), Bellman-Ford (negative weights), Kahn algorithm for Topological Sorting in Directed Acyclic Graphs (DAGs), and Union-Find for connected components.'
        ],
        keyConcept: {
          title: 'Visited Set & Cycle Detection',
          description: 'Always track visited vertices to avoid infinite cycles. In directed graphs, maintaining a state of Unvisited, Visiting (in active recursion stack), and Visited reliably detects back-edge cycles.'
        },
        complexityNotes: 'Topological sort requires a directed acyclic graph (DAG).'
      },
      hinglish: {
        shortDescription: 'Vertices aur edges ka network jisme BFS, DFS, Dijkstra shortest path aur cycles aate hain',
        overview: [
          'Graph ek flexible non-linear structure hai jo Vertices (nodes) aur Edges (connections) se banta hai. Real life me Google Maps road network, social network connections (followers/friends), aur web page links sab graph hi hain.',
          'Represent karne ke do standard methods hain: Adjacency List (memory efficient O(V + E) space, best for sparse graphs) aur Adjacency Matrix (O(V^2) space, fast edge existence checks).',
          'Core interview algorithms me Dijkstra (weighted shortest path), BFS/DFS traversals, Kahn algorithm (Topological Sort dependency resolution), aur Disjoint Set Union (DSU) aate hain.'
        ],
        keyConcept: {
          title: 'Cycle Avoidance with Visited Set',
          description: 'Graph me tree ki tarah root aur single path nahi hota, isliye infinite loop se bachne ke liye visited set maintain karna mandatory hai. Directed graph me back-edge check karke cycle detect hoti hai.'
        },
        complexityNotes: 'Topological sorting tabhi chal sakti hai jab graph Directed Acyclic Graph (DAG) ho, bina kisi cycle ke.'
      }
    },
    codeExample: {
      javascript: `// Dijkstra Single-Source Shortest Path
function dijkstra(graph, startNode) {
  const distances = {};
  const visited = new Set();
  
  for (const node in graph) distances[node] = Infinity;
  distances[startNode] = 0;

  while (visited.size < Object.keys(graph).length) {
    let minNode = null;
    let minDistance = Infinity;

    for (const node in distances) {
      if (!visited.has(node) && distances[node] < minDistance) {
        minDistance = distances[node];
        minNode = node;
      }
    }

    if (!minNode || minDistance === Infinity) break;
    visited.add(minNode);

    for (const neighbor in graph[minNode]) {
      const weight = graph[minNode][neighbor];
      const newDist = distances[minNode] + weight;
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
      }
    }
  }

  return distances;
}`,
      python: `import heapq

def dijkstra(graph: dict, start: str) -> dict:
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]

    while pq:
        curr_dist, u = heapq.heappop(pq)
        if curr_dist > distances[u]:
            continue

        for neighbor, weight in graph[u].items():
            distance = curr_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))

    return distances`,
      java: `import java.util.*;

public class Dijkstra {
    public static Map<String, Integer> shortestPath(Map<String, Map<String, Integer>> graph, String start) {
        Map<String, Integer> dist = new HashMap<>();
        for (String node : graph.keySet()) dist.put(node, Integer.MAX_VALUE);
        dist.put(start, 0);

        PriorityQueue<Map.Entry<String, Integer>> pq = new PriorityQueue<>(Map.Entry.comparingByValue());
        pq.offer(new AbstractMap.SimpleEntry<>(start, 0));

        while (!pq.isEmpty()) {
            var curr = pq.poll();
            String u = curr.getKey();
            int d = curr.getValue();
            if (d > dist.get(u)) continue;

            for (var edge : graph.getOrDefault(u, Map.of()).entrySet()) {
                int newDist = d + edge.getValue();
                if (newDist < dist.getOrDefault(edge.getKey(), Integer.MAX_VALUE)) {
                    dist.put(edge.getKey(), newDist);
                    pq.offer(new AbstractMap.SimpleEntry<>(edge.getKey(), newDist));
                }
            }
        }
        return dist;
    }
}`,
      cpp: `#include <vector>
#include <queue>
#include <unordered_map>
#include <string>

std::unordered_map<std::string, int> dijkstra(
    const std::unordered_map<std::string, std::unordered_map<std::string, int>>& graph,
    const std::string& start
) {
    std::unordered_map<std::string, int> dist;
    for (const auto& pair : graph) dist[pair.first] = 1e9;
    dist[start] = 0;

    using PII = std::pair<int, std::string>;
    std::priority_queue<PII, std::vector<PII>, std::greater<PII>> pq;
    pq.push({0, start});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;

        if (graph.count(u)) {
            for (const auto& [v, w] : graph.at(u)) {
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.push({dist[v], v});
                }
            }
        }
    }
    return dist;
}`
    },
    practiceProblem: {
      id: 'number-of-islands',
      title: 'Number of Islands',
      difficulty: 'Medium',
      description: 'Given an m x n 2D binary grid grid which represents a map of "1"s (land) and "0"s (water), return the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.',
      exampleInput: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]',
      exampleOutput: '2',
      constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300'],
      starterCode: {
        javascript: `var numIslands = function(grid) {
  if (!grid || grid.length === 0) return 0;
  let count = 0;
  const rows = grid.length, cols = grid[0].length;
  
  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0'; // mark visited in-place
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
};`,
        python: `class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid: return 0
        rows, cols = len(grid), len(grid[0])
        count = 0
        def dfs(r, c):
            if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != '1':
                return
            grid[r][c] = '0'
            dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    count += 1
                    dfs(r, c)
        return count`,
        cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        int count = 0;
        int m = grid.size(), n = grid[0].size();
        auto dfs = [&](auto self, int r, int c) -> void {
            if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] != '1') return;
            grid[r][c] = '0';
            self(self, r+1, c); self(self, r-1, c); self(self, r, c+1); self(self, r, c-1);
        };
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == '1') { count++; dfs(dfs, r, c); }
            }
        }
        return count;
    }
};`,
        java: `class Solution {
    public int numIslands(char[][] grid) {
        int count = 0;
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    sink(grid, r, c);
                }
            }
        }
        return count;
    }
    void sink(char[][] g, int r, int c) {
        if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] != '1') return;
        g[r][c] = '0';
        sink(g, r+1, c); sink(g, r-1, c); sink(g, r, c+1); sink(g, r, c-1);
    }
}`
      },
      sampleSolution: 'Grid DFS traversal flood-fills connected components.'
    }
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    category: 'Optimization Algorithms',
    iconName: 'Cpu',
    completed: false,
    difficulty: 'Hard',
    shortDescription: 'Optimal substructure, overlapping subproblems, and state transitions',
    overview: [
      'Dynamic Programming (DP) is a systematic method for solving complex optimization problems by breaking them down into simpler, overlapping subproblems. A problem is amenable to DP if it exhibits Optimal Substructure (an optimal solution contains optimal solutions to subproblems) and Overlapping Subproblems (subproblems recur repeatedly).',
      'DP implementations fall into two paradigms: Top-Down with Memoization (recursive formulation with cache lookups) and Bottom-Up with Tabulation (iterative filling of table cells following a topological dependency order).',
      'Classic archetypes include 0/1 Knapsack, Longest Common Subsequence (LCS), Edit Distance, and Coin Change. Space optimization often enables compressing 2D tables down to 1D arrays when a state depends strictly on the preceding row.'
    ],
    keyConcept: {
      title: 'State Transition Formulation',
      description: 'Define `dp[i]` precisely as the optimal answer for subproblem size i. For example, in Coin Change: `dp[a] = min(dp[a - coin] + 1)` for each available coin denomination.'
    },
    complexity: {
      time: 'Polynomial O(N * S) where N is items and S is capacity/states',
      space: 'O(S) with rolling array optimization, O(N * S) standard table',
      notes: 'Transforms exponential O(2^n) brute force recursion into efficient polynomial time.'
    },
    notesContent: {
      en: {
        shortDescription: 'Optimal substructure, overlapping subproblems, and state transitions',
        overview: [
          'Dynamic Programming (DP) is a systematic method for solving complex optimization problems by breaking them down into simpler, overlapping subproblems. A problem is amenable to DP if it exhibits Optimal Substructure (an optimal solution contains optimal solutions to subproblems) and Overlapping Subproblems (subproblems recur repeatedly).',
          'DP implementations fall into two paradigms: Top-Down with Memoization (recursive formulation with cache lookups) and Bottom-Up with Tabulation (iterative filling of table cells following a topological dependency order).',
          'Classic archetypes include 0/1 Knapsack, Longest Common Subsequence (LCS), Edit Distance, and Coin Change. Space optimization often enables compressing 2D tables down to 1D arrays when a state depends strictly on the preceding row.'
        ],
        keyConcept: {
          title: 'State Transition Formulation',
          description: 'Define `dp[i]` precisely as the optimal answer for subproblem size i. For example, in Coin Change: `dp[a] = min(dp[a - coin] + 1)` for each available coin denomination.'
        },
        complexityNotes: 'Transforms exponential O(2^n) brute force recursion into efficient polynomial time.'
      },
      hinglish: {
        shortDescription: 'Subproblems ko todkar memoize karna aur optimal state transitions banana',
        overview: [
          'Dynamic Programming (DP) optimization sawalon ko solve karne ki superpower hai. Jab kisi problem me Overlapping Subproblems (ek hi calculation bar-bar repeat hona) aur Optimal Substructure (chhote hisson ke optimal answer se bada answer banna) ho, wahan DP lagta hai.',
          'DP implement karne ke do tareeqe hote hain: Top-Down Memoization (recursion ke sath computed results ko cache/hashmap me save karna) aur Bottom-Up Tabulation (base case se shuru karke table ko loop se fill karna).',
          'Famous patterns me Coin Change, 0/1 Knapsack, Longest Increasing Subsequence (LIS), aur Edit Distance aate hain. Aise sawal exponential O(2^n) brute-force ko polynomial O(N * S) me convert kar dete hain.'
        ],
        keyConcept: {
          title: 'Recurrence Relation & State Definition',
          description: 'Pehle define karo dp[i] ka matlab kya hai. Jaise Coin Change me: dp[amount] = minimum coins required. Recurrence relation banega: dp[a] = min(dp[a - coin] + 1). Base case dp[0] = 0 define karo aur loop chala do.'
        },
        complexityNotes: 'Agar state transition sirf pichle row pe depend karti hai toh 2D table ko 1D rolling array me compress karke space optimize kar sakte hain.'
      }
    },
    codeExample: {
      javascript: `function coinChange(coins, amount) {
  // dp[i] stores minimum coins to make amount i
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // Base case: 0 coins needed for 0 amount

  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (a - coin >= 0) {
        dp[a] = Math.min(dp[a], dp[a - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      python: `def coin_change(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    for a in range(1, amount + 1):
        for coin in coins:
            if a - coin >= 0:
                dp[a] = min(dp[a], dp[a - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1`,
      java: `import java.util.Arrays;

public class CoinChange {
    public static int coinChange(int[] coins, int amount) {
        int max = amount + 1;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, max);
        dp[0] = 0;

        for (int a = 1; a <= amount; a++) {
            for (int coin : coins) {
                if (a - coin >= 0) {
                    dp[a] = Math.min(dp[a], dp[a - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
      cpp: `#include <vector>
#include <algorithm>

int coinChange(std::vector<int>& coins, int amount) {
    std::vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;

    for (int a = 1; a <= amount; ++a) {
        for (int coin : coins) {
            if (a - coin >= 0) {
                dp[a] = std::min(dp[a], dp[a - coin] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`
    },
    practiceProblem: {
      id: 'climbing-stairs',
      title: 'Climbing Stairs',
      difficulty: 'Easy',
      description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
      exampleInput: 'n = 3',
      exampleOutput: '3 (1+1+1, 1+2, 2+1)',
      constraints: ['1 <= n <= 45'],
      starterCode: {
        javascript: `var climbStairs = function(n) {
  if (n <= 2) return n;
  let prev2 = 1;
  let prev1 = 2;
  
  for (let i = 3; i <= n; i++) {
    let curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
};`,
        python: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2: return n
        a, b = 1, 2
        for _ in range(3, n + 1):
            a, b = b, a + b
        return b`,
        cpp: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b; b = c;
        }
        return b;
    }
};`,
        java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b; b = c;
        }
        return b;
    }
}`
      },
      sampleSolution: 'Fibonacci state transition dp[i] = dp[i-1] + dp[i-2] in O(1) memory.'
    }
  },
  {
    id: 'sorting',
    title: 'Sorting',
    category: 'Algorithms',
    iconName: 'ArrowUpDown',
    completed: false,
    difficulty: 'Medium',
    shortDescription: 'Divide & conquer, comparison bounds, and partition algorithms',
    overview: [
      'Sorting algorithms arrange elements of a list in a specific relational order (usually numerical or alphabetical). Comparison-based sorting algorithms have a proven theoretical lower bound of Ω(n log n) in the worst case.',
      'Merge Sort guarantees O(n log n) worst-case time and offers stability (preserving relative order of equal keys), but requires O(n) auxiliary space. Quick Sort sorts in-place with average O(n log n) speed and high cache locality via Hoare or Lomuto partitioning.',
      'Non-comparison sorts like Counting Sort, Radix Sort, and Bucket Sort circumvent the comparison bound, achieving linear O(n + k) runtime when keys reside in constrained integer ranges.'
    ],
    keyConcept: {
      title: 'Divide and Conquer Invariant',
      description: 'Merge Sort splits arrays into halves recursively until trivial single-element arrays remain, then merges sorted sub-lists into a combined array in linear O(n) pass.'
    },
    complexity: {
      time: 'Merge Sort: O(n log n) guaranteed | Quick Sort: O(n log n) avg, O(n^2) worst',
      space: 'Merge Sort: O(n) | Quick Sort: O(log n) call stack',
      notes: 'Timsort combines merge sort and insertion sort, powering V8 and Python sort.'
    },
    notesContent: {
      en: {
        shortDescription: 'Divide & conquer, comparison bounds, and partition algorithms',
        overview: [
          'Sorting algorithms arrange elements of a list in a specific relational order (usually numerical or alphabetical). Comparison-based sorting algorithms have a proven theoretical lower bound of Ω(n log n) in the worst case.',
          'Merge Sort guarantees O(n log n) worst-case time and offers stability (preserving relative order of equal keys), but requires O(n) auxiliary space. Quick Sort sorts in-place with average O(n log n) speed and high cache locality via Hoare or Lomuto partitioning.',
          'Non-comparison sorts like Counting Sort, Radix Sort, and Bucket Sort circumvent the comparison bound, achieving linear O(n + k) runtime when keys reside in constrained integer ranges.'
        ],
        keyConcept: {
          title: 'Divide and Conquer Invariant',
          description: 'Merge Sort splits arrays into halves recursively until trivial single-element arrays remain, then merges sorted sub-lists into a combined array in linear O(n) pass.'
        },
        complexityNotes: 'Timsort combines merge sort and insertion sort, powering V8 and Python sort.'
      },
      hinglish: {
        shortDescription: 'Divide & Conquer techniques, Merge Sort, aur Quick Sort partitioning',
        overview: [
          'Sorting algorithms list ke elements ko ascending ya descending order me arrange karte hain. Comparison-based sorting ka mathematical proof hai ki worst-case time Ω(n log n) se fast nahi ho sakta.',
          'Merge Sort guarantee deta hai O(n log n) worst-case speed aur stability (equal values ka relative order kharab nahi hota), par isko extra O(n) temporary space chahiye hota hai.',
          'Quick Sort in-place partitioning (pivot element chunn kar) use karta hai. Average case O(n log n) rehta hai aur high cache locality ki wajah se real world me kaafi fast perform karta hai.'
        ],
        keyConcept: {
          title: 'Divide and Conquer & Linear Merge',
          description: 'Merge Sort array ko beech se do tukdon me todta rehta hai jab tak 1-size ke sub-arrays na bachein. Phir do sorted halves ko two-pointer technique se O(n) me combine (merge) kar deta hai.'
        },
        complexityNotes: 'Python aur JavaScript V8 engines me Timsort use hota hai jo Merge Sort aur Insertion Sort ka hybrid blend hai.'
      }
    },
    codeExample: {
      javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let l = 0, r = 0;

  while (l < left.length && r < right.length) {
    if (left[l] <= right[r]) {
      result.push(left[l++]);
    } else {
      result.push(right[r++]);
    }
  }

  return result.concat(left.slice(l)).concat(right.slice(r));
}`,
      python: `def merge_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left: list[int], right: list[int]) -> list[int]:
    result = []
    l = r = 0
    while l < len(left) and r < len(right):
        if left[l] <= right[r]:
            result.append(left[l])
            l += 1
        else:
            result.append(right[r])
            r += 1
    result.extend(left[l:])
    result.extend(right[r:])
    return result`,
      java: `public class MergeSort {
    public static void sort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            sort(arr, left, mid);
            sort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    private static void merge(int[] arr, int left, int mid, int right) {
        int[] temp = new int[right - left + 1];
        int i = left, j = mid + 1, k = 0;
        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) temp[k++] = arr[i++];
            else temp[k++] = arr[j++];
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];
        System.arraycopy(temp, 0, arr, left, temp.length);
    }
}`,
      cpp: `#include <vector>

void merge(std::vector<int>& arr, int left, int mid, int right) {
    std::vector<int> temp(right - left + 1);
    int i = left, j = mid + 1, k = 0;
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) temp[k++] = arr[i++];
        else temp[k++] = arr[j++];
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    for (int p = 0; p < k; ++p) arr[left + p] = temp[p];
}

void mergeSort(std::vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}`
    },
    practiceProblem: {
      id: 'sort-an-array',
      title: 'Sort an Array',
      difficulty: 'Medium',
      description: 'Given an array of integers nums, sort the array in ascending order and return it in O(n log n) time complexity and without using any built-in functions.',
      exampleInput: 'nums = [5, 2, 3, 1]',
      exampleOutput: '[1, 2, 3, 5]',
      constraints: ['1 <= nums.length <= 5 * 10^4', '-5 * 10^4 <= nums[i] <= 5 * 10^4'],
      starterCode: {
        javascript: `var sortArray = function(nums) {
  if (nums.length <= 1) return nums;
  const mid = Math.floor(nums.length / 2);
  const left = sortArray(nums.slice(0, mid));
  const right = sortArray(nums.slice(mid));
  
  let res = [], i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) res.push(left[i++]);
    else res.push(right[j++]);
  }
  return res.concat(left.slice(i)).concat(right.slice(j));
};`,
        python: `class Solution:
    def sortArray(self, nums: List[int]) -> List[int]:
        if len(nums) <= 1: return nums
        mid = len(nums) // 2
        left = self.sortArray(nums[:mid])
        right = self.sortArray(nums[mid:])
        res = []
        i = j = 0
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                res.append(left[i]); i += 1
            else:
                res.append(right[j]); j += 1
        res.extend(left[i:])
        res.extend(right[j:])
        return res`,
        cpp: `class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        return nums;
    }
};`,
        java: `class Solution {
    public int[] sortArray(int[] nums) {
        Arrays.sort(nums);
        return nums;
    }
}`
      },
      sampleSolution: 'Merge sort recursion with linear auxiliary merge pass.'
    }
  },
  {
    id: 'searching',
    title: 'Searching',
    category: 'Algorithms',
    iconName: 'Search',
    completed: false,
    difficulty: 'Easy',
    shortDescription: 'Binary search, predicate search spaces, and lower/upper bounds',
    overview: [
      'Searching algorithms locate targets within collections. Linear Search evaluates every item in O(n) time. When data is ordered or monotonic, Binary Search halves the candidate search space at each iteration, completing in O(log n) time.',
      'Binary Search extends far beyond simple array lookups: it applies to any monotonic decision predicate `f(x) -> boolean`. This "Binary Search on Answer" pattern solves optimization problems like "Koko Eating Bananas" and "Split Array Largest Sum".',
      'Careful boundary index computation `mid = left + Math.floor((right - left) / 2)` prevents integer overflow. Precision with loop invariants (`while (left <= right)` vs `while (left < right)`) determines correct lower-bound versus upper-bound convergence.'
    ],
    keyConcept: {
      title: 'Monotonic Search Space',
      description: 'If condition(x) is monotonic (e.g. false, false, ..., true, true), binary search identifies the first true index in O(log n) steps by inspecting mid.'
    },
    complexity: {
      time: 'Binary Search: O(log n) | Linear Search: O(n)',
      space: 'O(1) iterative space',
      notes: 'Always ensure mid computation avoids potential 32-bit overflow.'
    },
    notesContent: {
      en: {
        shortDescription: 'Binary search, predicate search spaces, and lower/upper bounds',
        overview: [
          'Searching algorithms locate targets within collections. Linear Search evaluates every item in O(n) time. When data is ordered or monotonic, Binary Search halves the candidate search space at each iteration, completing in O(log n) time.',
          'Binary Search extends far beyond simple array lookups: it applies to any monotonic decision predicate `f(x) -> boolean`. This "Binary Search on Answer" pattern solves optimization problems like "Koko Eating Bananas" and "Split Array Largest Sum".',
          'Careful boundary index computation `mid = left + Math.floor((right - left) / 2)` prevents integer overflow. Precision with loop invariants (`while (left <= right)` vs `while (left < right)`) determines correct lower-bound versus upper-bound convergence.'
        ],
        keyConcept: {
          title: 'Monotonic Search Space',
          description: 'If condition(x) is monotonic (e.g. false, false, ..., true, true), binary search identifies the first true index in O(log n) steps by inspecting mid.'
        },
        complexityNotes: 'Always ensure mid computation avoids potential 32-bit overflow.'
      },
      hinglish: {
        shortDescription: 'Binary search, search space reduction, aur monotonic conditions pe O(log n) lookup',
        overview: [
          'Searching algorithms kisi collection me target element dhundte hain. Unsorted array me har element check karna padta hai jo Linear Search O(n) leta hai. Lekin agar data sorted ya monotonic ho, toh Binary Search har step pe search space ko aadha kar deta hai O(log n) time me.',
          'Binary Search sirf simple arrays tak limited nahi hai; ye kisi bhi monotonic decision condition (Binary Search on Answer) pe lag sakta hai—jaise "Koko Eating Bananas" ya capacity optimization problems.',
          'Mid nikalte waqt 32-bit integer overflow se bachne ke liye `left + (right - left) // 2` formula use karna best practice maana jata hai.'
        ],
        keyConcept: {
          title: 'Halving Search Space & Mid Logic',
          description: 'Agar nums[mid] == target mil gaya toh seedha index return karo. Agar target bada hai toh search space ke right half me jao (`left = mid + 1`), aur agar chhota hai toh left half me jao (`right = mid - 1`).'
        },
        complexityNotes: 'Boundary conditions ka dhyan rakhna bohot zaroori hai (`left <= right` vs `left < right`) taaki infinite loop na bane.'
      }
    },
    codeExample: {
      javascript: `function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    // Avoid integer overflow
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid; // Index found
    } else if (nums[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }

  return -1; // Target not present
}`,
      python: `def binary_search(nums: list[int], target: int) -> int:
    left = 0
    right = len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left += 1
        else:
            right -= 1

    return -1`,
      java: `public class BinarySearch {
    public static int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,
      cpp: `#include <vector>

int binarySearch(const std::vector<int>& nums, int target) {
    int left = 0;
    int right = static_cast<int>(nums.size()) - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`
    },
    practiceProblem: {
      id: 'binary-search',
      title: 'Binary Search',
      difficulty: 'Easy',
      description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.',
      exampleInput: 'nums = [-1, 0, 3, 5, 9, 12], target = 9',
      exampleOutput: '4',
      constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'nums is unique and sorted'],
      starterCode: {
        javascript: `var search = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
};`,
        python: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums) - 1
        while l <= r:
            mid = l + (r - l) // 2
            if nums[mid] == target: return mid
            if nums[mid] < target: l = mid + 1
            else: r = mid - 1
        return -1`,
        cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) l = mid + 1;
            else r = mid - 1;
        }
        return -1;
    }
};`,
        java: `class Solution {
    public int search(int[] nums, int target) {
        int l = 0, r = nums.length - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) l = mid + 1;
            else r = mid - 1;
        }
        return -1;
    }
}`
      },
      sampleSolution: 'Classic interval halving in logarithmic O(log n) steps.'
    }
  }
];

export const DSA_TOPICS: DSATopic[] = RAW_DSA_TOPICS.map(topic => ({
  ...topic,
  visualizer: TOPIC_VISUALIZERS[topic.id],
  hints: getTopicHints(topic.id, topic.title),
  quiz: getTopicQuiz(topic.id, topic.title),
  complexityDetail: getTopicComplexity(topic.id, topic.title)
}));

export const INITIAL_CHAT_MESSAGES: Record<string, Array<{ sender: 'user' | 'gemini'; text: string }>> = {
  'linked-list': [
    {
      sender: 'user',
      text: 'How do I visualize a pointer swap when reversing a singly linked list?'
    },
    {
      sender: 'gemini',
      text: "Think of a pointer swap as moving a physical arrow. To reverse a list, you need 3 pointers:\n\n• prev: The node you already visited (starts at null)\n• curr: The node you're on (starts at head)\n• next: The node you're about to visit (curr.next)\n\nAt each step: save next = curr.next, redirect curr.next = prev, then slide prev = curr and curr = next."
    }
  ],
  'arrays': [
    {
      sender: 'user',
      text: 'Why does the two-pointer approach work in O(n) for Two Sum on sorted arrays?'
    },
    {
      sender: 'gemini',
      text: "Because the array is sorted, every comparison eliminates one candidate boundary! If `nums[left] + nums[right] > target`, the only way to reduce the sum is decrementing `right`. Incrementing `left` would only increase it. This guarantees we don't skip valid pairs while avoiding quadratic O(n²) checks."
    }
  ],
  'stacks': [
    {
      sender: 'user',
      text: 'When should I choose a monotonic stack instead of a regular array scan?'
    },
    {
      sender: 'gemini',
      text: 'Use a Monotonic Stack whenever you need to find the "Next Greater Element", "Previous Smaller Element", or the boundary span of each element (e.g. Largest Rectangle in Histogram). It maintains an invariant that processes elements in amortized O(1) per item.'
    }
  ]
};
