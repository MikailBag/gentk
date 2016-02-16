"use strict";
//here will be tests
const assert = require("assert");
const maketk = require("../index");
const fixtures = require("./fixtures");
describe("maketk", function () {
    describe("streaming", function () {
        describe("pipeToGen", function () {
            it("pipes stream to generator", function(callback){
                let stream = new fixtures.CounterStream({max:10});
                let calls = 0;
                function* gen(stream){
                    while (yield){
                        calls++
                    }
                }
                stream.on('end', function(){
                    assert.equal(calls, 10);
                    callback()
                });
                maketk.streaming.pipeToGen(stream, gen);
            })
        })
    })
});