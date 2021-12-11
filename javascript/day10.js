const data = require("fs")
  .readFileSync("../../inputs/input10.txt")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map((row) => row.split(""));

const { corrupt, incomplete } = data.reduce(
  ({ corrupt, incomplete }, row) => {
    let open = [];
    for (let colIndex = 0; colIndex < row.length; colIndex += 1) {
      const val = row[colIndex];
      if (["[", "{", "(", "<"].includes(val)) open = [...open, val];
      else {
        const last = open[open.length - 1];
        if (
          (val === "}" && last === "{") ||
          (val === ")" && last === "(") ||
          (val === "]" && last === "[") ||
          (val === ">" && last === "<")
        ) {
          open = open.slice(0, open.length - 1);
        } else {
          return {
            incomplete,
            corrupt:
              corrupt +
              (val === ")" ? 3 : val === "]" ? 57 : val === "}" ? 1197 : 25137),
          };
        }
      }
    }
    incompleteScore = open.reduce(
      (score, val, i) =>
        score +
        (val === "(" ? 1 : val === "[" ? 2 : val === "{" ? 3 : 4) * 5 ** i,
      0
    );
    return {
      corrupt,
      incomplete: [...incomplete, incompleteScore],
    };
  },
  { corrupt: 0, incomplete: [] }
);

console.log(corrupt);
const middleIncomplete = incomplete.sort((a, b) => a - b)[
  (incomplete.length - 1) / 2
];
console.log(middleIncomplete);
