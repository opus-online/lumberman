define(function (require) {
    'use strict';

    var forEach = require('Lumberman/util/forEach');

    describe('forEach', function () {

        it('should iterate an array', function () {
            var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
            var spy = jasmine.createSpy('callback');
            forEach(letters, spy);
            expect(spy.calls.count()).toEqual(7);
            expect(spy.calls.argsFor(0)[0]).toEqual('a');
            expect(spy.calls.argsFor(6)[0]).toEqual('g');
        });
    });

});