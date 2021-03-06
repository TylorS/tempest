(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tempest/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tempest/core'], factory) :
    (factory((global.tempestThrowError = global.tempestThrowError || {}),global.tempestCore));
}(this, function (exports,_tempest_core) { 'use strict';

    function throwError(err) {
        return new _tempest_core.Stream(new ThrowError(err));
    }
    var ThrowError = function ThrowError(err) {
        this.err = err;
    };
    ThrowError.prototype.run = function run (sink, scheduler) {
        var task = scheduler.asap(_tempest_core.PropagateTask.error(this.err, sink));
        return {
            dispose: function dispose() {
                scheduler.cancel(task);
            }
        };
    };

    exports.throwError = throwError;
    exports.ThrowError = ThrowError;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=tempest-throwError.js.map
