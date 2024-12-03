// Advent of code - 2024 - Day 2 
// https://adventofcode.com/2024/day/2
// Language : JavaScript

function loadData (file){
    return require('fs')
           .readFileSync(file, 'utf8')
           .split(/\r?\n/)
           .filter(Boolean)
           .map((line) => line.split(' '));
}

const lineData = loadData('input.txt');

//TaskOne
let safeCheck1 = (line) =>{
    let diffs = line.slice(0, -1).map((val, i) => val - line[i + 1]);    
    return (diffs.every((val)=>{ return val > 0}) || 
           diffs.every((val)=>{ return val < 0})) &&
           diffs.every((val)=>{ return Math.abs(val) >= 1 && Math.abs(val) <= 3 });
}
let safeCount = lineData.reduce((acc, line) => acc + (safeCheck1(line) ? 1 : 0),0);
console.log('Task one:',safeCount);

//TaskTwo
let safeCheck2 = (line) =>{
    let safe = safeCheck1(line);
    for(let i =0; i <line.length && !safe; i++){
        safe = safeCheck1(line.toSpliced(i, 1));
    }
    return safe;
}
let safeCount2 = lineData.reduce((acc, line) => acc + (safeCheck2(line) ? 1 : 0),0);
console.log('Task two:',safeCount2);