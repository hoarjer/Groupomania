<template>
  <div id="UserDashboard" class="container col-12 col-md-9 col-lg-8">
    <div class="col-12 mb-2 d-flex justify-content-around flex-wrap">
      <div class="mb-5">
        <router-link :to="`/user/${id}`" class="link">
          <UserProfile />
        </router-link>
        <router-link :to="`/admin`" v-if="isAdmin">
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
import UserProfile from "./UserProfile";
import AdminButton from "../admin/test/AdminButton";
import LastPosts from "./LastPosts";
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
      id: localStorage.getItem("userId"),
      addCommentForm: false,
      comment: [],
      userId: localStorage.getItem("userId"),
      role: localStorage.getItem("role"),
      isAdmin: false
    };
  },
  mounted() {
    this.$store.dispatch("getLastPosts").then(() => {
      });
      // window.location.reload();
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
  },
  created() {
    this.$store.dispatch("getOneUser");
    // console.log(this.$store.state.user);
    console.log(this.role);
    if(this.role == "true") {
      this.isAdmin = true;
    }
  }
  // methods: {
  //   updatePosts(e) {
  //     console.log("updatePosts", e);
  //     this.$store.state.adminPosts.push(e);
  //   }
  // },
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
