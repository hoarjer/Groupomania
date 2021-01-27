<template>
  <div id="AdminComments" class="container">
    <div @click="show = !show" class="card-header">
      <h2>Nouveaux commentaires ({{ comments.length }})</h2>
      </div>
    <div class="raw-md" v-for="comment in comments" :key="comment._id">
      <div v-if="show" class="row border-top">
        <div class="col-sm card-header">
          <div class="d-flex align-items-center">
            <img
              class="figure-img img-fluid rounded mr-3"
              style="max-height:15px;"
              :src="comment.user.img_url"
            />
            {{ comment.user.firstname }}
          </div>
        </div>
        <div class="col-sm d-flex align-items-center">
          {{ comment.content }}
        </div>
        <div class="col d-flex align-items-center">
          <PostComment v-bind:id="comment.postId"/>
        </div>
        <div class="col-4 d-flex flex-wrap">
          <div class="m-1"><CommentValidation v-bind:id="comment._id" /></div>
          <div class="m-1"><CommentSuppr v-bind:id="comment._id" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostComment from "./PostComment";
import CommentValidation from "./CommentValidation";
import CommentSuppr from "./CommentSuppr";

export default {
  name: "AdminComments",
  components: {
    PostComment,
    CommentValidation,
    CommentSuppr,
  },
  data() {
    return {
      comment: "",
      show: false,
    };
  },
  created() {
    this.$store.dispatch("getAdminComments");
  },
  computed: {
    comments() {
      return this.$store.state.adminComments;
    },
  },
};
</script>

<style lang="scss" scoped></style>
