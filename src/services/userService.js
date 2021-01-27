import axios from 'axios';

const baseUrl = "http://localhost:3000/api/auth";
const userId = localStorage.getItem('userId');

export default {
    register(user) {
        return axios.post(`${baseUrl}/signup`, user);
    },
    login(user) {
        return axios.post(`${baseUrl}/login`, user);
    },
    getAllUsers() {
        return axios.get(`${baseUrl}/users`)
    },
    getOneUser() {
        return axios.get(`${baseUrl}/users/${userId}`)
 
    }
}