define(function (require) {
    'use strict';

    var BaseTransport = require('Lumberman/transport/Base');

    describe('destination', function () {

        it('default implementation should throw an exception', function () {

            var destination = new BaseTransport();
            ['debug', 'info', 'warn', 'error', 'exception'].forEach(function (level) {
                expect(function () { destination[level]('Testing'); }).toThrow(new Error('Not implemented'));
            });

        });

    });

});