<template>
  <div id="User">
    <button class="btn btn-light d-flex align-items-center" @click="showUser">
      Voir profil
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
        <div class="container">
          <div class="userProfile d-flex justify-content-around flex-wrap">
            <div class="photo-profil ">
              <div class="photo">
                <img
                  :src="user.img_url"
                  alt="Photo de profil"
                  class="figuire-img img-fluid rounded"
                  style="max-height:150px;"
                />
              </div>
            </div>
            <div class="bio" v-on:update="updateBio">
              <h1>{{ user.firstname }} {{ user.lastname }}</h1>
              <p><strong>Bio: </strong>{{ user.bio }}</p>
            </div>
          </div>
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

export default {
  name: "User",
  props: ["id"],
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    if (this.id === this.userId) {
      this.updateButtons = true;
    }
  },
  methods: {
    showUser() {
      console.log(this.id);
      axios
        .get("http://localhost:3000/api/auth/users/" + this.id)
        .then((res) => {
          console.log(res);
          this.$store.state.user = res.data.user;
          console.log(this.$store.state.user);
          this.showModal = true;
        });
    },
    updateBio() {
      this.user = this.$store.state.user;
      console.log(this.user);
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
