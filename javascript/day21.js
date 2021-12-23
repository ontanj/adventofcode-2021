const data = require("fs")
  .readFileSync("../../inputs/input21.txt")
  .toString()
  .slice(0, -1)
  .split("\n");

const initPos = data.map((r) => parseInt(r[r.length - 1]));

let pos = [...initPos];
let score = [0, 0];
let die = 0;
let turn = 0;
while (true) {
  for (let i = 0; i < 3; i += 1) {
    die += 1;
    pos[turn] = ((pos[turn] + die - 1) % 10) + 1;
  }
  score[turn] += pos[turn];
  if (score[turn] >= 1000) {
    console.log(die * score[(turn + 1) % 2]);
    break;
  }
  turn = (turn + 1) % 2;
}

const density = [0, 0, 0, 1, 3, 6, 7, 6, 3, 1];
const boardSize = 10;
const winScore = 21;
const winCount = [...Array(winScore)].map(() =>
  [...Array(winScore)].map(() =>
    [...Array(boardSize)].map(() => [...Array(boardSize)])
  )
);

for (
  let myInitialScore = (winScore - 1) * 2;
  myInitialScore >= 0;
  myInitialScore -= 1
) {
  for (let yourScore = 0; yourScore < winScore; yourScore += 1) {
    const myScore = myInitialScore - yourScore;
    if (myScore >= winScore || myScore < 0) {
      continue;
    }
    for (let myPos = 1; myPos <= boardSize; myPos += 1) {
      for (let yourPos = 1; yourPos <= boardSize; yourPos += 1) {
        let counts = { wins: 0, losses: 0 };
        for (let dieScore = 3; dieScore <= 9; dieScore += 1) {
          const newPos = ((myPos + dieScore - 1) % 10) + 1;
          const newScore = myScore + newPos;
          if (newScore >= winScore) {
            counts.wins += density[dieScore];
          } else {
            counts.wins +=
              density[dieScore] *
              winCount[yourScore][newScore][yourPos - 1][newPos - 1].losses;
            counts.losses +=
              density[dieScore] *
              winCount[yourScore][newScore][yourPos - 1][newPos - 1].wins;
          }
        }
        winCount[myScore][yourScore][myPos - 1][yourPos - 1] = counts;
      }
    }
  }
}

console.log(
  Math.max(...Object.values(winCount[0][0][initPos[0] - 1][initPos[1] - 1]))
);
