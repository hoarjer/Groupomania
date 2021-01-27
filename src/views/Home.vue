<template>
  <div>
    <!-- <div
      class="user-profile add-post container col-12 col-md-9 col-lg-6 mb-5 d-flex justify-content-around flex-wrap">
      <router-link
      :to="`/user_account/${id}`">
        <UserProfile />
      </router-link>
      <AddPost class="align-self-center" />
    </div> -->
    <UserDashboard />
  </div>
</template>

<script>
import UserDashboard from "../components/wallPage/UserDashboard";
// import AddPost from "../components/wallPage/AddPost";
// import UserProfile from "../components/wallPage/UserProfile";
export default {
  name: "Home",
  data() {
    return {
      id: localStorage.getItem('userId')
    }
  },
  components: {
    UserDashboard,
    // AddPost,
    // UserProfile,
  }, 
};
</script>

<style scoped>
/* .user-profile {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
} */
</style>
