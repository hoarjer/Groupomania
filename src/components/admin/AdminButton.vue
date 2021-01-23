<template>
  <div id="AdminButton" v-if="isAdmin">
      <button class="btn btn-success">Administrateur</button>
  </div>
</template>

<script>


export default {
  name: "AdminButton",
  data() {
      return {
          role: localStorage.getItem("role"),
          isAdmin: false
      }
  },
  created() {
      if(this.role === "true") {
          this.isAdmin = true;
      }
  }
};
</script>

<style lang="scss" scoped></style>
