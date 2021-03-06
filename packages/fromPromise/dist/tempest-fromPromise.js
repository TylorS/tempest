(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tempest/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tempest/core'], factory) :
    (factory((global.tempestFromPromise = global.tempestFromPromise || {}),global.tempestCore));
}(this, function (exports,_tempest_core) { 'use strict';

    function fromPromise(promise) {
        return new _tempest_core.Stream(new FromPromise(promise));
    }
    var FromPromise = function FromPromise(promise) {
        this.promise = promise;
    };
    FromPromise.prototype.run = function run (sink, scheduler) {
        var running = true;
        var promise = this.promise;
        promise.then(function (value) {
            if (!running)
                return;
            sink.event(scheduler.now(), value);
        }).catch(function (err) {
            sink.error(scheduler.now(), err);
        }).then(function () {
            sink.end(scheduler.now(), void 0);
        });
        return {
            dispose: function dispose() {
                running = false;
            }
        };
    };

    exports.fromPromise = fromPromise;
    exports.FromPromise = FromPromise;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=tempest-fromPromise.js.map
