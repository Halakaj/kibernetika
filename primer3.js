var operator1 = parseInt(deli[1],10); // 10 osnova številskega sistema, decimalno (od 2 do 36)
var operator2 = parseInt(deli[2],10); // 10 osnova številskega sistema, decimalno (od 2 do 36)
 if (operator1 == 0) {
        console.log("Izključevanje LED1");
        board.digitalWrite(13, board.LOW);
    }
    if (operator1 == 1) {
        console.log("Vključevanje LED1");
        board.digitalWrite(13, board.HIGH);
    }
    
    if (operator2 == 0) {
        console.log("Izključevanje LED2");
        board.digitalWrite(8, board.LOW);
    }

    if (operator2 == 1) {
        console.log("Vključevanje LED2");
        board.digitalWrite(8, board.HIGH);
    }        
    res.write("Za test vpišite v brskalnikovo vrstico z naslovom: http://192.168.1.136:8080/1/1 <br>");
    res.write("ali: http://192.168.1.136:8080/0/0<br>");
    res.end("Vrednost operatorja1: " + operator1 + "<br>" + "Vrednost operatorja2: " + operator2);