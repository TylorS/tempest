(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tempest/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tempest/core'], factory) :
    (factory((global.tempestEndWhen = global.tempestEndWhen || {}),global.tempestCore));
}(this, function (exports,_tempest_core) { 'use strict';

    var endWhen = function (signal, stream) {
        switch (arguments.length) {
            case 1: return function (stream) { return new _tempest_core.Stream(new EndWhen(signal.source, stream.source)); };
            case 2: return new _tempest_core.Stream(new EndWhen(signal.source, stream.source));
            default: return endWhen;
        }
    };
    var EndWhen = function EndWhen(signal, source) {
        this.signal = signal;
        this.source = source;
    };
    EndWhen.prototype.run = function run (sink, scheduler) {
        var disposable = this.source.run(sink, scheduler);
        var signalDisposable = this.signal.run({
            event: function (t, x) {
                sink.end(t, x);
                disposable.dispose();
                signalDisposable.dispose();
            },
            error: function (t, e) { return sink.error(t, e); },
            end: Function.prototype
        }, scheduler);
        return {
            dispose: function dispose() {
                disposable.dispose();
                signalDisposable.dispose();
            }
        };
    };

    exports.endWhen = endWhen;
    exports.EndWhen = EndWhen;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=tempest-endWhen.js.map
