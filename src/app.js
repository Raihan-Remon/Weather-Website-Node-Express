const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Raihan Remon",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Raihan Remon",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help App",
    helpMessage: "This is some helpful text",
    name: "Raihan Remon",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { lattitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(lattitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        return res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Raihan Remon",
    errorMessage: "Help Article Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Raihan Remon",
    errorMessage: "Page Not Found",
  });
});

app.listen(3000, () => {
  console.log("Server started at port no 3000");
});
