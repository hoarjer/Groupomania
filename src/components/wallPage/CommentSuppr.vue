<template>
  <div id="CommentSuppr" v-if="isAdmin">
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
  data() {
    return {
      role: localStorage.getItem("role"),
      isAdmin: false,
    };
  },
  created() {
    if (this.role === "true") {
      this.isAdmin = true;
    }
  },
  methods: {
    suppr() {
      axios
        .delete("http://localhost:3000/api/comments/" + this.id)
        .then((res) => {
          console.log(res);
          this.$store.state.comments = this.$store.state.comments.filter(
            (comment) => comment._id != this.id
          );
          console.log(this.$store.state.comments);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
