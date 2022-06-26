const request = require("request");
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic2hpdmFtLW1ibSIsImEiOiJjbDE2NmJkc2YxNWozM2lzNnV4eHVhcW15In0.kjUXoGWe3rH54K__OakQ_Q&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Geocoding api not working properly!😪", undefined);
    } else if (body.features.length === 0) {
      callback("Enter valid location credentials!🦹‍♀️", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};
module.exports = geocode;
