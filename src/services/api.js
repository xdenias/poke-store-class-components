import axios from "axios";

const api = axios.create({
  baseURL: " https://pokeapi.co/api/v2/egg-group",
});

export default api;
