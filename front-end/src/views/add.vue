<template>
<div>
  <h1 class = "heading">Add a Pokemon to the Database!</h1>
  <div class = "headingh2">
  </div>
  <div class="add">
    <div class="form">
      <input v-model="name" placeholder="Name of Pokemon">
      <p></p>
      <br>
      <input v-model = "Type1" list="Type1" placeholder = "Type 1">
      <datalist id="Type1">
        <option value="Normal"> Normal </option>
        <option value="Fire"> Fire </option>
        <option value="Water"> Water </option>
        <option value="Electric"> Electric </option>
        <option value="Grass"> Grass </option>
        <option value="Ice"> Ice </option>
        <option value="Fighting"> Fighting </option>
        <option value="Poison"> Poison </option>
        <option value="Ground"> Ground </option>
        <option value="Flying"> Flying </option>
        <option value="Psychic"> Psychic </option>
        <option value="Bug"> Bug </option>
        <option value="Rock"> Rock </option>
        <option value="Ghost"> Ghost </option>
        <option value="Dragon"> Dragon </option>
        <option value="Dark"> Dark </option>
        <option value="Steel"> Steel </option>
        <option value="Fairy"> Fairy </option>
      </datalist>
      <input v-model = "Type2" list="Type2" placeholder = "Type 2"> 
      <datalist id="Type2">
        <option value="None"> None </option>
        <option value="Normal"> Normal </option>
        <option value="Fire"> Fire </option>
        <option value="Water"> Water </option>
        <option value="Electric"> Electric </option>
        <option value="Grass"> Grass </option>
        <option value="Ice"> Ice </option>
        <option value="Fighting"> Fighting </option>
        <option value="Poison"> Poison </option>
        <option value="Ground"> Ground </option>
        <option value="Flying"> Flying </option>
        <option value="Psychic"> Psychic </option>
        <option value="Bug"> Bug </option>
        <option value="Rock"> Rock </option>
        <option value="Ghost"> Ghost </option>
        <option value="Dragon"> Dragon </option>
        <option value="Dark"> Dark </option>
        <option value="Steel"> Steel </option>
        <option value="Fairy"> Fairy </option>
      </datalist>
      <p></p>
      <br>
      <input v-model="weblink" placeholder="Web link to image">
      <br> <br>
      <button @click="upload">Upload</button>
    </div>
    <div class="upload" v-if="addItem">
      <h2>{{addItem.name}}</h2>
      <img :src="addItem.weblink" />
      <p>{{addItem.Type1}}</p>
      <p>{{addItem.Type2}}</p>
    </div>
  </div>
</div>
</template>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  justify-content: center;
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

headingh2 {
  padding-left: 100px;
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  padding-left: 100px;
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}
</style>



<script>
import axios from 'axios';
export default {
  name: 'Add',
  data() {
    return {
      name: "",
      Type1: "",
      Type2: "",
      weblink: "",
      addItem: null,
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        let r2 = await axios.post('/api/pokemons', {
          name: this.name,
          Type1: this.Type1,
          Type2: this.Type2,
          weblink: this.weblink,
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>
