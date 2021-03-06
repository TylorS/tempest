(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tempest/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tempest/core'], factory) :
    (factory((global.tempestMap = global.tempestMap || {}),global.tempestCore));
}(this, function (exports,_tempest_core) { 'use strict';

    var map = function (f, stream) {
        switch (arguments.length) {
            case 1: return function (stream) { return new _tempest_core.Stream(new Map(f, stream.source)); };
            case 2: return new _tempest_core.Stream(new Map(f, stream.source));
            default: return map;
        }
    };
    var mapTo = function (value, stream) {
        switch (arguments.length) {
            case 1: return function (stream) { return map(function () { return value; }, stream); };
            case 2: return map(function () { return value; }, stream);
            default: return mapTo;
        }
    };
    var Map = function Map(f, source) {
        this.f = f;
        this.source = source;
    };
    Map.prototype.run = function run (sink, scheduler) {
        return this.source.run(new MapSink(this.f, sink), scheduler);
    };
    var MapSink = function MapSink(f, sink) {
        this.f = f;
        this.sink = sink;
    };
    MapSink.prototype.event = function event (time, value) {
        var f = this.f;
        this.sink.event(time, f(value));
    };
    MapSink.prototype.error = function error (time, err) {
        this.sink.error(time, err);
    };
    MapSink.prototype.end = function end (time, value) {
        this.sink.end(time, value);
    };

    exports.map = map;
    exports.mapTo = mapTo;
    exports.Map = Map;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=tempest-map.js.map
