import axios from 'axios';

const axiosClient = axios.create({
//   baseURL: 'http://nobertechx.tech/api/',
  baseURL:'https://olkisir-backend.onrender.com/',
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;

