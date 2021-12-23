const data = require("fs")
  .readFileSync("../../inputs/input15.txt")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map((row) => row.split("").map(Number));

const getRiskValue = (row, col) =>
  ((Math.floor(col / height) +
    Math.floor(row / width) +
    data[row % height][col % width] -
    1) %
    9) +
  1;

const height = data.length;
const width = data[0].length;

const fullHeight = height * 5;
const fullWidth = width * 5;

const paths = [...Array(fullHeight)].map((x, row) =>
  [...Array(fullWidth)].map((x, col) => ({
    row,
    col,
    dist: undefined,
  }))
);

paths[0][0].dist = 0;
const queue = [paths[0][0]];

while (true) {
  const { row, col, dist } = queue.shift();
  if (row === height - 1 && col === width - 1) {
    console.log(paths[height - 1][width - 1].dist);
  }
  if (row === fullHeight - 1 && col === fullWidth - 1) {
    console.log(paths[fullHeight - 1][fullWidth - 1].dist);
    break;
  }
  // add all unvisited neighbours to queue
  for (let rDiff = -1; rDiff <= 1; rDiff += 1) {
    for (let cDiff = -1; cDiff <= 1; cDiff += 1) {
      if (Math.abs(cDiff + rDiff) !== 1) continue;
      if (
        ((rDiff === -1 && row !== 0) ||
          (rDiff === 1 && row !== fullHeight - 1) ||
          (cDiff === -1 && col !== 0) ||
          (cDiff === 1 && col !== fullWidth - 1)) &&
        paths[row + rDiff][col + cDiff].dist === undefined
      ) {
        const neighbourNode = paths[row + rDiff][col + cDiff];
        queue.push(neighbourNode);
        neighbourNode.dist = dist + getRiskValue(row + rDiff, col + cDiff);
      }
    }
  }
  queue.sort(({ dist: aDist }, { dist: bDist }) => aDist - bDist);
}
