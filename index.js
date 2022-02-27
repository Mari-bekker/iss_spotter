const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! the returned IP:" , ip);
});

// fetchCoordsByIP((ip) => {
//   console.log(error);
//   console.log(data);

// })