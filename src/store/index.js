import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import postService from '../services/postService'
import userService from '../services/userService'
import commentService from '../services/commentService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminPosts: [],
    userPosts: [],
    posts: [],
    adminComments: [],
    comments: [],
    status: '',
    token: localStorage.getItem('token') || '',
    role: localStorage.getItem('role') || '',
    users: [],
    user: {},
    admin: [],
  },
  mutations: {
    UPDATE_USER_BIO(state, data) {
      state.user.bio = data.bio;
    },
    UPDATE_USER_IMAGE(state, data) {
     console.log(state.user.img_url);
     state.user.img_url = data;
    },
    GET_ADMIN_COMMENTS(state, comments) { 
      state.adminComments = comments;
    },
    GET_ADMIN_POSTS(state, posts) {
      state.adminPosts = posts;
    },
    GET_POSTS(state, posts) {
      state.posts = posts;
      console.log(state.posts);
    },
    ADD_POST(state, post) {
      state.adminPosts.push(post);
      console.log(state.adminPosts);
    },
    AUTH_REQUEST(state) {
      state.status = 'loading';
    },
    AUTH_SUCCESS(state, token, userId, role) {
      state.status = 'success';
      state.token = token;
      state.userId = userId;
      state.role = role;
    },
    AUTH_ERROR(state) {
      state.status = 'error';
    },
    LOGOUT(state) {
      state.status = '';
      state.token = '';
      state.role = '';
      state.userId = '';
    },
    GET_ALL_USERS(state, users) {
      state.users = users;
      console.log(state.users);
    }, 
    GET_ONE_USER(state, user) {
      state.user = user;
    }
  },
  actions: {
    updateUserBio({ commit }, data) {
      const userId = localStorage.getItem("userId");
      let req = {
        url: `http://localhost:3000/api/auth/users/${userId}`,
        method: "PUT",
        data: data
      };
      axios(req).then((res) => {
        commit("UPDATE_USER_BIO", data);
        console.log(data);
        console.log(res);
      });
    },
    updateUserImage({ commit }, data) {
      const userId = localStorage.getItem("userId");
      let req = {
        url: `http://localhost:3000/api/auth/users/${userId}`,
        method: "PUT",
        data: data
      };
      axios(req).then((res) => {
        commit("UPDATE_USER_IMAGE", data);
        console.log(res);
      });
    },
    getAdminComments({ commit }) {
      commentService.getAdminComments()
        .then(res => {
          console.log(res);
          commit("GET_ADMIN_COMMENTS", res.data.comments);
        })
        .catch(err => console.log(err))
    },
    getAdminPosts({ commit }) {
      postService.getAdminPosts()
        .then(res => {
          console.log(res);
          commit("GET_ADMIN_POSTS", res.data.posts);
        })
        .catch(err => console.log(err))
    },
    getLastPosts({ commit }) {
      postService.getLastPosts()
        .then(res => {
          commit("GET_POSTS", res.data.posts);
          console.log(res);
        })
        .catch(err => console.log(err))
    },
    addPost({ commit }, post) {
      postService.addPost(post).then((res) => {
        commit("ADD_POST", res.data.post);
        console.log(res.data.post);
      })
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST');
        userService.register(user)
          .then(res => {
            const token = res.data.token;
            const userId = res.data.userId;
            const role = res.data.is_admin;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('role', role);
            axios.defaults.headers.common['Authorization'] = token;
            commit('AUTH_SUCCESS', token, user, role);
            resolve(res);
          })
          .catch(err => {
            commit('AUTH_ERROR', err);
            localStorage.removeItem('token');
            reject(err);
          })
      })
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        userService.login(user)
          .then(res => {
            const token = res.data.token;
            const userId = res.data.userId;
            const role = res.data.role;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('role', role);
            axios.defaults.headers.common['Authorization'] = token;
            commit('AUTH_SUCCESS', token, user, role);
            console.log(role);
            resolve(res);
          })
          .catch(err => {
            commit('AUTH_ERROR');
            localStorage.removeItem('token');
            reject(err);
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('LOGOUT');
        localStorage.clear();
        delete axios.defaults.headers.common['Authorization'];
        resolve();
      })
    },
    getAllUsers({ commit }) {
      userService.getAllUsers()
        .then(res => {
          commit("GET_ALL_USERS", res.data.users);
          console.log(res);
        })
        .catch(err => console.log(err))
    }, 
    getOneUser({ commit }) {
      userService.getOneUser()
      .then( res => {
        commit('GET_ONE_USER', res.data.user);
        console.log(res);
      })
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    isAdmin: state => state.role,
    posts(state) {
      return state.posts;
    },
    adminPosts: (state) => state.adminPosts,
    allUsers: (state) => state.users,
    allPosts :(state) => state.posts,
    user: (state) => state.user,
  },
  modules: {
  }
})
