const data = require("fs")
  .readFileSync("../../inputs/input3.txt")
  .toString()
  .split("\n")
  .slice(0, -1);

let gammas = "";
let epsilons = "";
const half = data.length / 2;

const bitFreq1 = (data) => {
  let sums = [...new Array(data[0].length).fill(0)];
  for (row in data) {
    for (char in data[row]) {
      if (data[row][char] === "1") sums[char] += 1;
    }
  }
  return sums;
};

const sums = bitFreq1(data);

for (char in sums) {
  if (sums[char] > half) {
    gammas += "1";
    epsilons += "0";
  } else {
    epsilons += "1";
    gammas += "0";
  }
}

const gamma = parseInt(gammas, 2);
const epsilon = parseInt(epsilons, 2);

console.log(gamma * epsilon);

let oxData = data;
const c = oxData[0].length;
for (i = 0; i < c; i += 1) {
  let sums = bitFreq1(oxData);
  let half = oxData.length / 2;
  let freq1 = sums[i] >= half;
  oxData = oxData.filter((row) => (freq1 ? row[i] == "1" : row[i] === "0"));
  if (oxData.length === 1) break;
}
const ox = parseInt(oxData[0], 2);

co2Data = data;
for (i = 0; i < c; i += 1) {
  let sums = bitFreq1(co2Data);
  let half = co2Data.length / 2;
  let freq1 = sums[i] >= half;
  co2Data = co2Data.filter((row) => (freq1 ? row[i] == "0" : row[i] === "1"));
  if (co2Data.length === 1) break;
}
const co2 = parseInt(co2Data[0], 2);

console.log(ox * co2);
