# Lumberman
--------------

[![Build Status](https://travis-ci.org/opus-online/lumberman.svg?branch=master)](https://travis-ci.org/opus-online/lumberman)
![Build Status](https://codeship.io/projects/75e69230-c6d7-0131-58a3-76b4695b1d5a/status)

A logger meant for the browser environment. Supports multiple destinations. 

Built in support for
* Console
* [Loggly](#using-the-console-and-loggly-transport-together)
* [Sentry](#using-the-console-and-sentry-transport-together)

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
define(function (require) {
    'use strict';
    
    var Lumberman = require('Lumberman/Lumberman');
    var ConsoleTransport = require('Lumberman/transport/Console');

    var lumberman = new Lumberman();
    lumberman.addTransport(new ConsoleTransport());

    app.lumberman = lumberman;
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


### Using the console and loggly transport together
```javascript
define(function (require) {
    'use strict';

    var Lumberman = require('Lumberman/Lumberman');
    var ConsoleTransport = require('Lumberman/transport/Console');
    var LogglyTransport = require('Lumberman/transport/Loggly');

    app.lumberman = new Lumberman();
    app.lumberman.addTransport(new ConsoleTransport());
    app.lumberman.addTransport(new LogglyTransport('YOUR TOKEN HERE', ['loggly', 'tags']));
});
```
### Using the console and sentry transport together
```javascript
define(function (require) {
    'use strict';

    var Lumberman = require('Lumberman/Lumberman');
    var ConsoleTransport = require('Lumberman/transport/Console');
    var LogglyTransport = require('Lumberman/transport/Loggly');

    app.lumberman = new Lumberman();
    app.lumberman.addTransport(new ConsoleTransport());
    Raven.config('SENTRYDSN').install();
    app.lumberman.addTransport(new SentryTransport(raven));
});
```
### Browser compatibility

IE9 and up