<template>
  <div id="LastPosts">
    <div class="card-header">
      <div>
        <div class="d-flex">
          <img
            class="figure-img img-fluid rounded mr-3"
            style="max-height:70px;"
            :src="post.user.img_url"
          />
          <div>
            <b class="text-left">{{ post.user.firstname }} </b>
            <User v-bind:id="post.userId" />
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <h2 class="text-left ml-3 pointer" style="word-wrap:break-word;">
        {{ post.title }}
      </h2>
      <div>
        <div class="d-flex align-items-center">
          <p class="mr-2">Commentaires ({{ post.comments.length }})</p>
          <Comments v-bind:id="post._id" />
        </div>
      </div>
    </div>
    <div>
      <img
        :src="post.gif_url"
        class="figure-img img-fluid rounded"
        style="max-height:500px;"
      />
    </div>
    <div class="mb-5 d-flex justify-content-end ">
      <AddComment v-bind:id="post._id" class="col" />
    </div>
  </div>
</template>

<script>
import Comments from "./Comments";
import AddComment from "./AddComment";
import User from "./User";

export default {
  name: "LastPosts",
  components: {
    Comments,
    AddComment,
    User,
  },
  props: {
    post: {},
  },
};
</script>

<style lang="scss" scoped></style>
