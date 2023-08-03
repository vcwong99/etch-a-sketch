const container=document.getElementById('container');
const BOARD_SIZE=16;
for(let i=0; i<BOARD_SIZE;i++){
    const row=document.createElement('div');
    row.setAttribute('id', 'row');
    for(let j=0;j<BOARD_SIZE; j++){
        const square=document.createElement('div');
        square.setAttribute('id', 'square');
        square.textContent= ''+(i*16+j);
        row.appendChild(square);
    }
    container.appendChild(row);
}