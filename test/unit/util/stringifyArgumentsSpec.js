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
            expect(stringifyArguments([date])).toEqual('7.9.2011 21:33:17 UTC');
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
            expect(stringifyArguments([undefined])).toEqual('undefined');
        });
        it('should return string for null', function () {
            expect(stringifyArguments([null])).toEqual('null');
        });

        it('should return string for error', function () {
            expect(stringifyArguments([error])).toEqual('Error: testing');
        });

        it('should work all together', function () {
            var string = stringifyArguments([message, number, boolean, regex, date, obj, undefined, null, error]);
            expect(string).toEqual('message 123 true /asd/i 7.9.2011 21:33:17 UTC {"hello":"world"} undefined null Error: testing');
        });

    });

});