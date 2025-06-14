import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:4000/api',
    withCredentials: true,
    headers: {
        'Content-Type':'application/json'
    },
});

axiosInstance.interceptors.response.use(
    res => res, error => {
        if(error.response?.status === 401){
            // redirect
        };
        return Promise.reject(error)
    }
);

export default axiosInstance;