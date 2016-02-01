/*jshint browser:true */
/*jshint devel:true */

(function() {
    "use strict";
    
    var source = "gradedata.xml";
    
    // xmlHttpRequest object for carrying out AJAX
    var xmlHttp;
    var gradeXML;
    
    // the number of students
    var studentCount;
    
    // references to ui elements
    var lstGrade;
    var txtOutput;
    
    // entry point
    window.addEventListener("load", onSetup);
    
    // --------------------------------------------------------------------- event handlers
    function onSetup() {
        // set up references to ui elements
        lstGrade = document.getElementById("lstGrades");
        txtOutput = document.getElementById("txtOutput");
        
        // construct XMLHTTPRequest object
        xmlHttp = new XMLHttpRequest();
        xmlHttp.addEventListener("readystatechange", onLoaded);
        xmlHttp.open("GET", source, true);
        xmlHttp.send();
        
    }
    
    function onLoaded(e) {
        
        console.log("state " + xmlHttp.readyState);
        
        if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200)) {
            
            // xml has been loaded
            gradeXML = xmlHttp.responseXML;
            console.log(xmlHttp.responseText);
            
            // get the studentCount from the XML
            studentCount = gradeXML.getElementsByTagName("student").length;
            console.log("studentCount: " + studentCount);
         
            if (studentCount > 0) {
                populateMenu();
            }
            
        }
        
    }
    
    function populateMenu(){
        
        for (var i=0; i<studentCount; i++){
            
            //construct an option element oject
            var option = document.createElement("option");
            option.text = gradeXML.getElementsByTagName("name")[i].childNodes[0].nodeValue;
            option.id = gradeXML.getElementsByTagName("student")[i].getAttribute("id");
            
            // add the option to the drop down.
            lstGrade.add(option, null);
            
            // console.log(gradeXML.getElementsByTagName("name")[i].childNodes[0].nodeValue);
            
        }
        
        // write the event listener
        lstGrade.addEventListener("change", onChanged);
        
    }
    
    function onChanged() {
        
        // grab selected index
        var index = lstGrade.selectedIndex;
        
        // get id of index
        var currentID = lstGrade.options[index].id;
        
        var targetNode;
        for (var n=0; n<studentCount; n++) {
            
            if (currentID == gradeXML.getElementsByTagName("student")[n].getAttribute("id")){
                
                targetNode = gradeXML.getElementsByTagName("student")[n];
                
                 break;
            }
            
        }
        
        txtOutput.innerHTML = targetNode.getElementsByTagName("name")[0].firstChild.nodeValue + "</br>";
        txtOutput.innerHTML += targetNode.getElementsByTagName("phone")[0].firstChild.nodeValue;
    }
    
}());