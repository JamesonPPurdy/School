var EnemyBullet = function(stage, assetManager, spriteX, spriteY) {
    
    var killed = false;
    
    var score = 0;
    
    var startX = spriteX;
    var startY = spriteY;
    
    var me = this;
    
    var collisionBox = new CollisionBox();
    
    var eventEnemyKilled = new createjs.Event("onEnemyKilled", true);
    
    var sprite = assetManager.getSprite("Sprites");
    var spriteMover = new Mover(sprite, stage);
    stage.addChild(sprite);
    
    // Gets/Sets ---------------------------------------------------
    this.getKilled = function() {
        return killed;
    };

    this.getSprite = function() {
        return sprite;
    };
    
    // check collisions
    this.intersects = function(otherBox){
        return collisionBox.isIntersecting(otherBox);
    }
    
    // get the collision box for this sprite
    this.getCollisionBox = function(){
        return collisionBox;
    }
    
    // check if the enemy has reached the bottom of the screen
    this.isAtBottom = function(){
        return (sprite.y <= -50);
    }
    // Methods ------------------------------------------------------
    this.setupMe = function() {
        killed = false;
    };
    
    this.startMe = function(direction) {
        spriteMover.setDirection(direction);
        if (!spriteMover.getMoving()) {
            spriteMover.startMe();
        }
    };
    
    this.stopMe = function() {
        // stop movement
        sprite.stop();
        spriteMover.stopMe();
    };
    
    this.resetMe = function() {
        killed = false;
        sprite.gotoAndStop("bossBullet");
        // have the enemy spawn at a random x coordinate within the screen
        sprite.x = startX +25;
        sprite.y = startY;
        
        console.log(startX);
    };
     
    this.killMe = function() {
        if (!killed) {
            killed = true;
            spriteMover.stopMe();
            sprite.gotoAndPlay("bossBullet");
            sprite.addEventListener("animationend", onKilled);
        }
    };
    
    this.updateMe = function() {
        // update the collision box with each update
        collisionBox.updateMe(sprite);
        
        spriteMover.update();
    };
    
    function onKilled(e) {
        // cleanup
        sprite.stop();
        stage.removeChild(sprite);
        e.remove();
        sprite.dispatchEvent(eventEnemyKilled);
    }
}