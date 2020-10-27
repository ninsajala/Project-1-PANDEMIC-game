//GAME AREA
//Make a class for the game area
let player
let canvas
let ctx
const gameBoard = document.getElementById('game-board')

const myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 500;
        this.canvas.height = 500;
        ctx = this.canvas.getContext("2d");
        gameBoard.appendChild(this.canvas)
        //call updateGameArea() every 20 milliseconds
        //updateGameScreen()
        this.interval = setInterval(updateGameScreen, 20);
        this.frameNo = 0;
        //loads the spray sound
        this.spraySound = new Sound('../sound-effects/spray-effect.mp3')
        updateScoreScreen(player)
        updateImmunityScreen(player)
    },
    // clear the canvas before starting new draw
    clear: function () {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }

    //stop: function clearInterval 
    //score function
}

function updateScoreScreen(player) {
    ctx.font = "18px Creepster";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${player.score}`, 400, 20);
}

function updateImmunityScreen(player) {
    ctx.font = "18px Creepster";
    ctx.fillStyle = "black";
    ctx.fillText(`Immunity: ${player.immunity}`, 400, 50);
}

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

//PLAYER
//Make a class for the player
class Player {
    constructor(name) {
        this.x = 260
        this.y = 450
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
        //this.img = new Image()
        //this.img.src = `../images/bottle.png`
    }
    newPosition() {
        this.x += this.speedX
    }

    //Makes component move
    update() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y, this.width, this.height)
        //ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
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


    //Should move according to left or right arrow pressed (X decreasing/increasing)
    movePlayer(keyCode) {
        //should not be able to leave the game area or move up/down
        if (this.x <= 0 || this.x >= 500) {
            this.speedX = 0
        } else {
            switch (keyCode) {
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
document.addEventListener('keyup', function (e) {
    player.movePlayer(e.keyCode)
})

//SANITIZER
class Sanitizer {
    constructor(x) {
        this.x = x
        this.y = 500
        this.width = 20
        this.height = 20
        //Moves up (Y-decreasing) when activated
        this.speedY = 5
        //this.img = new Image()
        //this.img.src = `../images/sanitizer-spray.png`
    }

    newPosition() {
        this.y -= this.speedY
    }

    //Makes component move
    update() {
        ctx.fillStyle = 'green'
        ctx.fillRect(this.x, this.y, this.width, this.height)
        //ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
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
//array that will keep track of all created sanitizers
const allSanitizers = []

//function that will create a new sanitizer component
function newSanitizerSpray() {
    myGameArea.spraySound.play()
    //setTimeout(myGameArea.spraySound.stop(), 1000)
    let sanitizer = new Sanitizer(player.x)
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

function updateSanitizers() {
    for (let i = 0; i < allSanitizers.length; i++) {
        allSanitizers[i].newPosition()
        allSanitizers[i].update()
    }
}

function updateGameScreen() {
    myGameArea.clear(); //clears the canvas to print new graphic
    player.newPosition(); //places player on new coordinates
    player.update(); //puts canvas of player on screen
    //drawVirus(); //will create new virus obstacles
    //checkGameOver(); // immunity=0
    updateScoreScreen(player);
    updateImmunityScreen(player);
    updateSanitizers();
    updateCoronas()
}

const coronas = [];

  function updateCoronas(){
    for(let i=0; i < coronas.length; i++){
        let oneCorona = coronas[i];
        oneCorona.y += 1; 
        // creating circles
                ctx.beginPath();
        // color the circles
                ctx.fillStyle = "rgb(255,127,80)";
          // drawing circle
                ctx.arc(oneCorona.x, oneCorona.y += oneCorona.speed/2, oneCorona.speed * 0.8, 0, oneCorona.radius);
                ctx.fill();
          }

    myGameArea.frameNo += 1
    if(myGameArea.frameNo % 120 === 0) {
        let x = Math.floor(Math.random()* 500);
            let speed = Math.floor(Math.random()* 5);
            let radius = 10* Math.PI;
    
            coronas.push({
                x:x,
                y:0,
                speed:speed,
                radius:radius
            })}}
 
 



//let name

// function askPlayerName() {
//     return name = alert('Hi Corona warrior! What is your name?')
// }
//START BUTTON
const startButton = document.getElementById('start-button')
//start button event listener
startButton.addEventListener('click', function () {
    startButton.innerHTML = 'Restart'
    //should draw the board

    //should activate the player
    //askPlayerName()
    player = new Player('Piet')
    //setupVirus();
    myGameArea.start()
})

//To do:
//Write game over function that checks if immunity is 0 and stops interval if true
//Update sanitizer function --> for loop
//Player crash with corona function --> call decrease immunity