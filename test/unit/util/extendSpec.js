define(function (require) {
    'use strict';

    var extend = require('Lumberman/util/extend');

    describe('extend', function () {

        it('should extend objects', function () {
            var base = {};
            var obj1 = { a : 1 };
            var obj2 = { b : 2 };
            extend(base, obj1, obj2);
            expect(base).toEqual({ a : 1, b : 2 });

        });
    });

});