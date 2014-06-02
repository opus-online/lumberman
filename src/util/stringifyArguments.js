define(function () {
    'use strict';

    /**
     * Turns an array of objects to a string
     * @param {array} data
     * @returns {string}
     */
    return function (data) {
        return (data || []).map(function (argument) {
            if (argument instanceof RegExp) {
                return argument.toString();
            }
            else if (argument instanceof Date) {
                return argument.toString();
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






