(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tempest/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tempest/core'], factory) :
    (factory((global.tempestEmpty = global.tempestEmpty || {}),global.tempestCore));
}(this, function (exports,_tempest_core) { 'use strict';

    function empty() {
        return new _tempest_core.Stream(new Empty());
    }
    var Empty = function Empty () {};

    Empty.prototype.run = function run (sink, scheduler) {
        var task = scheduler.asap(_tempest_core.PropagateTask.end(void 0, sink));
        return {
            dispose: function dispose() {
                scheduler.cancel(task);
            }
        };
    };

    exports.empty = empty;
    exports.Empty = Empty;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=tempest-empty.js.map
