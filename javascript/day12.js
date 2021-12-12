const data = require("fs")
  .readFileSync("../../inputs/input12.txt")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map((row) => row.split("-"));

let graph = data.reduce((graph, path) => {
  if (graph[path[0]]) {
    graph[path[0]].adj.push(path[1]);
  } else {
    graph[path[0]] = { adj: [path[1]] };
  }
  if (graph[path[1]]) {
    graph[path[1]].adj.push(path[0]);
  } else {
    graph[path[1]] = { adj: [path[0]] };
  }
  return graph;
}, {});

const findPaths = (node, visited, twice) => {
  const bigCave = node.toUpperCase() === node;
  // only add small caves to visited
  visited = bigCave ? visited : [...visited, node];
  let allPaths = { a: 0, b: 0 };
  for (let i = 0; i < graph[node].adj.length; i += 1) {
    if (graph[node].adj[i] === "end") {
      allPaths.a += 1;
      allPaths.b += 1;
    } else if (graph[node].adj[i] === "start") {
      continue;
    } else if (!visited.includes(graph[node].adj[i])) {
      let thisPaths = findPaths(graph[node].adj[i], visited, twice);
      allPaths.a += thisPaths.a;
      allPaths.b += thisPaths.b;
    } else if (!twice) {
      allPaths.b += findPaths(graph[node].adj[i], visited, true).b;
    }
  }
  return allPaths;
};

const noPaths = findPaths("start", [], false);
console.log(noPaths.a);
console.log(noPaths.b);
