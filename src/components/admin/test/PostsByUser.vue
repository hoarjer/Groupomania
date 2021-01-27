<template>
  <div>
    <div>
      <button @click="show = !show" class="btn btn-light">Posts {{ posts.length }}</button>
    </div>
    <div class="d-flex flex-wrap">
      <div v-for="post in posts" :key="post._id" class="col-md-6 col-lg-3">
        <div v-if="show" class=" mb-5" style="height:350px">
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
    };
  },
  props: ["id"],

  created() {
    console.log(this.id);
    axios.get("http://localhost:3000/api/posts/user/" + this.id).then((res) => {
      console.log(res.data.posts);
      this.posts = res.data.posts;
    });
  },
};
</script>

<style lang="scss" scoped></style>
