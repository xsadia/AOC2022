const { readLines } = require("./helpers");

const sample = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const lines = readLines("./day3.txt", "\n");
// const lines = sample.split("\n");

const getPriority = () => {
  let lowerCase = 97;
  let upperCase = 65;
  let priorities = {};
  for (let i = 1; i <= 26; i++) {
    priorities[String.fromCharCode(lowerCase)] = i;
    lowerCase++;
  }

  for (let i = 27; i <= 52; i++) {
    priorities[String.fromCharCode(upperCase)] = i;
    upperCase++;
  }

  return priorities;
};

const solveFirst = () => {
  const letters = [];
  const priorities = getPriority();

  for (const line of lines) {
    const middle = Math.floor(line.length / 2);
    const firstSack = line.slice(0, middle);
    const secondSack = line.slice(middle);
    const foundLetters = {};

    for (const letter of firstSack) {
      if (!foundLetters[letter]) {
        foundLetters[letter] = 1;
      }
    }

    for (const letter of secondSack) {
      if (foundLetters[letter] && foundLetters[letter] > -1) {
        letters.push(letter);
        foundLetters[letter] = -1;
      }
    }
  }

  return letters.reduce((acc, curr) => acc + priorities[curr], 0);
};

const solveSecond = () => {
  const letters = [];
  const priorities = getPriority();

  for (let i = 0; i < lines.length; i += 3) {
    const foundLetters = {};
    for (const letter of lines[i]) {
      if (!foundLetters[letter]) {
        foundLetters[letter] = 1;
      }
    }

    for (const letter of lines[i + 1]) {
      if (foundLetters[letter]) {
        foundLetters[letter] = 2;
      }
    }

    for (const letter of lines[i + 2]) {
      if (foundLetters[letter] && foundLetters[letter] > 1) {
        letters.push(letter);
        foundLetters[letter] = -1;
      }
    }
  }

  return letters.reduce((acc, curr) => acc + priorities[curr], 0);
};

console.log(solveFirst());

console.log(solveSecond());
