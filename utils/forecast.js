const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=de36944f1f5e0ecd7c771c5824564b39&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Weather api is not working properly!👎", undefined);
    } else if (body.error) {
      callback("Enter valid location credentials🕵️‍♀️", undefined);
    } else {
      callback(
        undefined,

        "It is " +
          body.current.weather_descriptions[0] +
          " degrees outside, it is currently " +
          body.current.temperature +
          " , but feels like " +
          body.current.feelslike +
          "😉"
      );
    }
  });
};
module.exports = forecast;
