<template>
  <div id="AdminRoleButton">
      <button v-if="!admin" @click="adminUpdate" class="btn btn-primary" type="submit" style="color:black;">Utilisteur</button>
      <button v-if="admin" @click="userUpdate" class="btn btn-success" type="submit" style="color:black;">Admin</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminRoleButton",
  data() {
    return {
      user: {},
      admin: true,

    };
  },
  props: ["id"],
  methods: {
    adminUpdate() {
        axios
          .put("http://localhost:3000/api/auth/users/" + this.id, {
            is_admin: true,
          })
          .then(() => {
              this.user.is_admin = true;
              this.admin = true;
          });
      },
      userUpdate() {
        axios
          .put("http://localhost:3000/api/auth/users/" + this.user._id, {
            is_admin: false,
          })
          .then(() => {
              this.user.is_admin = false;
              this.admin = false;
          });
      },
  },
  created() {
    const baseUrl = "http://localhost:3000/api/auth";
    axios.get(`${baseUrl}/users/${this.id}`).then((res) => {
      this.user = res.data.user;
      if(this.user.is_admin === false) {
          this.admin = false;
      }
    });
  },
};
</script>

<style lang="scss" scoped></style>
