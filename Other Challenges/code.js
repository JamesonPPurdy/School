/* jshint browser:true */
/* jshint devel:true */
(function () {
    "use strict";
    
    // METHODS/FUNCTIONS
    // dumping out to the console window
    console.log("test!");

    // private methods (function)
    function populateMe() {

        document.getElementById("demo").innerHTML = "JS was here!";

    }

    populateMe();

    function product(a, b) {

     return a * b;

    }

    document.getElementById("demo").innerHTML = "The product of 2 and 4 is! " + product(2,4);
    // document.write("The product of 2 and 4 is! " + product(2, 4));
    
    //VARIABLES
    var counter = 6;
    var name = "sean";
    document.getElementById("output").innerHTML = name + " has learned " + counter + " different web technologies... and counting!";
    
    // ARRAYS
    // var students = [];
    /*
    students[0] = "Geoff";
    students[1] = "Kyle";
    students[2] = "John";
    students[3] = "Daniel";
    */
    
    var students = ["Geoff", "Kyle", "John", "Dandork"];
    students.push("Jameson");
    
    var n = 0;
    
    var targetDiv = document.getElementById("arrayOutput");
    
    /*
    // APPROACH I
    targetDiv.innerHTML = "Student in the first two rows<br/>";
    for (n=0; n<students.length; n++) {
        
        targetDiv.innerHTML += students[n] + "</br>";
        
    }
    */
    
    students.forEach(function(item){
        
        targetDiv.innerHTML += item + "</br>";
        
    });
    
    window.alert("Error Message!");
    
}());