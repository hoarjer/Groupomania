import axios from 'axios';

const baseUrl = "http://localhost:3000/api/";

export default {
    getAdminPosts() {
        return axios.get(`${baseUrl}/posts/admin`);
    },
    getLastPosts() {
        return axios.get(`${baseUrl}/posts/lastposts`);
    },
    addPost(post) {
        return axios.post(`${baseUrl}/posts`, post);
    }
};

