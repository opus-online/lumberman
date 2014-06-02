define(function (require) {
    'use strict';

    var BaseTransport = require('Lumberman/transport/Base');

    /**
     * Constructor
     * @param raven
     * @constructor
     */
    function SentryTransport(raven) {
        if (!raven) {
            throw new Error('Sentry transport initialized without a Raven object');
        }
        this.raven = raven;
    }
    SentryTransport.prototype = Object.create(BaseTransport.prototype, {
        constructor: {value: BaseTransport, configurable: true, writeable: true}
    });

    /**
     * Raven only logs exceptions.
     */
    ['debug', 'info', 'warn', 'error'].forEach(function (level) {
        SentryTransport.prototype[level] = function () {

        };
    });

    /**
     * Special case for exceptions since we don't have a log level "exception"
     * @param data
     */
    SentryTransport.prototype.exception = function (data) {
//        var date = data[0]; // the date
        var loggerName = data[1].slice(1).substring(0, (data[1].length - 2)); //remove [] surrounding the name
        var exception = data[2];
        this.raven.captureException(exception, { logger : loggerName });
    };

    return SentryTransport;
});






