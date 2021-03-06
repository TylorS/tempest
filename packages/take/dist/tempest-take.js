(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tempest/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tempest/core'], factory) :
    (factory((global.tempestTake = global.tempestTake || {}),global.tempestCore));
}(this, function (exports,_tempest_core) { 'use strict';

    var take = function (amount, stream) {
        switch (arguments.length) {
            case 1: return function (stream) { return new _tempest_core.Stream(new Take(amount, stream.source)); };
            case 2: return new _tempest_core.Stream(new Take(amount, stream.source));
            default: return take;
        }
    };
    var Take = function Take(amount, source) {
        this.amount = amount;
        this.source = source;
    };
    Take.prototype.run = function run (sink, scheduler) {
        return new TakeSink(this.amount, sink, this.source, scheduler);
    };
    var TakeSink = function TakeSink(amount, sink, source, scheduler) {
        this.amount = amount;
        this.sink = sink;
        this.disposable = source.run(this, scheduler);
    };
    TakeSink.prototype.event = function event (time, value) {
        if (--this.amount >= 0) {
            this.sink.event(time, value);
            if (this.amount === 0) {
                this.dispose();
                this.sink.end(time, value);
            }
        }
    };
    TakeSink.prototype.error = function error (time, err) {
        this.sink.error(time, err);
    };
    TakeSink.prototype.end = function end (time, value) {
        this.sink.end(time, value);
    };
    TakeSink.prototype.dispose = function dispose () {
        return this.disposable.dispose();
    };

    exports.take = take;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=tempest-take.js.map
