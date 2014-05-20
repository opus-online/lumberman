define(function (require) {
    'use strict';

    var Logger = require('Lumberman/Logger');
    var Destination = require('Lumberman/Destination');
    var SimpleLogger = require('Lumberman/SimpleLogger');

    describe('logger', function () {

        it('getLogger() should return a simplelogger', function () {
            expect(new Logger().getLogger('test') instanceof SimpleLogger).toBe(true);
        });

        it('addDestination() accepts only valid destinations', function () {

            expect(function () {
                new Logger().addDestination();
            }).toThrow(new Error('Invalid destination'));

            expect(function () {
                new Logger().addDestination('Random string');
            }).toThrow(new Error('Invalid destination'));
        });

        it('loggers proxy all requests to destinations', function () {

            var logger = new Logger();
            var simpleLogger = logger.getLogger('application');
            var destination = new Destination();

            logger.addDestination(destination);


            ['debug', 'info', 'warn', 'error', 'exception'].forEach(function (level) {
                spyOn(destination, level);
                simpleLogger[level]('Testing');

                expect(destination[level]).toHaveBeenCalled();
            });

        });

    });

});