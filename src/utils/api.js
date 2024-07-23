import axios from "axios";

const createApi = () => {
  const api = axios.create({
    baseURL:
      process.env.REACT_APP_ENV === "production"
        ? // ? // ? "http://34.204.45.4"
          // "http://54.161.200.36"
          "https://api.nestkeeper.net"
        : "http://127.0.0.1:8000",
  });
  return api;
};

export default createApi;
