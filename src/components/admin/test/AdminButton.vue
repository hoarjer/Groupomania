<template>
  <div id="AdminButton" >
    <button v-if="isAdmin" class="btn btn-success">Administrateur</button>
  </div>
</template>

<script>
export default {
  name: "AdminButton",
  data() {
    return {
      role: localStorage.getItem("role"),
      isAdmin: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    if (this.role === "true") {
      this.isAdmin = true;
    }
  },
};
</script>

<style lang="scss" scoped></style>
