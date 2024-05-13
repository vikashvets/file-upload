import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
    ...(baseURL ? { baseURL } : {}),
});

export const uploadFile = (data) => axiosInstance.post('/api/upload-file', data);
