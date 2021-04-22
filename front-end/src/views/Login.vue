<template>
<div>
  <HomePage v-if="user" />
  <LoginPage v-else />
</div>

</template>


<script>
import axios from 'axios'
import LoginPage from '../components/loginPage.vue'
import HomePage from './Home.vue'
export default {
  name: 'Login',
  components: {
    LoginPage,
    HomePage
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>
