function Tile() {
  this.value = 0;
}

DIRECTIONS = {
  Left: [0, 1],
  Right: [0, -1],
  Top: [1, 0],
  Bottom: [-1, 0]
};


function App() {
  this.tiles = [];

}

App.prototype.init = function (rows, columns) {
  for (var i = 0; i < rows; i++) {
    this.tiles[i] = [];
    for (var j = 0; j < columns; j++) {
      this.tiles[i].push(new Tile());
    }
  }
};
App.prototype.move = function (dir) {
  var horizontal = DIRECTIONS[dir][0],
    vertical = DIRECTIONS[dir][1];
  var i = horizontal > -1 ? 0 : this.tiles.length - 1;
  for (; i > -1 && i < this.tiles.length; i += (horizontal === 0 ? 1 : horizontal)) {
    var j = vertical > -1 ? 0 : this.tiles[0].length - 1;
    for (; j > -1 && j < this.tiles[0].length; j += (vertical === 0 ? 1 : vertical)) {
      this.moveOneTile(i, j, horizontal, vertical);
    }
  }
};
App.prototype.moveOneTile = function (i, j, h, v) {
  var current = this.tiles[i][j];
  var target = this.tiles[i - h] ? this.tiles[i - h][j - v] : undefined;
  if (target && (target.value === 0 || target.value === current.value)) {
    target.value += current.value;
    current.value = 0;
    this.moveOneTile(i - h, j - v, h, v);
  }
};
var app = new App();
app.init(4, 4);

console.assert(app.tiles.length === 4);
console.assert(app.tiles[0].length === 4);


function data() {
  app.tiles.forEach((v) => {
      v.forEach((v, i) => {
        v.value = i * 2;
      })
    }
  )
}

function print() {
  for (var i = 0; i < app.tiles.length; i++) {
    var tiles = app.tiles[i];
    console.log(...tiles);
  }
}

data();
app.move('Bottom');
print();