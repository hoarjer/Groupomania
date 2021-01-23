import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import postService from '../services/postService'
import userService from '../services/userService'
import commentService from '../services/commentService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    comments: [],
    status: '',
    token: localStorage.getItem('token') || '',
    role: localStorage.getItem('role') || '',
    users: [],
    user: {}
  },
  mutations: {
    // DELETE_POST(state, id) {
    //   state.posts = state.posts.filter((post) => post._id != id);
    // },
    UPDATE_USER(state, user) {
      state.user = user;
    },
    GET_ADMIN_COMMENTS(state, comments) {
      state.comments = comments;
    },
    // GET_ADMIN_POSTS(state, posts) {
    //   state.posts = posts;
    // },
    GET_POSTS(state, posts) {
      state.posts = posts;
    },
    ADD_POST(state, post) {
      state.posts.push(post);
      console.log(post);
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
    },
    GET_ALL_USERS(state, users) {
      state.users = users;
    }
  },
  actions: {
    // deletePost({commit}, id) {
    //   commit('DELETE_POST', id);
    // },
    updateUser({ commit }, user) {
      const userId = localStorage.getItem("userId");
      let req = {
        url: `http://localhost:3000/api/auth/users/${userId}`,
        method: "PUT",
        data: user
      };
      axios(req).then((res) => {
        commit("UPDATE_USER", user);
        console.log(user);
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
          commit("GET_POSTS", res.data.posts);
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
      postService.addPost(post).then(() => {
        commit("ADD_POST", post);
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
            commit('AUTH_SUCCESS', token, user);
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
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    isAdmin: state => state.role,
    posts(state) {
      return state.posts;
    },
    // allAdminPosts: (state) => state.posts,
    updateUser: (state) => state.user
  },
  modules: {
  }
})
