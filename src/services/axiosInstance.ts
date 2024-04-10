import axios from "axios";
import { msalInstance } from "../authSSO/msalInstance";

//URL em que fazemos as requisições da API
const API_URL = "http://10.234.89.143:8081/api/v1/";

const token = msalInstance.getActiveAccount()?.idToken


const role = msalInstance.getActiveAccount()?.idTokenClaims?.roles

//Definindo a instância da URL para as requisições utilizando AXIOS
const instance = axios.create({
	baseURL: API_URL,
});


instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
instance.defaults.headers.common['Role'] = role


export default instance;
