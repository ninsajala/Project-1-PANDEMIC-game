//PLAYER
//Make a class for the player
//Constructor should contain score
//Constructor should contain name
//Should move according to left or right arrow pressed
//Needs a method
//should not be able to leave the game area or move up
//should receive damage when touched by corona

//GAME AREA
//Make a class for the game area
//Should have a method that draws the board (called when the start-button is clicked)
//should contain score

//CORONA
//Make a class for corona
//Should 'disappear' when clicked/shot
//Should receive a (random?) speed


/* To make movement possible, the canvas needs to be updated every 20ms.
Needs to be placed within myGameArea start: 
this.interval = setInterval(updateGameScreen, 15);

Needs to be place within myGameArea (outside of start):
clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);}


function updateGameScreen(){
    myGameArea.clear(); clears the canvas to print new graphic
    player.newPosition(); places player on new coordinates
    player.update(); puts canvas of player on screen
    updateVirus(); will create new virus obstacles
    checkGameOver(); // immunity=0
    myGameArea.score(); // update and draw the score
}





//START BUTTON
//start button event listener
//should draw the board
//should set an interval that will create more and more corona
//should activate the player
//should draw the score on the board