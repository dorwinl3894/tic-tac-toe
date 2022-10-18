const startButton = document.getElementById("start-button");
const player1 = document.getElementById("player1-name-input");
const player2 = document.getElementById("player2-name-input");

const player1name = document.getElementById("player1-name");
const player2name = document.getElementById("player2-name");

const gameArea = document.getElementById("game-area");
const turnIndicator = document.getElementById("player-turn-indicator");

let playerTurn = 0;
let nodes = document.getElementById("game-area").children;


startButton.addEventListener("click",() => {
    if (player1.value && player2.value) {
        player1name.innerHTML = player1.value;
        player2name.innerHTML = player2.value;
        turnIndicator.style.display = 'inline';
        turnIndicator.innerHTML = player1name.innerHTML + "'s turn";
        gameArea.style.pointerEvents = 'initial';
        gameArea.style.opacity = '1';
        resetBoard();
    }
    else {
        alert("Please enter a name")
    }
})

gameArea.addEventListener("click", function clicked(event) {
    //get the data attribute number of the picked square
    let pickedSquare = event.target.classList;

    let pickedSquareNumber = event.target.dataset.number;


    //if the picked square does not have class p1 and p2...
    if (!(pickedSquare.contains("p1")) && !(pickedSquare.contains("p2")) && !(pickedSquare.contains("game-area-container"))) {
        if(playerTurn === 0) {
            pickedSquare.add("p1");
            pickedSquare.remove("not-clicked");
            event.target.innerHTML ="X";
            playerTurn = 1;
            turnIndicator.innerHTML = player2name.innerHTML + "'s turn";
            checkForWinP1();
        }
        else {
            pickedSquare.add("p2");
            pickedSquare.remove("not-clicked");
            event.target.innerHTML ="O";
            playerTurn = 0;
            turnIndicator.innerHTML = player1name.innerHTML + "'s turn";
            checkForWinP2();

        }
    }
})

const resetBoard =  () => {
   for (let i = 0; i < nodes.length; i++) {
        nodes[i].classList.remove('p1');
        nodes[i].classList.remove('p2');
        nodes[i].classList.add("not-clicked");
        nodes[i].innerHTML = "";


   }

}

const checkForWinP1 = () => {
    
    console.log(nodes[0]);
    if (
         //horizontal win
        (nodes[0].classList.contains('p1') && nodes[1].classList.contains('p1') && nodes[2].classList.contains('p1')) ||
        (nodes[3].classList.contains('p1') && nodes[4].classList.contains('p1') && nodes[5].classList.contains('p1')) ||
        (nodes[6].classList.contains('p1') && nodes[7].classList.contains('p1') && nodes[8].classList.contains('p1')) ||
         //vertical win
        (nodes[0].classList.contains('p1') && nodes[3].classList.contains('p1') && nodes[6].classList.contains('p1')) ||
        (nodes[1].classList.contains('p1') && nodes[4].classList.contains('p1') && nodes[7].classList.contains('p1')) ||
        (nodes[2].classList.contains('p1') && nodes[5].classList.contains('p1') && nodes[8].classList.contains('p1')) ||
        //diagnal win
        (nodes[0].classList.contains('p1') && nodes[4].classList.contains('p1') && nodes[8].classList.contains('p1')) ||
        (nodes[2].classList.contains('p1') && nodes[4].classList.contains('p1') && nodes[6].classList.contains('p1')) 
    ) {
        gameArea.style.pointerEvents = 'none';
        gameArea.style.opacity = '0.5';
        turnIndicator.innerHTML = player1name.innerHTML + " wins!";
        console.log("Player1 wins");
    }
}

const checkForWinP2 = () => {
    let nodes = document.getElementById("game-area").children;
    console.log(nodes[0].classList.contains('p1'));
    if (
         //horizontal win
        (nodes[0].classList.contains('p2') && nodes[1].classList.contains('p2') && nodes[2].classList.contains('p2')) ||
        (nodes[3].classList.contains('p2') && nodes[4].classList.contains('p2') && nodes[5].classList.contains('p2')) ||
        (nodes[6].classList.contains('p2') && nodes[7].classList.contains('p2') && nodes[8].classList.contains('p2')) ||
         //vertical win
        (nodes[0].classList.contains('p2') && nodes[3].classList.contains('p2') && nodes[6].classList.contains('p2')) ||
        (nodes[1].classList.contains('p2') && nodes[4].classList.contains('p2') && nodes[7].classList.contains('p2')) ||
        (nodes[2].classList.contains('p2') && nodes[5].classList.contains('p2') && nodes[8].classList.contains('p2')) ||
        //diagnal win
        (nodes[0].classList.contains('p2') && nodes[4].classList.contains('p2') && nodes[8].classList.contains('p2')) ||
        (nodes[2].classList.contains('p2') && nodes[4].classList.contains('p2') && nodes[6].classList.contains('p2')) 
    ) {
        gameArea.style.pointerEvents = 'none';
        gameArea.style.opacity = '0.5';
        turnIndicator.innerHTML = player2name.innerHTML + " wins!";
        console.log("Player1 wins");
    }
}

// 
// click on a square --> check if the square has a class p1 or p2
// if it doesn't --> add p1 or p2
// if it does --> insert html "Choose a different square"
// then after all of this, use the algorithm to check if p1 or p2 matches
// 




/* tic tac toe win algorthim

    3 across or 3 diagonal
    grid array = [0,1,2,3,4,5,6,7,8]
    for every div inside main game area div, set a data attribute from 0-8
    
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]

    winning combinations
    0,1,2 horizontal
    3,4,5
    6,7,8

    0 3 6  vertical
    1 4 7
    2 5 8

    0 4 8 diagnal
    2 4 6

    square event clicked
        loop over array and if player1.classname is present in any of these
        combinations, then show win
        if player2.classname is present in any of these, show win
*/