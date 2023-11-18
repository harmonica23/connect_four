/*----- constants -----*/
const COLORS = {
    '0': 'white',
    '1': 'purple',
    '-1': 'orange'
}

/*----- state variables -----*/
let board;  // array of 7 column arrays
let turn;   // 1 or -1 to represent players
let winner; // null = no winner, 1 or -1 = winner, 'T' = tie game

/*----- cached elements  -----*/
const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');
const markerEls = [...document.querySelectorAll('#markers > div')];

/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleDrop);
playAgainBtn.addEventListener('click', init);

/*----- functions -----*/
init() // always call this to start the function
//initialize all state, then call render()
function init() {
    // to visualize the board's mapping to the DOM,
    // rotate the board array 90 degrees counter-clockwise
    board = [
        [0, 0, 0, 0, 0, 0], // column 0
        [0, 0, 0, 0, 0, 0], // column 1
        [0, 0, 0, 0, 0, 0], // column 2
        [0, 0, 0, 0, 0, 0], // column 3
        [0, 0, 0, 0, 0, 0], // column 4
        [0, 0, 0, 0, 0, 0], // column 5
        [0, 0, 0, 0, 0, 0], // column 6
    ];
    turn = 1;
    winner = null;
    render();
}
// visualize all state in the DOM
function render() {
    renderBoard();
    renderMessage();
    // hiding and showing UI elements (controls)
    renderControls();
}

function renderBoard() {
    board.forEach(function(colArr, colIdx) {
        // iterate over the cells in the cur column (colArr)
        colArr.forEach(function(cellVal, rowIdx) {
            const cellId = `c${colIdx}r${rowIdx}`;
            const cellEl = document.getElementById(cellId);
            // console.log(cellEl)
            cellEl.style.backgroundColor = COLORS[cellVal];
        });
    });
}

function renderMessage() {
    if (winner === 'T') {
        messageEl.innerText = "It's a Tie!!!";
    } else if (winner) {
        messageEl.innerHTML = `<span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> Wins!`;
    } else {
        //game is in play
        messageEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
    }
}

function renderControls() {
    // Ternary expression is the go to when you want 1 of the 2 values returned
    // <cond expressions> ? <truthy exp> otherwise : <falsy exp>
playAgainBtn.style.visibility = winner ? 'visible': 'hidden'
// iterate over the marker elements to hide/show according to the column being full (no zeros) or not
markerEls.forEach(function(markerEl, colIdx) {
        const hideMarker = !board[colIdx].includes(0) || winner;
        markerEl.style.visibility = hideMarker ? 'hidden' : 'visible';
    });
}

//in response to user interaction update all impacted state then call render
function handleDrop(evt) {
    const colIdx = markerEls.indexOf(evt.target);
    //Guards...
    if (colIdx === -1) return;
    //shortcut to the column array
    const colArr = board[colIdx];
    // find the index of the first 0 in colArr
    const rowIdx = colArr.indexOf(0);
// update the board state with the current player value (turn)
    colArr[rowIdx] = turn
//switch player turn
    turn *= -1;  //can also say turn = turn * -1
    //check for winner
    winner = getWinner(colIdx, rowIdx);
    render();
}
// check for winner in board
//return a null if no winner, 1 or -1 if a player has won, 'T' if tie
function getWinner(colIdx, rowIdx) {
    return checkVerticalWin(colIdx, rowIdx) || 
    checkHorizontalWin(colIdx, rowIdx) ||
    checkDiagonalWinNESW(colIdx, rowIdx) ||
    checkDiagonalWinNWSE(colIdx, rowIdx);
}

function checkDiagonalWinNWSE(colIdx, rowIdx) {
    const adjCountNW = countAdjacent(colIdx, rowIdx, -1, 1);
    const adjCountSE = countAdjacent(colIdx, rowIdx, 1, -1);
    return (adjCountNW + adjCountSE) >= 3 ? board[colIdx][rowIdx] : null;
}

function checkDiagonalWinNESW(colIdx, rowIdx) {
    const adjCountNE = countAdjacent(colIdx, rowIdx, 1, 1);
    const adjCountSW = countAdjacent(colIdx, rowIdx, -1, -1);
    return (adjCountNE + adjCountSW) >= 3 ? board[colIdx][rowIdx] : null;
}

function checkHorizontalWin(colIdx, rowIdx) {
    const adjCountLeft = countAdjacent(colIdx, rowIdx, -1, 0);
    const adjCountRight = countAdjacent(colIdx, rowIdx, 1, 0);
    return (adjCountLeft + adjCountRight) >= 3 ? board[colIdx][rowIdx] : null;
}

function checkVerticalWin(colIdx, rowIdx) {
    return countAdjacent(colIdx, rowIdx, 0, -1) === 3 ? board[colIdx][rowIdx] : null;
}

function countAdjacent(colIdx, rowIdx, colOffset, rowOffset) {
    // shortcut variable to the player values
    const player = board[colIdx][rowIdx];
    // track count of adjacent cells with the same player value
    let count = 0;
    // initialize new coordinates
    colIdx += colOffset;
    rowIdx += rowOffset;
    while(
        // ensure colIdx is within bounds of the board array
        board[colIdx] !== undefined &&
        board [colIdx][rowIdx] !== undefined &&
        board[colIdx][rowIdx] === player 
    ) {   
        count++;
        colIdx += colOffset;
        rowIdx += rowOffset;       
    }
    return count;
}
