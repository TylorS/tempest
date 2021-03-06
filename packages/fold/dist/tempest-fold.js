(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tempest/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tempest/core'], factory) :
    (factory((global.tempestFold = global.tempestFold || {}),global.tempestCore));
}(this, function (exports,_tempest_core) { 'use strict';

    var fold = function (f, seed, stream) {
        switch (arguments.length) {
            case 1: return function (seed, stream) { return fold(f, seed, stream); };
            case 2: return function (stream) { return fold(f, seed, stream); };
            case 3: return new _tempest_core.Stream(new Fold(f, seed, stream.source));
            default: return fold;
        }
    };
    var Fold = function Fold(f, seed, source) {
        this.f = f;
        this.seed = seed;
        this.source = source;
    };
    Fold.prototype.run = function run (sink, scheduler) {
        scheduler.asap(_tempest_core.PropagateTask.event(this.seed, sink));
        return this.source.run(new FoldSink(this.f, this.seed, sink), scheduler);
    };
    var FoldSink = function FoldSink(f, seed, sink) {
        this.f = f;
        this.seed = seed;
        this.sink = sink;
    };
    FoldSink.prototype.event = function event (time, value) {
        var ref = this;
            var f = ref.f;
        this.seed = f(this.seed, value);
        this.sink.event(time, this.seed);
    };
    FoldSink.prototype.error = function error (time, err) {
        this.sink.error(time, err);
    };
    FoldSink.prototype.end = function end (time, value) {
        this.sink.end(time, this.seed);
    };

    exports.fold = fold;
    exports.Fold = Fold;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=tempest-fold.js.map
