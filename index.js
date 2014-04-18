'use string'

var Discover=require('./lib/discover.js'),
	Tstat=require('./lib/tstat.js'),
	Q=require('q');

var ipAddress;

// Use ssdp-like protocol to discover local thermostats
var findThermostats = function() {
// We're going to return a promise out of all this, so set it up...
	var deferred=Q.defer();
	var d=Discover();
// We got a promise from our discover method, containing the ip addresses of any local tstats
	d.then(function(data) {
		var promiseArray=[];
		var tstatArray=[];
// Now let's go through, and call a method on those tstat objects that we create, so we can get the uuid...
		for (var i=0; i < data.length; i++) {
			var thisTstat=new Tstat(data[i]);
			var tstatSys=thisTstat.sys();
			promiseArray.push(tstatSys);
			tstatArray.push(thisTstat);
		}
		var returnedTstats={};
		Q.all(promiseArray).then(function(sysResults) {
			for (var i=0; i < sysResults.length; i++) {
// So we can build up an array of objects with the uuid as the key, and the thermostat object as the value
				returnedTstats[sysResults[i].uuid]=tstatArray[i];
			}
			deferred.resolve(returnedTstats);
		});
	}, function(err) {
		deferred.reject(err);
	});
	return deferred.promise;
}

// This simply makes a new tstat with a known ip address.
var tstat = function(addr) {
	return new Tstat(addr);
}

module.exports.findThermostats = findThermostats;
module.exports.tstat = tstat;