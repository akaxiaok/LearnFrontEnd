function Tile(dom) {
  this.value = 0;
  this.dom = dom;
}

var DIRECTIONS_MAP = {
  Left: [0, 1],
  Right: [0, -1],
  Top: [1, 0],
  Bottom: [-1, 0]
};
var DIRECTIONS = {
  LEFT: 'Left',
  RIGHT: 'Right',
  TOP: 'Top',
  BOTTOM: 'Bottom'
};

function App() {
  this.tiles = [];
  this.rows = 0;
  this.colums = 0;
}

App.prototype.init = function (rows, columns) {
  this.rows = rows;
  this.colums = columns;
  var tiles = document.createDocumentFragment();
  for (var i = 0; i < rows; i++) {
    this.tiles[i] = [];
    var row = document.createElement('div');
    row.className = 'row';
    for (var j = 0; j < columns; j++) {
      var col = document.createElement('div');
      col.className = 'cell tile_0';
      col.textContent = 0;
      row.appendChild(col);
      this.tiles[i].push(new Tile(col));
    }
    tiles.appendChild(row);
  }
  var tilesDOM = document.getElementById('tiles');

  for (var i = 0; i < 2; i++) {
    var temp = this.tiles[random(3)][random(3)];
    temp.update(2);
  }
  tilesDOM.appendChild(tiles);
  this.actionBind();

};

Tile.prototype.update = function (newValue) {
  this.value = newValue;
  this.dom.textContent = newValue;
  this.dom.className = this.dom.className.replace(/tile\w+/g, 'tile_' + newValue);
};

App.prototype.move = function (dir) {
  var horizontal = DIRECTIONS_MAP[dir][0],
    vertical = DIRECTIONS_MAP[dir][1];
  var i = horizontal > -1 ? 0 : this.tiles.length - 1;
  for (; i > -1 && i < this.tiles.length; i += (horizontal === 0 ? 1 : horizontal)) {
    var j = vertical > -1 ? 0 : this.tiles[0].length - 1;
    for (; j > -1 && j < this.tiles[0].length; j += (vertical === 0 ? 1 : vertical)) {
      this.moveOneTile(i, j, horizontal, vertical);
    }
  }
  this.updateDOM();
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
App.prototype.updateDOM = function () {
  var isEmptyTile = false;
  this.tiles.forEach(function (row) {
    row.forEach(function (cell) {
      cell.update(cell.value);
      if (cell.value === 0) {
        isEmptyTile = true;
      }
    })
  });
  if (isEmptyTile) {
    this.makeNewTile();
  } else {
    this.endGame();
  }
};
App.prototype.makeNewTile = function () {
  var emptyTiles = [];
  this.tiles.forEach(function (row) {
    row.forEach(function (cell) {
      if (cell.value === 0) {
        emptyTiles.push(cell);
      }
    })
  });
  var randomOne = random(emptyTiles.length - 1),
    randomTwo = random(emptyTiles.length - 1);
  emptyTiles[randomOne].update(2);
  emptyTiles[randomTwo].update(2);
};
App.prototype.endGame = function () {

};
App.prototype.actionBind = function () {
  var app = this;
  window.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
      case 37:
        app.move(DIRECTIONS.LEFT);
        break;
      case 38:
        app.move(DIRECTIONS.TOP);
        break;
      case 39:
        app.move(DIRECTIONS.RIGHT);
        break;
      case 40:
        app.move(DIRECTIONS.BOTTOM);
        break;
      default:
        break;
    }
  })
};


function random(min, max) {
  if (!max) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
}

var app = new App();
app.init(8, 8);




