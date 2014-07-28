define(function (require) {
    'use strict';

    var forEach = require('Lumberman/util/forEach');

    /**
     * A simple destination object.
     * The default implementation throws errors, you should overwrite the functions to
     * @constructor
     */
    function Transport() {

    }

    forEach(['debug', 'info', 'warn','error', 'exception'], function (level) {
        Transport.prototype[level] = function () {
            throw new Error('Not implemented');
        };
    });

    return Transport;
});






