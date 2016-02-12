/*jshint browser:true */
/*jshint devel:true */

(function(){
    "use strict";
    // function to get the characters from one to ten
    function getOneTo10(){
        var oneLength =3;
        var twoLength =3;
        var threeLength =5;
        var fourLength =4;
        var fiveLength =4; 
        var sixLength =3;
        var sevenLength =5;
        var eightLength =5;
        var nineLength =4;
        // just add them all together
        return oneLength + twoLength + threeLength + fourLength + fiveLength + sixLength + sevenLength + eightLength + nineLength;
    }
    
    // getting from 10 to 20
    function get10To20(){
        var tenLength =3;
        var elevenLength =6;
        var twelveLength =6;
        var thirteenLength =8;
        var fourteenLength =8; 
        var fifteenLength =7;
        var sixteenLength =7;
        var seventeenLength =9;
        var eighteenLength =8;
        var nineteenLength =8;
        
        // again add them together
        return tenLength + elevenLength + twelveLength + thirteenLength + fourteenLength + fifteenLength + sixteenLength + seventeenLength + eighteenLength + nineteenLength;
    }
    
    // getting 20 to 99
    function get20To99(){
        var twentyLength =6;
        var thirtyLength =6;
        var fourtyLength =6;
        var fiftyLength =5; 
        var sixtyLength =5;
        var seventyLength =7;
        var eightyLength =6;
        var ninetyLength =5;
        
        // add the length of 20 to 90 10 times fo 0 - 9 of each interval of 10.
        // then add the length of one to 10 8 times because you already did 1 - 20.
        return 10*(twentyLength + thirtyLength + fourtyLength + fiftyLength + sixtyLength +
                   seventyLength + eightyLength + ninetyLength) + 8 * getOneTo10();
    }
        
    function get100To1000(){
        var hundredLength = 7;
        var hundredAndLength = 10;
        var thousandLength = 11;
        
        // multiply hundred length 9 times for each interval of 100.
        // multiply hundredand 99 times for each number from 1-99 and again 9 times for each interval of 100.
        // run get one to 10, 10 to 20 and 20 to 99 9 times for all the numbers in 1 to 1000
        // get one to 10 100 times
        return ((getOneTo10() * 100) + ((getOneTo10() + get10To20() + get20To99()) * 9) + (hundredLength * 9) + (hundredAndLength * 9 * 99)) + thousandLength;
    }
    
    console.log(get100To1000());
    
    // run all of the other functions together to get the answer.
    function get1To1000(){
        return (getOneTo10() + get10To20() + get20To99()) + get100To1000();
    }
    
    console.log(get1To1000());
    
    document.getElementById("output").innerHTML=get1To1000();
    
}());
