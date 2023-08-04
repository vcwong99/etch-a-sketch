const container=document.getElementById('container');
let BOARD_SIZE=16;
let randomColor  =() =>  Math.floor(Math.random()*16777215).toString(16);
let currentPenStyle = "black";
function initialize(){
    const grid=document.createElement('div');
    grid.setAttribute('id', 'grid');
    container.appendChild(grid);
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

//resize button function
function resizeBoard(){
    let newSize=parseInt(prompt("how big do you want the grid to be?"));
    newSize= (newSize>100)? 100:newSize;
    (BOARD_SIZE>newSize)? trimBoard(newSize):expandBoard(newSize);
    BOARD_SIZE= newSize;
    const squares = document.querySelectorAll('.square');
    clearBoard();
}
function clearBoard(){

    for(let i=0;i<BOARD_SIZE;i++){
        const squares=document.querySelectorAll('#col-'+i);
        squares.forEach((square)=>{
            square.style.background='white';
        });
    }
}

function addPenStyle(square, color){
    square.addEventListener("mouseenter", (e)=>{
        e.target.style.background = (color=="random")?("#" + randomColor()):color;
    });
}
function changePenStyle(color){
    for(let i=0;i<BOARD_SIZE;i++){
        const squares=document.querySelectorAll('#col-'+i);
        squares.forEach((square)=>{
            console.log("changing to "+color);
            addPenStyle(square, color);
        });
    }
    currentPenStyle=color;
}


initialize();

//resize button 
const resize = document.getElementById('resize');
resize.addEventListener('click', resizeBoard);
//clear
const clear = document.getElementById('clear');
clear.addEventListener('click', clearBoard);

const eraser = document.getElementById('eraser');
eraser.addEventListener('click', ()=>changePenStyle("white"));

const random = document.getElementById('random');
random.addEventListener('click', ()=>changePenStyle("random"));

const pen = document.getElementById('pen');
pen.addEventListener('click', ()=>changePenStyle("black"));

