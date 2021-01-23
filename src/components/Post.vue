<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div>
          <router-link
            :to="{
              name: 'User',
              params: { id: post.userId },
            }"
          >
            <img
              class="figure-img img-fluid rounded mr-3"
              style="max-height:50px;"
              :src="post.user.img_url"
            />
            <b class="text-left">{{ post.user.firstname }}</b>
          </router-link>
        </div>
        <!-- <p class="">{{ post.created_at | moment }}</p> -->
      </div>
      <h2 class="text-left ml-3">{{ post.content }}</h2>
      <div class="gif">
        <img
            :src="post.gif_url"
            class="figure-img img-fluid rounded"
            style="max-height:500px;"
            
          />
      </div>
      <button
        @click="addCommentForm = !addCommentForm"
        v-if="!addCommentForm"
        class="btn btn-primary align-self-center p-3"
        style="font-size:25px;"
      >
        Commenter
      </button>
      <div>
        <button class="btn btn-danger">
          Supprimer
        </button>
      </div>
      <form
        v-show="addCommentForm"
        class="form col-lg-6"
        @submit.prevent="createComment"
      >
        <div class="form-group m-2">
          <label for="comment" class="text-left"></label>
          <input id="comment" class="form-control" v-model="comment.content" />
        </div>

        <button type="submit" class="btn btn-primary m-3">Commenter</button>
      </form>
      <div
        v-for="comment in comments"
        :key="comment._id"
        class="text-left mt-2"
      >
        <div class="d-flex">
          <img
            class="figure-img img-fluid rounded mr-3"
            style="max-height:50px;"
            :src="comment.user.img_url"
          />
          <div class="card col-lg-6">
            <p class="card-header">
              {{ comment.user.firstname }}
            </p>
            <p class="card-body">{{ comment.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
export default {
  data() {
    return {
      post: {},
      postId: this.$route.params.id,
      comment: {
        // content: "",
        // postId: this.$route.params.id,
        // userId: localStorage.getItem("userId"),
      },
      comments: [],
      addCommentForm: false,
      baseUrl: "http://localhost:3000/api/",
      userId: localStorage.getItem("userId"),
    };
  },
  filters: {
    moment: function(date) {
      return (
        moment(date)
          // .format("DD MM YYYY");
          .startOf("day")
          .fromNow()
      );
    },
  },
  mounted() {
      axios.get(`${this.baseUrl}/posts/${this.postId}`).then((res) => {
        console.log(res);
        this.post = res.data.post;
      });
      axios.get(`${this.baseUrl}/comments/posts/${this.postId}`).then((res) => {
        console.log(res);
        this.comments = res.data.comments;
      });
  },
  methods: {
    createComment() {
      axios
        .post(`${this.baseUrl}/comments/posts/${this.postId}`, this.comment)
        .then((res) => {
          console.log(res);
          this.comment = res.data;
          this.addCommentForm = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
