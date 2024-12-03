// Advent of code - 2024 - Day 3
// https://adventofcode.com/2024/day/3
// Language : JavaScript

function loadData (file){
    return require('fs')
           .readFileSync(file, 'utf8');
}

const fileData = loadData('input.txt');

//TaskOne
function findMulPairs(str) {
    const regex = /mul\((-?\d+),\s*(-?\d+)\)/g;
    let matches = [];
    let match;

    while ((match = regex.exec(str)) !== null) {
        matches.push([parseInt(match[1]), parseInt(match[2])]);
    }

    return matches;
}

let taskOne = findMulPairs(fileData)
              .reduce((acc, pair) => acc + (pair[0] * pair[1]),0);
console.log('Task one:',taskOne);

//TaskTwo
function findDoBlocks(str) {
    const regex = /do\([^)]*\)(.*?)don't\([^)]*\)/gs;
    let matches = [];
    let match;

    while ((match = regex.exec(`do()${str}don't()`)) !== null) {
        matches.push(match[1]);
    }

    return matches;
}

let taskTwo = findDoBlocks(fileData)
              .map((block) => findMulPairs(block))
              .flat()
              .reduce((acc, pair) => acc + (pair[0] * pair[1]),0);
console.log('Task two:',taskTwo);
