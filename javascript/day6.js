const data = require("fs")
  .readFileSync("../../inputs/input6.txt")
  .toString()
  .slice(0, -1)
  .split(",")
  .map(Number)
  .reduce((acc, v) => {
    acc[v] += 1;
    return acc;
  }, Object.fromEntries([...Array(9)].map((v, i) => [i, 0])));

let allFish = data;
for (let i = 0; i < 80; i += 1) {
  let newFish = Object.keys(allFish).reduce((newFish, age) => {
    return age === "0"
      ? { ...newFish, 6: allFish[0], 8: allFish[0] }
      : { ...newFish, [age - 1]: newFish[age - 1] + allFish[age] };
  }, Object.fromEntries([...Array(9)].map((v, i) => [i, 0])));
  allFish = newFish;
}
console.log(Object.values(allFish).reduce((a, v) => a + v));

allFish = data;
for (let i = 0; i < 256; i += 1) {
  let newFish = Object.keys(allFish).reduce((newFish, age) => {
    return age === "0"
      ? { ...newFish, 6: allFish[0], 8: allFish[0] }
      : { ...newFish, [age - 1]: newFish[age - 1] + allFish[age] };
  }, Object.fromEntries([...Array(9)].map((v, i) => [i, 0])));
  allFish = newFish;
}
console.log(Object.values(allFish).reduce((a, v) => a + v));
