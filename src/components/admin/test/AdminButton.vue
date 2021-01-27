<template>
  <div id="AdminButton" >
    <button class="btn btn-success">Administrateur</button>
  </div>
</template>

<script>
export default {
  name: "AdminButton",
  data() {
    return {
      isAdmin: false,
    };
  },
  computed: {
    role() {
      return this.$store.state.role;
    },
  },
  created() {
    if (this.role == "true") {
        console.log(this.isAdmin);
      this.isAdmin = true;
      console.log(this.isAdmin);
    //   window.location.reload();
    }

  },
};
</script>

<style lang="scss" scoped></style>
