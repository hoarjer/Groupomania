<template>
  <div id="AddPost">
    <div class="add-post card-container p-2">
      <button
        @click="addPostForm = !addPostForm"
        v-if="!addPostForm"
        class="btn btn-dark align-self-center p-3"
        style="font-size:25px;"
      >
        Ajouter un Gif
      </button>
      <button
        @click="addPostForm = !addPostForm"
        v-else
        class="btn btn-light align-self-center p-3"
        style="font-size:25px;"
      >
        ^
      </button>
      <form
        v-show="addPostForm"
        class="form col"
        enctype="multipart/form-data"
        method="POST"
      >
        <div class="form-group m-2">
          <label for="title" class="text-left">Titre : </label>
          <input id="title" class="form-control" v-model="post.title" />
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
        <button @click.prevent="addPost" class="btn btn-success mt-5">
          Choisir
        </button>
      </form>
    </div>
  </div>
</template>

<script>

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
  methods: {
    gifSelected(e) {
      this.post.gif_url = e.target.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(this.post.gif_url);
      reader.onload = (e) => {
        this.imagepreview = e.target.result;
      };
    },
    postTitleChange(e) {
      this.post.title = e.target.value;
    },
    addPost() {
      const data = new FormData();
      data.append("image", this.post.gif_url);
      data.append("title", this.post.title);
      this.$store.dispatch("addPost", data).then(() => {
        this.addPostForm = false;
        this.post.title = '';
        this.post.gif_url = '';
        this.imagepreview = null;
      });
      
    },
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
