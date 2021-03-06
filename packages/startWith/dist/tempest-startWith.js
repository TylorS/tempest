(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tempest/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tempest/core'], factory) :
    (factory((global.tempestStartWith = global.tempestStartWith || {}),global.tempestCore));
}(this, function (exports,_tempest_core) { 'use strict';

    var startWith = function (value, stream) {
        switch (arguments.length) {
            case 1: return function (stream) { return new _tempest_core.Stream(new StartWith(value, stream.source)); };
            case 2: return new _tempest_core.Stream(new StartWith(value, stream.source));
            default: return startWith;
        }
    };
    var StartWith = function StartWith(value, source) {
        this.value = value;
        this.source = source;
    };
    StartWith.prototype.run = function run (sink, scheduler) {
        scheduler.asap(_tempest_core.PropagateTask.event(this.value, sink));
        return this.source.run(new StartWithSink(this.value, sink), scheduler);
    };
    var StartWithSink = function StartWithSink(value, sink) {
        this.value = value;
        this.sink = sink;
    };
    StartWithSink.prototype.event = function event (time, value) {
        this.sink.event(time, value);
    };
    StartWithSink.prototype.error = function error (time, err) {
        this.sink.error(time, err);
    };
    StartWithSink.prototype.end = function end (time, value) {
        this.sink.end(time, value);
    };

    exports.startWith = startWith;
    exports.StartWith = StartWith;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=tempest-startWith.js.map
