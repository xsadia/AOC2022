const { readLines } = require("./helpers");

const sample = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

// const lines = sample.split("\n\n");
const lines = readLines("./day5.txt", ["\n\n"]);
const bucketValues = lines[0].split("\n");
const commands = lines[1].split("\n").map((line) => line.split(" "));

const numOfBuckets = bucketValues[bucketValues.length - 1]
  .trim()
  .replaceAll(" ", "").length;

const findBucket = (line) => {
  const bucketPosition = {};
  const space = 4;
  let spacesCount = 0;
  let i = 0;

  while (i < line.length) {
    if (line[i] !== "[") {
      spacesCount++;
      i++;
      continue;
    }

    const position = spacesCount < space ? 0 : spacesCount / space;

    bucketPosition[position + 1] = line.slice(i, i + 3);
    spacesCount += 3;
    i += 3;
  }

  return bucketPosition;
};

const solveA = () => {
  const buckets = Array.from({ length: numOfBuckets }, () => []);
  const filledBuckets = bucketValues
    .slice(0, bucketValues.length - 1)
    .reduce((acc, curr) => {
      const positions = findBucket(curr);

      for (const position in positions) {
        acc[position - 1].push(positions[position]);
      }

      return acc;
    }, buckets);

  for (const command of commands) {
    for (let i = 0; i < Number(command[1]); i++) {
      const to = Number(command[5]);
      const from = Number(command[3]);
      filledBuckets[to - 1].unshift(filledBuckets[from - 1].shift());
    }
  }

  return filledBuckets.reduce((acc, curr) => (acc += curr[0]), "");
};

const solveB = () => {
  const buckets = Array.from({ length: numOfBuckets }, () => []);
  const filledBuckets = bucketValues
    .slice(0, bucketValues.length - 1)
    .reduce((acc, curr) => {
      const positions = findBucket(curr);

      for (const position in positions) {
        acc[position - 1].push(positions[position]);
      }

      return acc;
    }, buckets);

  for (const command of commands) {
    const qty = Number(command[1]);
    const to = Number(command[5]);
    const from = Number(command[3]);

    filledBuckets[to - 1] = [
      ...filledBuckets[from - 1].slice(0, qty),
      ...filledBuckets[to - 1],
    ];

    filledBuckets[from - 1] = filledBuckets[from - 1].slice(qty);
  }

  return filledBuckets.reduce((acc, curr) => (acc += curr[0]), "");
};

console.log(solveA());
console.log(solveB());
