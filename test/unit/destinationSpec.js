define(function (require) {
    'use strict';

    var Destination = require('Lumberman/Destination');

    describe('destination', function () {

        it('default implementation should throw an exception', function () {

            var destination = new Destination();
            ['debug', 'info', 'warn', 'error', 'exception'].forEach(function (level) {
                expect(function () { destination[level]('Testing'); }).toThrow(new Error('Not implemented'));
            });

        });

    });

});