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
        this.
        updateScoreScreen(player)
        updateImmunityScreen(player)
    },

    clear: function () {
        let img = new Image()
        img.src = '../images/background-option.jpeg'
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
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
    updateSanitizers()
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
        if (
            this.top() === object.bottom() &&
            ((this.left() >= object.left() && this.left() < object.right()) ||
                (this.right() >= object.left() && this.right() < object.right())
            )
        ) {
            return true
        }
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
        return this.immunity -= 1
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

const sanitized = allSanitizers.some(function (object) {
    return sanitizer.crashWith(object)
})

function checkIfSanitized() {
    for (let i = 0; i < coronas.length; i++) {
        if (sanitized(coronas[i])) {
            myGameArea.cleanSound.play()
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

// class Corona {
//     constructor() {
//         this.y = 500
//         this.width = 20
//         this.height = 20
//         this.speedY = 3 + Math.random() * 5;
//         this.x = Math.random() * 500;
//         this.image = new Image();
//         this.image.src = 'https://openclipart.org/image/800px/205972'
//     }
// }
// // Create the falling corona virusses
// let coronas = [];
// let noOfCoronas = 5;
// let x = 0;
// let y = 0;


// function drawVirus() {
//     for (let i = 0; i < coronas.length; i++) {
//         ctx.drawImage(coronas[i].image, coronas[i], coronas[i].x, coronas[i].y); // the corona
//         coronas[i].y += coronas[i].speed; //set falling speed
//         if (coronas[i].y > 500) { //(height) repeat corona when it is out of view
//             coronas[i].y = -25 // accounts for images size, adjust when image
//             coronas[i].x = Math.random() * 500 //(height) virus appears randomly on width
//         }
//     }
// }

// function setupVirus() {
//     setInterval(drawVirus, 36);
//     let fallingCorona = new Corona();
//     coronas.push(fallingCorona)
//     // for (let i = 0; i < noOfCoronas; i++) {
//     //     let fallingCorona = new Corona();
//     //     fallingCorona["image"] = new Image();
//     //     // fallingCorona.image.src = 'https://openclipart.org/image/800px/205972';
//     //     // fallingCorona["x"] = Math.random() * 500; //width
//     //     // fallingCorona["y"] = Math.random() * 5;
//     //     // fallingCorona["speed"] = 3 + Math.random() * 5;
//     //     coronas.push(fallingCorona)
//     // }
// }

//START BUTTON
const startButton = document.getElementById('start-button')

startButton.addEventListener('click', function () {
    startButton.innerHTML = 'Restart'
    player = new Player()
    //setupVirus();
    myGameArea.start()
})

//To do:
//Write game over function that checks if immunity is 0 and stops interval if true
//Player crash with corona function --> call decrease immunity