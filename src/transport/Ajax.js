define(function (require) {
    'use strict';

    var BaseTransport = require('Lumberman/transport/Base');
    var stringifyArguments = require('Lumberman/util/stringifyArguments');
    var objectSize = require('Lumberman/util/objectSize');
    var forEach = require('Lumberman/util/forEach');
    var inherit = require('Lumberman/util/inherit');

    /**
     * This transport sends logs to Loggly
     * @constructor
     * @param url string
     * @param params object key value pair of params to add the the URL
     */
    function AjaxTransport(url, params) {
        if (!url) {
            throw new Error('Missing url');
        }
        this.url = url;
        this.params = params || [];
    }
    /**
     * Extending the BaseTransport
     * @type {BaseTransport.prototype}
     */
    AjaxTransport.prototype = inherit(BaseTransport.prototype);

    /**
     * URL parameters to always send to the server
     * @type {{}}
     */
    AjaxTransport.prototype.params = {};

    /**
     * The URL endpoint to send data too
     * @type {string}
     */
    AjaxTransport.prototype.url = '';

    /**
     * Builds the request URL from your token and tags
     * @param level
     * @param data
     * @returns {string}
     */
    AjaxTransport.prototype.getUrl = function (level, data) {
        var baseUrl = [this.url, '?', this.stringifyParameters(this.params)].join('');
        var baseData = 'level=' + level + '&message=' + encodeURIComponent(stringifyArguments(data));
        return baseUrl + (objectSize(this.params) > 0 ? '&' : '') + baseData;
    };

    AjaxTransport.prototype.stringifyParameters = function (params) {
        var string = '';
        forEach(params, function (value, key) {
            string += encodeURIComponent(key) + '=' + encodeURIComponent(value);
        });
        return string;

    };
    /**
     * Actually sends data to loggly
     */
    AjaxTransport.prototype.log = function (url) {
        new Image().src = url;
    };

    /**
     * Proxy methods to the log function....
     */
    forEach(['debug', 'info', 'warn', 'error'], function (level) {
        AjaxTransport.prototype[level] = function (data) {
            this.log(this.getUrl(level, data));
        };
    });

    /**
     * Special case for exceptions since we don't have a log level "exception"
     * @param data
     */
    AjaxTransport.prototype.exception = function (data) {
        this.log(this.getUrl('error', data));
    };

    return AjaxTransport;

});