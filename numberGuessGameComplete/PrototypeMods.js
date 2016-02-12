/*jshint browser:true */
/*jshint devel:true */

// modify the prototype of the Number object
Number.prototype.getRandom = function(low, high) {
    "use strict";    
    
    var randomNumber;
    // hacking overloading
    if ((low === undefined) || (high === undefined)) {
        low = 1;
        high = 10;
    }
    // calculate the random number
    randomNumber = Math.round(Math.random() * (high - low)) + low;
    
    return randomNumber;
};

Number.prototype.easterEgg = "Sean Morrow added this prototype variable!";
