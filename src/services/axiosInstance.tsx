import axios from "axios";
const API_URL = "http://10.234.86.139:8081/api/v1/"

const instance = axios.create({
	baseURL: API_URL,
});

export default instance;

