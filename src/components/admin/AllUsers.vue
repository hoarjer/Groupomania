<template>
  <div id="AllUsers" class="container mb-5">
    <div class="row">
      <div class="col-md d-flex justify-content-center flex-wrap">
        <div
          v-for="user in users"
          :key="user._id"
          class="m-2 p-2 card d-flex justify-content-between"
        >
          <div >
            <router-link :to="`/user/${user._id}`" class="d-flex">
              <img
                class="figure-img img-fluid rounded mr-3"
                style="max-height:50px;"
                :src="user.img_url"
              />
            <p class="card-header">{{ user.firstname }} {{ user.lastname }}</p>
            </router-link>
          </div>
          <div v-if="user.is_admin === true">
            <p>Admin</p>
            <UserRoleButton v-bind:id="user._id" />
          </div>
          <div v-else>
            <p>Utilisateur {{ user._id }}</p>
            <AdminRoleButton v-bind:id="user._id" v-on:update="adminRole"/>
          </div>
          <div>
            <div class="d-flex justify-content-center">
              <h3>{{ user.posts.length }}</h3>
              <AllPostsByUser v-bind:id="user._id" />
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <h3>{{ user.comments.length }}</h3>
            <AllCommentsByUser v-bind:id="user._id" />
          </div>
          <div>
            <UserSupprButton v-bind:id="user._id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AllPostsByUser from "./AllPostsByUser";
import AllCommentsByUser from "./AllCommentsByUser";
import AdminRoleButton from "./AdminRoleButton";
import UserRoleButton from "./UserRoleButton";
import UserSupprButton from "./UserSupprButton";

export default {
  name: "AllUsers",
  components: {
    AllPostsByUser,
    AllCommentsByUser,
    AdminRoleButton,
    UserRoleButton,
    UserSupprButton,
  },
  props: ["id"],
  data() {
    return {
      posts: [],
      comments: [],
    };
  },
  created() {
    this.$store.dispatch("getAllUsers");
  },
  computed: {
    users() {
      console.log(this.user);
      return this.$store.state.users;
    },
  },
  methods: {
    adminRole() {
      
      
    }
  },
};
</script>

<style scoped></style>
