(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tempest/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tempest/core'], factory) :
    (factory((global.tempestRemember = global.tempestRemember || {}),global.tempestCore));
}(this, function (exports,_tempest_core) { 'use strict';

    function remember(stream) {
        return new MemoryStream(stream.source);
    }
    var MemoryStream = (function (Stream) {
        function MemoryStream(source) {
            Stream.call(this, source);
            this.source = new Memory(source);
        }

        if ( Stream ) MemoryStream.__proto__ = Stream;
        MemoryStream.prototype = Object.create( Stream && Stream.prototype );
        MemoryStream.prototype.constructor = MemoryStream;

        return MemoryStream;
    }(_tempest_core.Stream));
    var Memory = (function (Multicast) {
        function Memory(source) {
            Multicast.call(this, source);
            this.has = false;
            this.value = void 0;
        }

        if ( Multicast ) Memory.__proto__ = Multicast;
        Memory.prototype = Object.create( Multicast && Multicast.prototype );
        Memory.prototype.constructor = Memory;
        Memory.prototype._add = function _add (sink) {
            if (this.has) {
                sink.event(Date.now(), this.value);
            }
            return Multicast.prototype._add.call(this, sink);
        };
        Memory.prototype.event = function event (time, value) {
            this.has = true;
            this.value = value;
            Multicast.prototype.event.call(this, time, value);
        };

        return Memory;
    }(_tempest_core.Multicast));

    exports.remember = remember;
    exports.MemoryStream = MemoryStream;
    exports.Memory = Memory;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=tempest-remember.js.map
