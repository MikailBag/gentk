"use strict";
let logger = require("../logger")("streaming:pipetogen");
function pipeToGen(stream, generator) {
    let gen = generator(stream);
    let message;
    function tick() {
        logger.log("tick");
        let reply = gen.next(message);
        if (!(reply.done)) {
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