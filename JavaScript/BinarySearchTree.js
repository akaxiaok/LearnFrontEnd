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
  }
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