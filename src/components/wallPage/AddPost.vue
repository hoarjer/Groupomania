<template>
  <div id="AddPost">
    <div class="add-post card-container p-2">
      <button
        @click="addPostForm = !addPostForm"
        v-if="!addPostForm"
        class="btn btn-primary align-self-center p-3"
        style="font-size:25px;"
      >
        Ajouter un Gif
      </button>
      <form
        v-show="addPostForm"
        class="form"
        @submit.prevent="addPost"
        enctype="multipart/form-data"
        method="POST"
      >
        <div class="form-group m-2">
          <label for="title" class="text-left">Titre : </label>
          <!-- <input id="title" class="form-control" v-model="post.title" /> -->
          <input id="title" class="form-control" @change="postTitleChange" v-bind:value="post.title" />
        </div>

        <div class="custom-file">
          <input
            type="file"
            @change="gifSelected"
            class="custom-file-input"
            id="customFile"
            accept="image/png, image/jpeg, image/jpg, image/gif"
          />
          <label for="customFile" class="custom-file-label">Parcourir...</label>
        </div>
        <div v-if="imagepreview">
          <img
            :src="imagepreview"
            class="figure-img img-fluid rounded"
            style="max-height:100px;"
          />
        </div>
        <button class="btn btn-success mt-5" type="submit">Choisir</button>
      </form>
    </div>
  </div>
</template>

<script>
// import { mapActions } from "vuex";

export default {
  name: "AddPost",
  data() {
    return {
      post: {
        title: "",
        gif_url: "",
      },
      addPostForm: false,
      imagepreview: null,
    };
  },
  // computed: {
  //   post() {
  //     return this.$strore.state.post; 
  //   }
  // },
  methods: {
    gifSelected(e) {
      this.post.gif_url = e.target.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(this.post.gif_url);
      reader.onload = (e) => {
        this.imagepreview = e.target.result;
      };
    },
    addPost() {
      const gif = this.post.gif_url;
      const data = new FormData();
      data.append("image", gif);
      data.append("title", this.post.title);
      this.$store.dispatch("addPost", data).then(() => {
        console.log(this.post);
        this.addPostForm = false;
        this.post.title = '';
        this.post.gif_url = '';
        this.imagepreview = null;
        // this.$emit("addpost");
      });
      // location.reload();
    },
    postTitleChange(e) {
      this.post.title = e.target.value;
    }
    // ...mapActions(["addPost"])
  },
};
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.form-group {
  display: flex;
  flex-direction: column;
}
</style>
