define(function () {
    'use strict';

    /**
     * A simple logger that prepends logs with data and proxies all calls
     * @param name - the name of the logger, will show up in logs
     * @param callback - will be called every time a log is received
     * @constructor
     */
    function SimpleLogger(name, callback) {
        if (!name) {
            throw new Error('Missing logger name');
        }
        if (!callback) {
            throw new Error('Missing callback');
        }
        if (!(callback instanceof Function)) {
            throw new Error('Callback is not a function');
        }
        this.name = name;
        this.callback = callback;
    }

    /**
     * Formats current time
     * @returns {string}
     */
    SimpleLogger.prototype.getTime = function () {
        return new Date().toUTCString();
    };

    /**
     * Returns an array with the message and stack (if possible)
     * @param exception
     * @returns {*[]}
     */
    SimpleLogger.prototype.formatException = function (exception) {
        var args = [exception.message];
        if (exception.stack) { // stack is undefined if the exception hasn't been thrown
            args.push(exception.stack);
        }
        return args;
    };
    /**
     * Prepends log entries with a timestamp and the loggers name
     * @returns {Array}
     */
    SimpleLogger.prototype.prependData = function () {
        var args = Array.prototype.slice.call(arguments);
        args.unshift('[' + this.name + ']');
        args.unshift('[' + this.getTime() + ']');
        return args;
    };



    ['debug', 'info','warn', 'error'].forEach(function (level) {
        SimpleLogger.prototype[level] = function () {
            this.callback(level, this.prependData.apply(this, arguments));
        };
    });

    SimpleLogger.prototype.exception = function (exception) {
        this.callback('exception', this.prependData.apply(this, this.formatException(exception)));
    };

    return SimpleLogger;
});






