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
          axios.delete("http://localhost:3000/api/comments/" + this.id)
          .then(res => {
            console.log(res);
          });
            location.reload();
      }
  },
};
</script>

<style lang="scss" scoped></style>