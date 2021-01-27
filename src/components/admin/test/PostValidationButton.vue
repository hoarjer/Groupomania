<template>
  <div @submit.prevent="validatePost" id="PostValidationButton">
    <form>
      <button class="btn btn-primary" type="submit">Valider</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PostValidationButton",
  props: ["id"],
  methods: {
    validatePost() {
      axios
        .put("http://localhost:3000/api/posts/" + this.id, {
          is_public: true,
        })
        .then(() => {
          this.$store.state.adminPosts = this.$store.state.adminPosts.filter(
            (post) => post._id != this.id
          );
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
