/*jshint browser:true */
/*jshint devel:true */

(function() {
    "use strict";
    
    // ------------------------------------------------------ event handlers
    function onEncode() {
        var input = "";
        // grab input from user input textarea
        input = document.getElementById("txtEncodeInput").value;
        // output encoded message
        document.getElementById("txtEncodeOutput").innerHTML = input.encode();
    }

    function onDecode() {
        var input = "";
        // grab input from user input textarea
        input = document.getElementById("txtDecodeInput").value;
        // output encoded message
        document.getElementById("txtDecodeOutput").innerHTML = input.decode();	
    }

    // ------------------------------------------------------ initialization
    // wire up event listeners
    document.getElementById("txtEncodeInput").addEventListener("keyup", onEncode);
    document.getElementById("txtDecodeInput").addEventListener("keyup", onDecode);
    
    
}());