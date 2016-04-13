var Bullet = function(stage, assetManager, spriteOrigin) {
    
    var killed = false;
    
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
    
    // check if the enemy has collided with the given collision box
    this.intersects = function(otherBox){
        return collisionBox.isIntersecting(otherBox);
    }
    
    // get the collision box for this sprite
    this.getCollisionBox = function(){
        return collisionBox;
    }
    
    // check if the enemy has reached the bottom of the screen
    this.isAtTop = function(){
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
        sprite.gotoAndStop("EnemyMove");
        // have the enemy spawn at a random x coordinate within the screen
        sprite.x = spriteOrigin.x ;
        sprite.y = spriteOrigin.y;
    };
     
    this.killMe = function() {
        if (!killed) {
            killed = true;
            spriteMover.stopMe();
            sprite.gotoAndPlay("EnemyMove");
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