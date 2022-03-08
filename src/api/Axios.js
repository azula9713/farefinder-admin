import axios from "axios";

const Api = axios.create({
  baseURL: "https://api.farefinder.co.uk/api/v1",
});

export default Api;
