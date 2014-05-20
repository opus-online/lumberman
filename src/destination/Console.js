define(function (require) {
    'use strict';

    var BaseDestination = require('Lumberman/destination/Base');

    /**
     * This destination will proxy all requests to the console
     * @constructor
     */
    function ConsoleDestination() {

    }

    ConsoleDestination.prototype = Object.create(BaseDestination.prototype, {
        debug: {
            value: function(message) {
                console.debug.apply(console, message);
            }
        },
        info: {
            value: function(message) {
                console.info.apply(console, message);
            }
        },
        warn: {
            value: function(message) {
                console.warn.apply(console, message);
            }
        },
        error: {
            value: function(message) {
                console.error.apply(console, message);
            }
        },
        exception: {
            value: function(message) {
                console.error.apply(console, message);
            }
        }
    });
    return ConsoleDestination;
});






