define(function (require) {
    'use strict';

    var SentryTransport = require('Lumberman/transport/Sentry');

    describe('sentry destination', function () {

        it('should throw an error when not initialized with a raven object', function () {
            expect(function () { return new SentryTransport(); }).toThrow();
        });

        it('should proxy only error events', function () {

            var raven = jasmine.createSpyObj('raven', ['captureMessage', 'captureException']);
            var destination = new SentryTransport(raven);

            ['debug', 'info', 'warn', 'error'].forEach(function (level) {
                destination[level]('[Testing');
                expect(raven.captureMessage).not.toHaveBeenCalled();
                expect(raven.captureException).not.toHaveBeenCalled();
            });

            var error = new Error('Testing');
            destination['exception'](['[TIME]', '[LOGGERNAME]', error]);
            expect(raven.captureException).toHaveBeenCalledWith(error, { logger : 'LOGGERNAME' });

        });
    });



});