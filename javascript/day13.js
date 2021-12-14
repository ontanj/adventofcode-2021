const data = require("fs")
  .readFileSync("../../inputs/input13.txt")
  .toString()
  .slice(0, -1)
  .split("\n\n")
  .map((row) => row.split("\n"));

const coords = data[0].map((row) => row.split(",").map(Number));
const instructions = data[1].map((row) => row.slice(11).split("="));

const fold = (instruction, sheet) => {
  const line = Number(instruction.slice(1));
  return sheet.map(([x, y]) =>
    instruction[0] === "x" && x > line
      ? [2 * line - x, y]
      : instruction[0] === "y" && y > line
      ? [x, 2 * line - y]
      : [x, y]
  );
};

const noDots = fold(instructions[0], coords)
  .map(([x, y]) => x + "," + y)
  .filter((v, i, self) => self.indexOf(v) === i).length;

console.log(noDots);

const code = instructions
  .reduce((acc, i) => fold(i, acc), coords)
  .map(([x, y]) => x + "," + y)
  .filter((v, i, self) => self.indexOf(v) === i);

for (let y = 0; y < 6; y += 1) {
  let print = "";
  for (let x = 0; x < 60; x += 1) {
    if (code.includes(x + "," + y)) print += "#";
    else print += " ";
  }
  console.log(print);
}
