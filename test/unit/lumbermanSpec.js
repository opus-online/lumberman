define(function (require) {
    'use strict';

    var Lumberman = require('Lumberman/Lumberman');
    var BaseTransport = require('Lumberman/transport/Base');
    var ConsoleTransport = require('Lumberman/transport/Console');
    var SimpleLogger = require('Lumberman/logger/Simple');

    describe('logger', function () {

        it('getLogger() should return a simplelogger', function () {
            expect(new Lumberman().getLogger('test') instanceof SimpleLogger).toBe(true);
        });

        it('addTransport() accepts only valid transports', function () {

            expect(function () {
                new Lumberman().addTransport();
            }).toThrow(new Error('Invalid transport'));

            expect(function () {
                new Lumberman().addTransport('Random string');
            }).toThrow(new Error('Invalid transport'));
        });

        it('loggers proxy all requests to transports', function () {

            var logger = new Lumberman();
            var simpleLogger = logger.getLogger('application');

            var baseDestination = new BaseTransport();
            var consoleDestination = new ConsoleTransport();

            logger.addTransport(baseDestination);
            logger.addTransport(consoleDestination);

            ['debug', 'info', 'warn', 'error', 'exception'].forEach(function (level) {

                spyOn(baseDestination, level);
                spyOn(consoleDestination, level);

                simpleLogger[level]('Testing');

                expect(baseDestination[level]).toHaveBeenCalled();
                expect(consoleDestination[level]).toHaveBeenCalled();

            });

        });

    });

});