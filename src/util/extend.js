define(function (require) {
    'use strict';

    var forEach = require('Lumberman/util/forEach');
    var slice = Array.prototype.slice;

    return function(obj) {
        forEach(slice.call(arguments, 1), function(source) {
            if (source) {
                for (var prop in source) {
                    obj[prop] = source[prop];
                }
            }
        });
    }
});






