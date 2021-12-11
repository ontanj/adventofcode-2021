const data = require("fs")
  .readFileSync("../../inputs/input9.txt")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map((row) => row.split("").map(Number));

let riskLevelSum = 0;

data.forEach((row, rowIndex) =>
  row.forEach((val, colIndex) => {
    if (
      (colIndex !== 0 ? val < row[colIndex - 1] : true) &&
      (colIndex !== row.length - 1 ? val < row[colIndex + 1] : true) &&
      (rowIndex !== 0 ? val < data[rowIndex - 1][colIndex] : true) &&
      (rowIndex !== data.length - 1 ? val < data[rowIndex + 1][colIndex] : true)
    )
      riskLevelSum += 1 + val;
  })
);

console.log(riskLevelSum);

// list of basin sizes
const basinSizes = [];
// every position stores which basin in basinSizes it belongs to
const basinConnections = data.map((row) =>
  row.map((v) => ({ val: v, basin: undefined }))
);

// find a spots basin (after merges) by following references
const getBasin = ({ basin }) => {
  let current = basin;
  while (true) {
    const v = basinSizes[current];
    if (typeof v === "object") current = v.ref;
    else return current;
  }
};

for (let i = 0; i < basinConnections.length; i += 1) {
  const row = basinConnections[i];
  for (let j = 0; j < row.length; j += 1) {
    const spot = row[j];
    if (spot.val === 9) {
      continue;
    }
    if (
      (j === 0 || getBasin(row[j - 1]) === undefined) &&
      (i === 0 || getBasin(basinConnections[i - 1][j]) === undefined)
    ) {
      // if position above or to the left doesn't belong to a basin, a new basin entry is created
      spot.basin = basinSizes.length;
      basinSizes.push(1);
    } else if (
      j !== 0 &&
      getBasin(row[j - 1]) !== undefined &&
      (i === 0 || getBasin(basinConnections[i - 1][j]) === undefined)
    ) {
      const basin = getBasin(row[j - 1]);
      spot.basin = basin;
      basinSizes[basin] += 1;
    } else if (
      ((j === 0 || getBasin(row[j - 1]) === undefined) &&
        i !== 0 &&
        getBasin(basinConnections[i - 1][j]) !== undefined) ||
      (j !== 0 &&
        i !== 0 &&
        getBasin(row[j - 1]) === getBasin(basinConnections[i - 1][j]))
    ) {
      const basin = getBasin(basinConnections[i - 1][j]);
      spot.basin = basin;
      basinSizes[basin] += 1;
    } else {
      // if position above or to the left belongs to different basins, they need to merge
      // by taking their sum and replacing the merging basin size entry with a reference to the
      // combined basin
      const basin = getBasin(basinConnections[i - 1][j]);
      const mergingBasin = getBasin(row[j - 1]);
      spot.basin = basin;
      basinSizes[basin] += 1 + basinSizes[mergingBasin];
      basinSizes[mergingBasin] = { ref: basin };
    }
  }
}

const sizeProduct = basinSizes
  .filter((v) => typeof v === "number")
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((acc, v) => acc * v);
console.log(sizeProduct);
