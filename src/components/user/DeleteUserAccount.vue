<template>
  <div>
    <button @click="suppr" class="btn btn-light w-25">Supprimer compte</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
    props: ["id"],
    methods: {
    suppr() {
      console.log(this.id);
      console.log(this.$store.state.users);
      axios
          .delete("http://localhost:3000/api/auth/users/" + this.id)
          .then((res) => {
            console.log(res);
            this.$store.state.users = this.$store.state.users.filter((user) => user._id != this.id);
            console.log(this.$store.state.users);
            localStorage.clear();
          this.$router.push("/login");
          });
    }
  },

};
</script>

<style lang="scss" scoped></style>
