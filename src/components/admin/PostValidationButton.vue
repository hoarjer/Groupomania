<template>
  <div id="PostValidationButton">
    <form @submit.prevent="validate">
      <button class="btn btn-primary" type="submit">Valider</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PostValidationButton",
  props: ["id"],
  methods: {
      validate() {
          axios.put(
          "http://localhost:3000/api/posts/" + this.id,
          {
            is_public: true
          })
          .then(res => {
            console.log(res);
          });
          location.reload();
      }
  },
};
</script>

<style lang="scss" scoped></style>
