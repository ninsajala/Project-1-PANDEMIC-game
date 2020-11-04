let allBottles = [];

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