import axios from "axios";

const apiService = axios.create({
    baseURL: process.env.API_URL,
});

export default apiService;