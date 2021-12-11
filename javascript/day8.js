const data = require("fs")
  .readFileSync("../../inputs/input8.txt")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map((row) => row.split(" "));

const output = data.map((row) => row.slice(11));
const countA = output
  .flat()
  .reduce(
    (count, v) => (v.length <= 4 || v.length === 7 ? (count += 1) : count),
    0
  );
console.log(countA);

const dataB = data.map((row) => [row.slice(0, 10), row.slice(11)]);
const outputSum = dataB.reduce((outputSum, [learning, output]) => {
  let seq1;
  let seq4;
  let found = learning.map((valIn) => {
    const val = valIn.split("");
    val.sort();
    if (val.length === 2) {
      seq1 = val;
      return { val, digit: 1 };
    }
    if (val.length === 4) {
      seq4 = val;
      return { val, digit: 4 };
    }
    return val.length === 3
      ? { val, digit: 7 }
      : val.length === 7
      ? { val, digit: 8 }
      : val;
  });
  for (let j = 0; j < 2; j += 1) {
    for (let k = 0; k < 10; k += 1) {
      const nval = found[k];
      if (!Array.isArray(nval)) continue;
      const extra1 = seq1.filter((sign) => !nval.includes(sign));
      const extra4 = seq4.filter((sign) => !nval.includes(sign));
      if (nval.length === 6) {
        if (extra1.length === 1) {
          found[k] = { val: nval, digit: 6 };
        } else if (extra4.length === 1) {
          found[k] = { val: nval, digit: 0 };
        } else found[k] = { val: nval, digit: 9 };
      } else {
        if (extra4.length === 1 && extra1.length === 0) {
          found[k] = { val: nval, digit: 3 };
        } else {
          const v6 = found.find(({ digit }) => digit === 6);
          if (v6 === undefined) continue;
          const seq6 = v6.val;
          const extra6 = seq6.filter((sign) => !nval.includes(sign));
          if (extra6.length === 1) {
            found[k] = { val: nval, digit: 5 };
          } else {
            found[k] = { val: nval, digit: 2 };
          }
        }
      }
    }
  }
  const mergeFound = found.map(({ val, digit }) => ({
    val: val.reduce((acc, v) => acc + v),
    digit,
  }));
  return (
    outputSum +
    Number(
      output
        .map((oval) => {
          const v = [...oval];
          v.sort();
          return v.reduce((acc, v) => acc + v);
        })
        .map((oval) => mergeFound.find(({ val }) => val === oval).digit)
        .reduce((acc, v) => acc + v, "")
    )
  );
}, 0);
console.log(outputSum);
