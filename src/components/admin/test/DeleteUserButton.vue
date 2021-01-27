<template>
  <div class="d-flex align-items-end">
    <button @click="suppr" class="btn btn-dark h-50">Supprimer compte</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
    props: ["id"],
    methods: {
    suppr() {
      axios
          .delete("http://localhost:3000/api/auth/users/" + this.id)
          .then(() => {
            this.$store.state.users = this.$store.state.users.filter((user) => user._id != this.id);
          });
    }
  },

};
</script>

<style lang="scss" scoped></style>
