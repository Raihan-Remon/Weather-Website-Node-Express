const request = require("postman-request");

const forecast = (lattitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=afd42fecf95e66ea0c3d566ae311dd94&query=${lattitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service server", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}.
         It is currently ${body.current.temperature} degrees out. But it feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}%`
      );
    }
  });
};

module.exports = forecast;
