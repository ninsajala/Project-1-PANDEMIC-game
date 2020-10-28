let player
let name
let canvas
let ctx
const gameBoard = document.getElementById('game-board')
let backGroundMusic = new Sound(`../sound-effects/background-corona-cumbia.mp3`)

const myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 500;
        this.canvas.height = 500;
        ctx = this.canvas.getContext("2d");
        gameBoard.appendChild(this.canvas)
        this.interval = setInterval(updateGameScreen, 20);
        this.frameNo = 0;
        this.spraySound = new Sound('../sound-effects/spray-effect.mp3');
        this.cleanSound = new Sound(`../sound-effects/clean-effect.mp3`);
        this.fallSound = new Sound(`../sound-effects/fall-plop.mp3`);
        this.screamSound = new Sound(`../sound-effects/scream-effect.mp3`);
        this.warningSound = new Sound(`../sound-effects/tun-tun-tunn-effect.mp3`);
        updateScoreScreen(player);
        updateImmunityScreen(player);
    },

    clear: function () {
        let img = new Image();
        img.src = '../images/background-option.jpeg';
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

function updateGameScreen() {
    myGameArea.clear();
    player.newPosition();
    player.update();
    updateScoreScreen(player);
    updateImmunityScreen(player);
    updateSanitizers()
    updateCoronas()
    checkIfSanitized()
    anyCollisions()
    icWarning()
}

function updateScoreScreen(player) {
    ctx.font = "20px Creepster";
    ctx.fillStyle = "#D03232";
    ctx.fillText(`Score: ${player.score}`, 400, 20);
}

function updateImmunityScreen(player) {
    ctx.font = "20px Creepster";
    ctx.fillStyle = "#D03232";
    ctx.fillText(`Immunity: ${player.immunity}`, 400, 50);
}

function icWarning() {
    if (player.immunity === 1) {
        ctx.font = "30px Creepster";
        ctx.fillStyle = "#D03232";
        ctx.fillText(`INTENSIVE CARE`, 170, 150);
    }
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

    crashWith(object) {
        if (this.y === object.y + 60) {
            if ((this.left() >= object.x && this.left() < (object.x + 60)) ||
                (this.right() >= object.x && this.right() < (object.x + 60))) {
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

    increaseScore(number) {
        return this.score += number
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

    crashWith(object) {
        if (this.y === object.y) {
            if ((this.left() >= (object.x - 100) && this.left() < (object.x + 100)) ||
                (this.right() >= (object.x - 100) && this.right() < (object.x + 100))) {
                return true;
            }
        }
        return false;
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
            myGameArea.screamSound.play()
            player.decreaseImmunity();
            coronas[i].speed = 0;
            coronas[i].x = 0;
            coronas[i].height = 0;
            if (player.immunity === 1) {
                myGameArea.warningSound.play()
            }
            if (player.immunity <= 0) {
                setTimeout(function () {
                    myGameArea.stop()
                }, 1000);
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
                coronas[j].height = 0
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
        myGameArea.fallSound.play()
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
const h1 = document.querySelector('h1')
const playMusic = document.querySelector('#play-music')

playMusic.addEventListener('click', function () {
    let musicIconSrc = document.querySelector('#play-icon').src
    if (musicIconSrc.includes(`play-music`)) {
        backGroundMusic.play()
        playMusic.innerHTML = `<img id='play-icon' src="./images/stop-music.png" alt="play music icon">`
    } else if (musicIconSrc.includes(`stop-music`)) {
        backGroundMusic.stop()
        playMusic.innerHTML = `<img id='play-icon' src="./images/play-music.png" alt="play music icon">`
    }
})

startButton.addEventListener('click', function () {
    h1.classList.toggle('shake')
    instructions.style.display = 'none'
    playMusic.innerHTML = `<img id='play-icon' src="./images/play-music.png" alt="play music icon">`
    player = new Player()
    myGameArea.start()
})