const data = require("fs")
  .readFileSync("../../inputs/input1.txt")
  .toString()
  .split("\n")
  .map(Number);
const diffsA = data.reduce(
  (acc, val, i, arr) => (i > 0 && val > arr[i - 1] ? acc + 1 : acc),
  0
);
console.log("task 1a", diffsA);

const diffsB = data
  .map((val, i, arr) => (i >= 2 ? val + arr[i - 1] + arr[i - 2] : 0))
  .slice(2)
  .reduce((acc, val, i, arr) => (i > 0 && val > arr[i - 1] ? acc + 1 : acc), 0);
console.log("task 1b", diffsB);
