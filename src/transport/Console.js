define(function (require) {
    'use strict';

    var BaseTransport = require('Lumberman/transport/Base');

    /**
     * This destination will proxy all requests to the console
     * @constructor
     */
    function ConsoleTransport() {

    }
    ConsoleTransport.prototype = Object.create(BaseTransport.prototype, {
        constructor: {value: BaseTransport, configurable: true, writeable: true}
    });

    /**
     * Proxy methods to the console...
     */
    ['debug', 'info', 'warn', 'error'].forEach(function (level) {
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






