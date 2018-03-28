const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js')

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

// send one input, one output callback (the error message or result property)
geocode.geocodeAddress(argv.address, (errorMessage, location) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    weather.getWeather(location.latitude, location.longtitude, (errorMessage, temperature) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${temperature.temperature}°F at ${location.address}, and it feels like ${temperature.apparentTemperature}°F outside.`);
      }
    });
  }
});
