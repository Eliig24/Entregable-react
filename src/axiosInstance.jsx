import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si no tiene config o no salió al backend, no seguir
    if (!originalRequest) throw error;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axiosInstance.get("auth/refresh", { _retry: true });

        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        console.error("Refresh failed:", refreshErr);
        throw error; // FIN → NO LOOP
      }
    }

    throw error;
  }
);

export default axiosInstance;
