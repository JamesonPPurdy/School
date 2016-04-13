(function() {
    "use strict";

    window.addEventListener("load", onInit);

    // game variables
    var stage = null;
    var canvas = null;
    var leftKey = false;
    var rightKey = false;
    var spaceBar = false;
    
    // start a timer
    var startTime = new Date().getTime();
    
    var char;
    
    // array to hold enemies on screen
    var aryEnemies = new Array();
    var aryBullets = new Array();

    // frame rate of game
    var frameRate = 24;
    var me = this;

    // game objects
    var assetManager = null;
    
    function onInit() {
        console.log(">> initializing");

        // get reference to canvas
        canvas = document.getElementById("stage");
        // set canvas to as wide/high as the browser window
        canvas.width = 300;
        canvas.height = 600;
        // create stage object
        stage = new createjs.Stage(canvas);

        // construct preloader object to load spritesheet and sound assets
        assetManager = new AssetManager(stage);
        stage.addEventListener("onAllAssetsLoaded", onReady);
        // load the assets
        assetManager.loadAssets(manifest);
        
        
    }
    
    function spawnEnemy(){
        
        // when this gets run get the current time
        var currentTime = new Date().getTime();
        
        var time = currentTime - startTime;
        
        var enemy = new Enemy(stage, assetManager);
        enemy.resetMe();
        // add the enemy to the array og enemies
        aryEnemies.push(enemy);
        
        // console.log(time);
        
        // run the method every 1 - 6 seconds roughly based on the amount of time elapsed
        window.setTimeout(spawnEnemy, (-2 * Math.atan( ( time/1000   - 120 ) / 60 ) + 3.5)*1000);
        
    }
    
    function spawnBullet(){
        
        var bullet = new Bullet(stage, assetManager, char);
        bullet.resetMe();
        // add the enemy to the array og enemies
        aryBullets.push(bullet);
        
    }
    
     function onReady(e) {
        console.log(">> setup");
        // kill event listener
        stage.removeEventListener("onAllAssetsLoaded", onReady);
         
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);
        
        // add snake to the stage
        char = new Character(stage, assetManager);
        char.resetMe(); 
         
        spawnEnemy();

        // startup the ticker
        createjs.Ticker.setFPS(frameRate);
        createjs.Ticker.addEventListener("tick", onTick);
    }
    
    function onKeyDown(e) {
        // which keystroke is down?
        // if (e.keyCode == 37) leftKey = true;
        // else if (e.keyCode == 39) rightKey = true;
        console.log(e.keyCode);
        switch(e.keyCode) {
            case 37:
                leftKey = true;
                console.log("Left");
                break;
            case 39:
                rightKey = true;
                console.log("Right");
                break;
            case 32:
                spaceBar = true;
                console.log("Space");
                break;
                
        }
    }

    function onKeyUp(e) {
        // which keystroke is up?
        // if (e.keyCode == 37) leftKey = false;
        // else if (e.keyCode == 39) rightKey = false;
        switch(e.keyCode) {
            case 37:
                leftKey = false;
                console.log("Left");
                break;
            case 39:
                rightKey = false;
                console.log("Right");
                break;
            case 32:
                spaceBar = false;
                console.log("Space");
                break;
                
        }
    }
    
    function onTick(e) {
        // TESTING FPS
        document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();
         
        // console.log(enemy.intersects(char.getCollisionBox()));
        

        if (!char.getKilled()) {
            if (leftKey) {
                char.startMe(MoverDirection.LEFT);
            } else if (rightKey) {
                char.startMe(MoverDirection.RIGHT);
            } else if (spaceBar){
                
            } else {
                char.stopMe();
            }
        }
         
        

        char.updateMe();
        // enemy.updateMe();
        // console.log(aryEnemies);
        for (var i = 0; i < aryEnemies.length; i++){
            aryEnemies[i].updateMe();
            
            if (aryEnemies[i].intersects(char.getCollisionBox())){
                char.killMe();
            }
            
            if(aryEnemies[i].isAtBottom()){
                aryEnemies[i].killMe();
            }
            
            if (!aryEnemies[i].getKilled()){
                aryEnemies[i].startMe(MoverDirection.DOWN);
            } else {
                aryEnemies[i].killMe();
                aryEnemies.splice(i, 1);
                console.log("array" + aryEnemies);
            }
        }
        // update the stage!
        stage.update();
         
        // console.log(char.getBounds());
    }
    
})();