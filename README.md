# Lumberman
--------------

[![Build Status](https://travis-ci.org/opus-online/lumberman.svg?branch=master)](https://travis-ci.org/opus-online/lumberman)
[![Coverage Status](https://coveralls.io/repos/opus-online/lumberman/badge.png?branch=master)](https://coveralls.io/r/opus-online/lumberman?branch=master)

A logger meant for the browser environment. Supports multiple destinations. 

Built in support for
* Console
* [AJAX](#using-the-console-and-ajax-transport-together)
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

### Using the console and ajax transport together
```javascript
define(function (require) {
    'use strict';

    var Lumberman = require('Lumberman/Lumberman');
    var ConsoleTransport = require('Lumberman/transport/Console');
    var AjaxTransport = require('Lumberman/transport/Ajax');

    app.lumberman = new Lumberman();
    app.lumberman.addTransport(new ConsoleTransport());
    app.lumberman.addTransport(new AjaxTransport('YOUR URL HERE', { 'url_arguments_key' : 'value' }));
});
```

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