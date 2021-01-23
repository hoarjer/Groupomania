<template>
  <div class="container">
    <div class="card profil">
      
      
      <form @submit.prevent="update">
        <label for="bio"></label>
        <input type="text" v-model="user.bio" id="bio" placeholder="bio" />
        <button type="submit" class="btn btn-success ml-3">
          Modifier la bio
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        bio: "",
      },
      id: localStorage.getItem("userId"),
    };
  },
  mounted() {
    const baseUrl = "http://localhost:3000/api/auth";
    const userId = localStorage.getItem("userId");
    axios.get(`${baseUrl}/users/${userId}`).then((res) => {
      this.user = res.data.user;
    });
  },
  methods: {
    update() {
      const bio = this.user.bio;
      this.$store
        .dispatch("updateUser", { bio })
        .then(() => {
          this.$emit("update", bio);
        })
        .catch((err) => console.log(err));
      this.user.bio = "";
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped></style>
