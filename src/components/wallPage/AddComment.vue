<template>
  <div>
    <button
      @click="addCommentForm = !addCommentForm"
      v-if="!addCommentForm"
      class="btn btn-light align-self-center"
      style="font-size:25px;"
    >
      Commenter
    </button>
    <button
      @click="addCommentForm = !addCommentForm"
      v-if="addCommentForm"
      class="btn btn-light align-self-center"
      style="font-size:25px; color:grey;"
    >
      ^
    </button>
    <form
      v-if="addCommentForm"
      class="form"
      @submit.prevent="createComment"
    >
      <div class="form-group m-2">
        <label for="comment" class="text-left"></label>
        <input id="comment" class="form-control" v-model="comment.content" />
      </div>

      <button type="submit" class="btn btn-primary m-3">Commenter</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";


export default {
  data() {
    return {
      addCommentForm: false,
      comment: {},
      baseUrl: "http://localhost:3000/api/",
    };
  },
  props: ["id"],
  methods: {
    createComment() {
        console.log(this.id);
      axios
        .post(`${this.baseUrl}/comments/posts/${this.id}`, this.comment)
        .then((res) => {
          console.log(res);
          this.comment = res.data;
          console.log(this.$store.state.adminComments);
          this.addCommentForm = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
