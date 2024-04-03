import axios from "axios";

//URL em que fazemos as requisições da API
const API_URL = "http://192.168.0.144:8081/api/v1/"

//Definindo a instância da URL para as requisições utilizando AXIOS
const instance = axios.create({
	baseURL: API_URL,
});

export default instance;

