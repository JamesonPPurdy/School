/* jshint browser:true */
/* jshint devel:true */
(function () {
    "use strict";

    for (var x = 20; x <= Number.MAX_VALUE; x++) {
        var found = true;
        for (var y = 2; y <= 20; y++){
            
            if (x % y !==0) {
                found = false;
                break;
            }
        }
        
        if (found){
            
            document.getElementById("answer").innerHTML = "the answer is " + x;
            break;
        }
    }
    
    // document.getElementById("answer").innerHTML = "";
    
}());