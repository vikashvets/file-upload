import axios  from 'axios';
import { FileUploadPayload } from "./interfaces/FileUploadPayload";

const baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
    ...(baseURL ? { baseURL } : {}),
});


export const uploadFile = (data: FileUploadPayload) => axiosInstance.post('/api/upload-file', data);

export const getFileList = () => axiosInstance.get('/api/files');

