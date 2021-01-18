const request = require("request");

const GeocodeLocation = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoidmlja3RvcjYxIiwiYSI6ImNranN2dzR4ejNzdmIyc3FvMzRqMDdlbGIifQ.61EC0WZOipwX-KLdsunBNA&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the internet", undefined);
    } else if (body.features.length === 0) {
      callback("unable to get location. search something else", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

const forecast = (latitude, longitude, callback) => {
  const WeatherUrl = `http://api.weatherstack.com/current?access_key=7d710f77035be92bf5bea88c9b141f95&query=${latitude}, ${longitude}`;

  request({ url: WeatherUrl, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the internet", undefined);
    } else if (body.error) {
      callback(
        "Please specify a valid location identifier using the query parameter"
      );
    } else {
      const {
        temperature,
        feelslike,
        weather_descriptions,
        humidity,
        precip,
      } = body.current;
      callback(
        undefined,
        `The weather is ${weather_descriptions} and it is currently ${temperature} degrees outside but feels like ${feelslike} degrees. 
        Precipitation is ${precip} and the humidity is ${humidity} degrees.`
      );
    }
  });
};

module.exports = {
  GeocodeLocation: GeocodeLocation,
  forecast: forecast,
};
