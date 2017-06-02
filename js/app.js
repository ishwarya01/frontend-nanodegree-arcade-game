//Global variables for player and enemy
var playerX = 202; // Player reset position X coordinate
var playerY = 404; // Player reset position X coordinate
var cellWidth = 101; // Board each cell width
var cellHeight = 83; // Board each cell Height
var enemySpeed = 400; // Speed of the enemy bug
var boardTopLeftX = 0;
var boardTopLeftY = 55;
var numRows = 5;
var numCols = 5;

// Get random integer to generate enemy at a random location
var getRandomInt = function(rangeStart, rangeEnd) {
    return rangeStart + Math.floor((Math.random() * (rangeEnd -rangeStart)));
};

// Given a row, col position, this function returns the exact
// location of that coordinate in the board
var getGridPos = function(row, col) {
var boardX = boardTopLeftX + (col * cellWidth);
var boardY = boardTopLeftY + (row * cellHeight);
return {
    posX: boardX,
    posY: boardY
    };
};

/*ENEMY RELATED METHODS BEGIN*/

var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.init();
};

// Initialize enemy by generating random positions each time
Enemy.prototype.init = function() {
    this.sprite = 'images/enemy-bug.png'; // The image/sprite for enemies, this uses
    // a helper to easily load images
    var colIndex= getRandomInt(0, numCols-1); // Get random column
    var rowIndex = getRandomInt(0, numRows-1); // Get random row
    var pos = getGridPos(rowIndex, colIndex); // Get position based on above
    // Set enemy's x and y coordinates
    this.x = pos.posX;
    this.y = pos.posY;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.checkCollision(player);
    this.x = this.x + (dt * enemySpeed * Math.random());
    // Resets enemy after reaching end of board
    if (this.x > numCols*cellWidth) {
        this.x = boardTopLeftX;
    }
};

// Method to draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check collision between Enemy and Player
Enemy.prototype.checkCollision = function(player) {
    if (player.x < this.x + 70 && // Number is enemy's width
        player.x + 60 > this.x && // Number is player's width
        player.y < this.y + 40 && // Number is enemy's height
        60 + player.y > this.y) { // number is player's height
            player.reset();
        }
};

/*ENEMY RELATED METHODS END*/

/*PLAYER RELATED METHODS END*/
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = playerX;
    this.y = playerY;
};

// Reset Player method
Player.prototype.reset = function() {
    this.x = playerX;
    this.y = playerY;
};

// Method to move player up for 'up' key
Player.prototype.moveUp = function() {
    if(this.y <= boardTopLeftY + cellHeight) { // Checks if player is off the Board
        this.reset();
    }
    else {
        this.y -= cellHeight;
    }
};

// Method to move player down for 'down' key
Player.prototype.moveDown = function() {
    if(this.y >= (boardTopLeftY + ((numRows-1) * cellHeight))) { // Checks if player is off the Board
        this.reset();
    }
    else {
        this.y = this.y + cellHeight;
    }
};

// Method to move player left for 'left' key
Player.prototype.moveLeft = function() {
    if(this.x <= boardTopLeftX) { // Checks if player is off the Board
        this.reset();
    }
    else {
        this.x = this.x - cellWidth;
    }
};

// Method to move player right for 'right' key
Player.prototype.moveRight = function() {
    if(this.x >= (boardTopLeftX + ((numCols-1) * cellWidth))) { // Checks if player is off the Board
        this.reset();
    }
    else {
        this.x = this.x + cellWidth;
    }
};

// Method to draw the Player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Method to handle key input based on direction
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            player.moveUp();
            break;
        case 'down':
            player.moveDown();
            break;
        case 'left':
            player.moveLeft();
            break;
        case 'right':
            player.moveRight();
            break;
    }
};
/*PLAYER RELATED METHODS END*/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
     console.log(allowedKeys[e.keyCode]);
});

