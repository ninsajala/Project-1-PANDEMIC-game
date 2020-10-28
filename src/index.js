let player
let name
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
        this.interval = setInterval(updateGameScreen, 20);
        this.frameNo = 0;
        this.spraySound = new Sound('../sound-effects/spray-effect.mp3')
        this.cleanSound = new Sound(`../sound-effects/clean-effect.mp3`)
        this.fallSound = new Sound(`../sound-effects/fall-effect.mp3`)
        this.backGroundSound = new Sound(`../sound-effects/background-corona-cumbia.mp3`)
        updateScoreScreen(player)
        updateImmunityScreen(player)
    },

    clear: function () {
        //this.backGroundSound.play()
        let img = new Image()
        img.src = '../images/background-option.jpeg'
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        console.log("stopping game")
        clearInterval(this.interval);
    }


    //score function
}

function updateGameScreen() {
    myGameArea.clear(); //clears the canvas to print new graphic
    player.newPosition(); //places player on new coordinates
    player.update(); //puts canvas of player on screen
    //checkGameOver(); // immunity=0
    updateScoreScreen(player);
    updateImmunityScreen(player);
    updateSanitizers()
    updateCoronas()
    checkIfSanitized()
    anyCollisions()
}

function updateScoreScreen(player) {
    ctx.font = "20px Creepster";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${player.score}`, 400, 20);
}

function updateImmunityScreen(player) {
    ctx.font = "20px Creepster";
    ctx.fillStyle = "black";
    ctx.fillText(`Immunity: ${player.immunity}`, 400, 50);
}

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

class Player {
    constructor() {
        this.x = 240
        this.y = 425
        this.width = 50
        this.height = 75
        this.speedX = 0
        this.score = 0
        this.immunity = 3
    }

    newPosition() {
        this.x += this.speedX
    }

    update() {
        let img = new Image()
        img.src = `../images/bottle.png`
        ctx.drawImage(img, this.x, this.y, this.width, this.height)
    }

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

    crashWith(object) {
        //        console.log(this.top() + " " + object.y + " " + this.left() + " " + object.x + " " + this.right());
        if (object.y >= (500 - 60)) {
            // carona is at the bottom of the screen
            //console.log("corona xy " + object.x + " " + object.y);
            if ((this.left() >= object.x && this.left() < (object.x + 60)) ||
                (this.right() >= object.x && this.right() < (object.x + 60))) {
                //console.log("crash detected");
                return true;
            }
        }
        return false;
    }

    movePlayer(keyCode) {
        switch (keyCode) {
            case 39:
                if (this.x <= 470) {
                    return this.speedX += 4
                };
                break;
            case 37:
                if (this.x >= 5) {
                    return this.speedX -= 4;
                }
        }
    }

    decreaseImmunity() {
        if (this.immunity > 0) {
            this.immunity -= 1
        }
        return this.immunity;
    }

    increaseScore(speed) {
        return this.score += speed
    }
}

document.addEventListener('keydown', function (e) {
    player.movePlayer(e.keyCode)
})

document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 39:
            return player.speedX = 0
            break;
        case 37:
            return player.speedX = 0
    }
})

//SANITIZER
class Sanitizer {
    constructor(x) {
        this.x = x
        this.y = 500
        this.width = 30
        this.height = 30
        this.speedY = 5
    }

    newPosition() {
        this.y -= this.speedY
    }

    update() {
        let img = new Image()
        img.src = `../images/sanitizercloud.png`
        ctx.drawImage(img, this.x, this.y, this.width, this.height)
    }

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

    crashWith(object) {
        if (this.top() === (object.speed + 60) &&
            ((this.left() >= object.x && this.left() < (object.x + 60) ||
                (this.right() >= object.x && this.right() < (object.x + 60))
            ))) {
            return true
        }
    }
}

const allSanitizers = []

function newSanitizerSpray() {
    myGameArea.spraySound.play()
    let sanitizer = new Sanitizer(player.x)
    allSanitizers.push(sanitizer)
}

document.addEventListener('keydown', function (e) {
    e.preventDefault()
    if (e.keyCode === 32) {
        newSanitizerSpray()
    }
})

function anyCollisions() {
    for (i = 0; i < coronas.length; i++) {
        if (player.crashWith(coronas[i])) {
            player.decreaseImmunity();
            if (player.immunity <= 0) {
                myGameArea.stop();
                break;
            }
        }
    }
}

function checkIfSanitized() {
    for (let i = 0; i < allSanitizers.length; i++) {
        for (let j = 0; j < coronas.length; j++) {
            if (allSanitizers[i].crashWith(coronas[j])) {
                myGameArea.cleanSound.play()
                player.increaseScore(5)
                coronas[j].speed = 0
                coronas[j].x = 0
                coronas[j].radius = 0
            }
        }
    }
}

function updateSanitizers() {
    for (let i = 0; i < allSanitizers.length; i++) {
        allSanitizers[i].newPosition()
        allSanitizers[i].update()

        if (allSanitizers[i].y < -1) {
            allSanitizers.splice(i, 1);
            i--;
        }
    }
}


const coronas = [];

function updateCoronas() {
    for (let i = 0; i < coronas.length; i++) {
        let oneCorona = coronas[i];
        oneCorona.y += 1;
        this.width = 60;
        this.height = 60;
        let img = new Image();
        img.src = `images/coronavirus.png`;
        ctx.drawImage(img, oneCorona.x, oneCorona.y, this.width, this.height)

        if (oneCorona.y > 500) {
            coronas.splice(i, 1);
            i--;
        }
    }

    myGameArea.frameNo += 1
    if (myGameArea.frameNo % 120 === 0) {
        // smyGameArea.fallSound.play()
        let x = Math.floor(Math.random() * 500);
        let speed = Math.floor(Math.random() * 5);


        coronas.push({
            x: x,
            y: -60,
            speed: speed,

        })

    }
}

const startButton = document.getElementById('start-button')
const instructions = document.querySelector('.instructions')

startButton.addEventListener('click', function () {
    instructions.innerHTML = ''
    player = new Player()
    myGameArea.start()

})