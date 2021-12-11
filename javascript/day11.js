const data = require("fs")
  .readFileSync("../../inputs/input11.txt")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map((row) => row.split("").map(Number));

let field = data;
let flashCount = 0;
let turn = 0;
const noOctopuses = data.flat().length;

while (true) {
  const teners = [];

  field = field.map((row, rowI) =>
    row.map((col, colI) => {
      if (col === 9) teners.push({ row: rowI, col: colI });
      return col + 1;
    })
  );

  for (let i = 0; i < teners.length; i += 1) {
    const { row, col } = teners[i];
    const updateAdjacent = (rowDiff, colDiff) => {
      if (field[row + rowDiff][col + colDiff] === 9)
        teners.push({ row: row + rowDiff, col: col + colDiff });
      field[row + rowDiff][col + colDiff] += 1;
    };
    row !== 0 && updateAdjacent(-1, 0);
    row !== field.length - 1 && updateAdjacent(1, 0);
    col !== 0 && updateAdjacent(0, -1);
    col !== field[0].length - 1 && updateAdjacent(0, 1);
    row !== 0 && col !== 0 && updateAdjacent(-1, -1);
    row !== field.length - 1 && col !== 0 && updateAdjacent(1, -1);
    row !== 0 && col !== field[0].length - 1 && updateAdjacent(-1, 1);
    row !== field.length - 1 &&
      col !== field[0].length - 1 &&
      updateAdjacent(1, 1);
  }

  for (let i = 0; i < teners.length; i += 1) {
    const { row, col } = teners[i];
    field[row][col] = 0;
  }

  flashCount += teners.length;
  turn += 1;

  if (turn === 100) console.log(flashCount);

  if (teners.length === noOctopuses) {
    console.log(turn);
    break;
  }
}
