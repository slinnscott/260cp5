const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const users = require("./users.js");
const pokemon = require("./pokemon.js")

//
// Tickets
//
const Pokemon = pokemon.model;
const User = users.model;
const validUser = users.valid;


// This is the schema for a ticket
const teamSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  name: String,
  pokemon:{
    type: Array, "Pokemon" : [],
    ref: "Pokemon"
  }
});

const Team = mongoose.model('Team', teamSchema);

// get tickets -- will list tickets that a user has submitted
router.get('/', validUser, async (req, res) => {
  let teams = [];
  try {
    if (req.user.role === "admin") {
      teams = await Team.find().sort({
        created: -1
      });
    } else {
      teams = await Team.find({
        user: req.user
      }).sort({
        created: -1
      });
    }
    return res.send({
      teams: teams
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// create a team
router.post('/', validUser, async (req, res) => {
  if (!req.user) {
    return res.status(400).send({
      message: "Must be logged in to continue"
    });
  }
  const team = new Team({
    user: req.user,
    name: req.body.name,
    pokemon: req.body.pokemon
  });
  try {
    await team.save();
    return res.send({
      team: team
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// edit a team
router.put('/:id', validUser, async (req, res) => {
  // can only do this if a user
  if (!req.user) {
    return res.status(400).send({
      message: "Must be logged in to continue"
    });
  }
  try {
    team = await Team.findOne({
      _id: req.params.id
    });
    team.name = req.body.name,
    team.pokemon = req.body.pokemon,
    await team.save();
    return res.send({
      team: team
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});


router.delete('/:id', validUser, async(req, res) => {
  try{
    if (!req.user) {
        throw "Must be user to delete teams";
      }
    let boolean = await Team.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch(error){
    console.log(error);
    res.sendStatus(500);
  }

});


module.exports = {
  routes: router
}
