//GAME AREA
//Make a class for the game area
//Should have a method that draws the board (called when the start-button is clicked)
//should display score of player
//should display immunity of player
//something with frames
//function update game area

//Basic component class, used for player, sanitizer and corona
class Component {
    constructor(x, y, width, height) {
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.speedX = 0
        this.speedY = 0
        this.img = new Image()
        this.img.src
    }

    //Defines how fast component moves
    newPosition() {
        this.x += this.speedX
        this.y += this.speedY
    }

    //Makes component move
    update() {
        const context = gameArea.context
        context.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    //Find positions for crashing logic
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

    //crashing logic
    crashWith(object) {
        return (
            this.top() === object.bottom() &&
            //Need to define this statement better
            (this.right() === object.left() ||
                this.left() === object.right())
        )
    }
}

//PLAYER
//Make a class for the player
class Player extends Component {
    constructor(x, y, width, height, name) {
        super(x, y, width, height)
        //Constructor should contain name
        this.name = name
        //Constructor should contain score, starting on 0
        this.score = 0
        //Constructor should contain immunity level, starting on 3
        this.immunity = 3
    }
    //Should move according to left or right arrow pressed (X decreasing/increasing)
    movePlayer(keycode) {
        //should not be able to leave the game area or move up/down
        if (this.x <= 0 || this.x >= 500) {
            return console.log('Cannot move out of canvas')
        } else {
            switch (keycode) {
                case 39:
                    return this.speedX += 1;
                    break;
                case 37:
                    return this.speedX -= 1;
            }
        }
    }
    //should receive damage when touched by corona
    decreaseImmunity() {
        return this.immunity -= 1
    }
    //Should increase score when corona is shot
    increaseScore(speed) {
        return this.score += speed
    }
}

//Even listener that makes player move
document.addEventListener('keydown', function (e) {
    player.movePlayer(e.keyCode)
})

//SANITIZER
class Sanitizer extends Component {
    constructor(x) {
        this.height = 5
        this.width = 5
        //Starts on current X of the player
        this.x = x
        //starts at the bottom
        this.y = 500
        //Moves up (Y-decreasing) when activated
        this.speedY = -5
        this.img = new Image()
        this.img.src = `src`
    }
    //If it doesn't meet the same position as corona it will move out of the game area
}
//array that will keep track of all created sanitizers
const allSanitizers = []

//function that will create a new sanitizer component
function newSanitizerSpray() {
    const sanitizer = new Sanitizer(player.x)
    allSanitizers.push(sanitizer)
}

//Sanitizer should be activated by SPACE
document.addEventListener('keydown', function (e) {
    if (e.keyCode === 32) {
        newSanitizerSpray()
    }
})
//Should disappear when meets same position as a corona + increase score of player
//IN PROGRESS
function checkIfSanitized() {
    const sanitized = allSanitizers.some
}
//CORONA
//Make a class for corona
//Should start at y=0 and a random X
//Should 'disappear' when meeting same position as sanitizer
//Should receive a (random?) speed (Y increasing)
//Should make immunity of player decrease when meeting same position as the player
//Should make score of player increase by corona speed when meeting same position as sanitizer

//START BUTTON
//start button event listener
//should draw the board
//should set a timed interval that will create more and more corona
//should activate the player
//should draw the score on the board
//should draw the immunity on the board

//Check Game over