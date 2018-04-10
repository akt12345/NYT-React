const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://heroku_7h725jnv:oih54c2p3idfaafibhpg9qgsl1@ds241059.mlab.com:41059/heroku_7h725jnv'

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
