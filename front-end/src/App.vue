<template>
<html>
  <div id="app">
    <div class="navbar navbar-expand-md navbar-dark bg-dark mb-4" role="navigation">
      <a class="navbar-brand" href="#">Pokemon Database</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                  <router-link to="/" class = "nav-link">Home</router-link>
              </li>
              <li class="nav-item">
                  <router-link v-if="user && user.role === 'admin'" to="/teams" class = "nav-link">All Teams</router-link>
                  <router-link v-else-if = "user" to="/teams" class = "nav-link">Your Teams</router-link>
              </li>
              <li v-if="user && user.role === 'admin'" class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" id="dropdown2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Edit Database</a>
                  <ul class="dropdown-menu" aria-labelledby="dropdown2">
                      <li class="dropdown-item"><router-link class = "dropdown-item" to="/add">Add</router-link></li>
                      <li class="dropdown-item"><router-link class = "dropdown-item" to="/remove">Remove</router-link></li>
                      <li class="dropdown-item"><router-link class = "dropdown-item" to="/edit">Edit</router-link></li>
                  </ul>
              </li>
          </ul>
          <div>

              <button v-if="user" @click = "logout" class="btn btn-outline-success my-2 my-sm-0" type="submit">Log Out</button>
              <button v-else class="btn btn-outline-success my-2 my-sm-0" type="submit"><router-link class = "login" to="/Login">Login</router-link> </button>

          </div>
      </div>
    </div>
  </div>

  <div class="content">
    <router-view />
  </div>

  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  <footer class="site-footer">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h6>About</h6>
          <p class="text-justify"> Here's a link to my Github for this assignment!</p>
          <a href = "https://github.com/slinnscott/260cp5"> GitHub</a>
        </div>
        <div class="col-xs-6 col-md-3">
        </div>
        <div class="col-xs-6 col-md-3">
          <h6>Quick Links</h6>
          <ul class="footer-links">
            <li><router-link to="/" class = "">Home</router-link></li>
            <li><router-link to="/teams" class = "">Teams</router-link></li>
            <li><router-link to="/explore" class = "">Explore</router-link></li>
          </ul>
        </div>
      </div>
      <hr>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-sm-6 col-xs-12">
          <p class="copyright-text">Copyright &copy; 2020 All Rights Reserved</p>
          <p class="copyright-text">I make liberal use of the educational copyright domain</p>
        </div>
      </div>
    </div>
  </footer>



</html>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.navbar .dropdown-toggle, .navbar .dropdown-menu a {
    cursor: pointer;
}

.navbar .dropdown-item.active, .navbar .dropdown-item:active {
    color: inherit;
    text-decoration: none;
    background-color: inherit;
}

.navbar .dropdown-item:focus, .navbar .dropdown-item:hover {
    color: #16181b;
    text-decoration: none;
    background-color: #f8f9fa;
}

.login{
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.login:hover{
  color: #16181b;
  text-decoration: none;
}

.offsetTop{

}

@media (min-width: 767px) {
    .navbar .dropdown-toggle:not(.nav-link)::after {
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: .5em;
        vertical-align: 0;
        border-bottom: .3em solid transparent;
        border-top: .3em solid transparent;
        border-left: .3em solid;
    }
}

/* Footer */
.site-footer
{
  background-color:#26272b;
  padding:45px 0 20px;
  font-size:15px;
  line-height:24px;
  color:#737373;
}
.site-footer hr
{
  border-top-color:#bbb;
  opacity:0.5
}
.site-footer hr.small
{
  margin:20px 0
}
.site-footer h6
{
  color:#fff;
  font-size:16px;
  text-transform:uppercase;
  margin-top:5px;
  letter-spacing:2px
}
.site-footer a
{
  color:#737373;
}
.site-footer a:hover
{
  color:#3366cc;
  text-decoration:none;
}
.footer-links
{
  padding-left:0;
  list-style:none
}
.footer-links li
{
  display:block
}
.footer-links a
{
  color:#737373
}
.footer-links a:active,.footer-links a:focus,.footer-links a:hover
{
  color:#3366cc;
  text-decoration:none;
}
.footer-links.inline li
{
  display:inline-block
}
.site-footer .social-icons
{
  text-align:right
}
.site-footer .social-icons a
{
  width:40px;
  height:40px;
  line-height:40px;
  margin-left:6px;
  margin-right:0;
  border-radius:100%;
  background-color:#33353d
}
.copyright-text
{
  margin:0
}
@media (max-width:991px)
{
  .site-footer [class^=col-]
  {
    margin-bottom:30px
  }
}
@media (max-width:767px)
{
  .site-footer
  {
    padding-bottom:0
  }
  .site-footer .copyright-text,.site-footer .social-icons
  {
    text-align:center
  }
}
</style>

<script>
import axios from 'axios';
export default
{
  name: 'App',
  data() {
    return {

    }
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
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  }
}
</script>
