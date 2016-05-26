var Mover = function(sprite, stage) {
    // private property variables
    var speed = 10;
    var enemySpeed = 3;
    var bulletSpeed = 10;
    var direction = MoverDirection.LEFT;
    var moving = false;
    
    // construct custom event object for object moving off stage
    var eventOffStage = new createjs.Event("onOffStage", true);    

    // sprite not animating on construction
    sprite.stop();
    
    // --------------------------------------------------- get/set methods
    this.setSpeed = function(value) {
        speed = value;
    };
    this.getSpeed = function() {
        return speed;
    };
    
    this.setDirection = function(value) {
        direction = value;
    };

    this.getMoving = function(){
        return moving;   
    };
    
    // --------------------------------------------------- public methods
    this.startMe = function() {
        sprite.play();
        moving = true;
    };

    this.stopMe = function() {
        sprite.stop();
        moving = false;
    };

    this.update = function() {
        if (moving) {
            // get current width of sprite on this frame
            // we only need to concern ourselves with width in terms of off stage since we rotate sprite up, down, left, and right
            var width = sprite.getBounds().width;

            if (direction == MoverDirection.LEFT) {
                // moving left
                if (sprite.x > 10){
                    sprite.x = sprite.x - speed;
                    // console.log(sprite.x);
                }

            } else if (direction == MoverDirection.RIGHT) {
                // moving right
               if (sprite.x < 250){
                    sprite.x = sprite.x + speed;
                    // console.log(sprite.x);
                }

            } else if (direction == MoverDirection.DOWN) {
                // moving down
                //check if the y position is not at the bottom of the screen
                if (sprite.y < 650){
                    sprite.y = sprite.y + enemySpeed;
                    // console.log(sprite.x);
                }

            } else if (direction == MoverDirection.UP) {
                // moving down
                //check if the y position is not at the bottom of the screen
                if (sprite.y > -50){
                    sprite.y = sprite.y - bulletSpeed;
                    // console.log(sprite.x);
                }

            }
        }
    };
}

// static constant hacking by adding them on as properties of a generic object
var MoverDirection = {
    "LEFT":1,
    "RIGHT":2,
    "DOWN":3,
    "UP":4
};   
