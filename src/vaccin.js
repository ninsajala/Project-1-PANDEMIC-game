let allVaccins = [];

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