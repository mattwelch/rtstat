var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var tstat = require("../lib/tstat.js"),client=new tstat('x');
var sinon = require("sinon");
var request = require("request");

var expect=chai.expect;
chai.use(chaiAsPromised);
describe("Tstat", function(){
   describe(".sys()", function() {
		before(function(done){
			sinon
				.stub(request, 'get')
				.yields(null,{statusCode:200},'{"uuid":"testuuid","api_version":113,"fw_version":"1.04.84","wlan_fw_version":"v10.105576"}');
			done();
		});

		after(function(done){
			request.get.restore();
			done();
		});

       it("should return thermostat sys info", function(){
       		var sysPromise=client.sys();
           return expect(sysPromise).to.eventually.have.property("uuid");
       });
   });
});
