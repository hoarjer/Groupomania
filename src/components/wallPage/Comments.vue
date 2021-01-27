<template>
  <div id="Comments">
    <button class="btn btn-light mb-3" @click="showPost">
      Voir
    </button>
    <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="showModal"
        @click="showModal = false"
      ></div>
    </transition>
    <transition name="slide" appear>
      <div class="modale" v-if="showModal">
        <h2>Les commentaires</h2>
        <div
          v-for="comment in comments"
          :key="comment._id"
          class="d-flex align-items-center"
        >
          <div class="m-3 col-lg-6">
            <div class="border d-flex align-items-center">
              <img
                class="figure-img img-fluid rounded mr-3"
                style="max-height:20px;"
                :src="comment.user.img_url"
              />
              {{ comment.user.firstname }}
            </div>
            <div class="card-header text-left d-flex justify-content-between">
              {{ comment.content }}
            </div>
          </div>
          <CommentSuppr v-bind:id="comment._id" />
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
import CommentSuppr from "./CommentSuppr";

export default {
  name: "Comments",
  components: {
    CommentSuppr,
  },
  props: ["id"],
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    comments() {
      return this.$store.state.comments;
    },
  },
  methods: {
    showPost() {
      axios
        .get("http://localhost:3000/api/comments/posts/" + this.id)
        .then((res) => {
          this.$store.state.comments = res.data.comments;
          this.showModal = true;
        });
    },
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
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 80%;
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
