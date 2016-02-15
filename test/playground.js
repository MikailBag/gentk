"use strict";
const assert = require("assert");
const CounterStream = require("./fixtures/CounterStream");
let stream = new CounterStream({max: 10});
let calls = 0;
stream
    .on("data", function () {
        calls++;
    })
    .on('end', function () {
        assert.equal(calls, 10);
    });
