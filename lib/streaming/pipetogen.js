"use strict";
function pipeToGen(stream, generator) {
    let gen = generator(stream);
    let message;
    function tick() {
        console.log("!!!!!!tick");
        let reply = gen.next(message);
        let genend = reply.done;
        let streamend = false;
        if (!(genend|| streamend)) {
            console.log("!!!!!!waiting for new data chunk");
            stream.once("data", function(data){
                message = data;
                process.nextTick(tick)
            })
        }
    }
    message = null;
    tick();
}

module.exports = pipeToGen;