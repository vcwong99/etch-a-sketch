const container=document.getElementById('container');
const resize = document.getElementById('resize');
const clear = document.getElementById('clear');
const eraser = document.getElementById('eraser');
const random = document.getElementById('random');
const pen = document.getElementById('pen');
let BOARD_SIZE=16;
let randomColor  =() =>  Math.floor(Math.random()*16777215).toString(16);
let currentPenStyle = "black";
function initialize(){
    const grid=document.getElementById('grid');
    for(let i=0; i<BOARD_SIZE;i++){
        
        const row=document.createElement('div');
        row.setAttribute('id', 'row-'+i);
        row.setAttribute('class', 'row');
        for(let j=0;j<BOARD_SIZE; j++){
            const square=document.createElement('div');
            square.setAttribute('id', 'col-'+j);
            square.setAttribute('class', 'square');
            addPenStyle(square, currentPenStyle);
            row.appendChild(square);
        }
        grid.appendChild(row);
    }
    
}
//delete the squares for the new size
function trimBoard(newSize){
    for(let i=BOARD_SIZE-1;i>=(newSize);i--){
        const row=document.getElementById('row-'+i);
        row.remove();
    }
    for(let j=BOARD_SIZE-1;j>=(newSize);j--){
        const cols=document.querySelectorAll('#col-'+j);
        cols.forEach((col)=>{
            col.remove();
        })
    }
}
//function that adds the right squares to the grid
function expandBoard(newSize){
    //change the rows already there
    for(let i=0;i<BOARD_SIZE;i++){
        const row=document.getElementById('row-'+i);
        for(let j=BOARD_SIZE;j<newSize; j++){
            const square=document.createElement('div');
            square.setAttribute('id', 'col-'+j);
            square.setAttribute('class', 'square');
            row.appendChild(square, currentPenStyle);
            addPenStyle(square, currentPenStyle);
        }
    }
    // change adding new rows
    const grid=document.getElementById('grid');
    for(let i=BOARD_SIZE;i<newSize; i++){
        const row=document.createElement('div');
        row.setAttribute('id', 'row-'+i);
        row.setAttribute('class', 'row');
        for(let j=0;j<newSize;j++){
            const square=document.createElement('div');
            square.setAttribute('id', 'col-'+j);
            square.setAttribute('class', 'square');
            row.appendChild(square);
            addPenStyle(square, currentPenStyle);
        }
        grid.appendChild(row);
    }
}
//resize button functionconst eraser = document.getElementById('eraser');
function resizeBoard(){
    let newSize=parseInt(prompt("how big do you want the grid to be?"));
    newSize= (newSize>100)? 100:newSize;
    (BOARD_SIZE>newSize)? trimBoard(newSize):expandBoard(newSize);
    BOARD_SIZE= newSize;
    const squares = document.querySelectorAll('.square');
    clearBoard();
}
//apply a callback to all squares
function applyToAllSquares(callBack){
    for(let i=0;i<BOARD_SIZE;i++){
        const squares=document.querySelectorAll('#col-'+i);
        squares.forEach((square)=>{
            callBack(square);
        });
    }
}
//clears the board
function clearBoard(){
    applyToAllSquares((square)=>square.style.background='white');
}
//adds a listener to a single square
function addPenStyle(square){
    square.addEventListener("mouseenter", (e)=>{
        e.target.style.background = (currentPenStyle=="random")?("#" + randomColor()):currentPenStyle;
    });
}

function changePenStyle(color){
    currentPenStyle=color;
    applyToAllSquares(addPenStyle);
}

initialize();
//resize button 

resize.addEventListener('click', resizeBoard);
//clear
clear.addEventListener('click', clearBoard);
//set pen color to white
eraser.addEventListener('click', ()=>changePenStyle("white"));
//set pen color to random
random.addEventListener('click', ()=>changePenStyle("random"));
//set pen color to black
pen.addEventListener('click', ()=>changePenStyle("black"));