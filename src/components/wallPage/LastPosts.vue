<template>
  <div class="container col-12 col-md-9 col-lg-8">
    <div class="col-12 mb-2 d-flex justify-content-around flex-wrap">
      <div class="mb-5">
        <router-link :to="`/user_account/${id}`" class="link">
          <UserProfile />
        </router-link>
        <router-link :to="`/admin`">
          <AdminButton />
        </router-link>
      </div>
      <AddPost class="align-self-center" v-on:addpost="addNewPost"/>
    </div>
    <div class="card-container ">
      <h2>Les derniers Gifs</h2>
      <div class="mb-5" v-for="post in posts" :key="post._id">
        <div class="card-header">
          <div>
            <router-link :to="`/user/${post.userId}`" class="link">
              <img
                class="figure-img img-fluid rounded mr-3"
                style="max-height:50px;"
                :src="post.user.img_url"
              />
              <b class="text-left">{{ post.user.firstname }}</b>
            </router-link>
            <!-- <p>{{ post.created_at | moment }}</p> -->
          </div>
        </div>
        <router-link
          :to="`/post/${post._id}`"
          class="link d-flex align-items-end"
        >
          <h2 class="text-left ml-3 pointer">{{ post.title }}</h2>
          <p class="text-left ml-3 pointer">
            Commentaire(s) ({{ post.comments.length }})
          </p>
        </router-link>
        <div>
          <img
            :src="post.gif_url"
            class="figure-img img-fluid rounded"
            style="max-height:500px;"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import AddPost from "./AddPost";
import UserProfile from "./UserProfile";
import AdminButton from "../admin/AdminButton";

export default {
  name: "LastPosts",
  components: {
    AddPost,
    UserProfile,
    AdminButton,
  },
  data() {
    return {
      id: localStorage.getItem("userId"),
      addCommentForm: false,
      comment: [],
      userId: localStorage.getItem("userId"),
      role: localStorage.getItem("role"),
    };
  },
  created() {
    this.$store.dispatch("getLastPosts");
  },
  filters: {
    moment: function(date) {
      console.log(date);
      return moment(date)
        .startOf("hour")
        .fromNow();
    },
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
    // posts() {
    //   return this.$store.getters.posts;
    // }
  },
  methods: {
    addNewPost() {
      // this.posts.push(e);
      console.log(this.posts);
    }
  },
};
</script>

<style scoped>
.btn {
  width: 200px;
}

.bottom-post {
  display: flex;
  justify-content: space-between;
}

.card-header {
  display: flex;
  justify-content: space-between;
}
.link {
  text-decoration: none;
  color: #444;
}
</style>
