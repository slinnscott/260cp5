const express = require("express");
const mongoose = require('mongoose');
const argon2 = require("argon2");
const router = express.Router();
const users = require("./users.js");


const User = users.model;
const validUser = users.valid;

const pokemonSchema = new mongoose.Schema({
  name: String,
  Type1: String,
  Type2: String,
  weblink: String,
});

const Item = mongoose.model('Pokemon', pokemonSchema);


router.post('/', validUser, async (req, res) => {
  const pokemon = new Item({
    name: req.body.name,
    Type1: req.body.Type1,
    Type2: req.body.Type2,
    weblink: req.body.weblink,
  });
  try {
    if (req.user.role !== "admin") {
        throw "Must be admin to delete pokemon";
    }
    await pokemon.save();
    res.send(pokemon);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put('/:id', validUser, async (req, res)=> {
  try {
    if (req.user.role !== "admin") {
        throw "Must be admin to delete pokemon";
    }
    pokemon = await Item.findOne({
      _id: req.params.id
    });
    pokemon.name = req.body.name,
    pokemon.weblink = req.body.weblink,
    pokemon.Type1 = req.body.Type1,
    pokemon.Type2 = req.body.Type2,
    await pokemon.save();
    return res.send({
      pokemon: pokemon
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
router.get('/', async (req, res) => {
  try {
    let pokemons = await Item.find();
    res.send(pokemons);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete('/:id', validUser, async(req, res) => {
  try{
    if (req.user.role !== "admin") {
        throw "Must be admin to delete pokemon";
      }
    let boolean = await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch(error){
    console.log(error);
    res.sendStatus(500);
  }

});

module.exports = {
  routes: router,
  model: Item,
};
