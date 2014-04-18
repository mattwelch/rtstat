'use strict'

var dgram = require('dgram'),
    Q = require('q');

/**
 * @returns {Discover}
 * @constructor
 */
var Discover=function() {
  var addresses=[];
  var socket = dgram.createSocket('udp4')

  var deferred = Q.defer();

  socket.on('error', function (err) {
    deferred.reject(new Error(err));
  })

  socket.on('message', function onMessage(msg, rinfo) {
	 addresses.push(rinfo.address);
  })

  socket.on('listening', function onListening() {
// When we're ready to start listening, let's add ourselves to the multicast "channel", so we can
// hear the response our thermos might send out
    socket.addMembership('239.255.255.250')
    socket.setMulticastTTL(1)
  	setTimeout(function(){
  		socket.close();
  		deferred.resolve(addresses);
  	},2000);
  })

// Send out a message to the multicast ip address... Anyone out there will respond and our listeners above
// will hear
  var message = new Buffer('TYPE: WM-DISCOVER\r\nVERSION: 1.0\r\n\r\nservices: com.marvell.wm.system*\r\n\r\n')
  socket.send(message, 0, message.length, 1900, '239.255.255.250', function (err, bytes) {
  })

  return deferred.promise;
}

module.exports = Discover;
