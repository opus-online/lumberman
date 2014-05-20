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
    var Logger = require('Lumberman/Logger');
    var ConsoleDestination = require('Lumberman/destination/Console');
    
    var logger = new Logger();
    logger.addDestination(new ConsoleDestination());
    
    app.logger = logger; 
```

### Usage 
```javascript
   var logger = app.logger.getLogger('loginScreen');
   
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

    var BaseDestination = require('Lumberman/destination/Base');

    /**
     * This destination will proxy all requests to the console
     * @constructor
     */
    function CustomDestination() {

    }

    CustomDestination.prototype = Object.create(BaseDestination.prototype, {
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
    return CustomDestination;
});
```