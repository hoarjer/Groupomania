<template>
  <div class="container" >
    <div class="card profil">
      
      
      <form @submit.prevent="update">
        <label for="bio"></label>
        <input type="text" @change="bioTextChange" v-bind:value="bioText" id="bio" placeholder="bio" />
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
      bioText: "",
    };
  },
  props: ["id"],
  mounted() {
    const baseUrl = "http://localhost:3000/api/auth";
    // const userId = localStorage.getItem("userId");
    axios.get(`${baseUrl}/users/${this.id}`).then((res) => {
      this.user = res.data.user;
    });
  },
  methods: {
    update() {
      const bio = this.bioText;
      this.$store
        .dispatch("updateUserBio", { bio })
        .then(() => {
        })
        .catch((err) => console.log(err));
      this.bioText = "";
    },
    bioTextChange(e) {
      this.bioText = e.target.value;
    }
  },
};
</script>

<style lang="scss" scoped></style>
