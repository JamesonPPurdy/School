/**
 * Bicycle Class
 * @author Sean Morrow
 */
public class Bicycle {

    // Data Member   
    private String ownerName;
    private String model;
    private int ticketCount;
    
    //Constructor
    public Bicycle(String bikeModel) {
        ownerName = "unassigned";
        model = bikeModel;
        ticketCount = 0;
    }
    
    //Returns the name of this bicycle's owner
    public String getOwnerName( ) {
        return ownerName;
    }

    //Assigns the name of this bicycle's owner
    public void setOwnerName(String name) {
        ownerName = name;
    }
    
    public String getModel( ) {
        return model;
    } 

    public int getTicketCount() {
        return ticketCount;
    }
	
    // --------------------------------------------- public methods
    public void violation() {
    	ticketCount++;
    }
           
 }