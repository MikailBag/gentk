"use strict";
function pipeToGen(stream, generator) {
    let gen = generator(stream);
    let message;
    function tick() {
        console.log("!!!!!!tick");
        let reply = gen.next(message);
        let genend = reply.done;
        let streamend = false;
        stream.on("end", function(){
            console.log("!!!!!!stream ended");
            streamend = true;
        });
        if (!(genend|| streamend)) {
            console.log("!!!!!!waiting for new data chunk");
            stream.once("data", function(data){
                message = data;
                console.log(`!!!!!!got data chunk: ${message}`);
                tick()
            })
        }
    }
    message = null;
    tick();
}

module.exports = pipeToGen;