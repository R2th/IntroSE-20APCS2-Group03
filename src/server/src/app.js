const express = require('express');
const bodyparser = require('body-parser');
// const formidable = require("express-formidable");
const http = require('http');
const app = express();

const cors = require('cors');
const helmet = require('helmet');
const compress = require('compression');
const expressLayouts = require('express-ejs-layouts');

app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(compress());
app.use(expressLayouts);
app.set('view engine', 'ejs');

const allowedOrigins = [
  `http://${process.env.SERVER_IP}:3000`,
  'http://localhost:3000',
  'https://bytes-go.vercel.app',
];

app.use(
    cors({
      origin(origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg = 'The CORS policy for this site (' + origin + ') does not ' +
          'allow access from the specified Origin.';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
    }),
);

app.use(express.json());

app.use(bodyparser.urlencoded({extended: false}));

app.use(require('./routes/admin/content.route'));

app.use(require('./routes/default/auth.route'));

app.use(require('./routes/default/content.route'));

app.use(require('./routes/user/user.route'));

app.use(require('./routes/story/story.route'));

app.use(require('./routes/comment/comment.route'));

app.use(require('./routes/search/search.route'));

app.use(require('./routes/collection/collection.route'));

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

// eslint-disable-next-line
app.use((req, res, next) => {
  res.status(404).send('Sorry can\'t find that!');
});

module.exports = new http.Server(app);
