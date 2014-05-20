define(function (require) {
    'use strict';

    var BaseDestination = require('Lumberman/destination/Base');

    describe('destination', function () {

        it('default implementation should throw an exception', function () {

            var destination = new BaseDestination();
            ['debug', 'info', 'warn', 'error', 'exception'].forEach(function (level) {
                expect(function () { destination[level]('Testing'); }).toThrow(new Error('Not implemented'));
            });

        });

    });

});