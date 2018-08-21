const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const users = require('./routes/api/users');
const profiles = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const https = require('https');
const fs = require('fs');

const read = fs.readFileSync;

const app = express();

// require('dotenv').config();

// CORS middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://devalpha.surge.sh',
  'https://devalpha.surge.sh',
  'http://www.devalpha.surge.sh',
  'https://www.devalpha.surge.sh',
];
app.use(
  cors({
    origin: function(origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  }),
);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true },
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profiles);
app.use('/api/posts', posts);

// HTTPS server
let certificate = read('./server.crt', 'utf8');
let chainLines = read('./domain_ca.crt', 'utf8').split('\n');
let cert = [];
let ca = [];
chainLines.forEach(function(line) {
  cert.push(line);
  if (line.match(/-END CERTIFICATE-/)) {
    ca.push(cert.join('\n'));
    cert = [];
  }
});

let httpsOptions = {
  key: read('./server.key'),
  cert: certificate,
  ca: ca,
};
if (process.env.NODE_ENV === 'production') {
  try {
    secServer = https.createServer(httpsOptions, app);
    secServer.listen(443);
  } catch (err) {
    console.log('https could not be served');
  }
}

// HTTP server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
