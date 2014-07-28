define(function (require) {
    'use strict';

    var forEach = require('Lumberman/util/forEach');
    var inherit = require('Lumberman/util/inherit');
    var BaseTransport = require('Lumberman/transport/Base');

    /**
     * This destination will proxy all requests to the console
     * @constructor
     */
    function ConsoleTransport() {

    }
    ConsoleTransport.prototype = inherit(BaseTransport.prototype);

    /**
     * Proxy methods to the console...
     */
    forEach(['debug', 'info', 'warn', 'error'], function (level) {
        ConsoleTransport.prototype[level] = function (data) {
            window.console[level].apply(window.console, data);
        };
    });

    /**
     * Special case for exceptions since we don't have a log level "exception"
     * @param data
     */
    ConsoleTransport.prototype.exception = function (data) {
        window.console.error.apply(window.console, data);
    };

    return ConsoleTransport;
});






