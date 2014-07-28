define(function (require) {
    'use strict';

    var forEach = require('Lumberman/util/forEach');

    return function (obj, callback) {
        var results = [];
        if (obj === null) {
            return results;
        }
        forEach(obj, function(item) {
            results.push(callback(item));
        });
        return results;
    };
});






