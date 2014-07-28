(function () {
    'use strict';

    var allTestFiles = [];
    var TEST_REGEXP = /Spec\.js$/;

    var files = window.__karma__.files;
    for(var key in files) {
        if (TEST_REGEXP.test(key)) {
            // Normalize paths to RequireJS module names.
            allTestFiles.push(key);
        }
    }

    var requirejsConfig = {
        baseUrl : '/base',
        paths : {
            'Lumberman' : 'src'
        },
        deps : allTestFiles,
        callback : window.__karma__.start
    };
    require.config(requirejsConfig);

    /**
     * Overwrite the prototype for tests
     */
    if (typeof Array.prototype.forEach != 'function') {
        Array.prototype.forEach = function(callback){
            for (var i = 0; i < this.length; i += 1) {
                callback.apply(this, [this[i], i, this]);
            }
        };
    }
})();