import axios from 'axios';
import { FileUploadPayload } from "./interfaces/FileUploadPayload";
import {wsClientId} from "./configureWsClient";
import {PaginationData} from "./interfaces/PaginationData";
import {PaginatedListResponse} from "./interfaces/PaginatedListResponse";
import {File} from "./interfaces/File";

const baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
    ...(baseURL ? { baseURL } : {}),
});

axiosInstance.interceptors.request.use(function (config) {
    config.headers['Client-Id'] = wsClientId;
    return config;
});

export const uploadFile = (data: FileUploadPayload) => axiosInstance.post('/api/upload-file', data);

export const getFileList = (data: PaginationData) => axiosInstance.get<PaginatedListResponse<File>>('/api/files', { params: data });
