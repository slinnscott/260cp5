<template>
<div class = "remove">
  <div class="heading">
    <h2>Edit a Pokemon</h2>
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
    <br><br><br>
      <h3> Change Name </h3>
      <input v-model="findPokemon.name">
      <br><br>
      <h3> Change Image Address </h3>
      <input v-model="findPokemon.weblink">
      <br>
      <img :src="findPokemon.weblink" />
      <br><br>
      <h3> Change Type1 </h3>
      <input v-model="findPokemon.Type1">
      <br><br><br>
      <h3> Change Type2 </h3>
      <input v-model="findPokemon.Type2">
    </div>
    <div class="actions" v-if="findPokemon">
      <button @click="editItem(findPokemon)">Edit</button>
    </div>
  </div>
</div>
</template>

<style>

<style>
.heading{
  text-align: center;
}

.application{
  padding-left: 5em;
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
    },
    user() {
      return this.$root.$data.user;
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
    async editItem(pokemon) {
      try {
        await axios.put("/api/pokemons/" + pokemon._id, {
          name: this.findPokemon.name,
          Type1: this.findPokemon.Type1,
          Type2: this.findPokemon.Type2,
          weblink: this.findPokemon.weblink,
        });
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
