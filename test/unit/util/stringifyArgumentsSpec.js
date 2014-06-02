define(function (require) {
    'use strict';

    var stringifyArguments = require('Lumberman/util/stringifyArguments');

    describe('stringifyArguments', function () {

        var message = 'message';
        var number = 123;
        var boolean = true;
        var obj = { hello : 'world' };
        var regex = new RegExp('asd', 'i');
        var date = new Date(1318023197289);
        var undef;
        var error = new Error('testing');

        it('should json encode objects', function () {
            expect(stringifyArguments([obj])).toEqual('{"hello":"world"}');
        });

        it('should stringify date', function () {
            expect(stringifyArguments([date])).toEqual('Sat Oct 08 2011 00:33:17 GMT+0300 (FLE Daylight Time)');
        });

        it('should stringify regex', function () {
            expect(stringifyArguments([regex])).toEqual('/asd/i');
        });

        it('should return string for strings', function () {
            expect(stringifyArguments([message])).toEqual(message);
        });
        it('should return string for numbers', function () {
            expect(stringifyArguments([number])).toEqual('123');
        });
        it('should return string for booleans', function () {
            expect(stringifyArguments([true])).toEqual('true');
            expect(stringifyArguments([false])).toEqual('false');
        });
        it('should return string for undefined', function () {
            expect(stringifyArguments([undef])).toEqual('undefined');
        });
        it('should return string for null', function () {
            expect(stringifyArguments([null])).toEqual('null');
        });

        it('should return string for error', function () {
            expect(stringifyArguments([error])).toEqual('Error: testing');
        });

        it('should return string for error with stack trace', function () {
            try {
                throw new Error('testing2');
            }
            catch(error) {
                expect(stringifyArguments([error])).toEqual('' + error.stack);
            }
        });

        it('should work all together', function () {
            var string = stringifyArguments([message, number, boolean, regex, date, obj, undef, null, error]);
            expect(string).toEqual('message 123 true /asd/i Sat Oct 08 2011 00:33:17 GMT+0300 (FLE Daylight Time) {"hello":"world"} undefined null Error: testing');
        });

    });

});