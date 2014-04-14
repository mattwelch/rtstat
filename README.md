## Initialization

`var rtstat=require('rtstat')`

## Overview

You can get tstat objects directly (with an ipaddress):

```js
var tstat=rtstat.tstat('192.168.0.100')
```

or through discovery:

```js
var tstats=tstat.findThermostats();
```

which returns a promise that will resolve to an object with tstat uuids as keys and tstat objects as, um, objects

```js
tstats.then(function(thermostats) {
	for (var key in thermostats) {
		// 'key' is this thermostat's uuid
    	var thisTstat=thermostats[key];
	}
},
function(err) {
	console.log(err);
});
```

## API

Once you have a thermostat object, you can call methods on it that correspond to endpoints in the official API.

* sys
* tstat
* datalog
* name
* model
* ttemp

The module currently only supports read properties of the thermostats. Writing to the thermostat is forthcoming.