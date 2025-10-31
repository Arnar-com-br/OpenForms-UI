import axios from "axios";

const API_ENDPOINT = "http://localhost:8080/api/v1";

export function post(endpoint: string, data?: any) {
  return axios.post(API_ENDPOINT + endpoint, data);
}

export function auth_get(endpoint: string) {
  const token = localStorage.getItem("AUTH_TOKEN");

  return axios.get(API_ENDPOINT + endpoint, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    fetchOptions: {
      mode: "cors"
    }
  })
}