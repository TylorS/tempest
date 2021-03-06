(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tempest/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tempest/core'], factory) :
    (factory((global.tempestPeriodic = global.tempestPeriodic || {}),global.tempestCore));
}(this, function (exports,_tempest_core) { 'use strict';

    function periodic(period) {
        return new _tempest_core.Stream(new Periodic(period));
    }
    var Periodic = function Periodic(period) {
        this.period = period;
    };
    Periodic.prototype.run = function run (sink, scheduler) {
        var task = new _tempest_core.PropagateTask(makeRun(-1), void 0, sink);
        var scheduledTask = scheduler.periodic(this.period, task);
        return {
            dispose: function dispose() {
                scheduler.cancel(scheduledTask);
            }
        };
    };
    function makeRun(i) {
        return function run(time, value, sink) {
            sink.event(time, ++i);
        };
    }

    exports.periodic = periodic;
    exports.Periodic = Periodic;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=tempest-periodic.js.map
