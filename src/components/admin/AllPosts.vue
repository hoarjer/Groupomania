<template>
  <div class="container">
    <div class="card card-container">
      <table>
        <tr>
          <th>Posts</th>
        </tr>
        <tr v-for="post in posts" :key="post._id">
          <th>{{ post.user.firstname }}</th>
          <td>{{ post.title }}</td>
          <td>
            <div class="gif center-bloc">
              <img
                :src="post.gif_url"
                class="figure-img img-fluid rounded"
                style="max-height:100px;"
              />
            </div>
          </td>
          <!-- <td>{{ post.created_at | moment }}</td> -->
          <td>
            <PostValidationButton v-bind:id="post._id"/>
            <PostSupprButton v-bind:id="post._id"/>
          </td>
        </tr>
      </table>
    </div>
    <div class="card card-container mt-5">
     <table class="mt-5">
        <tr>
          <th>Commentaires</th>
        </tr>
        <tr v-for="comment in comments" :key="comment._id">
          <th>{{ comment.user.firstname }}</th>
          <td>{{ comment.content }}</td>
          <td>
            <div class="gif center-bloc">
              <img
                :src="comment.post.gif_url"
                class="figure-img img-fluid rounded"
                style="max-height:100px;"
              />
            </div>
          </td>
          <!-- <td>{{ comment.created_at | moment }}</td> -->
          <td>
            <CommentValidation v-bind:id="comment._id"/>
            <CommentSuppr v-bind:id="comment._id"/>
          </td>
        </tr>
      </table>
    </div>
    <div class="mt-5">
      <AllUsers />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import PostValidationButton from "./PostValidationButton";
import PostSupprButton from "./PostSupprButton";
import CommentValidation from "./CommentValidation";
import CommentSuppr from "./CommentSuppr";
import AllUsers from "./AllUsers";
// import { mapGetters } from "vuex";

export default {
  components: {
    PostValidationButton,
    PostSupprButton,
    CommentValidation,
    CommentSuppr,
    AllUsers,
  },
  data() {
    return {
      post: {},
    }
  },
  // props: {
  //   post: {}
  // },
  created() {
    this.$store.dispatch("getAdminPosts");
    this.$store.dispatch("getAdminComments");
  },
  filters: {
    moment: function(date) {
      return moment(date)
        // .format("DD MM YYYY");
        .startOf("day")
        .fromNow();
    },
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
    comments() {
      return this.$store.state.comments;
    }
  },
};
</script>

<style lang="scss" scoped></style>
