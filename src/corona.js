let coronas = [];

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