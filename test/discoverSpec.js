var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var tstat = require("../lib/discover.js"),client=new tstat('x');
var sinon = require("sinon");
var request = require("request");

var expect=chai.expect;
chai.use(chaiAsPromised);

describe("Discover", function(){
// Sooooo, now what. Still exploring how to stub out test dgram sockets
});
