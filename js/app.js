// Enemies our player must avoid
var Enemy = function(posX, posY, gameSpeed) {
    // posX and posY variables to instantiate the location of each of the enemies.
    this.x = posX;
    this.y = posY;
    this.speed = gameSpeed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers. Check enemy position to update and keep looping.
    this.x += this.speed * dt;
        if(this.x > 600) {
            this.x = 0;
        }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (posX, posY) {
    this.x = posX;
    this.y = posY;
    this.sprite = 'images/char-boy.png';
};

// Check player position to update and keep player on the board.
// Alert user when player gets to water for the win.
Player.prototype.update = function() {
    if(this.x < 0) {
        this.x = 0;
    } else if(this.x > 400) {
        this.x = 400;
    } else if(this.y === 0) {
        this.y = 400;
    } else if(this.y < 0) {
        this.y = 0;
        alert("YOU WIN! TRY AGAIN!");
    } else if(this.y > 400) {
        this.y = 400;
    }
};

// Draw player on the board, required method for the game.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player movements are controlled by the user with the following keystrokes.
Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case 'up':
            this.y = this.y - 85;
            break;

        case 'down':
            this.y = this.y + 85;
            break;

        case 'right':
            this.x = this.x + 100;
            break;

        case 'left':
            this.x = this.x - 100;
            break;
    }
};

// This function will check player and enemy positions to detect collisions.
// If there is a collision, the game is over and the player resets to the beginning.
var checkCollisions = function() {
   for (var i = 0; i < allEnemies.length; i++) {
        if (player.x + 60 >= allEnemies[i].x && player.x <= allEnemies[i].x + 60 &&
            player.y + 45 >= allEnemies[i].y && player.y <= allEnemies[i].y + 45) {
            alert("Oh the bug got you! Game Over!");
            player.reset();
        }
    }
};

var startHereX = 200;
var startHereY = 400;

// This resets the player when there is a collision or when the player wins.
Player.prototype.reset = function() {
    this.x = startHereX;
    this.y = startHereY;
};

// Now instantiate your objects.
var enemy1 = new Enemy(0,60,360);
var enemy2 = new Enemy(0,143,300);
var enemy3 = new Enemy(0,225,200);
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player
var player = new Player(startHereX,startHereY);

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
});
