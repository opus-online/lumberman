define(function () {
    'use strict';

    /**
     * Turns an array of objects to a string
     * @param {array} data
     * @returns {string}
     */
    return function (obj, callback) {
        if (obj instanceof Array) {
            for (var i = 0, length = obj.length; i < length; i += 1) {
                callback(obj[i], i);
            }
        } else {
            for (var j in obj) {
                if (obj.hasOwnProperty(j)) {
                    callback(obj[j], j);
                }
            }
        }
    };
});






