const axios = require("axios");

async function getCoordinates(location) {
  const url = `https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`;

  const response = await axios.get(url, {
    headers: { "User-Agent": "tripnest-app" },
  });

  const data = response.data[0];

  return {
    lat: data.lat,
    lng: data.lon,
  };
}



module.exports = getCoordinates;

