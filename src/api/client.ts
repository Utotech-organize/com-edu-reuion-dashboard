import axios from "axios";

const client = () => {
  const defualtOptions = {
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": true,
    },
  };

  let instance = axios.create(defualtOptions);

  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 403 || error.response.status === 401) {
        window.location.href = "/login";
        localStorage.removeItem("token");
      }
    }
  );

  return instance;
};

export default client();
