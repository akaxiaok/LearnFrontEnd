var graph = require('./graph');

function topoSort(graph) {
  var inDegree = [];
  for (var i = 0; i < graph.vertices; i++) {
    inDegree[i] = 0;
  }
  for (var i = 0; i < graph.vertices; i++) {
    var v = graph.verticeMap[i];
    if (v) {
      for (var j = 0; j < v.length; j++) {
        inDegree[v[j]] += 1;
      }
    }
  }
  var next = [];
  for (var i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 0) {
      next.push(i);
    }
  }
  var ret = '';
  while (next.length > 0) {
    var u = next.pop();
    ret += u;
    var v = graph.verticeMap[u];
    if (v) {
      for (var j = 0; j < v.length; j++) {
        inDegree[v[j]] -= 1;
        if(inDegree[v[j]]===0){
          next.push(v[j]);
        }
      }
    }
  }
  return ret;
}
console.log(topoSort(graph));