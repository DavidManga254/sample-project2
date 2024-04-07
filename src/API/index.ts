import type { AxiosInstance } from "axios";
import axios from "axios";
import MovieApi from "./movie";

class API {
  private Axios: AxiosInstance;
  private baseUrl = import.meta.env.PUBLIC_API_URL;
  private bearerToken = import.meta.env.SECRET_API_BEARER_TOKEN;
  private apiKey = import.meta.env.PUBLIC_API_KEY;

  constructor() {
    console.log(this.bearerToken);
    console.log(this.baseUrl);
    this.Axios = axios.create({
      baseURL: this.baseUrl,
      timeout: 2000,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.bearerToken}`,
      },
    });

    this.Axios.interceptors.request.use((config) => {
      config.params = {
        ...config.params,
        api_key: this.apiKey,
      };

      return config;
    });
  }

  movies() {
    return new MovieApi(this.Axios);
  }
}

export default new API();
