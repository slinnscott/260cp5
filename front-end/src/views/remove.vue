<template>
<div class = "remove">
  <div class="heading">
    <h2>Delete a Pokemon</h2>
  </div>
  <div class="application">
    <div class="form">
      <input v-model="findName" placeholder="Search">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectPokemon(s)">
        {{s.name}}
        </div>
      </div>
    </div>
    <div class="upload" v-if="findPokemon">
      <h2>{{findPokemon.name}} </h2>
      <img :src="findPokemon.weblink" />
      <p> {{findPokemon.Type1}} </p>
      <p> {{findPokemon.Type2}} </p>
    </div>
    <div class="actions" v-if="findPokemon">
      <button @click="deleteItem(findPokemon)">Delete</button>
    </div>
  </div>
  <br><br><br><br><br><br><br><br>
</div>

</template>

<style>
.heading{
  text-align: center;
}

.application{
  padding-left: 50px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>



<script>
import axios from 'axios';
export default {
  name: 'Remove',
  data() {
    return {
      name: "",
      Type1: "",
      Type2: "",
      weblink: "",
      addPokemon: null,
      findName: "",
      findPokemon: null,
      pokemons: [],
    }
  },
  computed: {
    suggestions() {
      let pokemons = this.pokemons.filter(pokemon => pokemon.name.toLowerCase().startsWith(this.findName.toLowerCase()));
      return pokemons.sort((a, b) => a.name > b.name);
    }
  },
  created() {
    this.getPokemons();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    selectPokemon(pokemon) {
      this.findName = "";
      this.findPokemon = pokemon;
    },
    async upload() {
      try {
        let r2 = await axios.post('/api/pokemons', {
          name: this.name,
          Type1: this.Type1,
          Type2: this.Type2,
          weblink: this.weblink,
        });
        this.addPokemon = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getPokemons() {
      try {
        let response = await axios.get("/api/pokemons");
        this.pokemons = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(pokemon) {
      try {
        await axios.delete("/api/pokemons/" + pokemon._id);
        this.findPokemon = null;
        this.getPokemons();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>
