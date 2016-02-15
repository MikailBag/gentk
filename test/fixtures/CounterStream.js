"use strict";
const stream = require("stream");
class CounterStream extends stream.Readable {
    constructor(options) {
        options = options || {};
        options.objectMode = true;
        console.dir(this);
        stream.Readable.call(this, options);
        this.max = options.max || 100;
        this.current = 0;
    }

    _read() {
        this.current += 1;
        this.push(this.current);
        if (this.current == this.max) {
            this.push(null);
        }
    }
}

module.exports = CounterStream;