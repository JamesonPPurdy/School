/*jshint browser:true */
/*jshint devel:true */

(function(){
    "use strict";
    
    // the target number to guess
    var targetNumber = 0;
    // number of guesses used
    var guessCount = 0;
    // the number of games won and lost
    var won = 0;
    var lost = 0;
    // array to handle repeat guesses
    var guessArchive;
    // regular expression for range error check
    //var guessValidate = new RegExp(/^([1-9]|[1-9][0-9]|100)$/);
    var guessValidate = /^([1-9]|[1-9][0-9]|100)$/;
    
    var input = document.getElementById("txtGuess");
    
    
    // listen for when the page is fully loaded
    window.addEventListener("load", onLoadGame);
    
    // ------------------------------------------- private methods
    function resetMe() {
        // initialization
        guessArchive = [];
        guessCount = 0;
        targetNumber = Math.floor(Math.random() * 100) + 1;
        
        var cookieWon = readCookie("won");
        var cookieLost = readCookie("lost");
        
        if (cookieWon !== "") won = cookieWon;
        if (cookieLost !== "") lost = cookieLost;
        
        // update our interface
        document.getElementById("lblGuessCount").innerHTML = guessCount + 1;
        document.getElementById("lblWon").innerHTML = won;
        document.getElementById("lblLost").innerHTML = lost;
        
        console.log("targetNumber: " + targetNumber);
    }
    
    function guessRepeatValidate(userGuess) {
        var passed = true;
        if (guessArchive.indexOf(userGuess) > -1) {
            passed = false;
        }
        return passed;
    }
    
    // ------------------------------------------- event handlers
    function onLoadGame(e){
        //console.log("game loaded!");
        // entry point
                
        resetMe();
        // setup event listener
        document.getElementById("btnSubmit").addEventListener("click", onGuess);
        
        // if cookies are not null
        
        input.onkeypress = function(e){
         
            if (e.keyCode == 13) {

                onGuess();
                
                return false;
                
            }
        };
    }
    
    function onGuess(e) {
        
        console.log(document.cookie);
         //console.log("button clicked! " + e.target.id);  
        
        // get some references to interface elements
        var lblFeedback = document.getElementById("lblFeedback");
        // the user's guess
        var guess = Number(document.getElementById("txtGuess").value);
        
        // validate for correct range and valid input
        if (guessValidate.test(guess)) {
            
            // validate for repeat guesses
            if (guessRepeatValidate(guess)) {
                
                // increment guess counter
                guessCount++;
                document.getElementById("lblGuessCount").innerHTML = guessCount + 1;

                // add the guess into the array
                guessArchive.push(guess);

                // check for matches
                if (guess > targetNumber) {
                    lblFeedback.innerHTML = "The number is lower.";
                } else if (guess < targetNumber) {
                    lblFeedback.innerHTML = "The number is higher.";
                } else if (guess === targetNumber) {
                    // player has won!
                    lblFeedback.innerHTML = "You're the big winner!<br/>" + guess + " is the correct number!<br/>It took you " + guessCount + " guess(es).<br/><br/>Try to win another!";
                    won++;
                    setCookies("won", won);
                    resetMe();
                }

                // detect if game over (used up all guesses)
                if ((guessCount == 10) && (guess != targetNumber)) {
                    lblFeedback.innerHTML = "Lose Lose Lose :(";
                    lost++;
                    setCookies("lost", lost);
                    resetMe();
                }
                
            } else {
                lblFeedback.innerHTML = guess + " has already been guesses. Please try again...";   
            }
            
        } else {
            lblFeedback.innerHTML = guess + " is an invalid guess. Please try again...";   
        }
        
        // blank out the textbox
        document.getElementById("txtGuess").value = "";
        document.getElementById("txtGuess").focus();
    }
    
    // cookieName=value; expires=date;
    
    // give the name of the cookie and the variable for the win/loss
    function setCookies(name, value){
        
        // store the wins and losses in cookies
        document.cookie= name + "=" + value + "; expires= Fri, 22 Jan 2016 12:00:00 UTC";
        document.cookie= name + "=" + value + "; expires= Fri, 22 Jan 2016 12:00:00 UTC";
    }
    
    function readCookie(name) {
        // add an equals sign to the name of the cookie
	var nameEquals = name + "=";
        // split the cookies into an array
	var cookiesArray = document.cookie.split(';');
        // a for loop to go through the cookies array
	for(var i=0;i < cookiesArray.length;i++) {
		var c = cookiesArray[i];
        // if the first character of the cookies is a space, remove the space and repeat untill it is not a space.
		while (c.charAt(0)==' ') c = c.substring(1);
        // return a substring of the cookie starting at the end of the name of the cookie + the equals sign.
		if (c.indexOf(nameEquals) === 0) return c.substring(nameEquals.length,c.length);
	}
	return "";
}
    
}());











