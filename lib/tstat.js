'use string'

var request = require('request'),
	Q = require('q');

var ipAddress;

/**
 * Create an API method from the declared spec.
 *
 * @param [addr=''] ip address of thermostat
 */

function Tstat(addr) {
	var self = this;

	this.ipAddress = addr;

}

Tstat.prototype.tstat = function() {
	return this._httpGET('/tstat/')
}

Tstat.prototype.model = function() {
	return this._httpGET('/tstat/model')
}

Tstat.prototype.sys = function() {
	return this._httpGET('/sys/')
}

Tstat.prototype.name = function() {
	return this._httpGET('/sys/name/')
}

Tstat.prototype.datalog = function() {
	return this._httpGET('/tstat/datalog/')
}

Tstat.prototype.ttemp = function() {
	return this._httpGET('/tstat/ttemp/')
}

Tstat.prototype._httpGET=function(cmd) {
	var options = {host:this.ipAddress, path:cmd};

	var deferred = Q.defer();
	request.get("http://"+this.ipAddress+cmd,function (error, response, body) {
		if (!error && response.statusCode == 200)
			deferred.resolve(JSON.parse(body));
		else
			deferred.reject(new Error(error));
	})
	return deferred.promise;
}

module.exports = Tstat;