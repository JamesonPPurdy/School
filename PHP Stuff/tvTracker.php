<?php
    if (($_POST['firstName'] == "") || ($_POST['lastName'] == "") || ($_POST['currentYear'] == "") || ($_POST['birthYear'] == "") || ($_POST['siblingAmount'] == "") || ($_POST['bedTime'] == "") || ($_POST['wakeTime'] == "") || ($_POST['homeWorkTime'] == "") || ($_POST['tvTime'] == "") || ($_POST['computerTime'] == "") || ($_POST['familyTime'] == "") || ($_POST['friendTime'] == "")) {
        header("Location: form.html");
         exit;
    }
    
    $yearsLeft = 12 - $_POST['currentYear'];
    $hoursLeft = ($_POST['tvTime'] + $_POST['homeWorkTime'] + $_POST['computerTime'])  * 365 * $yearsLeft;
    $screenTime = $_POST['tvTime'] + $_POST['computerTime'];
    
    $awakeTime;
    $wakeTimeAM;
    $sleepTimePM;
    $wakeAry = [];
    $sleepSry = [];
    $wakeTime;
    $sleepTime;
    $screenPercent;

    $sleepAry = explode(":", $_POST['bedTime']);
    $wakeAry = explode(":", $_POST['wakeTime']);

    $wakeVar1 = $wakeAry[0];
    $wakeVar2 = $wakeAry[1];
    $sleepVar1 = $sleepAry[0];
    $sleepVar2 = $sleepAry[1];
      
    if (strpos($wakeVar2, 'PM') !== false) {
       $wakeTimeAM = false;
    } else {
       $wakeTimeAM = true; 
    }

    if (strpos($sleepVar2, 'AM') !== false) {
       $sleepTimePM = false;
    } else {
       $sleepTimePM = true;
    }

    if ($wakeTimeAM) {
       if ($wakeVar1 === 12) {
           $wakeVar1 = 0;
       } 
    } else {
       if ($wakeVar1 !== 12){
           $wakeVar1 += 12;
       }
    }

    if ($sleepTimePM) {
       if ($sleepVar1 !== 12) {
           $sleepVar1 += 12;
       }
    } else {
       if ($sleepVar1 === 12) {
           $sleepVar1 = 0;
       }
    }

    

    $wakeVar2 = substr($wakeVar2, 0, (2-strlen($wakeVar2)));
    $sleepVar2 = substr($sleepVar2, 0, (2-strlen($sleepVar2)));

    $wakeTime = $wakeVar1 + ($wakeVar2/60);
    $sleepTime = $sleepVar1 + ($sleepVar2/60);

    $awakeTime = $sleepTime -  $wakeTime;

    if ($awakeTime < 0){
        $awakeTime += 24; 
    }

    $screenPercent = round(($screenTime / $awakeTime) * 100);

    echo "Great! Thanks $_POST[firstName] for responding to our survey </br>";
    echo "Information you submitted:<br>";
    echo "First Name: $_POST[firstName] </br> Last Name: $_POST[lastName] <br> Current School Year: $_POST[currentYear] <br> Birth Year: $_POST[birthYear] <br> Number of Siblings: $_POST[siblingAmount] <br>";
    echo "you have $yearsLeft years of school left! <br>";
    echo "you will spend about $hoursLeft watching TV in those years you have left <br>";
    echo "They will spend $screenPercent % of their awake time infrom of a screen!";