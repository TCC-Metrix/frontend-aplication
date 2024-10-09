import axios, { InternalAxiosRequestConfig } from "axios";
import { msalInstance } from "../authSSO/msalInstance";
import { loginRequest } from "../authSSO/authConfig";
import { AuthenticationResult } from "@azure/msal-common";

//URL em que fazemos as requisições da API

const API_URL = "http://10.21.240.172:8081/api/v1/";

//Definindo a instância da URL para as requisições utilizando AXIOS
const instance = axios.create({
	baseURL: API_URL,
});

async function acquireToken(
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> {
  try {
    const tokenResponse: AuthenticationResult = await msalInstance.acquireTokenSilent(loginRequest);
    const token = tokenResponse.idToken;
    config.headers.Authorization = `Bearer ${token}`
    return config;
  } catch (error) {
    if (error) {
      // Se ocorrer um erro que requer interação do usuário, redirecione para autenticação interativa
      console.log("deu erro")
      await msalInstance.acquireTokenRedirect(loginRequest);
    } else {
      // Lida com outros erros de forma apropriada
      console.error("Erro ao adquirir token:", error);
      throw error; // Lança o erro para ser tratado pelo chamador
    }

    // Retorna o objeto de configuração original para garantir que o encadeamento da solicitação continue
    return config;
  }
}


instance.interceptors.request.use(acquireToken);

export default instance;

//10.234.89.143 - prates api
//10.234.81.80 - julia api
//10.109.72.48
//192.168.56.1 julia api senai
//10.109.71.25 aprigio notebook senai
//192.168.1.177 aprigio casa
//10.21.240.172 server