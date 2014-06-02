define(function (require) {
    'use strict';

    var LogglyTransport = require('Lumberman/transport/Loggly');

    describe('loggly destination', function () {

        it('should throw an error when not initialized with a token', function () {
            expect(function () { return new LogglyTransport(); }).toThrow();
        });

        it('should proxy token and tags', function () {

            var token = 'TOKEN';
            var tags = ['tag1', 'tag2'];
            var loggly = new LogglyTransport(token);
            expect(loggly.token).toEqual(token);
            expect(loggly.tags).toEqual([]);

            loggly = new LogglyTransport(token, tags);
            expect(loggly.token).toEqual(token);
            expect(loggly.tags).toEqual(tags);

        });

        it('should create the right url from the token, tags, level, message', function () {

            var token = 'TOKEN';
            var tags = ['tag1', 'tag2'];
            var message = 'message';
            var obj = {'hello':'world'};
            var destination = new LogglyTransport(token, tags);

            ['debug', 'info', 'warn', 'error'].forEach(function (level) {
                var url = destination.getUrl(level, [message, obj]);
                expect(url).toEqual(destination.LOGGLY_BASE_PATH + 'TOKEN/tag/tag1,tag2/1*1.gif?level=' + level + '&message=message%20%7B%22hello%22%3A%22world%22%7D');
            });

        });

        it('should proxy basic events to the log function', function () {
            ['debug', 'info', 'warn', 'error'].forEach(function (level) {
                var destination = new LogglyTransport('token');
                spyOn(destination, 'log');
                destination[level](['Testing']);
                expect(destination.log).toHaveBeenCalledWith(destination.LOGGLY_BASE_PATH + 'token/tag//1*1.gif?level=' + level + '&message=Testing');
            });
        });

        it('should proxy exceptions to the log function', function () {
            var destination = new LogglyTransport('token');
            var error = new Error('testing');
            spyOn(destination, 'log');
            destination.exception([error]);
            expect(destination.log).toHaveBeenCalledWith(destination.LOGGLY_BASE_PATH + 'token/tag//1*1.gif?level=error&message=Error%3A%20testing');
        });

    });

});