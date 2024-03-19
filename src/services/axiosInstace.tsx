import axios from "axios";

const instance = axios.create({
	baseURL: "http://10.234.86.139:8081/api/v1/",
});

export default instance;
