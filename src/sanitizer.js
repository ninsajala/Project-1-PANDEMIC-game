let allSanitizers = [];
let sanitizerCounter = 10

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