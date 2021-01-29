<template>
  <div>
    <UserDashboard />
  </div>
</template>

<script>
import UserDashboard from "../components/wallPage/UserDashboard";

export default {
  name: "Home",
  data() {
    return {
      id: localStorage.getItem('userId')
    }
  },
  components: {
    UserDashboard,
  }, 
};
</script>

<style scoped>
</style>
