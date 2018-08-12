const express = require('express');
const Issue = require('./models/issue');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/api');
const path = require('path');
const PORT = 3000;
const app = express();


// connect mongodb
mongoose.connect('mongodb://localhost:27017/issues');
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', () => {
    console.log(`Connected to DB=${db.name} on PORT=${db.port}`);
});

// middleware
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

// get routes from api.js
app.use('/api', routes);

// error middleware
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
      error: {
          message: error.message
      }
  });
});


// start server
app.listen(PORT, () => {
  console.log("Server running on localhost:" + PORT);
});