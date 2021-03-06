(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tempest/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tempest/core'], factory) :
    (factory((global.tempestReplaceError = global.tempestReplaceError || {}),global.tempestCore));
}(this, function (exports,_tempest_core) { 'use strict';

    var replaceError = function (f, stream) {
        switch (arguments.length) {
            case 1: return function (stream) { return new _tempest_core.Stream(new ReplaceError(f, stream.source)); };
            case 2: return new _tempest_core.Stream(new ReplaceError(f, stream.source));
            default: return replaceError;
        }
    };
    var ReplaceError = function ReplaceError(f, source) {
        this.f = f;
        this.source = source;
    };
    ReplaceError.prototype.run = function run (sink, scheduler) {
        return new ReplaceErrorSink(this.f, this.source, sink, scheduler);
    };
    var ReplaceErrorSink = function ReplaceErrorSink(f, source, sink, scheduler) {
        this.f = f;
        this.scheduler = scheduler;
        this.sink = new SafeSink(sink);
        this.disposable = source.run(this, scheduler);
    };
    ReplaceErrorSink.prototype.event = function event (time, value) {
        try {
            this.sink.event(time, value);
        }
        catch (e) {
            this.sink.error(time, e);
        }
    };
    ReplaceErrorSink.prototype.error = function error (time, err) {
        var nextSink = this.sink.disable();
        tryDispose(this.disposable, this.sink);
        this._startNext(time, err, nextSink);
    };
    ReplaceErrorSink.prototype.end = function end (time, value) {
        try {
            this.sink.end(time, value);
        }
        catch (e) {
            this.sink.error(time, e);
        }
    };
    ReplaceErrorSink.prototype._startNext = function _startNext (time, err, sink) {
        try {
            this.disposable = this._continue(this.f, err, sink);
        }
        catch (e) {
            sink.error(time, e);
        }
    };
    ReplaceErrorSink.prototype._continue = function _continue (f, err, sink) {
        var stream = f(err);
        return stream.source.run(sink, this.scheduler);
    };
    ReplaceErrorSink.prototype.dispose = function dispose () {
        this.disposable.dispose();
    };
    var SafeSink = function SafeSink(sink) {
        this.sink = sink;
        this.active = true;
    };
    SafeSink.prototype.event = function event (t, x) {
        if (!this.active)
            return;
        this.sink.event(t, x);
    };
    SafeSink.prototype.error = function error (t, err) {
        this.disable();
        this.sink.error(t, err);
    };
    SafeSink.prototype.end = function end (t, x) {
        if (!this.active)
            return;
        this.disable();
        this.sink.end(t, x);
    };
    SafeSink.prototype.disable = function disable () {
        this.active = false;
        return this.sink;
    };
    function tryDispose(disposable, sink) {
        try {
            disposable.dispose();
        }
        catch (e) {
            sink.error(Date.now(), e);
        }
    }

    exports.replaceError = replaceError;
    exports.ReplaceError = ReplaceError;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=tempest-replaceError.js.map
