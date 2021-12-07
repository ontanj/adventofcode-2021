const data = require("fs")
  .readFileSync("../../inputs/input7.txt")
  .toString()
  .slice(0, -1)
  .split(",")
  .map(Number);

const lastPos = Math.max(...data) + 1;

const cheapestA = [...Array(lastPos).keys()].reduce((lowFuel, pos) => {
  const cost = data.reduce((cost, v) => cost + Math.abs(pos - v), 0);
  return cost < lowFuel ? cost : lowFuel;
}, Number.MAX_VALUE);
console.log(cheapestA);

const costList = [...Array(lastPos)];
costList[0] = 0;
for (let i = 1; i < lastPos; i += 1) {
  costList[i] = costList[i - 1] + i;
}
const cheapestB = [...Array(lastPos).keys()].reduce((lowFuel, pos) => {
  const cost = data.reduce((cost, v) => cost + costList[Math.abs(pos - v)], 0);
  return cost < lowFuel ? cost : lowFuel;
}, Number.MAX_VALUE);

console.log(cheapestB);
