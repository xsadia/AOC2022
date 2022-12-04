const { readLines } = require("./helpers");

const sample = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

// const lines = sample.split("\n").map((line) => line.split(","));
const lines = readLines("./day4.txt", ["\n", ","]);

const helperA = (pair) => {
  const [fst, snd] = pair;
  const [fstStart, fstEnd] = fst.split("-").map((digit) => Number(digit));
  const [sndStart, sndEnd] = snd.split("-").map((digit) => Number(digit));
  const condition =
    (fstStart <= sndStart && fstEnd >= sndEnd) ||
    (fstStart >= sndStart && fstEnd <= sndEnd);

  return condition;
};

const solveA = () => {
  return lines.reduce((acc, line) => {
    if (helperA(line)) {
      return [...acc, line];
    }

    return acc;
  }, []).length;
};

const range = (start, end) => {
  if (start === end) return [end];

  return [start].concat(range(start + 1, end));
};

const helperB = (pair) => {
  const [fst, snd] = pair;
  const [fstStart, fstEnd] = fst.split("-").map((digit) => Number(digit));
  const [sndStart, sndEnd] = snd.split("-").map((digit) => Number(digit));
  const pairRange = [...range(fstStart, fstEnd), ...range(sndStart, sndEnd)];
  const foundNumbers = pairRange.reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr] += 1;
      return acc;
    }

    acc[curr] = 1;
    return acc;
  }, {});

  return Object.keys(foundNumbers).reduce((acc, curr) => {
    if (foundNumbers[curr] > 1) return acc + 1;

    return acc;
  }, 0);
};

const solveB = () => {
  return lines.reduce((acc, line) => {
    if (helperB(line) > 0) {
      return [...acc, line];
    }

    return acc;
  }, []).length;
};

console.log(solveA());
console.log(solveB());
