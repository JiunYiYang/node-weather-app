const yargs = require('yargs');
const axios = require('axios');

// make address as a command
const argv =  yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address for fetching location',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodeAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`;

// rewrite with axios that automatically return json data and new Promise
axios.get(geocodeUrl).then((response) => {
    // customize msg for diff result
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Cannot find that address.');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/8d0dd706f81e686458bcc5b230eced35/${lat},${lng}`
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
  }).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}°F, and it feels like ${apparentTemperature}°F outside.`);
  }).catch((e) => {
    // customize msg for diff errors
    if (e.code === 'ENOTFOUND') {
      console.log('Cannot connect to Google server.');
    } else {
      console.log(e.message);
    }
  });
