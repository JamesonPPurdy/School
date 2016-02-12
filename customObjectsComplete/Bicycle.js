/*jshint browser:true */
/*jshint devel:true */

/*
// PROTOTYPE APPROACH TO CUSTOM CLASSES
function Bicycle(bikeModel) {
    // this is our constructor method for Bicycle class
    this.ownerName = "unassigned";
    this.model = bikeModel;
    this.ticketCount = 0;
}

// ------------------------------------ get/set methods
Bicycle.prototype.getOwnerName = function() {
    return this.ownerName;   
};

Bicycle.prototype.setOwnerName = function(name) {
    this.ownerName = name;   
};

Bicycle.prototype.getModel = function() {
    return this.model;   
};

Bicycle.prototype.getTicketCount = function() {
    return this.ticketCount;   
};

// --------------------------------- public methods
Bicycle.prototype.violation = function() {
    this.ticketCount++;   
};
*/

// CLOSURE APPROACH TO CUSTOM CLASSES
function Bicycle(bikeModel) {
	"use strict";
    
    // property variables
    var ownerName = "unassigned";
    var model = bikeModel;
    var ticketCount = 0;
    
    // ------------------------------- get/set methods
    this.getOwnerName = function() {
        return ownerName;   
    };
    
    this.setOwnerName = function(name) {
        ownerName = name;   
    };
    
    this.getModel = function() {
        return model;
    };
    
    this.getTicketCount = function() {
        return ticketCount;   
    };
    
    // ------------------------------ public method
    this.violation = function() {
        ticketCount++;   
    };
    
}




























