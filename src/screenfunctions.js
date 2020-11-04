let highScore = 0;

function checkIfMobile() {
    if (mobile.matches) {
        instructions.innerHTML = `<p>Sorry, we are not available on small screens yet. Try the game on a computer!</p>`
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
    ctx.fillText(`✨✨✨✨✨✨`, 130, 150);
    ctx.fillText(`YOU WON AGAINST THE VIRUS!!`, 50, 200);
    ctx.fillText(`✨✨✨✨✨✨`, 130, 305);
    restartButton();
}