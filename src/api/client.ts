import axios from "axios";

const client = () => {
  const defualtOptions = {
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };
  let instance = axios.create(defualtOptions);

  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");

    config.headers.access_token = token;
    return config;
  });

  return instance;
};

export default client();
