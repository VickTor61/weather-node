const path = require("path");

const express = require("express");

const app = express();

const hbs = require("hbs");
const { GeocodeLocation, forecast } = require("./utils/api");

const publicDirectoryPath = path.join(__dirname, "../public");

const Viewspath = path.join(__dirname, "../templates/views");

const partialPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", Viewspath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    content: "Use this app to know your weather",
    name: "victor",
  });
});

app.get("/about", (req, res) => {
  res.render("index", {
    title: " About page",
    content: "what you need to know about me",
    name: "victor",
  });
});

app.get("/help", (req, res) => {
  res.render("index", {
    title: "Help page",
    content: "help texts",
    name: "victor",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Unable to find location. Try another search",
    });
  }

  GeocodeLocation(
    req.query.search,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send(error);
        }

        return res.send({
          Data: forecastData,
          Location: location,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help Article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page is Not found",
  });
});

app.listen(3000, () => {
  console.log("app listening on port " + 3000);
});
