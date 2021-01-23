<template>
  <div id="PostSupprButton">
    <form @submit.prevent="suppr">
      <button class="btn btn-danger" type="submit">Supprimer</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
// import { mapActions } from "vuex";
export default {
  name: "PostSupprButton",
  props: ["id"],
  // props: {
  //   post: {}
  // },
  
  methods: {
    // ...mapActions(["deletePost"])
      suppr() {
          axios.delete("http://localhost:3000/api/posts/" + this.id)
          .then(res => {
            console.log(res);
          });
            location.reload();
      }
  },
};
</script>

<style lang="scss" scoped></style>