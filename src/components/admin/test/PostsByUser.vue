<template>
  <div>
    <button @click="show = !show" class="btn btn-light">
      Posts ({{ posts.length }})
    </button>
    <div v-if="show" class="d-flex flex-wrap">
      <div v-for="post in posts" :key="post._id" class="col-md-6 col-lg-3">
        <div>
          <div class="card-header">
            {{ post.title }}
          </div>
          <div>
            <img :src="post.gif_url" class="figure-img img-fluid rounded" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      post: [],
      posts: [],
      show: false,
      showModal: false,
    };
  },
  props: ["id"],

  created() {
    axios.get("http://localhost:3000/api/posts/user/" + this.id).then((res) => {
      this.posts = res.data.posts;
    });
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
  width: 75%;
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
