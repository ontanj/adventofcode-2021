const data = require("fs")
  .readFileSync("../../inputs/input14.txt")
  .toString()
  .slice(0, -1)
  .split("\n\n");

const initialTemplate = data[0];
const rules = data[1].split("\n").map((rule) => rule.split(" -> "));
const inc = (map, key, freq) => map.set(key, (map.get(key) ?? 0) + freq);

const template = new Map();
for (let i = 0; i < initialTemplate.length - 1; i += 1) {
  const parts = initialTemplate.substring(i, i + 2);
  inc(template, parts, 1);
}

for (let step = 1; step <= 40; step += 1) {
  const insertions = new Map();
  for (let i = 0; i < rules.length; i += 1) {
    const [key, letter] = rules[i];
    const left = key[0] + letter;
    const right = letter + key[1];
    const count = template.get(key);
    if (count) {
      inc(insertions, left, count);
      inc(insertions, right, count);
      inc(insertions, key, -count);
    }
  }
  insertions.forEach((count, key) => inc(template, key, count));

  if (step === 10 || step === 40) {
    const occurances = new Map([
      [initialTemplate[0], 1],
      [initialTemplate[initialTemplate.length - 1], 1],
    ]);
    template.forEach((count, letter) => {
      inc(occurances, letter[0], count);
      inc(occurances, letter[1], count);
    });

    let order = [...occurances.values()].sort((freqa, freqb) => freqb - freqa);

    console.log((order[0] - order[order.length - 1]) / 2);
  }
}
