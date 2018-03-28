const request = require('request');

var getWeather = ((lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/8d0dd706f81e686458bcc5b230eced35/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Cannot fetch current temperature.');
    }
  });
});


module.exports = {
  getWeather
};
