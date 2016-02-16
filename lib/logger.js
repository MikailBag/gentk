"use strict";

const fs = require("fs");
const util = require("util");

const D = process.env["DEBUG"];

function createLogger(tag) {
    let parts = tag.split(":");
    let pattern = D.split(":");
    if (accept(parts, pattern)) {
        return new SimpleConsoleLogger;
    } else {
        return new StubLogger;
    }

}

function accept(parts, pattern) {
    for (let i = 0; i < parts.length; i++) {
        if (parts[i] != pattern[i] && pattern[i] != "*") {
            return false;
        }
    }
    return true;
}

class Logger {
    constructor() {

    }

    log(/*level,*/ val, ...fargs) {
        let sval = val.toString();
        let fval = util.format(sval, ...fargs);
        this._log(fval);
    }
}

class SimpleLogger extends Logger {
    constructor(target) {
        super();
        this.target = target;
    }

    _log(val) {
        this.target.write(val);
    }
}

class SimpleFileLogger extends SimpleLogger {
    constructor(fname) {
        let target = fs.createWriteStream(fname);
        super(target);
    }
}

class SimpleConsoleLogger extends SimpleLogger {
    constructor() {
        super(process.stdout);
    }
}

class StubLogger extends Logger {
    _log() {
        //DO_NOTHING
    }
}