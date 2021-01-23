<template>
  <div id="UserRoleButton">
    <form @submit.prevent="userRole">
      <button class="btn btn-primary" type="submit">Passer utilisateur</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserRoleButton",
  props: ["id"],
  methods: {
    userRole() {
        axios
          .put("http://localhost:3000/api/auth/users/" + this.id, {
            is_admin: false,
          })
          .then((res) => {
            console.log(res);
          });
      location.reload();
      }

    },
};
</script>

<style lang="scss" scoped></style>
