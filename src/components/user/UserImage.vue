<template>
  <div class="container">
    <div class="card p-3 profil">
      <form @submit.prevent="update">
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
      image: "",
      imagepreview: null,
      id: localStorage.getItem("userId"),
    };
  },
  
  filters: {
    moment: function(date) {
      return moment(date)
        .startOf("hour")
        .fromNow();
    },
  },
  methods: {
    imageSelected(e) {
      this.image = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        this.imagepreview = e.target.result;
      };
    },
    update() {
      const data = new FormData();
      data.append("image", this.image);
      this.$store
        .dispatch("updateUserImage", data)
        .catch((err) => console.log(err));
        window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped></style>
