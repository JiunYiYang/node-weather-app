const request = require('request');

var geocodeAddress = ((address, callback) => {
  var encodeAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      // callback the first message which is errorMessage
      callback('Cannot connect to Google server.');
    } else if (body.status === 'ZERO_RESULTS') {
      // callback the first message which is errorMessage
      callback('Cannot find that address.');
    } else if (body.status === 'OK') {
      // callback the second message which is results
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longtitude: body.results[0].geometry.location.lng
      });
    } else {

    }
  });
});

module.exports = {
  geocodeAddress
}
