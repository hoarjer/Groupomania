<template>
  <div id="UserSupprButton">
    <form @submit.prevent="supprUser">
      <button class="btn btn-danger" type="submit">Supprimer</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserSupprButton",
  props: ["id"],
  methods: {
    supprUser() {
        axios
          .delete("http://localhost:3000/api/auth/users/" + this.id)
          .then((res) => {
            console.log(res);
          });
      location.reload();
      }

    },
};
</script>

<style lang="scss" scoped></style>
