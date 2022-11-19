const express = require("express");
// const formidable = require("express-formidable");
const app = express();

const cors = require("cors");
const helmet = require("helmet");
const compress = require("compression");
const expressLayouts = require("express-ejs-layouts");

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(compress());
app.use(expressLayouts);
app.set("view engine", "ejs");

const allowedOrigins = [
  `http://${process.env.SERVER_IP}:3000`,
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        console.log(msg);
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(require("./routes/admin/content.route"));

// Configure a middleware for 404s and the error handler
// app.use((req, res, next) => {
//   res.status(404);

//   // respond with html page
//   if (req.accepts("html")) {
//     res.render("404", { url: req.url });
//     return;
//   }

//   // respond with json
//   if (req.accepts("json")) {
//     res.json({ error: "Not found" });
//     return;
//   }

//   // default to plain-text. send()
//   res.type("txt").send("Not found");
// });

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

module.exports = app;
