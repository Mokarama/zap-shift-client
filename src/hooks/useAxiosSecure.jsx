import axios from "axios";

const useAxiosSecure = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true, // if needed
  });

  // Example interceptor
  instance.interceptors.response.use(
    res => res,
    err => {
      console.error("Axios error:", err);
      return Promise.reject(err);
    }
  );

  return instance;
};

export default useAxiosSecure;
