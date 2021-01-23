<template>
  <div class="container">
    <div id="RegisterForm" class="col-md-12">
      <div class="card card-container">
        <h1 class="m-2">Créer votre compte</h1>
        <form class="form" @submit.prevent="register">
          <div class="form-group m-2">
            <label for="lastname" class="text-left">Nom: </label>
            <input
              type="text"
              placeholder="Entrer votre nom"
              id="lastname"
              class="form-control"
              v-model="lastname"
            />
          </div>

          <div class="form-group m-2">
            <label for="firstname" class="text-left">Prénom: </label>
            <input
              type="text"
              placeholder="Entrer votre prénom"
              id="firstname"
              class="form-control"
              v-model="firstname"
            />
          </div>

          <div class="form-group m-2">
            <label for="email" class="text-left">Email: </label>
            <input
              type="text"
              placeholder="Entrer votre email"
              id="email"
              class="form-control"
              v-model="email"
            />
          </div>

          <div class="form-group m-2">
            <label for="password" class="text-left">Password: </label>
            <input
              type="password"
              placeholder="Entrer votre mot de passe"
              id="password"
              class="form-control"
              v-model="password"
            />
          </div>
          <button type="submit" class="btn btn-primary col-3 m-3">
            Créez votre compte
          </button>
        </form>
      </div>
    </div>
    <div v-for="user in users" :key="user._id">
      <p>{{ user.firstname }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      lastname: "",
      firstname: "",
      email: "",
      password: "",
      is_admin: ""
    };
  },
  methods: {
    register() {
      // console.log(this.user);
      // this.$store.dispatch("createUser", this.user);

      let data = {
        lastname: this.lastname,
        firstname: this.firstname,
        email: this.email,
        password: this.password,
        is_admin: this.is_admin,
      };
      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.$store.dispatch("getAllUsers");
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  display: flex;
  flex-direction: column;
}
</style>
