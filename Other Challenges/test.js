/*jshint browser:true */
/*jshint devel:true */
/*globals ChallengeTextValidator */

(function(){
    
    "use strict";
    
    var textBox = document.getElementById("theBox");
    var textBoxTwo = document.getElementById("theBoxTwo");
    
    document.getElementById("theButton").addEventListener("click", onAction);
    document.getElementById("theButtonTwo").addEventListener("click", onOtherAction);
    
    function onAction(e) {
        console.log("Action");
        var textValidator;

        textValidator = new ChallengeTextValidator(textBox, "green");
        
        if (textValidator.validate()) {
            
            document.getElementById("thisThing").innerHTML = "It worked!";
            
        } else {
            
            document.getElementById("thisThing").innerHTML = "Nope!";
            
            document.getElementById("theBox").style.border="2px solid " + textValidator.getColor();
        }
    
    
    
    
    }
    
    function onOtherAction(e){
        console.log("Other Action");
        
        var textValidatorTwo;
        
        textValidatorTwo = new ChallengeTextValidator(textBoxTwo);
        var errorColor = document.getElementById("theColorBox").value;
        textValidatorTwo.setRegExp(/^[a-z]+$/);

        if (textValidatorTwo.validate()) {
            
            document.getElementById("thisThingTwo").innerHTML = "It worked!";
            
        } else {
            
            document.getElementById("thisThingTwo").innerHTML = "Nope!";
            
            textValidatorTwo.setErrorColor(errorColor);
            
            document.getElementById("theBoxTwo").style.border="2px solid " + textValidatorTwo.getColor();
        }
        
        
    }
}());