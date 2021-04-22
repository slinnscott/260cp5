<template>
<div>
  <div class="main">
    <h1 class = "titleOfPage" v-if= "user && user.role === 'admin'">All Teams</h1>
    <h1 v-else class = "titleOfPage">My Teams</h1>
  </div>
  <div class = "application">
    <input v-model="findName" placeholder="Search name to delete">
    <div class="suggestions" v-if="suggestions.length > 0">
      <div class="suggestion" v-show="findName" v-for="s in suggestions" :key="s.id" @click="selectTeam(s)">
      {{s.name}}
      </div>
    </div>
  </div>
  <div class="actions" v-if="findTeam">
    <button @click="deleteTeam(findTeam)">Delete</button>
  </div>
  <p v-if="update"> Please Refresh to view changes </p>
  <div class = "grid-container">
    <div  v-for="thisteam in teams" :key="thisteam._id + 'team'">
      <h2 v-if= "user && user.role === 'admin'">{{thisteam.user.name}} </h2>
      <h2 v-if = "thisteam.name">{{thisteam.name}}</h2>
      <div class = "infoCardList">
        <div class = "infoCard" v-for="thisPokemon in thisteam.pokemon" :key="thisPokemon._id + 'pokemon'">
          <img :src="thisPokemon.weblink" />
          <h2>{{thisPokemon.name}}</h2>
          <p>{{thisPokemon.Type1}}</p>
          <p>{{thisPokemon.Type2}}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'Teams',
  data() {
    return {
      teams: [],
      findName: "",
      theseTeams: [],
      findTeam: "",
      update: false,
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
    suggestions() {
      let theseTeams = this.teams.filter(teams => teams.name.toLowerCase().startsWith(this.findName.toLowerCase()));
      return theseTeams.sort((a, b) => a.name > b.name);
    },
  },
  created() {
    this.getTeams();
  },
  methods:{
    async getTeams() {
      try {
        let response = await axios.get("/api/teams");
        this.teams = response.data.teams;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectTeam(team) {
      this.findTeam = team;
      this.findName = "";
    },
    async getPokemons(ID) {
      try {
        let response = await axios.get("/api/pokemons/" + ID);
        this.thisPokemon = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTeam(Team) {
      try {
        this.update = true;
        console.log("here");
        await axios.delete("/api/teams/" + Team._id);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>


<style scoped>
.application{
  padding-left: 2rem;
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



textarea {
  width: 100%;
  max-width: 500px;
}

h3 {
  font-size: 12px;
  font-weight: normal;
  background-color: #ccc;
  padding: 10px 20px;
}


label {
  background-color: #000;
  color: white;
  padding: 5px;
  border-radius: 30px;
  font-size: 12px;
  margin-right: 10px;
}

.ticket {}
</style>
