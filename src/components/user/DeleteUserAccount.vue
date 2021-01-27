<template>
  <div>
    <button @click="suppr" class="btn btn-dark">Supprimer compte</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"],
  computed: {
    user() {
      return this.$store.state.userLoggedIn;
    },
  },
  methods: {
    suppr() {
      console.log(this.id);
      console.log(this.user);
      axios
        .delete("http://localhost:3000/api/auth/users/" + this.id)
        .then((res) => {
          console.log(res);
          console.log(this.$store.state.users);
        });
      this.$store.dispatch("logout");
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped></style>
