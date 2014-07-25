define(function () {
    'use strict';

    /**
     * Turns an array of objects to a string
     * @param {array} data
     * @returns {string}
     */
    return function (object) {
        var size = 0, key;
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                size += 1;
            }
        }
        return size;
    };
});






