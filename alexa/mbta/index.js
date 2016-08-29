'use strict';
var Alexa = require('alexa-sdk');
var parseString = require('xml2js').parseString;
var http = require("http");

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'MBTA Schedule';


function get_stop_name(){
    var  url2 = "http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=mbta&r=77";

    var request = http.get(url2, function (response) {
	var buffer = "",  data, route;
	response.on("data", function (chunk) {
            buffer += chunk;
	}); 
	
	response.on("end", function (err) {
	    parseString(buffer, { explicitArray : true }, function (err, result) {
		extractedData = result.body.$.copyright;
		//return(extractedData);
		this.emit('tell:', extractedData);
	    });
	}); 
    }); 
}

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
	var station = "";
	var station = get_stop_name();
        var speechOutput = "Your station is: " + station;
	var randomFact = "woo woo woo";
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can find your station, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};
