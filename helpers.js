const { readFileSync } = require("fs");

const readLines = (path, separators) => {
  const data = readFileSync(path, "utf-8");
  if (separators.length > 1) {
    return data.split(separators[0]).map((line) => line.split(separators[1]));
  }

  return data.split(separators[0]);
};

module.exports = {
  readLines,
};
