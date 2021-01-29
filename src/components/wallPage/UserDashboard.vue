<template>
  <div id="UserDashboard" class="container col-12 col-md-9 col-lg-8">
    <div class="col-12 mb-2 d-flex justify-content-around flex-wrap">
      <div class="mb-5">
        <div>
          <UserProfile :id="userId"/>
        </div>
        <router-link :to="`/admin`">
          <AdminButton />
        </router-link>
      </div>
      <AddPost class="align-self-center"/>
    </div>
      <h2>Les derniers Gifs</h2>
    <div class="card-container " v-for="post in posts" :key="post._id">
      <LastPosts :post="post"/>
    </div>
  </div>
</template>

<script>
import AddPost from "./AddPost";
import UserProfile from "../user/UserProfile";
import AdminButton from "../admin/test/AdminButton";
import LastPosts from "./LastPosts";
import axios from "axios";

export default {
  name: "UserDashboard",
  components: {
    AddPost,
    UserProfile,
    AdminButton,
    LastPosts
  },
  data() {
    return {
      userId: localStorage.getItem("userId"),
      addCommentForm: false,
      comment: [],
      role: localStorage.getItem("role"),
      isAdmin: false,
    };
  },
  mounted() {
    this.$store.dispatch("getLastPosts").then(() => {
      });
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    user() {
      return this.$store.state.userLoggedIn;
    },
  },
  created() {
    axios
        .get("http://localhost:3000/api/auth/users/" + this.userId)
        .then((res) => {
          this.$store.state.userLoggedIn = res.data.user;
        });
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
