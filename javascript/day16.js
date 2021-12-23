const data = require("fs")
  .readFileSync("../../inputs/input16.txt")
  .toString()
  .slice(0, -1)
  .split("")
  .map((v) => parseInt(v, 16))
  .reduce((acc, v) => {
    const newVal = v.toString(2);
    return acc + "0".repeat(4 - newVal.length) + newVal;
  }, "");

const parse = (val) => {
  let versionSum = parseInt(val.slice(0, 3), 2);
  const type = val.slice(3, 6);
  if (type === "100") {
    let stream = val.slice(6);
    let value = "";
    while (true) {
      const section = stream.slice(0, 5);
      stream = stream.slice(5);
      value += section.slice(1);
      if (section[0] === "0") break;
    }
    return { versionSum, value: parseInt(value, 2), remaining: stream };
  } else {
    let values = [];
    let stream;
    if (val[6] === "0") {
      const subpackLength = parseInt(val.slice(7, 22), 2);
      stream = val.slice(22, 22 + subpackLength);
      while (stream.length > 0) {
        let { value, versionSum: vs, remaining } = parse(stream);
        values.push(value);
        stream = remaining;
        versionSum += vs;
      }
      stream = val.slice(22 + subpackLength);
    } else {
      const noSubpacks = parseInt(val.slice(7, 18), 2);
      stream = val.slice(18);
      for (let i = 0; i < noSubpacks; i += 1) {
        let { value, versionSum: vs, remaining } = parse(stream);
        values.push(value);
        stream = remaining;
        versionSum += vs;
      }
    }
    if (type === "000")
      return {
        versionSum,
        value: values.reduce((a, b) => a + b),
        remaining: stream,
      };
    else if (type === "001")
      return {
        versionSum,
        value: values.reduce((a, b) => a * b),
        remaining: stream,
      };
    else if (type === "010")
      return {
        versionSum,
        value: Math.min(...values),
        remaining: stream,
      };
    else if (type === "011")
      return {
        versionSum,
        value: Math.max(...values),
        remaining: stream,
      };
    else if (type === "101")
      return {
        versionSum,
        value: +(values[0] > values[1]),
        remaining: stream,
      };
    else if (type === "110")
      return {
        versionSum,
        value: +(values[0] < values[1]),
        remaining: stream,
      };
    else if (type === "111")
      return {
        versionSum,
        value: +(values[0] === values[1]),
        remaining: stream,
      };
  }
};

const parsed = parse(data);
console.log(parsed.versionSum);
console.log(parsed.value);
