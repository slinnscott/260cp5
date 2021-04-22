<template>
<div class="home">
  <div v-if="user" class = "addToTeam">
    <h2> Create a team </h2>
    <div class="form">
      <p v-if="error">{{error}} </p>
      <input v-model="findName" placeholder="Search Pokemon to Add">
      <div class="suggestions" v-if="suggestions.length > 0 && findName.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectPokemon(s)">
        {{s.name}}
        </div>
      </div>
      <div v-if="thisTeamMember" class = "addToTeamApp">
        <h2>{{thisTeamMember.name}} </h2>
        <img :src="thisTeamMember.weblink" />
        <p> {{thisTeamMember.Type1}} </p>
        <p> {{thisTeamMember.Type2}} </p>
        <button @click="addToTeam(thisTeamMember)"> Add to team </button>
      </div>
    </div>
    <div class="pokemonInTeam">
      <input v-model="teamName" placeholder="Team Name">
      <button @click = "addTeam"> Save Team </button>
      <section class="grid-container">
        <div class = "infoCardList">
          <div class = "infoCard" v-for="pokemon in potentialTeam" :key="pokemon.id">
            <img :src="pokemon.weblink" class = "infocard-lg-img"/>
            <div class = "infocard-lg-data">
              <h3>{{pokemon.name}} </h3>
              <p> {{pokemon.Type1}} </p>
              <p> {{pokemon.Type2}} </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  <h1 class = "titleOfPage"> Pokedex </h1>
  <section class="grid-container">
    <div class = "infoCardList">
        <div v-for="pokemon in pokemons" :key="pokemon.id">
          <div class = "infoCard">
            <h2>{{pokemon.name}}</h2>
            <img :src="pokemon.weblink" />
            <p>{{pokemon.Type1}}</p>
            <p>{{pokemon.Type2}}</p>
          </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
     findName: "",
     potentialTeam: [],
     thisTeamMember: null,
     pokemons: [],
     teamName: "",
     error: "",
    }
  },
  created() {
    this.getPokemons();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
    suggestions() {
      let pokemons = this.pokemons.filter(pokemon => pokemon.name.toLowerCase().startsWith(this.findName.toLowerCase()));
      return pokemons.sort((a, b) => a.name > b.name);
    }
  },
  methods: {
    async getPokemons() {
      try {
        let response = await axios.get("/api/pokemons");
        this.pokemons = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectPokemon(pokemon) {
      this.findName = "";
      this.thisTeamMember = pokemon;
    },
    addToTeam(pokemon){
      try{
        if(this.potentialTeam.length < 6){
          this.potentialTeam.push(pokemon);
          this.thisTeamMember = null;
        }
        else{
          this.thisTeamMember = null;
          throw "You can only have six Pokemon on your team";
        }
      }catch(error){
        console.log(this.potentialTeam.length)
        console.log(error);
      }
    },
    async addTeam() {
      try {
        if(!this.teamName){
          throw "Must have team name";
        }
        if(this.potentialTeam.length === 0){
          throw "Must have at least one pokemon"
        }
        await axios.post("/api/teams", {
          user: this.user,
          name: this.teamName,
          pokemon: this.potentialTeam,
        });
        this.potentialTeam = [];
        return true;
      } catch (error) {
        this.error = error;
        console.log(error);
      }
    },
  }
}
</script>


<style scoped>


.addToTeam{
  padding-left: 50px;
}


.image h2 {

}

.titleOfPage{
  text-align: center;
}

.grid-container{
  margin: 0 auto;
  max-width: 1440px;
  margin-top: 2rem;
  padding: 1.5rem 2rem;
}

.infoCard{
    display: inline-block;
    padding: 0.75rem 2rem;
    line-height: 1;
    text-align: center;
    width: auto;
}

.infoCardList{
  text-align: center;
  display: grid;
  grid-gap: 2rem .75rem;
  width: auto;
  margin-bottom: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(150px, 200px));
}

.infocard-lg-img{
  display: block;
}

.infocard-lg-data{
  display: block;
}

.offsetTop{

}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>
