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