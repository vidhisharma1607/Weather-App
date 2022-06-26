const path = require("path");
const express = require("express");
const hbs = require("hbs");
console.log(__dirname);
console.log(path.join(__dirname, "../public"));
const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");

const app = express();

const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "vidhi",
  });
});
app.use(express.static(publicDirPath));

// app.get("", (req, res) => {
//   res.send("<h1>Weather forecast</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "vidhi",
//       age: 19,
//     },
//     {
//       name: "sharma",
//       age: 19,
//     },
//   ]);
// });

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "vidhi Sharma",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    subHeading: "Error occured",
    desc: "No internet connection",
    title: "HelpDesk",
    name: "vidhi Sharma",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "help article not found",
    title: "HelpDesk Error",
    name: "vidhi Sharma",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    error: "error 404 occured",
    title: " Error",
    name: "vidhi Sharma",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000.");
});
