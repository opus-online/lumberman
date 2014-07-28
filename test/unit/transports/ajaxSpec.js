define(function (require) {
    'use strict';

    var AjaxTransport = require('Lumberman/transport/Ajax');

    describe('ajax destination', function () {

        it('should throw an error when not initialized without an url', function () {
            expect(function () { return new AjaxTransport(); }).toThrow();
        });
        it('should create the right url from the url, params and log data', function () {

            var url = 'localhost';
            var params = {'paramKey' : 'paramValue'};
            var message = 'message';
            var obj = {'hello':'world'};
            var destination = new AjaxTransport(url, params);

            ['debug', 'info', 'warn', 'error'].forEach(function (level) {
                var url = destination.getUrl(level, [message, obj]);
                expect(url).toEqual('localhost?paramKey=paramValue&level=' + level + '&message=message%20%7B%22hello%22%3A%22world%22%7D');
            });

        });
//
        it('should proxy basic events to the log function', function () {
            ['debug', 'info', 'warn', 'error'].forEach(function (level) {
                var destination = new AjaxTransport('localhost');
                spyOn(destination, 'log');
                destination[level](['Testing']);
                expect(destination.log).toHaveBeenCalledWith('localhost?level=' + level + '&message=Testing');
            });
        });
//
        it('should proxy exceptions to the log function', function () {
            var destination = new AjaxTransport('localhost');
            var error = new Error('testing');
            error.stack = undefined; //Some browsers append the stack, some don't
            spyOn(destination, 'log');
            destination.exception([error]);
            expect(destination.log).toHaveBeenCalledWith('localhost?level=error&message=Error%3A%20testing');
        });

    });

});