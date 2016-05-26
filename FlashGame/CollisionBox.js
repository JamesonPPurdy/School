var CollisionBox = function() {
    
    var me = this;
    
    var spriteX, spriteY, spriteW, spriteH;
    
    this.updateMe = function(sprite){
        
        // get the x, y, width and height of the sprite.
        var spriteBounds = sprite.getBounds(sprite);
        
        // the x and y of the sprite seem to be offsets so I added the x and y value to the value gotten form getBounds
        spriteX = (spriteBounds.x + sprite.x);
        spriteY = (spriteBounds.y + sprite.y);
        spriteW = spriteBounds.width;
        spriteH = spriteBounds.height;
        // spriteY;
        // spriteW;
        // spriteH;
        // spriteX = spriteX = sprite.x;
        // spriteY = spriteY = sprite.y;
        // console.log("x: " + spriteX + ", y: " + spriteY + ", width: " + spriteW + ", height: " + spriteH);
        // console.log("sprite.y(" + sprite.y + ") + spriteBounds.y(" + spriteBounds.y + ") = " + (sprite.y + spriteBounds.y));
        
    }
    
    this.contains = function(x, y){
        
        // do the boxes of the objects collide
        return ((x >= spriteX) && (x <= spriteX+spriteW) && (y >= spriteY) && (y <= spriteY + spriteH)); /* {
            console.log("Yes!");
            
            console.log(spriteX + " < " + x + " < " + (spriteX + spriteW));
            console.log(spriteY + " < " + y + " < " + (spriteY + spriteH));
        } else {
            console.log("No!");
        }*/
        
    }
    // are the objects intersecteing passing in the collision box of the othe object
    this.isIntersecting = function(otherBox){
        
        
        if (otherBox.contains(spriteX, spriteY)){
            return true;
        }
        
        if (otherBox.contains(spriteX + spriteW, spriteY)){
            return true;
        }
        
        if (otherBox.contains(spriteX + spriteW, spriteY + spriteH)){
            return true;
        }
        
        if (otherBox.contains(spriteX, spriteY + spriteH)){
            return true;
        }
        
        return false;
        
    }
}