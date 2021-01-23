<template>
  <div id="AllCommentsByUser">
    <button
      class="btn btn-light "
     
      @click="allCommentsByUser"
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
        <div v-for="comment in comments" :key="comment._id">
          <h3>{{ comment.content }}</h3>
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
export default {
    name: "AllCommentsByUser",
    props: ["id"],
    data() {
        return {
            comments:[],
            showModal: false,
        }
    },
    methods: {
      allCommentsByUser() {
          console.log(this.id);
          axios.get(
          "http://localhost:3000/api/comments/user/" + this.id)
          .then(res => {
              console.log(res);
            this.comments = res.data.comments;
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
