var Character = function(stage, assetManager) {
    
    var killed = false;
    
    var collisionBox = new CollisionBox();
    
    var me = this;
    
    var eventCharacterKilled = new createjs.Event("onCharKilled", true);
    
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
    
    this.getBounds = function(){
      return sprite.getBounds();  
    };
    
    // get the x value for the sprite
    this.getX = function(){
      return sprite.x;  
    };
    
    // get the y
    this.getY = function(){
      return sprite.y;  
    };
    
    /*this.intersects = function(collisionBox){
        return collisionBox.isIntersecting(collisionBox);
    }*/
    
    // get the clooider for checking collisions
    this.getCollisionBox = function(){
        return collisionBox;
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
        sprite.gotoAndPlay("characterMove");
        sprite.x = 120;
        sprite.y = 512;
        stage.addChild(sprite);
    };
    
    this.killMe = function() {
        if (!killed) {
            killed = true;
            spriteMover.stopMe();
            sprite.gotoAndPlay("characterBoom");
            sprite.addEventListener("animationend", onKilled);
            sprite.removeEventListener();
        }
    };
    
    this.updateMe = function() {
        collisionBox.updateMe(sprite);
        spriteMover.update();
    };
    
    function onKilled(e) {
        // cleanup
        sprite.stop();
        stage.removeChild(sprite);
        e.remove();
        sprite.dispatchEvent(eventCharacterKilled);
    }
}