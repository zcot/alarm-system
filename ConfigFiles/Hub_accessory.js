// HomeKit types required
var fs = require('fs');
var types = require("./types.js")
var exports = module.exports = {};

var exec = require('child_process').exec;

var execute = function(accessory,characteristic,value){ 
    console.log("executed accessory: " + accessory + ", and characteristic: " + characteristic + ", with value: " +  value + "."); 
}

exports.accessory = {
  displayName: "Hub",
  username: "1A:2B:3C:4D:5E:FE",
  pincode: "031-45-154",
  services: [{
    sType: types.ACCESSORY_INFORMATION_STYPE, 
    characteristics: [{
        cType: types.NAME_CTYPE, 
        onUpdate: null,
        perms: ["pr"],
        format: "string",
        initialValue: "Hub",
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "Bla",
        designedMaxLength: 255    
    },{
        cType: types.MANUFACTURER_CTYPE, 
        onUpdate: null,
        perms: ["pr"],
        format: "string",
        initialValue: "oddwires.co.uk",
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "Bla",
        designedMaxLength: 255    
    },{
        cType: types.MODEL_CTYPE,
        onUpdate: null,
        perms: ["pr"],
        format: "string",
        initialValue: "Rev-1",
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "Bla",
        designedMaxLength: 255    
    },{
        cType: types.SERIAL_NUMBER_CTYPE, 
        onUpdate: null,
        perms: ["pr"],
        format: "string",
        initialValue: "A1S2NASF88EW",
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "Bla",
        designedMaxLength: 255    
    },{
        cType: types.IDENTIFY_CTYPE, 
        onUpdate: null,
        perms: ["pw"],
        format: "bool",
        initialValue: false,
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "Identify Accessory",
        designedMaxLength: 1    
    }]
  },{
    sType: types.OUTLET_STYPE, 
    characteristics: [{
        cType: types.NAME_CTYPE,
        onUpdate: null,
        perms: ["pr"],
        format: "string",
        initialValue: "Hub Service",
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "Bla",
        designedMaxLength: 255   
    },{
        cType: types.POWER_STATE_CTYPE,
		onUpdate: function(value)
	 { 
    		console.log("Change:",value);
    		if (value) {
                         fs.writeFile("/var/www/data/input.txt", ":192.168.1.7:rcon swtch:7:on\n", function(err) {
                         if(err) {
                                 return console.log(err);
                                 }
                         console.log("On Success");
                        }); 
    		} else {
                         fs.writeFile("/var/www/data/input.txt", ":192.168.1.7:rcon swtch:7:off\n", function(err) {
                         if(err) {
                                 return console.log(err);
                                 }
                         console.log("Off Success");
    			});
    		}
    	},
        perms: ["pw","pr","ev"],
        format: "bool",
        initialValue: false,
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "Turn On the Light",
        designedMaxLength: 1    
    },{
        cType: types.OUTLET_IN_USE_CTYPE,
        onUpdate: function(value) { console.log("Change:",value); execute("Test Accessory 1", "light service", value); },
        perms: ["pr","ev"],
        format: "bool",
        initialValue: false,
        supportEvents: false,
        supportBonjour: false,
        manfDescription: "Turn On the Light",
        designedMaxLength: 1    
    }]
  }]
}