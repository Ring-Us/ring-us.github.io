import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // 쿠키 기반 세션 유지
});

// 요청 인터셉터 추가 (자동으로 `Content-Type` 설정)
axiosInstance.interceptors.request.use((config) => {
  // `FormData`가 포함된 경우 `Content-Type`을 `multipart/form-data`로 변경
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

export default axiosInstance;
