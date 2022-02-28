const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printPassTimes } = require('./index');

nextISSTimesForMyLocation()
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });