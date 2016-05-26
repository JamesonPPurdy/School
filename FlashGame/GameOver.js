var GameOver = function (stage) {
    
    var background = new createjs.Shape();
    background.graphics.beginFill("#8A9AA9").drawRect(0,0, 200, 200);
    background.x = 50;
    background.y = 150;
    
    var endText = new createjs.Text("Game Over!", "30px Impact", "#800000");
    endText.x = 65;
    endText.y = 180;
    
    var endText2 = new createjs.Text("Press R\nto play again!", "20px Impact", "#000000");
    endText2.x = 75;
    endText2.y = 210;
    
    this.showMe = function () {
        stage.addChild(background);
        stage.addChild(endText);
        stage.addChild(endText2);
    }
    
    this.hideMe = function () {
        stage.removeChild(background);
        stage.removeChild(endText);
        stage.removeChild(endText2);
    }
    
};