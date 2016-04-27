// Enemies our player must avoid
var Enemy = function(posX, posY, gameSpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
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
    // all computers.
    this.x += this.speed * dt;
        if(this.x > 600) {
            this.x = 0;
        };
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

Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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

var startHereX = 200;
var startHereY = 400;

Player.prototype.reset = function() {
    this.x = startHereX;
    this.y = startHereY;
};


// Now instantiate your objects.
var enemy1 = new Enemy(0,60,160);
var enemy2 = new Enemy(0,143,300);
var enemy3 = new Enemy(0,225,200);
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player
var player = new Player();


Player.prototype.checkCollisions = function() {
    for(i=0; i < allEnemies.length; i++) {
        if(this.x === allEnemies[i].x && this.y === allEnemies[i].y) {
            player.reset();
        };
    };
};


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
