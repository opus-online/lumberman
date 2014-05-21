define(function (require) {
    'use strict';

    var BaseTransport = require('Lumberman/transport/Base');
    var SimpleLogger = require('Lumberman/logger/Simple');

    /**
     * A Logger that has multiple transports (e.g. Console, Ajax etc)
     * @constructor
     */
    function Logger() {
        this.transports = [];
    }

    /**
     * Creates a new simple logger with the predefined name
     * @param name
     * @returns {SimpleLogger}
     */
    Logger.prototype.getLogger = function (name) {

        var self = this;

        return new SimpleLogger(name, function (level, message) {
            self.log(level, message);
        });
    };

    /**
     * Proxies all logs to different transports
     * @param level
     * @param message
     */
    Logger.prototype.log = function (level, message) {
        this.transports.forEach(function (destination) {
            destination[level](message);
        });
    };

    /**
     * Add a new destination for logs
     * @param {BaseTransport} destination
     */
    Logger.prototype.addTransport = function (destination) {
        if (!(destination instanceof BaseTransport)) {
            throw new Error('Invalid transport');
        }
        this.transports.push(destination);
    };

    return Logger;
});






