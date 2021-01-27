import axios from 'axios';

const baseUrl = "http://localhost:3000/api/";
const postId = window.location.pathname.split("posts/")[1];

export default {
    getAdminPosts() {
        return axios.get(`${baseUrl}/posts/admin`);
    },
    getAllPosts() {
        return axios.get(`${baseUrl}/posts`);
    },
    getLastPosts() {
        return axios.get(`${baseUrl}/posts/lastposts`);
    },
    getOnePost() {
        return axios.get(`${baseUrl}/posts/${postId}`);
    },
    addPost(post) {
        return axios.post(`${baseUrl}/posts`, post);
    }
};

