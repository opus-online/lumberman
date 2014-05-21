# Lumberman
--------------

[![Build Status](https://travis-ci.org/opus-online/lumberman.svg?branch=master)](https://travis-ci.org/opus-online/lumberman)

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

## Creating a new destination 

```javascript
define(function (require) {
    'use strict';

    var BaseTransport = require('Lumberman/transport/Base');

    /**
     * This destination will proxy all requests to the console
     * @constructor
     */
    function CustomTransport() {

    }

    CustomTransport.prototype = Object.create(BaseTransport.prototype, {
        debug: {
            value: function(message) {
                //Implement your logging output here.
                //Keep in mind that message is an array
            }
        },
        info: {
            value: function(message) {
                //Implement your logging output here.
                //Keep in mind that message is an array
            }
        },
        warn: {
            value: function(message) {
                //Implement your logging output here.
                //Keep in mind that message is an array
            }
        },
        error: {
            value: function(message) {
                //Implement your logging output here.
                //Keep in mind that message is an array
            }
        },
        exception: {
            value: function(message) {
                //Implement your logging output here.
                //Keep in mind that message is an array
            }
        }
    });
    return CustomTransport;
});
```