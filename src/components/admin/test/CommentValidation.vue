<template>
  <div id="CommentValidation">
    <form @submit.prevent="validate">
      <button class="btn btn-primary" type="submit">Valider</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CommentValidation",
  props: ["id"],
  methods: {
      validate() {
          axios.put(
          "http://localhost:3000/api/comments/" + this.id,
          {
            is_public: true
          })
          .then(res => {
            console.log(res);
          this.$store.state.adminComments = this.$store.state.adminComments.filter(
            (comment) => comment._id != this.id
          );
          console.log(this.$store.state.adminComments);
          });
          // location.reload();
      }
  },
};
</script>

<style lang="scss" scoped></style>
