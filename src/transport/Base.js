define(function () {
    'use strict';

    /**
     * A simple destination object.
     * The default implementation throws errors, you should overwrite the functions to
     * @constructor
     */
    function Transport() {

    }

    ['debug', 'info', 'warn','error', 'exception'].forEach(function (level) {
        Transport.prototype[level] = function () {
            throw new Error('Not implemented');
        };
    });

    return Transport;
});






