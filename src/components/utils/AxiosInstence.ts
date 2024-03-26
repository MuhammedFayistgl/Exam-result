import axios from "axios";
// import env from "react-dotenv";

// const url = env.NODE_ENV === "production" ? "https://exam-result.onrender.com" : "http://localhost:8000/";
export const AxiosInstance = axios.create({
	baseURL:"https://exam-result.onrender.com",
	withCredentials: true,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		// "content-type": "multipart/form-data",
		// 'Authorization': `Bearer ${document.cookie}`,
	},
});
