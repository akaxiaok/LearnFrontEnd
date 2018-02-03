function BinarySearchTree() {
  var Node = function (key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
  var root = null;

  function insertNode(node, newNode) {
    if (node === newNode) return;
    var direction = newNode.key < node.key ? 'left' : 'right';
    if (node[direction] === null) {
      node[direction] = newNode;
    } else {
      insertNode(node[direction], newNode);
    }
  }

  this.insert = function (key) {
    var newNode = new Node(key);
    if (root === null) {
      root = newNode;
    } else {
      insertNode(root, newNode);
    }
  };

  function preOrderNodeTran(node, fn) {
    if (node !== null) {
      fn(node.key);
      preOrderNodeTran(node.left, fn);
      preOrderNodeTran(node.right, fn);
    }
  }

  this.preOrderTran = function (fn) {
    preOrderNodeTran(root, fn);
  };

  function inOrderNodeTran(node, fn) {
    if (node !== null) {
      inOrderNodeTran(node.left, fn);
      fn(node.key);
      inOrderNodeTran(node.right, fn);
    }
  }

  this.inOrderTran = function (fn) {
    inOrderNodeTran(root, fn);
  };

  function postOrderNodeTran(node, fn) {
    if (node !== null) {
      postOrderNodeTran(node.left, fn);
      postOrderNodeTran(node.right, fn);
      fn(node.key);

    }
  }

  this.postOrderTran = function (fn) {
    postOrderNodeTran(root, fn);
  };

  this.min = function min(node) {
    node = node || root;
    if (node.left) {
      return min(node.left);
    } else {
      return node.key;
    }
  };
  this.max = function max(node) {
    node = node || root;
    if (node.right) {
      return max(node.right);
    } else {
      return node.key;
    }
  };
  this.search = function search(key, node) {
    node = node || root;
    if (node.key === key) {
      return true
    }
    if (!node.left && !node.right) {
      return false;
    }
    if (key < node.key) {
      return search(key, node.left);
    } else {
      return search(key, node.right);
    }
  };
  this.remove = function (key) {
    root = removeNode(root, key);
  };

  var removeNode = function (node, key) {
    if (node === null) {
      return null;
    }
    if (key < node.key) {
      node.left = removeNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = removeNode(node.right, key);
      return node;
    } else {
      if (node.left && node.right) {
        var min = BST.min(node.right);
        node.key = min;
        node.right = removeNode(node.right, min);
        return node;
      } else if (node.left) {
        return node.left;
      } else if (node.right) {
        return node.right;
      } else {
        return null;
      }
    }
  };

}

var BST = new BinarySearchTree();
BST.insert(4);
BST.insert(7);
BST.insert(2);
BST.insert(6);
BST.insert(0);
var result = [];

function addToResult(key) {
  result.push(key);
}

BST.preOrderTran(addToResult);
console.assert(result.toString() === '4,2,0,7,6', '42076');

result.length = 0;
BST.inOrderTran(addToResult);
console.assert(result.toString() === '0,2,4,6,7', '02467');

result.length = 0;
BST.postOrderTran(addToResult);
console.assert(result.toString() === '0,2,6,7,4', '02467');


console.assert(BST.min() === 0, 'min is 0');
console.assert(BST.max() === 7, 'max is 7');

console.assert(BST.search(6) === true, '6 in BST');
console.assert(BST.search(5) === false, '5 not in BST');

BST.insert(3);
BST.insert(8);

BST.remove(0);
result.length = 0;
BST.preOrderTran(addToResult);
console.assert(result.toString() === '4,2,3,7,6,8', '423768');
BST.insert(0);
BST.remove(2);
result.length = 0;
BST.preOrderTran(addToResult);
console.assert(result.toString() === '4,3,0,7,6,8', '430768');
BST.insert(2);
BST.remove(4);
result.length = 0;
BST.preOrderTran(addToResult);
console.assert(result.toString() === '6,3,0,2,7,8', '630278');
