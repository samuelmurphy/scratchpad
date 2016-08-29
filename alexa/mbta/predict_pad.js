var http = require("http");

var fs, key_File;   //pull in key
key_File = 'sams_key';
fs = require('fs');
var key = JSON.parse(
    fs.readFileSync(key_File)
);


//url2 = "http://realtime.mbta.com/developer/api/v2/stopsbylocation?api_key=" + key.sams_mbta_key + "&lat=42.346961&lon=-71.076640&format=json";
/*


http://realtime.mbta.com/developer/api/v2/schedulebyroutes?api_key=wVMMkF2kiEKK7FF9TMONYA&routes=77&format=json


*/
line_name = "77";
stop = "2269";

url2 = "http://realtime.mbta.com/developer/api/v2/predictionsbystop?api_key=" + key.sams_mbta_key + "&stop=" + stop + "&format=json";

console.log(url2);
console.log("=================\n");

var request = http.get(url2, function (response) {
    var buffer = "", 
        data,
        route;

    response.on("data", function (chunk) {
        buffer += chunk;
    }); 

    response.on("end", function (err) {
        console.log(buffer);
        console.log("\n");

        data = JSON.parse(buffer);
        dd = data.mode[0].route[0].direction[0].trip.length;
	
	arriving_busses = data.mode[0].route[0].direction[0].trip;
	arlen = data.mode[0].route[0].direction[0].trip.length;

	for(i=0;i<arlen;i++){
	    tid =  arriving_busses[i].trip_id;
	    ttim =  arriving_busses[i].sch_arr_dt;
	    dt = new Date(ttim * 1000);
	    est = arriving_busses[i].pre_away /60;

	    console.log(tid + "  " + ttim + "      " + dt + "  ****** " + est);
	}

    }); 
}); 
