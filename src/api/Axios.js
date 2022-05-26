import axios from "axios";

const Api = axios.create({
  // baseURL: "https://api.farefinder.co.uk/api/v1",
  baseURL: "http://localhost:1337/api/v1",
});

export default Api;
