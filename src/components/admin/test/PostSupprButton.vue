<template>
  <div id="PostSupprButton">
    <form @submit.prevent="suppr">
      <button class="btn btn-danger" type="submit">Supprimer</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PostSupprButton",
  props: ["id"],
  methods: {
    suppr() {
      axios.delete("http://localhost:3000/api/posts/" + this.id).then((res) => {
        console.log(res);
        this.$store.state.adminPosts = this.$store.state.adminPosts.filter(
          (post) => post._id != this.id
        );
        console.log(this.$store.state.adminPosts);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
