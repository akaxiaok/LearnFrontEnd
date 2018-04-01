function Tile(dom) {
  this.value = 0;
  this.dom = dom;
}

Tile.prototype.update = function (newValue) {
  this.value = newValue;
  this.dom.textContent = newValue;
  this.dom.className = this.dom.className.replace(/tile\w+/g, 'tile_' + newValue);
};

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
  this.emptyTiles = [];
  this.listener = this.keyDownHandler.bind(this);
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
    var temp = this.tiles[random(this.rows - 1)][random(this.colums - 1)];
    temp.update(2);
  }
  tilesDOM.appendChild(tiles);
  this.actionBind();

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
  if (target && target.value === current.value) {
    target.value += current.value;
    current.value = 0;
    this.moveOneTileNext(i - h, j - v, h, v);
  } else if (target && target.value === 0) {
    target.value += current.value;
    current.value = 0;
    this.moveOneTile(i - h, j - v, h, v);
  }
};

App.prototype.moveOneTileNext = function (i, j, h, v) {
  var current = this.tiles[i][j];
  var target = this.tiles[i - h] ? this.tiles[i - h][j - v] : undefined;
  if (target && target.value === 0) {
    target.value += current.value;
    current.value = 0;
    this.moveOneTileNext(i - h, j - v, h, v);
  }
};

App.prototype.updateDOM = function () {
  var app = this;
  this.emptyTiles.length = 0;
  this.tiles.forEach(function (row) {
    row.forEach(function (cell) {
      cell.update(cell.value);
      if (cell.value === 0) {
        app.emptyTiles.push(cell);
      }
    })
  });
  if (this.emptyTiles.length > 1) {
    this.makeNewTile();
  } else if (this.emptyTiles.length === 1) {
    this.makeNewTile();
    this.endGame();
  } else {
    this.endGame();
  }
};

App.prototype.makeNewTile = function () {
  var randomOne = random(this.emptyTiles.length - 1),
    randomTwo = random(this.emptyTiles.length - 1);
  this.emptyTiles[randomOne].update(2);
  this.emptyTiles[randomTwo].update(2);
};

App.prototype.endGame = function () {
  var canMove = false;
  for (var i = 0; !canMove && i < this.rows; i++) {
    for (var j = 0; !canMove && j < this.colums; j++) {
      var tile = this.tiles[i][j];
      var canMoveTop = this.tiles[i - 1] ? this.tiles[i - 1][j].value === tile.value : false;
      var canMoveBottom = this.tiles[i + 1] ? this.tiles[i + 1][j].value === tile.value : false;
      var canMoveLeft = this.tiles[j - 1] ? this.tiles[i][j - 1].value === tile.value : false;
      var canMoveRight = this.tiles[j + 1] ? this.tiles[i][j + 1].value === tile.value : false;
      canMove = canMoveTop || canMoveBottom || canMoveLeft || canMoveRight;
    }
  }
  if (!canMove) {
    setTimeout(function () {
      alert('Game End');
    })
  }
};


App.prototype.keyDownHandler = function (e) {
  switch (e.keyCode) {
    case 37:
      this.move(DIRECTIONS.LEFT);
      break;
    case 38:
      this.move(DIRECTIONS.TOP);
      break;
    case 39:
      this.move(DIRECTIONS.RIGHT);
      break;
    case 40:
      this.move(DIRECTIONS.BOTTOM);
      break;
    default:
      break;
  }
};

App.prototype.actionBind = function () {
  window.addEventListener('keydown', this.listener);
};

App.prototype.clear = function () {
  this.tiles = [];
  this.emptyTiles = [];
  this.rows = 0;
  this.colums = 0;
  var tilesDOM = document.getElementById('tiles');
  while (tilesDOM.firstChild) {
    tilesDOM.removeChild(tilesDOM.firstChild);
  }
  window.removeEventListener('keydown', this.listener);
};

function random(min, max) {
  if (!max) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
}

var startButton = document.getElementById('start');
var app = new App();
app.init(4, 4);

startButton.addEventListener('click', function () {
  var rows = document.getElementById('rows').value;
  var columns = document.getElementById('columns').value;
  if (!isNaN(rows) && !isNaN(columns)) {
    app.clear();
    app.init(rows, columns);
  }
});





