<template>
  <div id="AllUsers" class="container mb-5">
    <div @click="show = !show" class="card-header">
      <h2>Tous les utilisateurs ({{ users.length }})</h2>
    </div>

    <div v-if="show" class="row">
      <div class="justify-content-center flex-wrap">
        <div v-for="user in users" :key="user._id">
          <div class="m-2 p-2 d-flex flex-wrap border-top">
            <div class="card-header d-flex justify-content-between">
              <div>
                <div class="d-flex">
                  <img
                    class="figure-img img-fluid rounded mr-3"
                    style="max-height:30px;"
                    :src="user.img_url"
                  />
                  <p><strong>{{ user.firstname }} {{ user.lastname }}</strong></p>
                </div>
                <div>
                  <AdminRoleButton v-bind:id="user._id" />
                </div>
              </div>
              <DeleteUserButton :id="user._id"/>
            </div>
          </div>
          <div class="d-flex border justify-content-start">
            <PostsByUser :id="user._id" />
            <CommentsByUser :id="user._id" />
            <UserProfile :id="user._id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostsByUser from "./PostsByUser";
import CommentsByUser from "./CommentsByUser";
import AdminRoleButton from "./AdminRoleButton";
import DeleteUserButton from "./DeleteUserButton";
import UserProfile from "../../wallPage/User";

export default {
  name: "AllUsers",
  components: {
    PostsByUser,
    CommentsByUser,
    DeleteUserButton,
    AdminRoleButton,
    UserProfile
  },
  data() {
    return {
      user: {},
      show: false,
    };
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
  },
  created() {
    this.$store.dispatch("getAllUsers");
  },
  
};
</script>

<style lang="scss" scoped></style>
