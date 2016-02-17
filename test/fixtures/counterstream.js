"use strict";
const stream = require("stream");
class CounterStream extends stream.Readable {
    static get defaultMax(){
        return 100;
    }
    constructor(options) {
        console.log(`!!!!!!creating new counter stream`);
        options = options || {};
        options.objectMode = true;
        super(options);

        this.max = options.max || CounterStream.defaultMax;
        this.current = 0;
    }

    _read() {
        this.current += 1;
        console.log(`!!!!!!emitting ${this.current}`);
        this.push(this.current);
        if (this.current == this.max) {
            console.log("!!!!!!stopping because max pushed");
            this.push(null);
        }
    }
}

module.exports = CounterStream;
