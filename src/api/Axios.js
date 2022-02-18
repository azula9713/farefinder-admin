import axios from "axios";

const Api = axios.create({
  baseURL: "https://farefinderapi.devserver.click/api/v1",
});

export default Api;
