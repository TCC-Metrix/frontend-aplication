import axios, { InternalAxiosRequestConfig } from "axios";
import { msalInstance } from "../authSSO/msalInstance";

//URL em que fazemos as requisições da API

const API_URL = "http://192.168.1.177:8081/api/v1/";


//Definindo a instância da URL para as requisições utilizando AXIOS
const instance = axios.create({
	baseURL: API_URL,

});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function acquireToken(
	config: InternalAxiosRequestConfig<any>
): Promise<InternalAxiosRequestConfig<any>> {
	const token = msalInstance.getActiveAccount()?.idToken;

	config.headers.Authorization = `Bearer ${token}`;

	return config;
}

instance.interceptors.request.use(acquireToken);

export default instance;

//10.234.89.143 - prates api
//10.234.90.186 - julia api
//10.109.72.48
//192.168.56.1 julia api senai
//10.109.71.25 aprigio notebook senai
//192.168.1.177 aprigio casa
