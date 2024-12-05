// Advent of code - 2024 - Day 4
// https://adventofcode.com/2024/day/4
// Language : JavaScript

function loadData (file){
    return require('fs')
           .readFileSync(file, 'utf8')
           .split(/\r?\n/)
           .filter(Boolean)           
           .map((line) => line.split(''));
}

const grid = loadData('input.txt');

//TaskOne
let taskOne = 0;

let pluckValue = (search,pos,posMod) => {
    return search.split('').reduce((acc, v, i) => acc + grid[pos[0]+(posMod[0]*i)][pos[1]+(posMod[1]*i)],"");
}

let lookingFor = "XMAS";
for(let row = 0; row<grid.length; row++)
{
    for(let col = 0; col<grid[row].length; col++)
    {
        if(grid[row][col] == lookingFor[0]){

            let checking = [];
            let position = [row,col];
            
            if(row >= lookingFor.length-1) // ↑
                checking.push(pluckValue(lookingFor,position,[-1,0]));

            if(row >= lookingFor.length-1 && col + lookingFor.length <= grid[row].length) // ↑→
                checking.push(pluckValue(lookingFor,position,[-1,1]));

            if(col + lookingFor.length <= grid[row].length) // →
                checking.push(pluckValue(lookingFor,position,[0,1]));

            if(row + lookingFor.length <= grid.length && col + lookingFor.length <= grid[row].length) // ↓→
                checking.push(pluckValue(lookingFor,position,[1,1]));
                
            if(row + lookingFor.length <= grid.length) // ↓
                checking.push(pluckValue(lookingFor,position,[1,0]));

            if(row + lookingFor.length <= grid.length && col >= lookingFor.length-1) // ↓←
                checking.push(pluckValue(lookingFor,position,[1,-1]));

            if(col >= lookingFor.length-1) // ←
                checking.push(pluckValue(lookingFor,position,[0,-1]));

            if(row >= lookingFor.length-1 && col >= lookingFor.length-1) // ↑←
                checking.push(pluckValue(lookingFor,position,[-1,-1]));
                
            taskOne += checking.filter((val) => val == lookingFor).length;            
        }
    }
}
console.log('Task one:',taskOne);

//TaskTwo
let taskTwo = 0;

for(let row = 1; row <grid.length-1; row++)
{
    for(let col = 1; col < grid[row].length-1; col++)
    {
        if(grid[row][col] == 'A'){

            let checking = `${grid[row-1][col-1]}${grid[row-1][col+1]},${grid[row+1][col-1]}${grid[row+1][col+1]}`;
            if(['MM,SS','SM,SM','SS,MM','MS,MS'].includes(checking)) 
                taskTwo++;            
        }
    }
}
console.log('Task two:',taskTwo);