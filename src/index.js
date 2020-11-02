let player, canvas, ctx;
let highScore = 0;
let coronas = [];
let allSanitizers = [];
let allVaccins = [];
let allBottles = [];

let sanitizerCounter = 10
let backGroundMusic = new Sound(`../sound-effects/background-corona-cumbia.mp3`);

const startButton = document.getElementById('start-button');
const playMusic = document.querySelector('#play-music');
const gameBoard = document.getElementById('game-board');

startButton.addEventListener('click', function () {
    const instructions = document.querySelector('.instructions');
    instructions.style.display = 'none';

    const h1 = document.querySelector('h1');
    h1.classList.toggle('shake');

    backGroundMusic.play();
    playMusic.innerHTML = `<img id='play-icon' src="./images/play-music.png" alt="play music icon">`;

    player = new Player();
    myGameArea.start();
});

playMusic.addEventListener('click', function () {
    let musicIconSrc = document.querySelector('#play-icon').src;
    if (musicIconSrc.includes(`play-music`)) {
        backGroundMusic.stop();
        playMusic.innerHTML = `<img id='play-icon' src="./images/stop-music.png" alt="play music icon">`;
    } else if (musicIconSrc.includes(`stop-music`)) {
        backGroundMusic.play();
        playMusic.innerHTML = `<img id='play-icon' src="./images/play-music.png" alt="play music icon">`;
    }
});

document.addEventListener('keydown', function (e) {
    player.movePlayer(e.keyCode);
});

document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 39:
            return player.speedX = 0;
            break;
        case 37:
            return player.speedX = 0;
    }
});

document.addEventListener('keydown', function (e) {
    e.preventDefault();
    if (sanitizerCounter !== 0) {
        if (e.keyCode === 32) {
            newSanitizerSpray();
            sanitizerCounter--
        }
    } else {

        setTimeout(function () {
            sanitizerCounter = 10
        }, 2000)
    }
});

const myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        clearInterval(this.interval);
        this.canvas.width = 500;
        this.canvas.height = 500;
        ctx = this.canvas.getContext("2d");
        gameBoard.appendChild(this.canvas);
        this.interval = setInterval(updateGameScreen, 10);
        this.frameNo = 0;
        this.spraySound = new Sound('../sound-effects/spray-effect.mp3');
        this.cleanSound = new Sound(`../sound-effects/clean-effect.mp3`);
        this.fallSound = new Sound(`../sound-effects/fall-plop.mp3`);
        this.screamSound = new Sound(`../sound-effects/scream-effect.mp3`);
        this.warningSound = new Sound(`../sound-effects/tun-tun-tunn-effect.mp3`);
        this.gameOverSound = new Sound(`../sound-effects/dyingheartbeat.mp3`);
        this.levelUpSound = new Sound(`../sound-effects/level-up-effect.mp3`)
        this.winSound = new Sound(`../sound-effects/winSound.mp3`)
        this.vaccinCatch = new Sound(`../sound-effects/catch-vaccin-effect.mp3`)
        this.vaccinBreak = new Sound(`../sound-effects/break-vaccin-effect.mp3`)
        this.bottleCatch = new Sound(`../sound-effects/refill-effect.mp3`)
        this.bottleBreak = new Sound(`../sound-effects/shot-bottle-effect.mp3`)
    },

    clear: function () {
        let img = new Image();
        img.src = '../images/background-option.jpeg';
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
        console.log(myGameArea.start.this)
    }
}

function updateGameScreen() {
    myGameArea.clear();
    player.newPosition();
    player.update();
    updateScoreScreen(player);
    updateImmunityScreen(player);
    updateSanitizers();
    updateCoronas();
    checkIfSanitized();
    anyCollisions();
    icWarning();
    showHighScore()
    spraysLeftinBottle()
    showLevel()
    if (player.level > 1) {
        updateVaccins()
        catchVaccin()
        shootVaccin()
    }
    if (player.level > 3) {
        updateExtraRefills()
        catchBottle()
        shootBottle()
    }
}

function updateScoreScreen(player) {
    ctx.font = "20px Play";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${player.score}`, 400, 20);
}

function updateImmunityScreen(player) {
    ctx.font = "20px Play";
    ctx.fillStyle = "white";
    ctx.fillText(`Immunity: ${player.immunity}`, 370, 50);
}

function showHighScore() {
    ctx.font = "20px Play";
    ctx.fillStyle = "white";
    ctx.fillText(`Highscore: ${highScore}`, 5, 50);
}

function showLevel() {
    ctx.font = "20px Play";
    ctx.fillStyle = "white";
    ctx.fillText(`Level: ${player.level}`, 5, 80);
}

function spraysLeftinBottle() {
    ctx.font = "20px Play";
    ctx.fillStyle = "white";
    if (sanitizerCounter > 0) {
        ctx.fillText(`Sprays left before refill: ${sanitizerCounter}`, 5, 20);
    } else {
        ctx.fillText(`Refilling bottle, please wait...`, 5, 20);
    }
}

function icWarning() {
    if (player.immunity === 1) {
        ctx.font = "30px Creepster";
        ctx.fillStyle = "#D03232";
        ctx.fillText(`INTENSIVE CARE`, 170, 150);
    }
}

function gameOver() {
    ctx.font = "40px Creepster";
    ctx.fillStyle = "Black";
    ctx.fillText(`YOU LOST AGAINST THE VIRUS`, 50, 150);
    ctx.fillText(`YOU ARE GOING INTO`, 120, 200);
    ctx.fillText(`QUARANTINE`, 160, 305);
    restartButton();
}

function youWon() {
    ctx.font = "40px Creepster";
    ctx.fillStyle = "Black";
    ctx.fillText(`YOU WON AGAINST THE VIRUS`, 50, 150);
    ctx.fillText(`WITH A SCORE OF: ${player.score}`, 100, 200);
    ctx.fillText(`✨✨✨✨✨✨`, 130, 305);
    restartButton();
}


function restartButton() {
    let restartButton = document.querySelector(`.restart`);
    restartButton.innerHTML = `<button id="restart-button"></button>`;
    restartButton.addEventListener('click', function (event) {
        event.preventDefault()
        coronas = [];
        allSanitizers = [];
        allVaccins = [];
        allBottles = [];
        sanitizerCounter = 10;
        myGameArea.clear();
        player = new Player();
        myGameArea.start();
        restartButton.innerHTML = ``;
    });
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
        this.x = 240;
        this.y = 425;
        this.width = 50;
        this.height = 75;
        this.speedX = 0;
        this.score = 0;
        this.immunity = 3;
        this.level = 1
    }

    newPosition() {
        this.x += this.speedX;
    }

    update() {
        let img = new Image();
        img.src = `../images/bottle.png`;
        ctx.drawImage(img, this.x, this.y, this.width, this.height);
    }

    crashWith(object) {
        if (this.x + this.width >= object.x &&
            this.x <= object.x + 60 &&
            this.y + this.height >= object.y &&
            this.y <= object.y + 60) {
            return true
        }
        return false;
    }

    movePlayer(keyCode) {
        switch (keyCode) {
            case 39:
                this.speedX += 2;
                if (this.x >= 470) {
                    this.x = 470;
                }
                break;
            case 37:
                this.speedX -= 2;
                if (this.x <= 5) {
                    this.x = 5;
                }
        }
    }

    decreaseImmunity() {
        if (this.immunity > 0) {
            return this.immunity -= 1;
        }
    }

    increaseScore() {
        this.score += 5;
        if (this.score % 50 === 0) {
            if (player.level < 5) {
                myGameArea.levelUpSound.play()
                player.level++
            }
        }
        if (this.score > 500) {
            if (highScore < player.score) {
                highScore = player.score
            }
            myGameArea.stop()
            myGameArea.winSound.play()
            youWon()
        }
        return this.score
    }
}

class Sanitizer {
    constructor(x) {
        this.x = x;
        this.y = 500;
        this.width = 30;
        this.height = 30;
        this.speedY = 5;
    }

    newPosition() {
        this.y -= this.speedY;
    }

    update() {
        let img = new Image();
        img.src = `../images/sanitizercloud.png`;
        ctx.drawImage(img, this.x, this.y, this.width, this.height);
    }

    crashWith(object) {
        if (this.x + this.width >= object.x &&
            this.x <= object.x + 60 &&
            this.y + this.height >= object.y &&
            this.y <= object.y + 60) {
            return true
        }
        return false;
    }
}

function levelFrames() {
    switch (player.level) {
        case 1:
            return 140;
            break;
        case 2:
            return 120;
            break;
        case 3:
            return 100;
            break;
        case 4:
            return 80;
            break;
        case 5:
            return 60;
    }
}

function updateCoronas() {
    for (let i = 0; i < coronas.length; i++) {
        let oneCorona = coronas[i];
        oneCorona.y += 1;
        this.width = 60;
        this.height = 60;
        let img = new Image();
        img.src = `images/coronavirus.png`;
        ctx.drawImage(img, oneCorona.x, oneCorona.y, this.width, this.height);

        if (oneCorona.y > 500) {
            coronas.splice(i, 1);
            i--;
        }
    }

    myGameArea.frameNo += 1;
    if (myGameArea.frameNo % levelFrames() === 0) {
        myGameArea.fallSound.play();
        let x = Math.floor(Math.random() * 440) + 30;
        let speed = Math.ceil(Math.random() * 5);

        coronas.push({
            x,
            y: -60,
            speed
        });

    }
}


function updateVaccins() {
    for (let i = 0; i < allVaccins.length; i++) {
        let oneVaccin = allVaccins[i];
        oneVaccin.y += 1;
        this.width = 50;
        this.height = 50;
        let img = new Image();
        img.src = `images/vaccin.png`;
        ctx.drawImage(img, oneVaccin.x, oneVaccin.y, this.width, this.height);

        if (oneVaccin.y > 500) {
            allVaccins.splice(i, 1);
            i--;
        }
    }

    if (myGameArea.frameNo % 400 === 0) {
        let x = Math.floor(Math.random() * 440) + 30;
        let speed = 5;

        allVaccins.push({
            x,
            y: -50,
            speed
        });

    }
}

function updateExtraRefills() {
    for (let i = 0; i < allBottles.length; i++) {
        let oneBottle = allBottles[i];
        oneBottle.y += 1;
        this.width = 30;
        this.height = 50;
        let img = new Image();
        img.src = `images/bottle.png`;
        ctx.drawImage(img, oneBottle.x, oneBottle.y, this.width, this.height);

        if (oneBottle.y > 500) {
            allBottles.splice(i, 1);
            i--;
        }
    }

    if (myGameArea.frameNo % 350 === 0) {
        let x = Math.floor(Math.random() * 440) + 30;
        let speed = 5;

        allBottles.push({
            x,
            y: -50,
            speed
        });

    }
}

function newSanitizerSpray() {
    myGameArea.spraySound.play();
    let sanitizer = new Sanitizer(player.x);
    allSanitizers.push(sanitizer);
}

function updateSanitizers() {
    for (let i = 0; i < allSanitizers.length; i++) {
        allSanitizers[i].newPosition();
        allSanitizers[i].update();
        if (allSanitizers[i].y < -1) {
            allSanitizers.splice(i, 1);
            i--;
        }
    }
}

function anyCollisions() {
    for (i = 0; i < coronas.length; i++) {
        if (player.crashWith(coronas[i])) {
            myGameArea.screamSound.play();
            player.decreaseImmunity();
            coronas.splice(i, 1);
            if (player.immunity === 1) {
                myGameArea.warningSound.play();
            }
            if (player.immunity === 0) {
                if (highScore < player.score) {
                    highScore = player.score
                }
                myGameArea.gameOverSound.play();
                setTimeout(function () {
                    myGameArea.stop(),
                        gameOver();
                }, 500);
            }
        }
    }
}

function checkIfSanitized() {
    for (let i = 0; i < allSanitizers.length; i++) {
        for (let j = 0; j < coronas.length; j++) {
            if (allSanitizers[i].crashWith(coronas[j])) {
                myGameArea.cleanSound.play();
                coronas.splice(j, 1);
                allSanitizers.splice(i, 1);
                player.increaseScore();
            }
        }
    }
}

function catchVaccin() {
    for (i = 0; i < allVaccins.length; i++) {
        if (player.crashWith(allVaccins[i])) {
            myGameArea.vaccinCatch.play()
            player.immunity++;
            allVaccins.splice(i, 1);
        }
    }
}

function shootVaccin() {
    for (let i = 0; i < allSanitizers.length; i++) {
        for (let j = 0; j < allVaccins.length; j++) {
            if (allSanitizers[i].crashWith(allVaccins[j])) {
                myGameArea.vaccinBreak.play()
                allVaccins.splice(j, 1);
                allSanitizers.splice(i, 1);
            }
        }
    }
}

function catchBottle() {
    for (i = 0; i < allBottles.length; i++) {
        if (player.crashWith(allBottles[i])) {
            myGameArea.bottleCatch.play()
            sanitizerCounter += 10;
            allBottles.splice(i, 1);
        }
    }
}

function shootBottle() {
    for (let i = 0; i < allSanitizers.length; i++) {
        for (let j = 0; j < allBottles.length; j++) {
            if (allSanitizers[i].crashWith(allBottles[j])) {
                myGameArea.bottleBreak.play()
                allBottles.splice(j, 1);
                allSanitizers.splice(i, 1);
            }
        }
    }
}