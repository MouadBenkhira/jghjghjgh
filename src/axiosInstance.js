import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1', 
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("test");
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("test 2");
    return Promise.reject(error);
  }
);

export default axiosInstance;
