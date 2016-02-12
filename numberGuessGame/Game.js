/*jshint browser:true */
/*jshint devel:true */

(function() {
    "use strict";
    
    // the target number to guess
    var targetNumber;
    // number of guesses used
    var guessCount;
    // number of games won and lost
    var won;
    var lost;			
    // array to handle repeat guesses
    var guessArchive;
    // regular expression object for form validation
    //var guessValidate = new RegExp(/^([1-9]|[1-9][0-9]|100)$/);
    var guessValidate = /^([1-9]|[1-9][0-9]|100)$/;
    
    // wire up load event
    window.addEventListener("load", onLoadGame);

    function resetMe() {
        // initialization
        guessArchive = [];
        guessCount = 0;
        targetNumber = Math.floor(Math.random() * 100) + 1;
        // update interface
        document.getElementById("lblGuessCount").innerHTML = guessCount + 1;
        document.getElementById("lblWon").innerHTML = won;
        document.getElementById("lblLost").innerHTML = lost;

        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! COOKIE IMPLEMENTATION
        // write current won and lost count to cookie for future games
        setCookie("score", won + "," + lost, 365);
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        console.log("targetNumber: " + targetNumber);
    }

    // -------------------------------------------------------- private methods
    function guessRepeatValidate(userGuess) {
        // scroll through array and check for repeat guess
        for (var n=0; n<guessArchive.length; n++) {
            if (guessArchive[n] === userGuess) {
                return false;
            }
        }
        return true;
    }
    
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! COOKIE IMPLEMENTATION
    function setCookie(name, value, days) {
        var expires;
        if (days) {
            // construct date object - will be today's date by default
            var date = new Date();
            // set time to be today plus how many days specified
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            // concatenate the expires name/value pair with expiry date converted to GMT 
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        // create cookie
        document.cookie = name + "=" + value + expires;
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        // put cookie name/value pairs into an array split on the ; delimiter (since there could be multiple cookies)
        var ca = document.cookie.split(";");
        // loop through all name/value pairs
        for(var i=0;i < ca.length;i++) {
            // grab reference to each element
            var c = ca[i];
            // trim off leading space (if any)
            while (c.charAt(0) == " ") {
                c = c.substring(1,c.length);
            }
            // search through string to find the target name of name/value pair and return the value
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }
        // if name not found then return null
        return null;
    }  
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // -------------------------------------------------------- event handlers
    function onLoadGame() {
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! COOKIE IMPLEMENTATION
        // get score data from cookie if it exists
        if (getCookie("score") !== null) {
            // read cookie
            var score = getCookie("score");
            won = score.split(",")[0];
            lost = score.split(",")[1];
        } else {
            // write cookie
            won = 0;
            lost = 0;
        }
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        // setup event listeners
        document.getElementById("btnSubmit").addEventListener("click", onGuess);
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! CHALLENGE 2 SOLUTION
        document.addEventListener("keydown", onEnterKey);
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // initialize the game
        resetMe();
    }

    function onGuess(e) {

        //console.log("test: " + e.target);

        // get reference to lblFeedback div element
        var lblFeedback = document.getElementById("lblFeedback");
        // get guess from textbox and convert to Number (comes out as string)
        var guess = Number(document.getElementById("txtGuess").value);

        // validate for correct range and valid input
        if (guessValidate.test(guess)) {
            // validate for no repeated guesses
            if (guessRepeatValidate(guess)) {
                // incrementing guess count
                guessCount++;
                document.getElementById("lblGuessCount").innerHTML = guessCount + 1;
                // store guess in array for repeat guess check
                guessArchive.push(guess);					

                // check for matches
                if (guess > targetNumber) {
                    lblFeedback.innerHTML = "The number is lower.";
                } else if (guess < targetNumber) {
                    lblFeedback.innerHTML = "The number is higher.";
                } else if (guess === targetNumber) {
                    // player won game
                    lblFeedback.innerHTML = "You're the big winner!<br/>" + guess + " is the correct number!<br/>It took you " + guessCount + " guess(es).<br/><br/>Try to win another!";
                    won++;
                    resetMe();
                }

                if ((guessCount === 10) && (guess != targetNumber)) {
                    // game is over
                    lblFeedback.innerHTML = "Lose Lose Lose :(";
                    lost++;
                    resetMe();
                }

            } else {
                lblFeedback.innerHTML = guess + " has already been guessed before. Please try again...";
            }

        } else {
            lblFeedback.innerHTML = guess + " is an invalid guess. Please try again...";
        }

        // blank out textbox
        document.getElementById("txtGuess").value = "";
        // put focus back into textbox
        document.getElementById("txtGuess").focus();

    }

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! CHALLENGE 2 SOLUTION
    function onEnterKey(e) {
        //console.log("key down " + e.keyCode);

        // is the key released the ENTER key? Check keyCode via Event object
        if (e.keyCode === 13) {
            // pressing the enter key will force browsers to refresh
            // this command stops the event from going further (being detected by the browser and it refreshing in response)
            // NOTE for this to work the event MUST be a keydown and not a keyup - it is too late on the keyup!
            e.preventDefault();
            // call onGuess() - Javascript won't mind if you don't pass an event object as long as you don't use it :)
            onGuess();
            // this also helps the event from propagating in some browsers
            return false;
        }

    }
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    

    
}());