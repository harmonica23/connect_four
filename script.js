/*----- constants -----*/


/*----- state variables -----*/
let board;  // array of 7 column arrays
let turn;   // 1 or -1 to represent players
let winner; // null = no winner, 1 or -1 = winner, 'T' = tie game

/*----- cached elements  -----*/


/*----- event listeners -----*/


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

function render() {
    
}