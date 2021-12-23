const data = require("fs")
  .readFileSync("../../inputs/input18.txt")
  .toString()
  .slice(0, -1)
  .split("\n");

let dataDepth = [...Array(data.length).fill("")];
let noParens = 0;
for (let r = 0; r < data.length; r += 1) {
  for (let i = 0; i < data[r].length; i += 1) {
    if (data[r][i] === "[") {
      noParens += 1;
      dataDepth[r] += data[r][i];
    } else if (data[r][i] === "]") {
      dataDepth[r] += `,d${noParens}]`;
      noParens -= 1;
    } else {
      dataDepth[r] += data[r][i];
    }
  }
}

const increaseDepth = (val) => {
  const matches = val.matchAll(/d(\d+)/dg);
  for (let match of matches) {
    const depth = Number(match[1]) + 1;
    val =
      val.slice(0, match.indices[1][0]) +
      depth +
      val.slice(match.indices[1][1]);
  }
  return val;
};

const numLast = (val) => {
  let rev = val.split("").reverse().join("");
  const match = rev.match(/(\d+)[^d]/d);
  return match?.indices[1].map((v) => val.length - v).reverse();
};

const numFirst = (val) => {
  let index = val.match(/[^d](\d+)/d);
  return index?.indices[1];
};

const explode = (val) => {
  while (true) {
    const match = val.match(/\[(\d+),(\d+),d5\]/d);
    if (match === null) return val;
    const [, v1, v2] = match.map(Number);
    let leftString = val.slice(0, match.indices[0][0]);
    const lmatch = numLast(leftString);
    if (lmatch) {
      const [l1, l2] = lmatch;
      const leftNewVal = Number(leftString.slice(l1, l2)) + v1;
      leftString = leftString.slice(0, l1) + leftNewVal + leftString.slice(l2);
    }
    let rightString = val.slice(match.indices[0][1]);
    const rmatch = numFirst(rightString);
    if (rmatch) {
      const [r1, r2] = rmatch;
      const rightNewVal = Number(rightString.slice(r1, r2)) + v2;
      rightString =
        rightString.slice(0, r1) + rightNewVal + rightString.slice(r2);
    }
    val = leftString + 0 + rightString;
  }
};

const split = (val) => {
  const match = val.match(/[^d](\d{2,})/d);
  if (match === null) return { val, didSplit: false };
  const newVal = match[1] / 2;
  const [i1, i2] = match.indices[1];
  let depth = undefined;
  let noParens = 0;
  for (let i = i2; i < val.length; i += 1) {
    if (val[i] === "[") {
      noParens += 1;
    } else if (val[i] === "]") {
      noParens -= 1;
    } else if (val[i] === "d" && noParens === 0) {
      depth = Number(val[i + 1]) + 1;
      break;
    }
  }
  return {
    val:
      val.slice(0, i1) +
      "[" +
      Math.floor(newVal) +
      "," +
      Math.ceil(newVal) +
      ",d" +
      depth +
      "]" +
      val.slice(i2),
    didSplit: true,
  };
};

const add = (v1, v2) => {
  let sum = "[" + v1 + "," + v2 + ",d0]";
  let val = increaseDepth(sum);
  let didSplit;
  while (true) {
    val = explode(val);
    ({ val, didSplit } = split(val));
    if (!didSplit) {
      return val;
    }
  }
};

const magnitude = (val) => {
  if (val.length === 1) {
    return Number(val);
  } else {
    let commaIndex = undefined;
    let noParens = 0;
    for (let i = 0; i < val.length; i += 1) {
      if (val[i] === "[") {
        noParens += 1;
      } else if (val[i] === "]") {
        noParens -= 1;
      } else if (val[i] === "," && noParens === 1) {
        commaIndex = i;
        break;
      }
    }
    return (
      3 * magnitude(val.slice(1, commaIndex)) +
      2 * magnitude(val.slice(commaIndex + 1, -4))
    );
  }
};

console.log(magnitude(dataDepth.reduce(add)));

let max = 0;
for (let i = 0; i < dataDepth.length; i += 1) {
  for (let j = 0; j < dataDepth.length; j += 1) {
    max = Math.max(max, magnitude(add(dataDepth[i], dataDepth[j])));
  }
}
console.log(max);
