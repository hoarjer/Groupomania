import axios from 'axios';

const baseUrl = "http://localhost:3000/api/";

export default {
    getAdminComments() {
        return axios.get(`${baseUrl}/comments/admin`);
    },
    addPostComment(comment) {
        return axios.post(`${baseUrl}/comments`, comment);
    }
};