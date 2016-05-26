var Score = function (stage, value) {
    
    var currentScore = 0;
    
    var scoreText = new createjs.Text("Score: " + currentScore, "20px Impact", "#FFFFFF");
    scoreText.x = 175;
    scoreText.y = 20;
    stage.addChild(scoreText);
    
    this.getScore = function () {
        return currentScore;
    }  
     
    this.setScore = function (value) {
        currentScore = value;
    }

    this.updateMe = function () {
        scoreText.text = "Score: " + currentScore;
    }
}