define(function () {
    'use strict';

    /**
     * A simple destination object.
     * The default implementation throws errors, you should overwrite the functions to
     * @constructor
     */
    function Destination() {

    }

    ['debug', 'info', 'warn','error', 'exception'].forEach(function (level) {
        Destination.prototype[level] = function () {
            throw new Error('Not implemented');
        };
    });

    return Destination;
});






