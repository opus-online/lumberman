# Lumberman
--------------

[![Build Status](https://travis-ci.org/opus-online/lumberman.svg?branch=master)](https://travis-ci.org/opus-online/lumberman)
![Build Status](https://codeship.io/projects/75e69230-c6d7-0131-58a3-76b4695b1d5a/status)

## Installation
```
bower install lumberman
```

### Setup requirejs
```javascript
    var requirejs = {
        "paths": {
            "Lumberman" : "bower_components/lumberman/src"
        }
    };

```

### Setup a logger with a console destination
```javascript
    var Lumberman = require('Lumberman/Lumberman');
    var ConsoleTransport = require('Lumberman/transport/Console');

    var lumberman = new Lumberman();
    lumberman.addTransport(new ConsoleTransport());

    app.lumberman = lumberman;
```

### Usage
```javascript
   var logger = app.lumberman.getLogger('loginScreen');

   logger.debug('Debug');
   logger.info('Info');
   logger.warn('Warn');
   logger.error('Error');
   logger.exception(new Error('Exception'));
```
#### Result
![Result](http://puu.sh/8UedZ.png)

## Creating a loggly transport
```javascript
define(function (require) {
    'use strict';

    var _ = require('underscore');
    var BaseTransport = require('Lumberman/transport/Base');

    var LOGGLY_BASE_PATH = 'http://logs-01.loggly.com/inputs/';

    /**
     * This transport sends logs to Loggly
     * @param {string} token - your customer token
     * @param {array} tags - array of tags
     * @constructor
     */
    function LogglyTransport(token, tags) {
        this.token = token;
        this.tags = tags;
    }

    /**
     * Extending the BaseTransport
     * @type {BaseTransport.prototype}
     */
    LogglyTransport.prototype = Object.create(BaseTransport.prototype, {
        constructor: {value: BaseTransport, configurable: true, writeable: true}
    });

    /**
     * Builds the request URL from your token and tags
     * @returns {string}
     */
    LogglyTransport.prototype.getUrl = function () {
        return [LOGGLY_BASE_PATH, this.token, '/tag/', this.tags.join(','), '/1*1.gif?'].join('');
    };

    /**
     * Turns an array of objects to a string
     * @param {array} data
     * @returns {string}
     */
    LogglyTransport.prototype.stringifyArguments = function (data) {
        return _.map(data, function (argument) {
            if (_.isString(argument) || _.isNumber(argument)) {
                return argument;
            }
            return JSON.stringify(argument);
        }).join(' ');
    };

    /**
     * Actually sends data to loggly
     * @param level
     * @param data
     */
    LogglyTransport.prototype.log = function (level, data) {
        var url = this.getUrl() + 'level=' + level + '&message=' + encodeURIComponent(this.stringifyArguments(data));
        new Image().src = url;
    };

    /**
     * Proxy methods to the log function....
     */
    ['debug', 'info', 'warn', 'error'].forEach(function (level) {
        LogglyTransport.prototype[level] = function (data) {
            this.log(level, data);
        };
    });

    /**
     * Special case for exceptions since we don't have a log level "exception"
     * @param data
     */
    LogglyTransport.prototype.exception = function (data) {
        this.log('error', data);
    };

    return LogglyTransport;

});
```

## Using the loggly transport

```javascript
define(function (require) {
    'use strict';

    var Lumberman = require('Lumberman/Lumberman');
    var ConsoleTransport = require('Lumberman/transport/Console');
    var LogglyTransport = require('components/logger/transports/loggly');

    return function (app) {
        app.lumberman = new Lumberman();
        app.lumberman.addTransport(new ConsoleTransport());
        app.lumberman.addTransport(new LogglyTransport('YOUR TOKEN HERE', ['browser', 'staging']));
    };
});

```