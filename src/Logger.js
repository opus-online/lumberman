define(function (require) {
    'use strict';

    var Destination = require('Lumberman/Destination');
    var SimpleLogger = require('Lumberman/SimpleLogger');

    /**
     * A Logger that has multiple destinations (e.g. Console, Ajax etc)
     * @constructor
     */
    function Logger() {
        this.destinations = [];
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
     * Proxies all logs to different destinations
     * @param level
     * @param message
     */
    Logger.prototype.log = function (level, message) {
        this.destinations.forEach(function (destination) {
            destination[level](message);
        });
    };

    /**
     * Add a new destination for logs
     * @param {Destination} destination
     */
    Logger.prototype.addDestination = function (destination) {
        if (!(destination instanceof Destination)) {
            throw new Error('Invalid destination');
        }
        this.destinations.push(destination);
    };

    return Logger;
});






