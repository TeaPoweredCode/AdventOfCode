// Advent of code - 2024 - Day 1 
// https://adventofcode.com/2024/day/1
// Language : JavaScript

function loadData (file){
    return require('fs')
           .readFileSync(file, 'utf8')
           .split(/\r?\n/)
           .filter(Boolean)
           .map((line) => line.split('   '));
}


const lineData = loadData('input.txt');

let leftList = lineData.map((line) => Number(line[0])).sort();
let rightList = lineData.map((line) => Number(line[1])).sort();

//TaskOne
let zip = leftList.map((k, i) => [k, rightList[i]]);
let taskOne = zip.reduce((accumulator, pair) => accumulator +  Math.abs(pair[0] - pair[1]),0);
console.log('Task one:',taskOne);

//TaskTwo
let dictionary = rightList.reduce((acc, curr) => {return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc}, {});
let taskTwo = leftList.reduce((acc, val) => acc +  val * (dictionary[val] ?? 0),0);
console.log('Task two:', taskTwo);
