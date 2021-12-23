const [algorithm, imagedata] = require("fs")
  .readFileSync("../../inputs/input20.txt")
  .toString()
  .slice(0, -1)
  .split("\n\n");

let image = imagedata.split("\n").map((r) => r.split("") /*.slice(0, 5)*/);

const convert = (char) => {
  if (char === "#") return "1";
  if (char === ".") return "0";
  throw new Error();
};

for (let i = 0; i < 50; i += 1) {
  let newImage = [...Array(image.length + 2)].map(() => [
    ...Array(image[0].length + 2),
  ]);
  for (let newRowId = 0; newRowId < newImage.length; newRowId += 1) {
    for (
      let newColId = 0;
      newColId < newImage[newRowId].length;
      newColId += 1
    ) {
      let posString = "";
      for (let r = 0; r < 3; r += 1) {
        for (let c = 0; c < 3; c += 1) {
          posString += convert(
            image[r + newRowId - 2]?.[c + newColId - 2] ??
              (i === 0
                ? "."
                : algorithm[0] === "."
                ? "."
                : algorithm[511] === "#"
                ? "#"
                : [".", "#"][i % 2])
          );
        }
      }
      newImage[newRowId][newColId] = algorithm[parseInt(posString, 2)];
    }
  }
  image = newImage;
  if (i === 1) console.log(image.flat(2).filter((c) => c === "#").length);
}

console.log(image.flat(2).filter((c) => c === "#").length);
