var Boss = function(stage, assetManager) {
    
    var killed = false;
    
    var health = 300;
    
    var me = this;
    
    var collisionBox = new CollisionBox();
    
    var eventBossKilled = new createjs.Event("onBossKilled", true);
    
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
    
    this.getHP = function() {
      return health;
    };
    
    this.takeDamage = function (){
      health -= 10;  
    };
    
    this.getX = function(){
      return sprite.x;  
    };
    
    // get the y
    this.getY = function(){
      return sprite.y;  
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
    this.isAtBottom = function(){
        return (sprite.y >= 650);
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
        sprite.gotoAndStop("bossSpawn");
        // have the enemy spawn at a random x coordinate within the screen
        sprite.x = 15;
        sprite.y = 50;
    };
     
    this.killMe = function() {
        if (!killed) {
            killed = true;
            spriteMover.stopMe();
            sprite.gotoAndPlay("BossDeath");
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
        sprite.dispatchEvent(eventBossKilled);
    }
}