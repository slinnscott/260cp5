const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


// connect to the database
mongoose.connect('mongodb://localhost:27017/pokemondb', {
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: ['secretValue'],
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));


const pokemon = require("./pokemon.js");
app.use("/api/pokemons", pokemon.routes);

// import the users module and setup its API path
const users = require("./users.js");
app.use("/api/users", users.routes);

// import the tickets module and setup its API path
const teams = require("./team.js");
app.use("/api/teams", teams.routes);



// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
