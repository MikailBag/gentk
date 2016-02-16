function pipeToGen(stream, generator) {
    let gen = generator(stream);
    let message;
    function tick() {
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
