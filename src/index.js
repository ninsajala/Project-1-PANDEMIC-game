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
const instructions = document.querySelector('.instructions');
const mobile = window.matchMedia("(max-width: 700px)")


window.addEventListener('load', checkIfMobile())

startButton.addEventListener('click', function () {
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