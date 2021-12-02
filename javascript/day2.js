const data = require("fs")
  .readFileSync("../input/input2-test")
  .toString()
  .split("\n")
  .slice(0, -1)
  .map((row) => {
    const rowSplit = row.split(" ");
    return { action: rowSplit[0], val: Number(rowSplit[1]) };
  });

const navDataA = data.reduce(
  ({ depth, hori }, { action, val }) =>
    action === "forward"
      ? { depth, hori: hori + val }
      : action === "down"
      ? { depth: depth + val, hori }
      : { depth: depth - val, hori },
  { depth: 0, hori: 0 }
);

console.log(navDataA.depth * navDataA.hori);

const navDataB = data.reduce(
  ({ depth, hori, aim }, { action, val }) =>
    action === "forward"
      ? {
          depth: depth + aim * val,
          hori: hori + val,
          aim,
        }
      : action === "down"
      ? { aim: aim + val, hori, depth }
      : { aim: aim - val, hori, depth },
  { depth: 0, hori: 0, aim: 0 }
);

console.log(navDataB.depth * navDataB.hori);
