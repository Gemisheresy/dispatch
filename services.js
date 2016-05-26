//apiKey is left out for security reasons. Please make one on developers.google.com to use and make file and add it there
//some day the plan is to make use of OAuth


const request = require('request');
const apiKey = require(__dirname + '/apikey.js').apiKey;
const platform = require(__dirname + '/oswork.js');
const rp = require('request-promise')

const logErr = function(err){
    console.log(err)
}
// Function that gets the address from Google's response
const getAddress = function(err,res,body){
    if (err) {logErr(err)}
    let data = JSON.parse(body);
    console.log(data.results[0].formatted_address);
}
//Function for Browser usage. I used express's body-parser middlewear to get the location data.
const getLocation = function(req,res,next){
    request(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.location.lat},${req.body.location.long}&key=${apiKey}`,getAddress);
    next();
};
//Function that gets devices macaddress and then requests from Google. Using macaddress returns long and lat have to send
//back to in request to convert to actuall address.
//Note note as accurate as Browser
const getLocationMacAddress =function() {
    let options = {
        method: "POST",
        url: `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`,
        body: {
            "wifiAccessPoints": [{"macAddress": platform.getMacAddress()}]
        },
        json: true
    };
    rp(options)
        .then((data) =>{
            request(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.location.lat},${data.location.lng}&key=${apiKey}`,getAddress)
        })

};
// Don't know how to retrive the cell tower information. Left it as an object to be passed in to solve the problem down
// the road.
const getLocationCellTower = function(cellTower) {
    let options = {
        method: "POST",
        url: `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`,
        body: {
            "cellTowers": [{
                "cellId": cellTower.cellId,
                "locationAreaCode": cellTower.locationAreaCode,
                "mobileCountryCode": cellTower.mobileCountryCode,
                "mobileNetworkCode": cellTower.mobileNetworkCode
            }]
        },
        json: true
    };
    rp(options)
        .then((data) =>{
            request(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.location.lat},${data.location.lng}&key=${apiKey}`,getAddress)
        })
};
exports.getLocation = getLocation;
exports.getLocationMacAddress = getLocationMacAddress;
exports.getLocationCellTower = getLocationCellTower;