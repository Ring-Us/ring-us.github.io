import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // ✅ 환경변수 사용
  withCredentials: true, // 쿠키 기반 세션 유지
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
