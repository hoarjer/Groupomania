import axios from 'axios';

const baseUrl = "http://localhost:3000/api/auth";

export default {
    register(user) {
        return axios.post(`${baseUrl}/signup`, user);
    },
    login(user) {
        return axios.post(`${baseUrl}/login`, user);
    },
    getAllUsers() {
        return axios.get(`${baseUrl}/users`)
    }
}