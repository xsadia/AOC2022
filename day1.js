const { readLines } = require("./helpers");

const lines = readLines("./day1.txt", ["\n\n", "\n"]);

const ans = lines.map((line) =>
  line.reduce((acc, curr) => {
    return Number(curr) + acc;
  }, 0)
);

let biggest = ans[0];
for (let i = 1; i < ans.length; i++) {
  if (ans[i] > biggest) {
    biggest = ans[i];
  }
}
console.log(biggest);
console.log(
  ans
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, curr) => acc + curr, 0)
);
