const { readFileSync } = require("fs");

const statusScore = {
  win: 6,
  draw: 3,
  loss: 0,
};

const conditions = {
  A: {
    win: "B",
    loss: "C",
    draw: "A",
  },
  B: {
    win: "C",
    loss: "A",
    draw: "B",
  },
  C: {
    win: "A",
    loss: "B",
    draw: "C",
  },
};

const scores = {
  A: 1,
  B: 2,
  C: 3,
};

const pairs = {
  A: "X",
  B: "Y",
  C: "Z",
};

const hints = {
  X: "loss",
  Y: "draw",
  Z: "win",
};

const sample = `A Y
B X
C Z`;

const data = readFileSync("./day2.txt", "utf-8");
const lines = data.split("\n").map((line) => line.split(" "));

const ans = lines.reduce((acc, line) => {
  const currentScore =
    statusScore[hints[line[1]]] + scores[conditions[line[0]][hints[line[1]]]];
  return acc + currentScore;
}, 0);

console.log(ans);
