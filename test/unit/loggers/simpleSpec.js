define(function (require) {
    'use strict';

    var SimpleLogger = require('Lumberman/logger/Simple');

    describe('SimpleLogger', function () {

        it('should be called with a name and a log function', function () {

            expect(function () { return new SimpleLogger(); }).toThrow(new Error('Missing logger name'));

            expect(function () { return new SimpleLogger('test'); }).toThrow(new Error('Missing callback'));

            expect(function () { return new SimpleLogger('test', 'notACallback'); }).toThrow(new Error('Callback is not a function'));

            expect(function () { return new SimpleLogger('test', function () {}); }).not.toThrow();

        });

        ['info', 'debug', 'warn', 'error'].forEach(function (level) {

            it('should proxy ' + level + ' messages back to the callback', function () {

                var logger = new SimpleLogger('proxy', function (level, message) {
                    expect(level).toEqual(level);
                    expect(message.join(' ')).toEqual('[NOW][proxy] Testing');
                });

                spyOn(logger, 'getTime').and.returnValue('NOW');

                logger[level]('Testing');

            });

        });

        it('should proxy exceptions back to the callback as an error', function () {

            var logger = new SimpleLogger('proxy', function (level, message) {
                expect(level).toEqual('exception');
                expect(message.join(' ')).toEqual('[NOW][proxy] Testing');
            });

            spyOn(logger, 'getTime').and.returnValue('NOW');

            logger.exception(new Error('Testing'));

        });



    });

});