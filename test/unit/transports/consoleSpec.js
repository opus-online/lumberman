define(function (require) {
    'use strict';

    var ConsoleTransport = require('Lumberman/transport/Console');

    describe('console destination', function () {

        it('should proxy basic events to the Console object', function () {

            var message = 'Testing';
            var destination = new ConsoleTransport();
            ['debug', 'info', 'warn', 'error'].forEach(function (level) {
                spyOn(console, level);
                destination[level]([message]);
                expect(console[level]).toHaveBeenCalledWith(message);
            });
        });

        it('should proxy errors to the Console object', function () {

            var error = new Error('Testing');
            var destination = new ConsoleTransport();
            spyOn(console, 'error');
            destination.error([error]);
            expect(console.error).toHaveBeenCalledWith(error);
        });
    });

});