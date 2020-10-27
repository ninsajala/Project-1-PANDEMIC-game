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
    // clear the canvas before starting new draw
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// after clearing the canvas, we have to add update the game area

function updateGameArea() {
    myGameArea.clear();
    player.update();
    updateScoreScreen(player);
    updateImmunityScreen(player);
}

function updateScoreScreen(player) {
    this.ctx.font = "18px Creepster";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Score: ${player.score}`, 420, 210);
},
function updateImmunityScreen(player) {
    this.ctx.font = "18px Creepster";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Immunity: ${player.immunity}`, 420, 200);
},

//Should have a method that draws the board (called when the start-button is clicked)
//should display score of player

//should display immunity of player

//something with frames
//function update game area

//Basic component class, used for player, sanitizer and corona
class Component {
    constructor() {
        this.width
        this.height
        this.x
        this.y
        this.speedX = 0
        this.speedY = 0
        this.img = new Image()
        this.img.src
    }

    //Defines how fast component moves
    newPosition() {
        this.x += this.speedX
        this.y += this.speedY
    }

    //Makes component move
    update() {
        const context = gameArea.context
        context.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    //Find positions for crashing logic
    left() {
        return this.x
    }
    right() {
        return this.x + this.width
    }
    top() {
        return this.y
    }
    bottom() {
        return this.y + this.height
    }

    //crashing logic
    crashWith(object) {
        if (
            this.top() === object.bottom() &&
            ((this.left() >= object.left() && this.left() < object.right()) ||
                (this.right() >= object.left() && this.right() < object.right())
            )
        ) {
            return true
        }
    }
}

//PLAYER
//Make a class for the player
class Player extends Component {
    constructor(name) {
        this.x = 260
        this.y = 500
        this.width = 20
        this.height = 20
        //Can move from right to left
        this.speedX = 0
        //Constructor should contain name
        this.name = name
        //Constructor should contain score, starting on 0
        this.score = 0
        //Constructor should contain immunity level, starting on 3
        this.immunity = 3
        this.img = new Image()
        this.img.src = `src`
    }
    //Should move according to left or right arrow pressed (X decreasing/increasing)
    movePlayer(keycode) {
        //should not be able to leave the game area or move up/down
        if (this.x <= 0 || this.x >= 500) {
            return console.log('Cannot move out of canvas')
        } else {
            switch (keycode) {
                case 39:
                    return this.speedX += 1;
                    break;
                case 37:
                    return this.speedX -= 1;
            }
        }
    }
    //should receive damage when touched by corona
    decreaseImmunity() {
        return this.immunity -= 1
    }
    //Should increase score when corona is shot
    increaseScore(speed) {
        return this.score += speed
    }
}

//Event listener that makes player move
document.addEventListener('keydown', function (e) {
    player.movePlayer(e.keyCode)
})

//SANITIZER
class Sanitizer extends Component {
    constructor(x) {
        this.height = 5
        this.width = 5
        //Starts on current X of the player
        this.x = x
        //starts at the bottom
        this.y = 500
        //Moves up (Y-decreasing) when activated
        this.speedY = -5
        this.img = new Image()
        this.img.src = `src`
    }
    //If it doesn't meet the same position as corona it will move out of the game area
}
//array that will keep track of all created sanitizers
const allSanitizers = []

//function that will create a new sanitizer component
function newSanitizerSpray() {
    const sanitizer = new Sanitizer(player.x)
    allSanitizers.push(sanitizer)
}

//Sanitizer should be activated by SPACE
document.addEventListener('keydown', function (e) {
    if (e.keyCode === 32) {
        newSanitizerSpray()
    }
})

const allCoronas = []
//Should disappear when meets same position as a corona + increase score of player
//IN PROGRESS
const sanitized = allSanitizers.some(function (object) {
    return sanitizer.crashWith(object)
})

function checkIfSanitized() {
    for (let i = 0; i < allCoronas.length; i++) {
        if (sanitized(allCoronas[i])) {
            player.increaseScore()
            allCoronas[i].speedY = 0
            allCoronas[i].width = 0
            allCoronas[i].height = 0
        }
    }
}


//CORONA
//Make a class for corona
//Should start at y=0 and a random X
//Should 'disappear' when meeting same position as sanitizer
//Should receive a (random?) speed (Y increasing)
//Should make immunity of player decrease when meeting same position as the player

//Should make score of player increase by corona speed when meeting same position as sanitizer


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
//should set a timed interval that will create more and more corona
//should activate the player
//should draw the score on the board
//should draw the immunity on the board

//Check Game over