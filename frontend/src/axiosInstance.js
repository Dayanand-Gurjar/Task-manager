import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://task-manager-h7i3.onrender.com:4000/api/'
});

export default axiosInstance;