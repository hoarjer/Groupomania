<template>
  <div id="AdminPosts" class="mb-5">
    <div class="card-header d-flex">
      <img
        class="figure-img img-fluid rounded mr-3"
        style="max-height:50px;"
        :src="post.user.img_url"
      />
      <p>{{ post.user.firstname }}</p>
    </div>
    <div>
      <h3 style="word-wrap:break-word;" class="text-left">{{ post.title }}</h3>
      <div class="gif center-bloc ">
        <img
          :src="post.gif_url"
          class="figure-img img-fluid rounded"
          style="max-height:400px;"
        />
      </div>
    </div>
    <div class="d-flex justify-content-around">
      <PostValidationButton v-bind:id="post._id" />
      <PostSupprButton v-bind:id="post._id" />
    </div>
  </div>
</template>

<script>
import PostValidationButton from "./PostValidationButton";
import PostSupprButton from "./PostSupprButton";

export default {
  name: "AdminPosts",
  props: {
    post: {},
  },
  // data() {
  //   return {
  //     post: {},
  //   };
  // },
  // computed: {
  //   posts() {
  //     return this.$store.state.adminPosts;
  //   },
  // },
  components: {
    PostValidationButton,
    PostSupprButton,
  },
  // created() {
  //   this.$store.dispatch("getAdminPosts");
  // },
  // methods: {
  //     updatePostsList() {
  //         this.$store.state.adminPosts = this.posts;
  //     }
  // },
};
</script>

<style lang="scss" scoped></style>
