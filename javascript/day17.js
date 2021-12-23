const data = require("fs")
  .readFileSync("../../inputs/input17.txt")
  .toString()
  .slice(0, -1)
  .match(/x=(.+)\.\.(.+), y=(.+)\.\.(.+)/)
  .slice(1, 5)
  .map(Number);

const [xmin, xmax, ymin, ymax] = data;

const trajectory = (x, y) => {
  const pos = [];
  let xpos = 0;
  let ypos = 0;
  let step = 1;
  while (xpos <= xmax && ypos >= ymin) {
    pos.push([xpos, ypos]);
    xpos += x;
    ypos += y;
    x = Math.max(0, x - step);
    y -= step;
  }
  return pos;
};

const atTarget = ([x, y]) => {
  return x <= xmax && x >= xmin && y <= ymax && y >= ymin;
};

for (let yit = Math.abs(ymin) - 1; yit >= 0; yit -= 1) {
  let done = false;
  for (let xit = 0; xit < xmax; xit += 1) {
    const path = trajectory(xit, yit);
    if (atTarget(path[path.length - 1])) {
      console.log(Math.max(...path.map((p) => p[1])));
      done = true;
      break;
    }
  }
  if (done) {
    break;
  }
}

let yMaxStart = Math.abs(ymin) - 1;
let yMinStart = ymin;

let c = 0;
for (let yit = yMinStart; yit <= yMaxStart; yit += 1) {
  for (let xit = xmax; xit >= 0; xit -= 1) {
    const path = trajectory(xit, yit);
    if (atTarget(path[path.length - 1])) {
      c += 1;
    }
  }
}
console.log(c);
