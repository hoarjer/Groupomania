<template>
  <div id="CommentSuppr">
    <form @submit.prevent="suppr">
      <button class="btn btn-danger" type="submit">Supprimer</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CommentSuppr",
  props: ["id"],
  methods: {
    suppr() {
      axios
        .delete("http://localhost:3000/api/comments/" + this.id)
        .then(() => {
          this.$store.state.adminComments = this.$store.state.adminComments.filter(
            (comment) => comment._id != this.id
          );
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
