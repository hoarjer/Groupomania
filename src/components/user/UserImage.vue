<template>
  <div class="container">
    <div class="card p-3 profil">
      <form @submit.prevent="updateUser">
        <div class="custom-file">
          <input
            type="file"
            @change="imageSelected"
            class="custom-file-input"
            id="customFile"
          />
          <label for="customFile" class="custom-file-label"
            >Choisir une photo</label
          >
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
// import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      img_url: "",
      imagepreview: null,
      id: localStorage.getItem("userId"),
    };
  },
  props: ['user'],
  filters: {
    moment: function(date) {
      return moment(date)
        .startOf("hour")
        .fromNow();
    },
  },
  methods: {
    imageSelected(e) {
      this.img_url = e.target.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(this.img_url);
      reader.onload = (e) => {
        this.imagepreview = e.target.result;
      };
    },
    updateUser() {
      const image = this.img_url;
      const data = new FormData();
      data.append("image", image);
      this.$store
        .dispatch("updateUser", data)
        .then(() => {
          // this.img_url = res.File.name;
        })
        .catch((err) => console.log(err));
        window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped></style>
