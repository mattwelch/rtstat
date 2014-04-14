var Discover=require('./lib/discover.js');
var Tstat=require('./lib/tstat.js');
var Q=require('q');

var ipAddress;

var findThermostats = function() {
	var deferred=Q.defer();
	var d=Discover();
	d.then(function(data) {
		var promiseArray=[];
		var tstatArray=[];
		for (var i=0; i < data.length; i++) {
			var thisTstat=new Tstat(data[i]);
			var tstatSys=thisTstat.sys();
			promiseArray.push(tstatSys);
			tstatArray.push(thisTstat);
		}
		var returnedTstats={};
		Q.all(promiseArray).then(function(sysResults) {
			for (var i=0; i < sysResults.length; i++) {
				returnedTstats[sysResults[i].uuid]=tstatArray[i];
			}
			deferred.resolve(returnedTstats);
		});
	}, function(err) {
		deferred.reject(err);
	});
	return deferred.promise;
}

var tstat = function(addr) {
	return new Tstat(addr);
}

module.exports.findThermostats = findThermostats;
module.exports.tstat = tstat;