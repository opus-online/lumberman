define(function (require) {
    'use strict';

    var objectSize = require('Lumberman/util/objectSize');

    describe('objectSize', function () {
        it('should return the correct size for objects', function () {

            var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
            var obj = {};
            letters.forEach(function (letter, index) {
                obj[letter] = true;
                expect(objectSize(obj)).toEqual((index + 1));
            });

         });
    });

});