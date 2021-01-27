<template>
  <div class="container">
    <div class="userProfile d-flex justify-content-around flex-wrap">
      <div class="photo-profil ">
        <div class="photo">
          <img
            :src="user.img_url"
            alt="Photo de profil"
            class="figuire-img img-fluid rounded"
            style="max-height:150px;"
          />
          <div v-if="isAdmin">
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
      <div class="bio" v-on:update="updateBio">
        <h1>{{ user.firstname }} {{ user.lastname }}</h1>
        <p><strong>Bio: </strong>{{ user.bio }}</p>
        <div v-if="isAdmin" >
          <button
            class="btn btn-success mt-2"
            @click="addBioForm = !addBioForm"
            v-if="!addBioForm"
          >
            Changer la bio
          </button>
          <UserBio v-show="addBioForm" v-bind:id="user._id" />
        </div>
        <div>
          <DeleteUserAccount v-bind:id="user._id"/>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <h2>Les Gifs de {{ user.firstname }}</h2>
      <div class="m-2" v-for="post in user.posts" :key="post._id">
        <h2 class="text-left card-header">{{ post.title }}</h2>
        <div class="gif">
          <img
            :src="post.gif_url"
            class="figure-img img-fluid rounded"
            style="max-height:500px;"
          />
        </div>

        <div class="bottom-post">
          <div>
            <button class="btn btn-primary">
              Commentaire(s) ({{ post.comments.length }})
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeleteUserAccount from "../admin/test/DeleteUserButton";

import UserBio from "./UserBio";
import UserImage from "./UserImage";

export default {
  data() {
    return {
      userId: this.$route.params.id,
      id: localStorage.getItem("userId"),
      updateButtons: false,
      addBioForm: false,
      addImageForm: false,
      role: localStorage.getItem("role"),
      isAdmin: false,
      user: this.$store.getters.user,
    };
  },
  components: {
    UserBio,
    UserImage,
    DeleteUserAccount
  },
  mounted() {
    console.log(this.user);
    this.$store.dispatch("getOneUser");
    console.log(this.userId);
    if (this.role === "true" || this.id === this.userId) {
      this.isAdmin = true;
    }
  },
  methods: {
    updateBio() {
      this.user = this.$store.state.user;
      console.log(this.user);
      this.addBioForm = false;
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
