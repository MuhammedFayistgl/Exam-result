import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL: "https://exam-result.onrender.com",
    // baseURL: "http://localhost:8000/",
    withCredentials: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        // "content-type": "multipart/form-data",
        // 'Authorization': `Bearer ${document.cookie}`,
    },
});
