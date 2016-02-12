/*jshint browser:true */
/*jshint devel:true */

/* PROTOTYPE APPRACH

function Bicycle(bikeModel) {
    
    this.ownerName = "unassigned";
    this.model = bikeModel;
    this.ticketCount = 0;
    
}

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

//------------------------------------------ public methods
Bicycle.prototype.violation = function() {
 
    this.ticketCount++;
    
}; */

// CLOSURE APPROACH TO CUSTOM CLASSES

function Bicycle(bikeModel) {   
    
    // property variables
    var ownerName = "unassigned";
    var model = bikeModel;
    var ticketCount;
    
    //------------------------get/set method
    this.getOwnerName = function(){
        
        return ownerName;
        
    };
    
    this.setOwnerName = function(name){
        
        ownerName = name;   
        
    };
    
    this.getModel = function(){
        
        return bikeModel;
        
    };
    this.getTicketCount = function(){
        
        return ticketCount;
        
    };
    
    // ------------------------------------ public methods
    
    this.violation = function(){
        
     ticketCount++;   
        
    };
    
}