const data = require("fs")
  .readFileSync("../../inputs/input5.txt")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map((row) => row.split(/,| -> /).map(Number));

const lines = data.filter((row) => row[0] === row[2] || row[1] === row[3]);

const m = {};

for (let i = 0; i < lines.length; i += 1) {
  const r = lines[i];
  if (r[0] === r[2]) {
    const col = r[0];
    const min = Math.min(r[1], r[3]);
    const max = Math.max(r[1], r[3]);
    for (let row = min; row <= max; row += 1) {
      const pos = [row, col];
      if (!m[pos]) {
        m[pos] = 1;
      } else {
        m[pos] += 1;
      }
    }
  } else if (r[1] === r[3]) {
    const row = r[1];
    const min = Math.min(r[0], r[2]);
    const max = Math.max(r[0], r[2]);
    for (let col = min; col <= max; col += 1) {
      const pos = [row, col];
      if (!m[pos]) {
        m[pos] = 1;
      } else {
        m[pos] += 1;
      }
    }
  }
}

let sum = Object.values(m).filter((v) => v > 1).length;
console.log(sum);

const diagLines = data.filter((row) => row[0] !== row[2] && row[1] !== row[3]);

for (let i = 0; i < diagLines.length; i += 1) {
  const r = diagLines[i];
  const xdir = r[0] - r[2] < 0 ? 1 : -1;
  const ydir = r[1] - r[3] < 0 ? 1 : -1;

  let row = r[1];
  for (let col = r[0]; col * xdir <= r[2] * xdir; col += xdir) {
    const pos = [row, col];
    if (!m[pos]) {
      m[pos] = 1;
    } else {
      m[pos] += 1;
    }
    row += ydir;
  }
}

sum = Object.values(m).filter((v) => v > 1).length;
console.log(sum);
