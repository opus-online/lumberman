# Lumberman
--------------

[![Build Status](https://travis-ci.org/opus-online/lumberman.svg?branch=master)](https://travis-ci.org/opus-online/lumberman)
![Build Status](https://codeship.io/projects/75e69230-c6d7-0131-58a3-76b4695b1d5a/status)

A logger meant for the browser environment.

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

## Using the loggly transport
```javascript
define(function (require) {
    'use strict';

    var Lumberman = require('Lumberman/Lumberman');
    var ConsoleTransport = require('Lumberman/transport/Console');
    var LogglyTransport = require('components/logger/transports/loggly');

    app.lumberman = new Lumberman();
    app.lumberman.addTransport(new ConsoleTransport());
    app.lumberman.addTransport(new LogglyTransport('YOUR TOKEN HERE', ['browser', 'staging']));
});
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


### Browser compatibility

IE9 and up