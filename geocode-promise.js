const request = require('request');
const weather = require('./weather/weather.js');

var geocodeAddress = ((address) => {
  return new Promise((resolve, reject) => {
    var encodeAddress = encodeURIComponent(address);

    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        // callback the first message which is errorMessage
        reject('Cannot connect to Google server.');
      } else if (body.status === 'ZERO_RESULTS') {
        // callback the first message which is errorMessage
        reject('Cannot find that address.');
      } else if (body.status === 'OK') {
        // callback the second message which is results
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longtitude: body.results[0].geometry.location.lng
        });
      } else {

      }
    });
  });
});

geocodeAddress('82').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
  // return getWeather(location.latitude, location.longtitude)
}, (errorMessage) => {
  console.log(errorMessage);
});

// module.exports = {
//   geocodeAddress
// }
