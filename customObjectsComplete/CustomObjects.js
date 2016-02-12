/*jshint browser:true */
/*jshint devel:true */
/*globals Bicycle */

(function() {
    "use strict";
    
    window.addEventListener("load", onSetup);
    
    function onSetup(e){
        
        var bike1, bike2;
        
        // construct Bicycle objects
        bike1 = new Bicycle("Carrie Fisher");
        bike1.setOwnerName("Chris Dwyer-Perkins");
        //bike1.ownerName = "Chris Dwyer-Perkins";
        
        bike2 = new Bicycle("Trek 7000");
        bike2.setOwnerName("Sean Morrow");
        
        // run the method
        bike1.violation();
        bike1.violation();
        
        // output to the user
        var output = document.getElementById("output");
        output.innerHTML = bike1.getOwnerName() + " owns a bicycle " + bike1.getModel() + " with " + bike1.getTicketCount() + " violation ticket(s).";
        output.innerHTML += bike2.getOwnerName() + " owns a bicycle " + bike2.getModel() + " with " + bike2.getTicketCount() + " violation ticket(s).";
        
        
    }
    
}());