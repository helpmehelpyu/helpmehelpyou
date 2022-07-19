import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  validateStatus: function (status) {
    return status < 500;
  },
  withCredentials: true,
});

export default instance;
