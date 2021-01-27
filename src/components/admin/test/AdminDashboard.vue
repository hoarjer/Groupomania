<template>
  <div>
    <div class="container">
      <h1>Admin dashboard</h1>
      <div @click="show = !show" class="card-header btn col">
        <h2>Nouveaux posts ({{ posts.length }})</h2>
      </div>
      <div>
        <div v-if="show" class="raw d-flex flex-wrap justify-content-center">
          <div
            v-for="post in posts"
            :key="post._id"
            class="col-12 col-md-4 col-lg-3 mx-1"
          >
            <AdminPosts :post="post" />
          </div>
        </div>
        <div>
          <AdminComments />
        </div>
        <div>
          <AllUsers />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminPosts from "./AdminPosts";
import AdminComments from "./AdminComments";
import AllUsers from "./AllUsers";
export default {
  components: {
    AdminPosts,
    AdminComments,
    AllUsers,
  },
  data() {
    return {
      post: {},
      show: false,
    };
  },
  computed: {
    posts() {
      return this.$store.state.adminPosts;
    },
  },
  mounted() {
    this.$store.dispatch("getAdminPosts");
  },
};
</script>

<style lang="scss" scoped></style>
