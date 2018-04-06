exports.print = function (rows,cols) {
  var square = '';
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      square+='* ';
    }
    square+='\n';
  }
  console.log(square);
};