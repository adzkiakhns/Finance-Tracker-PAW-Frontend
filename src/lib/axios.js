import Axios from "axios";

// This is for fetching WITHOUT access token
const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const setTokenApi = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  });
};

export { axios, setTokenApi };
