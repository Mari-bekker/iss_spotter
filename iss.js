const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    //if nnon-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);

  });

};

// test URL : https://api.freegeoip.app/json/135.23.97.243?apikey=01530650-978d-11ec-846f-935168d3e162

const fetchCoordsByIP = function(ip, callback) {
  request(`https://api.freegeoip.app/json/${ip}?apikey=01530650-978d-11ec-846f-935168d3e162`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    //if nnon-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    }

    const lat = JSON.parse(body).latitude;
    const long = JSON.parse(body).longitude;
    const latLong = {
      latitude: lat,
      longitude: long
    };
    callback(null, latLong);
    
  });

};

const fetchISSFlyOverTimes = function(coords, callback) {
  // Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
  let coordLat = coords.latitude;
  let coordLong = coords.longitude;
  request(`https://iss-pass.herokuapp.com/json/?lat=${coordLat}&lon=${coordLong}`, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);

  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };

