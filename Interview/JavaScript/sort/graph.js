function Graph(v) {
  this.vertices = v; // 顶点数
  this.verticeMap = {}; // 顶点数
  this.edges = 0; // 边数
  this.adj = [];
  for (let i = 0; i < this.vertices; i++) {
    this.adj[i] = [];
    for (let j = 0; j < this.vertices; j++) {
      this.adj[i][j] = 0;
    }
  }
  this.addEdge = addEdge;
  this.showGraph = showGraph;
}

function addEdge(v, w) {
  this.adj[v][w] = 1;
  if(!this.verticeMap[v]){
    this.verticeMap[v]=[];
  }
  this.verticeMap[v].push(w);
  this.edges++;
}

function showGraph() {
  for (let i = 0; i < this.vertices; i++) {
    let str = i + '->';
    for (let j = 0; j < this.vertices; j++) {
      if (this.adj[i][j] !== 0) {
        str += j + ' ';
      }
    }
    console.log(str);
  }
}
var graph = new Graph(8);
graph.addEdge(0, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 3);
graph.addEdge(2, 4);
graph.addEdge(3, 5);
graph.addEdge(4, 5);
graph.addEdge(5, 6);
graph.addEdge(6, 7);
module.exports = graph;