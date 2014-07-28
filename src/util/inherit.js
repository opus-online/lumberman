define(function () {
    'use strict';

    return function(p) {
        if (!p) {
            throw new TypeError();
        }
        if (Object.create) {
            return Object.create(p);
        }
        var t = typeof p;
        if (t !== 'object' && t !== 'function') {
            throw new TypeError();
        }
        function F() {}
        F.prototype = p;
        return new F();
    };
});






