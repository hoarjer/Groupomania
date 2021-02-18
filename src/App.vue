<template>
  <div id="app">
    <div id="nav" class="container d-flex justify-content-between">
      <router-link to="/">
        <img src="./assets/groupomania.png" alt="goupomania_logo" />
      </router-link>
      <router-link to="/login" v-if="isLoggedIn" class="btn btn-dark"
        ><a @click="logout">Logout</a></router-link
      >
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$store.dispatch("logout");
    },
  },
  beforeCreate() {
    if (this.isLoggedIn) {
      this.$router.push({ name: "login" });
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #fff;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
