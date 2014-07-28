define(function (require) {
    'use strict';

    var BaseTransport = require('Lumberman/transport/Base');
    var stringifyArguments = require('Lumberman/util/stringifyArguments');
    var forEach = require('Lumberman/util/forEach');
    var inherit = require('Lumberman/util/inherit');

    /**
     * This transport sends logs to Loggly
     * @param {string} token - your customer token
     * @param {array} tags - array of tags
     * @constructor
     */
    function LogglyTransport(token, tags) {
        if (!token) {
            throw new Error('Missing token');
        }
        this.token = token;
        if (tags) {
            this.tags = tags;
        }
    }
    /**
     * Extending the BaseTransport
     * @type {BaseTransport.prototype}
     */
    LogglyTransport.prototype = inherit(BaseTransport.prototype);

    /**
     * The base path for the url
     * @type {string}
     */
    LogglyTransport.prototype.LOGGLY_BASE_PATH = 'http://logs-01.loggly.com/inputs/';

    /**
     * Tags to use on this transport
     * @type {Array}
     */
    LogglyTransport.prototype.tags = [];

    /**
     * The loggly customer token
     * @type {string}
     */
    LogglyTransport.prototype.token = '';

    /**
     * Builds the request URL from your token and tags
     * @param level
     * @param data
     * @returns {string}
     */
    LogglyTransport.prototype.getUrl = function (level, data) {
        return [this.LOGGLY_BASE_PATH, this.token, '/tag/', this.tags.join(','), '/1*1.gif?'].join('') + 'level=' + level + '&message=' + encodeURIComponent(stringifyArguments(data));
    };


    /**
     * Actually sends data to loggly
     */
    LogglyTransport.prototype.log = function (url) {
        new Image().src = url;
    };

    /**
     * Proxy methods to the log function....
     */
    forEach(['debug', 'info', 'warn', 'error'], function (level) {
        LogglyTransport.prototype[level] = function (data) {
            this.log(this.getUrl(level, data));
        };
    });

    /**
     * Special case for exceptions since we don't have a log level "exception"
     * @param data
     */
    LogglyTransport.prototype.exception = function (data) {
        this.log(this.getUrl('error', data));
    };

    return LogglyTransport;

});