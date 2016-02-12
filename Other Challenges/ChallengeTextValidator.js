/*jshint browser:true */
/*jshint devel:true */

function ChallengeTextValidator(targetID, myColor){
    "use strict";
    
    
    var textBox = targetID;
    var color = myColor;
    var regExp = new RegExp(/^\w$/);
    
    if (myColor === undefined){
     
        color = "#FF0000";
        
    }
    
    this.setRegExp = function(newRegExp) {
        
        regExp = new RegExp(newRegExp);
        
    };
    
    this.setErrorColor = function(newColor){
        
        color = newColor;
        
    };
    
    this.getColor = function() {
      
        return color;
        
    };
    
    this.validate = function() {
        
        return regExp.test(textBox.value);
        
    };  
}