<template>
  <div id="AllPostsByUser">
    <button
      class="btn btn-light "
     
      @click="allPostsByUser"
    >
      voir
    </button>
    <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="showModal"
        @click="showModal = false"
      ></div>
    </transition>
    <transition name="slide" appear>
      <div class="modale ml-2" v-if="showModal">
        <div v-for="post in posts" :key="post._id" class="card">
          <h3>{{ post.title }}</h3>
          <img
                :src="post.gif_url"
                class="figure-img img-fluid rounded"
                style="max-height:500px;"
              />
            <PostSupprButton v-bind:id="post._id"/>
        </div>
        <button class="btn btn-danger" @click="showModal = false">
          Fermer
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import PostSupprButton from "./PostSupprButton";

export default {
    name: "AllPostsByUser",
    components: {
        PostSupprButton,
    },
    props: ["id"],
    data() {
        return {
            posts:[],
            showModal: false,
        }
    },
    methods: {
      allPostsByUser() {
          console.log(this.id);
          axios.get(
          "http://localhost:3000/api/posts/user/" + this.id)
          .then(res => {
              console.log(res);
            this.posts = res.data.posts;
              this.showModal = true;
          });
      }
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.3);
}
.modale {
  position: relative;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 100%;
  /* max-width: 500px; */
  background-color: #fff;
  border-radius: 16px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw); 
}
</style>
