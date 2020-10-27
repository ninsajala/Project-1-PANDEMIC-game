//GAME AREA
//Make a class for the game area
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
        //loads the spray sound
        this.spraySound = new Sound('../sound-effects/spray-effect.mp3')
    },
    // clear the canvas before starting new draw
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// after clearing the canvas, we have to add update the game area


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

//Class for all sounds
function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

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
        const ctx = myGameArea.ctx
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
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
        this.width = 50
        this.height = 75
        //Can move from right to left
        this.speedX = 0
        //Constructor should contain name
        this.name = name
        //Constructor should contain score, starting on 0
        this.score = 0
        //Constructor should contain immunity level, starting on 3
        this.immunity = 3
        this.img = new Image()
        this.img.src = `../images/bottle.png`
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
        this.height = 20
        this.width = 20
        //Starts on current X of the player
        this.x = x
        //starts at the bottom
        this.y = 500
        //Moves up (Y-decreasing) when activated
        this.speedY = -5
        this.img = new Image()
        this.img.src = `../images/sanitizer-spray.png`
    }
    //If it doesn't meet the same position as corona it will move out of the game area
}
//array that will keep track of all created sanitizers
const allSanitizers = []

//function that will create a new sanitizer component
function newSanitizerSpray() {
    myGameArea.spraySound.play()
    setTimeout(myGameArea.spraySound.stop(), 1000)
    const sanitizer = new Sanitizer(player.x)
    allSanitizers.push(sanitizer)
}

//Sanitizer should be activated by SPACE
document.addEventListener('keydown', function (e) {
    if (e.keyCode === 32) {
        newSanitizerSpray()
    }
})

//Should disappear when meets same position as a corona + increase score of player
//IN PROGRESS
const sanitized = allSanitizers.some(function (object) {
    return sanitizer.crashWith(object)
})

function checkIfSanitized() {
    for (let i = 0; i < coronas.length; i++) {
        if (sanitized(coronas[i])) {
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








function updateGameScreen() {
    myGameArea.clear(); //clears the canvas to print new graphic
    player.newPosition(); //places player on new coordinates
    player.update(); //puts canvas of player on screen
    drawVirus(); //will create new virus obstacles
    checkGameOver(); // immunity=0
    myGameArea.score(); // update and draw the score
    updateScoreScreen(player);
    updateImmunityScreen(player);
}

// Create the falling corona virussses
let coronas = [];
let noOfCoronas = 5;
let x = 0;
let y = 0;


function drawVirus() {
    for (let i = 0; i < noOfCoronas; i++) {
        ctx.drawImage(coronas[i].image, coronas[i], coronas[i].x, coronas[i].y); // the corona
        coronas[i].y += coronas[i].speed; //set falling speed
        if (coronas[i].y > 500) { //(height) repeat corona when it is out of view
            coronas[i].y = -25 // accounts for images size, adjust when image
            coronas[i].x = Math.random() * 500 //(height) virus appears randomly on width

        }
    }
}

function setupVirus() {
    setInterval(drawVirus, 36);
    for (let i = 0; i < noOfCoronas; i++) {
        let fallingCorona = new Object();
        fallingCorona["image"] = new Image();
        fallingCorona.image.src = 'https://openclipart.org/image/800px/205972';
        fallingCorona["x"] = Math.random() * 500; //width
        fallingCorona["y"] = Math.random() * 5;
        fallingCorona["speed"] = 3 + Math.random() * 5;
        coronas.push(fallingCorona)
    }
}
setupVirus();

let player
let name

function askPlayerName() {
    return name = alert('Hi Corona warrior! What is your name?')
}
//START BUTTON
const startButton = getElementById('start-button')
//start button event listener
startButton.addEventListener('click', function () {
    startButton.innerHTML = 'Restart'
    //should draw the board
    myGameArea()
    //should activate the player
    askPlayerName()
    player = new Player(`${name}`)
})



//Check Game over