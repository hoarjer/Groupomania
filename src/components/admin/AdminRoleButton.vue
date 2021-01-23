<template>
  <div id="AdminRoleButton">
    <form @submit.prevent="update">
      <button class="btn btn-primary" type="submit">Passer admin</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminRoleButton",
  data() {
    return {
      user: {},
    };
  },
  props: ["id"],
  methods: {
    update() {
        axios
          .put("http://localhost:3000/api/auth/users/" + this.id, {
            is_admin: true,
          })
          .then((res) => {
            console.log(res);
            this.$emit("update", this.user);
          });
      // location.reload();
      },
    // update() {
    //   // const user = this.user;
    //   this.$store
    //     .dispatch("updateUser", { is_admin: true })
    //     .then((res) => {
    //       // this.$emit("update", user);
    //       console.log(res);
    //     })
    //     .catch((err) => console.log(err));
    //   // window.location.reload();
    // },
  },
  mounted() {
    const baseUrl = "http://localhost:3000/api/auth";
    axios.get(`${baseUrl}/users/${this.id}`).then((res) => {
      this.user = res.data.user;
    });
  },
};
</script>

<style lang="scss" scoped></style>
