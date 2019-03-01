var http = require("http");
var firmata = require("firmata");

console.log("Startamo JS kodo.");

var board = new firmata.Board("/dev/ttyACM0", function()
{
    console.log("Povezovanje na Arduino...");
    console.log("Aktivacija pina 13...");
    board.pinMode(13, board.MODES.OUTPUT);
    console.log("Aktivacija pina 8...");
    board.pinMode(8, board.MODES.OUTPUT);
}
);

http.createServer(function(req, res)
    {
        console.log("url: " + req.url);
        var parts = req.url.split("/");
        var operator1 = parseInt(parts[1], 10);
        var operator2 = parseInt(parts[2], 10);
        
        if (operator1 == 0) {
            console.log("Izklop LED1.");
            board.digitalWrite(13, board.LOW);
            
        }
        if (operator1 == 1) {
            console.log("Vklop LED1.");
            board.digitalWrite(13, board.HIGH);
        }
        if (operator2 == 0) {
            console.log("Izklop LED2.");
            board.digitalWrite(8, board.LOW);
        }
        if (operator2 == 1) {
            console.log("Vklop LED2.");
            board.digitalWrite(8, board.HIGH);
        }
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write("Vrednost operatorja 1: " + operator1 + ".");
        res.end("Vrednost operatorja 2: " + operator2 + ".");
    }
        
    
    ).listen(8080, "192.168.1.101");

