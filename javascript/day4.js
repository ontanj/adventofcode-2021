const data = require("fs")
  .readFileSync("../../inputs/input4.txt")
  .toString()
  .slice(0, -1)
  .split("\n\n")
  .map((g) => g.split("\n"));

const nums = data[0][0].split(",").map(Number);

const boards = data
  .slice(1)
  .map((board) => board.map((row) => row.trim().split(/ +/).map(Number)));

const numMarks = [
  ...new Array(boards.length).fill(undefined).map(() => [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]),
];

const bingo = (numMarks) => {
  for (let dir = 0; dir < 2; dir += 1) {
    if (numMarks[dir].some((v) => v === 5)) return true;
  }
  return false;
};

const noBoards = boards.length;
for (let ni = 0; ni < nums.length; ni += 1) {
  for (let bi = 0; bi < boards.length; bi += 1) {
    let hit = false;
    for (let ri = 0; ri < 5; ri += 1) {
      for (let ci = 0; ci < 5; ci += 1) {
        if (boards[bi][ri][ci] === nums[ni]) {
          hit = true;
          numMarks[bi][0][ri] += 1;
          numMarks[bi][1][ci] += 1;
          if (bingo(numMarks[bi])) {
            if (boards.length === 1 || boards.length === noBoards) {
              const unm = boards[bi]
                .map((row) =>
                  row
                    .filter((col) => !nums.slice(0, ni + 1).includes(col))
                    .reduce((acc, col) => acc + col, 0)
                )
                .reduce((acc, row) => acc + row);
              console.log(unm * nums[ni]);
            }
            boards.splice(bi, 1);
            numMarks.splice(bi, 1);
            bi -= 1;
          }
          break;
        }
      }
      if (hit) break;
    }
  }
}
