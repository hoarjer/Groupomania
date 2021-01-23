<template>
  <div>
    <div class="photo-profil">
        <div class="photo">
          <img
            :src="user.img_url"
            alt="Photo de profil"
            class="figuire-img img-fluid rounded"
            style="max-height:150px;"
          />
          <p><strong>{{ user.firstname }} {{ user.lastname }}</strong></p>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  
  data() {
    return {
      user: []
    };
  },
  mounted() {
    const baseUrl = "http://localhost:3000/api/auth";
    const userId = localStorage.getItem("userId");
    axios.get(`${baseUrl}/users/${userId}`).then((res) => {
      this.user = res.data.user;
      console.log(this.user);
    });
  },
};
</script>

<style scoped>

</style>
