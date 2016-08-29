var http = require("http");

api_key = "wVMMkF2kiEKK7FF9TMONYA";  // sams key


url2 = "http://realtime.mbta.com/developer/api/v2/stopsbylocation?api_key=" + api_key + "&lat=42.346961&lon=-71.076640&format=json";

line_name = "77";


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
        route = data.stop[2];

  console.log(route);

    }); 
}); 
