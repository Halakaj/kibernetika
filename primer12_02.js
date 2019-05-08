var http = require("http").createServer(handler); // ob zahtevi req -> handler
var firmata = require("firmata");
var fs = require("fs"); // knjižnjica za delo z datotekami (File System fs)
var io = require("socket.io").listen(http); // knjiž. za komunik. prek socket-a 

console.log("Priklop Arduina");

var board = new firmata.Board("/dev/ttyACM0", function(){
    console.log("Aktiviramo pin 2");
    board.pinMode(2, board.MODES.OUTPUT); // pin za smer na H-mostu
    console.log("Aktiviramo pin 3");
    board.pinMode(3, board.MODES.PWM); // Pulse Width Modulation - hitrost
    console.log("Omogočimo Pin 5 kot vhod");
    board.pinMode(5, board.MODES.INPUT);
});

function handler(req, res) {
    fs.readFile(__dirname + "/primer12_02.html",
    function(err, data) {
        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            return res.end("Napaka pri nalaganju html strani!");
        }
        res.writeHead(200);
        res.end(data);
    });
}

http.listen(8080); // strežnik bo poslušal na vratih 8080

console.log("Zagon sistema"); // izpis sporočila o zagonu

board.on("ready", function(){
    console.log("Plošča pripravljena");
    
    io.sockets.on("connection", function(socket){
        
        socket.on("pošljiPWM", function(pwm){
            board.analogWrite(3,pwm); // zapišem hitrost pwm na pin 3
            console.log("PWM poslan." + pwm);
        });
        
        socket.on("levo", function(vrednost) {
            board.digitalWrite(2,vrednost);
        });
        
        socket.on("desno", function(vrednost) {
            board.digitalWrite(2,vrednost);
        });
        
        socket.on("stop", function(vrednost) {
            board.analogWrite(3,vrednost);
        });
        
    });
    
    board.digitalRead(5, function(value) {

        if (value == 0) {
             board.analogWrite(3,250);
             console.log("Input 4 is clicked " + value);
        }
        if (value == 1) {
            board.analogWrite(3,0);
            console.log("Input 4 is clicked " + value);
        }
            //
            //console.log("Input 4 is clicked");
    });
    
}); // konec board.on("ready")