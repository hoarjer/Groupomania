<template>
  <div>
    <div class="photo-profil">
      <button class="btn btn-light photo" @click="showUser">
        <img
          :src="user.img_url"
          alt="Photo de profil"
          class="figuire-img img-fluid rounded"
          style="max-height:150px;"
        />
        <p>
          <strong>{{ user.firstname }} {{ user.lastname }}</strong>
        </p>
      </button>
      <transition name="fade" appear>
        <div
          class="modal-overlay"
          v-if="showModal"
          @click="showModal = false"
        ></div>
      </transition>
      <transition name="slide" appear>
        <div class="modale  col-md-6" v-if="showModal">
          <div class="container">
            <div class="d-flex justify-content-end m-3">
              <DeleteUserAccount :id="user._id"/>
            </div>
            <div class="userProfile d-flex justify-content-around flex-wrap">
              <div class="photo-profil ">
                <div class="photo">
                  <img
                    :src="user.img_url"
                    alt="Photo de profil"
                    class="figuire-img img-fluid rounded"
                    style="max-height:150px;"
                  />
                  <UserImage />
                </div>
              </div>
              <div class="bio" v-on:update="updateBio">
                <h1>{{ user.firstname }} {{ user.lastname }}</h1>
                <p><strong>Bio: </strong>{{ user.bio }}</p>
                <UserBio />
              </div>
            </div>
            
          </div>
          <button class="btn btn-danger m-3" @click="showModal = false">
            Fermer
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserBio from "./UserBio";
import UserImage from "./UserImage";
import DeleteUserAccount from "./DeleteUserAccount";

export default {
  name: "User",
  props: ["id"],
  components: {
    UserBio,
    UserImage,
    DeleteUserAccount,
  },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.userLoggedIn;
    },
  },
  methods: {
    showUser() {
      axios
        .get("http://localhost:3000/api/auth/users/" + this.id)
        .then((res) => {
          this.$store.state.userLoggedIn = res.data.user;
          this.showModal = true;
        });
    },
    updateBio() {
      this.user = this.$store.state.user;
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
  top: 50%;
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
