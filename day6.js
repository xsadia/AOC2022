const { readFileSync } = require("fs");

// const data = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";
const data = readFileSync("./day6.txt", "utf-8");

const solve = () => {
  const a = 4;
  const b = 14;
  const sequence = Array.from({ length: b }, (v, k) => k);

  let passed = 0;
  for (let i = 0; i < data.length; i++) {
    const letters = new Set(
      sequence.reduce((acc, curr) => [...acc, data[curr + i]], [])
    );

    if (letters.size === b) {
      passed = i + b;
      break;
    }
  }

  return passed;
};

console.log(solve());
