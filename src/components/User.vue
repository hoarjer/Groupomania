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
          <div v-show="prout">
            <button
              class="btn btn-success mt-2"
              @click="addImageForm = !addImageForm"
              v-if="!addImageForm"
            >
              Changer l'image
            </button>
            <UserImage v-show="addImageForm" />
          </div>
        </div>
      </div>
      <h1>{{ user.firstname }} {{ user.lastname }}</h1>
      <!-- <p><strong>Email:</strong> {{ user.email }}</p> -->
      <div class="container bio col-lg-6 mb-5" v-on:update="updateBio">
        <p><strong>Bio: </strong>{{ user.bio }}</p>
        <div v-show="prout">
          <button
            class="btn btn-success mt-2"
            @click="addBioForm = !addBioForm"
            v-if="!addBioForm"
          >
            Changer la bio
          </button>
          <UserBio v-show="addBioForm" />
        </div>
      </div>
    </div>
    <div class="mt-5">
      <h2>Les Gifs de {{ user.firstname }}</h2>
      <div class="card m-2" v-for="post in user.posts" :key="post._id">
        <h2 class="text-left">{{ post.title }}</h2>
        <div class="gif">
          <img
            :src="post.gif_url"
            class="figure-img img-fluid rounded"
            style="max-height:500px;"
          />
        </div>

        <div class="border bottom-post">
          <router-link
            :to="{
              name: 'Post',
              params: { id: post._id },
            }"
          >
            <button class="btn btn-primary">
              Commentaire(s) ({{ post.comments.length }})
            </button>
          </router-link>
          <!-- <p class="">{{ post.created_at | moment }}</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import UserBio from "./user/UserBio";
import UserImage from "./user/UserImage";

export default {
  data() {
    return {
      user: [],
      userId: this.$route.params.id,
      id: localStorage.getItem("userId"),
      prout: false,
      addBioForm: false,
      addImageForm: false,
    };
  },
  // props: {
  //   user: {}
  // },
  components: {
    UserBio,
    UserImage,
  },
  filters: {
    moment: function(date) {
      return moment(date)
        .startOf("hour")
        .fromNow();
    },
  },
  mounted() {
    const baseUrl = "http://localhost:3000/api/auth";
    if (this.userId === this.id) {
      axios.get(`${baseUrl}/users/${this.userId}`).then((res) => {
        this.user = res.data.user;
        this.prout = true;
      });
    } else {
      axios.get(`${baseUrl}/users/${this.userId}`).then((res) => {
        this.user = res.data.user;
        this.prout = false;
      });
    }
  },
  methods: {
    updateBio() {
      // this.user.push(e)
      this.user = this.$store.state.user;
      console.log(this.user);
    }
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
