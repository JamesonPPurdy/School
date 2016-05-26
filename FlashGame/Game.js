(function() {
    "use strict";

    window.addEventListener("load", onInit);

    // game variables
    var stage = null;
    var canvas = null;
    var leftKey = false;
    var rightKey = false;
    var rKey = false;
    var spaceBar = false;
    var background;
    
    // VARIABLES --------------------------------------------------------------------------------
    var char;
    
    var bossActive = false;
    
    var scoreText;
    var score;
    
    var gameOverBool = false;
    var gameOver;
    
    var over = false;
    var win = false;
    var youWin;
    
    var timeCounter = 48;
    var enemyCounter = 12;
    
    var playerScore;
    
    var boss;
    
    // array to hold enemies on screen -----------------------------------------------------------------------
    var aryEnemies = new Array();
    var aryBullets = new Array();
    var aryBossBullets = new Array();

    // frame rate of game ------------------------------------------------------------------------------------
    var frameRate = 24;
    var me = this;

    // game objects ------------------------------------------------------------------------------------------
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
        
        playerScore = 0;
        
    }
    
    // SPAWNING METHODS -------------------------------------------------------------------------------------
    
    function bossSpawner(){
        // delay the function to spawn the boss for one and a half minutes
        window.setTimeout(function spawnBoss(){
            
            // if the game is not over
            if (!gameOverBool) {
                // create the boss
                boss = new Boss(stage, assetManager);
                // set boss active to ture so enemies stop sapwning
                bossActive = true;
                // initialize the boss
                boss.resetMe();
                // play tyhe boss spawning sound
                createjs.Sound.play("roar");
            }
        
        }, 90000)
    }

    
    function spawnEnemy(){
        // if the game is not over
        if (!gameOverBool){
            // if the boss is not active
            if (!bossActive) {
                // if 24 framse has passed (1 second)
                if (enemyCounter == 24){
                    // create the enemy
                    var enemy = new Enemy(stage, assetManager);
                    // initialize it by resetting it
                    enemy.resetMe();

                    // add the enemy to the array of enemies
                    aryEnemies.push(enemy);
                    enemyCounter = 0;
                    createjs.Sound.play("spawn");
                } else {
                    // if it has not been 24 frames, add one tot he counter
                    enemyCounter += 1;
                }
            }
        }
    }
    
    function spawnBullet(){
        // create the bullet
        var bullet = new Bullet(stage, assetManager, char.getX(), char.getY());
        //initialize it
        bullet.resetMe();
        // add the enemy to the array of enemies and playy the firing sound
        createjs.Sound.play("shot");
        aryBullets.push(bullet);
        
    }
    
    function spawnBossBullet(x, y){
        //  this fires one each second and alternates between left and right somehow
        if (timeCounter == 48){
            var bullet = new EnemyBullet(stage, assetManager, x, y);
            bullet.resetMe();
            // add the enemy to the array og enemies
            aryBossBullets.push(bullet);
            timeCounter = 0;
            createjs.Sound.play("laser");
        } else {
            timeCounter += 1;
        }
        
    }
    
    // ONREADY -----------------------------------------------------------------------------------------------
    
     function onReady(e) {
        console.log(">> setup");
        // kill event listener
        stage.removeEventListener("onAllAssetsLoaded", onReady);
         
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);
        
        // add backgorund to the stage
        background = assetManager.getSprite("Sprites");
        background.gotoAndStop("background");
        stage.addChild(background);
        
        // set uup the score text
        score = new Score(stage, 0);
        
        // set up the character
        char = new Character(stage, assetManager);
        char.resetMe(); 
        
        // start the boss timer and start spawning enemies
        spawnEnemy();
        bossSpawner();

        // startup the ticker
        createjs.Ticker.setFPS(frameRate);
        createjs.Ticker.addEventListener("tick", onTick);
         
        // Checking for Game Over Restart
        stage.addEventListener("gameIsRestarting", restart);
    }
    
    function onKeyDown(e) {
        console.log(e.keyCode);
        // which keystroke is down?
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
                if (!spaceBar){
                    // if the game is not over, space bar will shoot a player bullet
                    if (!gameOverBool){
                        spaceBar = true;
                        spawnBullet();
                    }
                }
                break;
                
            case 82:
                if (gameOverBool){
                    // if it is it will run the start method
                    rKey = true;
                    restart();
            }
        }
    }

    function onKeyUp(e) {
        // which keystroke is up?
        switch(e.keyCode) {
            case 37:
                leftKey = false;
                break;
            case 39:
                rightKey = false;
                break;
            case 32:
                spaceBar = false;
                break;
            case 82:
                rKey = false;
                break;  
        }
    }
    
    // RESTARTING THE GAME AND RESETTING DETAILS 
    // *****************************************
    function gameIsOver() {
        
        // create the game over overlay
        gameOver = new GameOver(stage);
        
        // set game over to true
        gameOverBool = true;
        // make the boss not active
        bossActive = false;
        
        // let it know it was a game over not a win
        over = true;
        
        // show game over screen
        gameOver.showMe();
        
        // if the boss is alive, kill it
        if(boss != null){
            createjs.Sound.play("explosion2");
            boss.killMe();
            
        }
        
        // clear all the enemies and bullets on the screen
        for (var i = 0; i < aryEnemies.length; i++){
            aryEnemies[i].killMe();
        }
        
        for (var i = 0; i < aryBullets.length; i++){
            aryBullets[i].killMe();
        }
        
        for (var i = 0; i < aryBossBullets.length; i++){
            aryBossBullets[i].killMe();
        }
        
        // this seems gross but it seems to be a fix for issues I was having
        aryEnemies = new Array();
        aryBullets = new Array();
        aryBossBullets = new Array();
        
        // make sure the boss is gone
        boss = null;

    }
    
    function gameIsWon(){
        
        // same as loss but for the win
        youWin = new YouWin(stage);
        gameOverBool = true;
        win = true;
        youWin.showMe();
        
        for (var i = 0; i < aryEnemies.length; i++){
            aryEnemies[i].killMe();
        }
        
        for (var i = 0; i < aryBullets.length; i++){
            aryBullets[i].killMe();
        }
        
        for (var i = 0; i < aryBossBullets.length; i++){
            aryBossBullets[i].killMe();
        }
        
        aryEnemies = new Array();
        aryBullets = new Array();
        aryBossBullets = new Array();
        
        boss = null;
        
    }
    
    function restart () {
        console.log ("Restarted Game");
        
        // reset the character
        char.resetMe();
        
        // start the enemy spawning again
        spawnEnemy();
        
        // reset the score in the score class
        score.setScore(0);
        
        // its not a game over anymore
        gameOverBool = false;
        // you have not lost or won anymore
        if (over){
            gameOver.hideMe();
            over = false;
        } else if (win) {
            youWin.hideMe();
            win = false;
        }
        
        // reset the score locally for using in the score class
        playerScore = 0;
        
        // start the boss spawn timer again
        bossSpawner();
    }
    
    // TICKER METHODS TO MAKE THE TICKER LOOK CLEAN ----------------------------------------------------------
    
    // did your bullet hit the enemy
    function isBulletHitEnemy(){
        
        // check each bullet if it collided with any of the enemies
        for (var i = 0; i < aryEnemies.length; i++){
            for (var f = 0; f < aryBullets.length; f++){
                // iff it collided
                    if (aryBullets[f].intersects(aryEnemies[i].getCollisionBox())){
                        // kill the bullet and the enemy
                        aryBullets[f].killMe();
                        aryEnemies[i].killMe();
                        
                        // add 10 score
                        playerScore += 10;
                        // set the score in the score class
                        score.setScore(playerScore);
                    }
                }
            // update the enemy being checked
            aryEnemies[i].updateMe();
            
            // did the enemy hit the player
            if (aryEnemies[i].intersects(char.getCollisionBox())){
                char.killMe();
                createjs.Sound.play("explosion");
                gameIsOver();
            }
            
            // if the enemy is at the bottom of the screen kill it
            if(aryEnemies[i].isAtBottom()){
                aryEnemies[i].killMe();
            }
            
            // if the enemy is not dead
            if (!aryEnemies[i].getKilled()){
                // move it down
                aryEnemies[i].startMe(MoverDirection.DOWN);
            } else {
                // if thge enemy is dead, remove it from the screen and array of enemies
                aryEnemies[i].killMe();
                aryEnemies.splice(i, 1);
                console.log("array" + aryEnemies);
            }
        }
    }
    
    function playerBullets () {
        for (var x = 0; x < aryBullets.length; x++){
            aryBullets[x].updateMe();
            
            if(aryBullets[x].isAtTop()){
                aryBullets[x].killMe();
            }
            
            if (!aryBullets[x].getKilled()){
                aryBullets[x].startMe(MoverDirection.UP);
            } else {
                aryBullets[x].killMe();
                aryBullets.splice(x, 1);
                console.log("array" + aryEnemies);
            }
        }
    }
    
    function bossBulletsHitPlayer(){
        // if a boss bullet hits the player
        for (var i = 0; i < aryBossBullets.length; i++){
            if (aryBossBullets[i].intersects(char.getCollisionBox())){
                char.killMe();
                // createjs.Sound.play("explosion");
                gameIsOver();
            }
        }
    }
    // if the player bullet hits the boss
    function isbulletHitBoss(){
        
        if (boss != null){
            
            for (var z = 0; z < aryBullets.length; z++){
                if (aryBullets[z].intersects(boss.getCollisionBox())){
                    aryBullets[z].killMe();
                    boss.takeDamage();
                    console.log(boss.getHP());
                    ;
                }
            }
        

            // check if the boss has 0 hit points
            if (boss.getHP() <= 0){
                createjs.Sound.play("explosion2");
                boss.killMe();
                playerScore += 50;
                score.setScore(playerScore);
                gameIsWon();
                boss = null;
                bossActive = false;
                
                
            }
            
            // as long as the boss is alive fire bullets
            spawnBossBullet(boss.getX()+5, boss.getY()+60);
            spawnBossBullet(boss.getX()+70, boss.getY()+60);
            
            // update the boss
            boss.updateMe()
            
            // make the boss go back and forth
            if (boss.getX() >= 200){
                boss.stopMe();
                boss.startMe(MoverDirection.LEFT);
            } else if (boss.getX() <= 16) {
                boss.stopMe();
                boss.startMe(MoverDirection.RIGHT);
            }
            
            
        
        }
    }
    
    // moving boss bullets down the screen
    function bossBullets(){
        
        for (var d = 0; d < aryBossBullets.length; d++){
                aryBossBullets[d].updateMe();

                if(aryBossBullets[d].isAtBottom()){
                    aryBossBullets[d].killMe();
                }

                if (!aryBossBullets[d].getKilled()){
                    aryBossBullets[d].startMe(MoverDirection.DOWN);
                } else {
                    aryBossBullets[d].killMe();
                    aryBossBullets.splice(d, 1);
                    console.log("array" + aryBossBullets);
                }
            }
    }
    
    //TICKER -------------------------------------------------------------------------------------------------  
    
    function onTick(e) {
        // TESTING FPS
        document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();
         
        // console.log(enemy.intersects(char.getCollisionBox()));
        score.updateMe();

        // move the character if it is alive
        if (!char.getKilled()) {
            if (leftKey) {
                char.startMe(MoverDirection.LEFT);
            } else if (rightKey) {
                char.startMe(MoverDirection.RIGHT);
            } else if (spaceBar){
                // spawnBullet();
            } else {
                char.stopMe();
            }
        }
        
        // running all the methods in the ticker
        console.log(boss);
        
        bossBullets();

        spawnEnemy();
        
        char.updateMe();
        
        bossBulletsHitPlayer();
        
        isbulletHitBoss();
        
        playerBullets();
        // enemy.updateMe();
        // console.log(aryEnemies);
        isBulletHitEnemy();
        // update the stage!
        stage.update();
         
        // console.log(char.getBounds());
    }
    
})();