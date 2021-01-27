<template>
  <div>
    <button @click="show = !show" class="btn btn-light">
      Posts {{ posts.length }}
    </button>
    <div v-if="show" class="d-flex flex-wrap">
      <div v-for="post in posts" :key="post._id" class="col-md-6 col-lg-3">
        <div>
          <div class="card-header">
            {{ post.title }}
          </div>
          <button class="btn" @click="showPost(post._id)">
            <div>
              <img :src="post.gif_url" class="figure-img img-fluid rounded" />
            </div>
          </button>
        </div>
        <transition name="fade" appear>
          <div
            class="modal-overlay"
            v-if="showModal"
            @click="showModal = false"
          ></div>
        </transition>
        <transition name="slide" appear>
          <div class="modale" v-if="showModal" >
            <div>
              <img
                :src="post.gif_url"
                v-bind:id="post._id"
                class="figure-img img-fluid rounded"
                style="max-height:600px;"
              />
            </div>
            <button class="btn btn-danger" @click="showModal = false">
              Fermer
            </button>
          </div>
        </transition>
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
  methods: {
    showPost(id) {
      console.log(id);
      axios.get("http://localhost:3000/api/posts/" + id).then((res) => {
        console.log(res.data.post);
        this.post = res.data.post;
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
