function LinkedList() {
  var head = null;
  var tail = null;
  var length = 0;
  var ListNode = function (element) {
    this.element = element;
    this.prev = null;
    this.next = null;
  };
  this.append = function (element) {
    var node = new ListNode(element);
    if (head === null) {
      head = node;
      tail = node;
    } else {
      node.prev = tail;
      tail.next = node;
      tail = node;
    }
    length += 1;
  };
  this.insertAt = function (position, element) {
    if (position < 0 || position > length) {
      return false
    } else if (position === length) {
      this.append(element);
      return true;
    }

    var node = new ListNode(element);
    var target = head;

    for (var i = 0; i < position; i++) {
      target = target.next;
    }
    if (target === head) {
      target.prev = node;
      node.next = target;
      head = node;
    } else if (target) {
      target.prev.next = node;
      node.prev = target.prev;
      node.next = target;
      target.prev = node;
    }
    length++;
    return true;
  };

  function removeNode(target) {
    if (target === head) {
      head = target.next;
      //head is null means list is empty
      if (head === null) {
        tail = null;
      }
    } else if (target === tail) {
      tail = target.prev;
      tail.next = null;
    } else if (target) {
      target.prev.next = target.next;
      target.next.prev = target.prev;
    }
    length -= 1;
    target = null;
  }

  this.removeAt = function (position) {
    var target = head;
    if (position < 0 || position >= length) {
      return false;
    }
    if (position === length - 1) {
      removeNode(tail);
      return true;
    }
    for (var i = 0; i < position; i++) {
      target = target.next;
    }
    removeNode(target);
    return true;
  };
  this.remove = function (element) {
    var target = head;
    for (var i = 0; i < length; i++) {
      if (target.element !== element) {
        target = target.next;
      } else {
        break;
      }
    }
    // if element is there then remove it
    if (target) {
      removeNode(target);
      return true;
    }
    else {
      return false;
    }
  };
  this.get = function (position) {
    var target = head;
    if (position === length) {
      return tail;
    }
    for (var i = 0; i < position; i++) {
      target = target.next;
    }
    return target;
  };
  this.head = function () {
    return head;
  };
  this.tail = function () {
    return tail;
  };
  this.length = function () {
    return length;
  }
  this.toString = function () {
    var target = head,
      result = '';
    for (var i = 0; i < length; i++) {
      result = result.concat(' ', target.element);
      target = target.next;
    }
    return result.slice(1, result.length);
  }
}

var list = new LinkedList();
list.append('Zhao');
list.append('Qian');
list.append('Li');
console.assert(list.length() === 3, 'list length is 3');
list.insertAt(2, 'Sun');
console.assert(list.get(2).element === 'Sun', 'position 2 is Sun');
list.insertAt(0, 'HEAD');
console.assert(list.head().element === 'HEAD', 'head is HEAD');
list.removeAt('1');
console.assert(list.get(1).element, 'position 1 is Qian');
list.remove('Qian');
console.assert(list.get(1), 'position 1 is Sun');
list.removeAt(2);
console.assert(list.remove('None') === false, 'remove None return false');
console.assert(list.removeAt(-1) === false, 'remove at -1 return false');
console.assert(list.removeAt(5) === false, 'remove at 5 return false');
console.assert(list.removeAt(1) === true, 'remove at 1 return true');
console.assert(list.removeAt(0) === true, 'remove at 0 return true');
console.assert(list.length() === 0, 'list length is 0');
console.assert(list.head() === null, 'head is null');
console.assert(list.tail() === null, 'tail is null');
list.append('Zhao');
list.insertAt(1, 'Qian');
list.insertAt(2, 'Sun');
console.assert(list.toString() === 'Zhao Qian Sun', 'toString');

