define(function (require) {
    'use strict';

    var map = require('Lumberman/util/map');
    var undef;

    /**
     * Turns an array of objects to a string
     * @param {array} data
     * @returns {string}
     */
    return function (data) {
        return map(data || [], function (argument) {
            if (typeof argument === 'undefined') { //Seems like IE8 doesn't want to work with this otherwise
                return 'undefined';
            }
            else if (argument === null) { //Seems like IE8 doesn't want to work with this otherwise
                return 'null';
            }
            else if (argument instanceof RegExp) {
                return argument.toString();
            }
            else if (argument instanceof Date) {
                var d = argument;
                return ([d.getUTCDate(), d.getUTCMonth(), d.getUTCFullYear()]).join('.') + ' ' + [d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()].join(':') + ' UTC';
            }
            else if (argument instanceof Error) {
                return (argument.stack ? argument.stack : 'Error: ' + argument.message);
            }
            else if (argument instanceof Object) {
                return JSON.stringify(argument);
            }
            return '' + argument;
        }).join(' ');
    };
});






