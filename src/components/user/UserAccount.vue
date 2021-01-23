<template>
  <div class="container">
    <div class="card">
      <div class="photo-profil mb-5">
        <div class="photo">
          <img
            :src="user.img_url"
            alt="Photo de profil"
            class="figuire-img img-fluid rounded mt-5"
            style="max-height:150px;"
          />
          <div>
              <button
                class="btn btn-success mt-2"
                @click="addImageForm = !addImageForm"
                v-if="!addImageForm"
              >
                Changer de photo
              </button>
            <UserImage v-show="addImageForm"/>
          </div>
        </div>
      </div>
      <h1>{{ user.firstname }} {{ user.lastname }}</h1>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <div class="container bio col-lg-6 mb-5">
        <p><strong>Bio: </strong>{{ user.bio }}</p>
        <div>
              <button
                class="btn btn-success mt-2"
                @click="addBioForm = !addBioForm"
                v-if="!addBioForm"
              >
                Changer la bio
              </button>
            <UserBio v-show="addBioForm"/>
          </div>
      </div>
      <!-- <div>
        <button
          @:click.prevent="deleteAccount"
          type="submit"
          class="btn btn-danger"
        >
          Supprimer le compte
        </button>
      </div> -->
    </div>
    <div class="mt-5">
      <h2>Vos Gifs</h2>
      <div class="card m-2" v-for="post in user.posts" :key="post._id">
        <h2 class="text-left">{{ post.content }}</h2>
        <div class="gif">
          <img
            :src="post.gif_url"
            class="figure-img img-fluid rounded"
            style="max-height:500px;"
          />
        </div>

        <div class="border bottom-post">
          <button class="btn btn-primary m-2 comment">Commenter</button>
          <p class="">{{ post.created_at | moment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import UserImage from "./UserImage";
import UserBio from "./UserBio";

export default {
  data() {
    return {
      user: [],
      userId: this.$route.params.id,
      id: localStorage.getItem("userId"),
      baseUrl: "http://localhost:3000/api/auth",
      addImageForm: false,
      addBioForm: false,
    };
  },
  components: {
    UserImage,
    UserBio
  },
  filters: {
    moment: function(date) {
      return moment(date)
        .startOf("hour")
        .fromNow();
    },
  },
  mounted() {
    axios.get(`${this.baseUrl}/users/${this.id}`).then((res) => {
      console.log(res);
      this.user = res.data.user;
    });
  },
  methods: {
    deleteAccount() {
      axios.delete(`${this.baseUrl}/users/${this.id}`).then((res) => {
        console.log(res);
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style scoped>
.photo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
