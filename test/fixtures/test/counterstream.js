"use strict";
const assert = require("assert");
const CounterStream = require("../counterstream");
let stream = new CounterStream({max: 10});
let calls = 0;
stream
    .on("data", function (data) {
        calls++;
        console.log(`!!!!!!got data chunk#${calls}:${data}`);
    })
    .on('end', function () {
        assert.equal(calls, 10);
    });
