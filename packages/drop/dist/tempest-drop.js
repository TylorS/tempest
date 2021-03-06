(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tempest/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tempest/core'], factory) :
    (factory((global.tempestDrop = global.tempestDrop || {}),global.tempestCore));
}(this, function (exports,_tempest_core) { 'use strict';

    var drop = function (amount, stream) {
        switch (arguments.length) {
            case 1: return function (stream) { return new _tempest_core.Stream(new Drop(amount, stream.source)); };
            case 2: return new _tempest_core.Stream(new Drop(amount, stream.source));
            default: return drop;
        }
    };
    var Drop = function Drop(amount, source) {
        this.amount = amount;
        this.source = source;
    };
    Drop.prototype.run = function run (sink, scheduler) {
        return new DropSink(this.amount, sink, this.source, scheduler);
    };
    var DropSink = function DropSink(amount, sink, source, scheduler) {
        this.amount = amount;
        this.sink = sink;
        this.disposable = source.run(this, scheduler);
    };
    DropSink.prototype.event = function event (time, value) {
        if (--this.amount < 0) {
            this.sink.event(time, value);
        }
    };
    DropSink.prototype.error = function error (time, err) {
        this.sink.error(time, err);
    };
    DropSink.prototype.end = function end (time, value) {
        this.sink.end(time, value);
    };
    DropSink.prototype.dispose = function dispose () {
        return this.disposable.dispose();
    };

    exports.drop = drop;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=tempest-drop.js.map
