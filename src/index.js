//GAME AREA
//Make a class for the game area
// javascripts/intro.js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        // call updateGameArea() every 20 milliseconds
        this.interval = setInterval(updateGameArea, 20);
        this.frameNo = 0;
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateGameArea() {
    myGameArea.clear();
    player.update();
}
//Should have a method that draws the board (called when the start-button is clicked)
//should display score of player
//should display immunity of player
//something with frames
//function update game area

//PLAYER
//Make a class for the player
//Constructor should contain score, starting on 0
//Constructor should contain name
//Constructor should contain immunity level, starting on 3
//Should move according to left or right arrow pressed (X decreasing/increasing)
//should not be able to leave the game area or move up/down
//should receive damage when touched by corona
//Should increase score when corona is shot

//SANITIZER
//Should be activated by SPACE
//Moves up (Y-decreasing) when activated
//Starts on current X of the player
//Should disappear when meets same position as a corona
//If it doesn't meet the same position as corona it will move out of the game area

//CORONA
//Make a class for corona
//Should start at y=0 and a random X
//Should 'disappear' when meeting same position as sanitizer
//Should receive a (random?) speed (Y increasing)
//Should make immunity of player decrease when meeting same position as the player
//Should make score of player increase by corona speed when meeting same position as sanitizer

//START BUTTON
//start button event listener
//should draw the board
//should set a timed interval that will create more and more corona
//should activate the player
//should draw the score on the board
//should draw the immunity on the board