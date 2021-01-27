<template>
  <div>
    <div class="container">
      <div>
        <button @click="show = !show" class="btn btn-light">
          Commentaires {{ comments.length }}
        </button>
      </div>
      <div v-for="comment in comments" :key="comment._id">
        <div v-if="show">
          <div class="card-header m-3 text-left">
            {{ comment.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      comment: [],
      comments: [],
      show: false,
    };
  },
  props: ["id"],
  created() {
    axios
      .get("http://localhost:3000/api/comments/user/" + this.id)
      .then((res) => {
        this.comments = res.data.comments;
      });
  },
};
</script>

<style lang="scss" scoped></style>
