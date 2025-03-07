import { create } from 'zustand';
import axiosInstance from '@/global/api/axiosInstance';

interface AuthState {
  isAuthenticated: boolean;
  isSessionChecked: boolean; // 세션 체크 완료 여부 추가
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isSessionChecked: false, // 세션 체크 전까지는 false
  user: null,

  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/v1/auth/login', {
        email,
        password,
      });

      set({ isAuthenticated: true, user: response.data.user });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || '로그인 실패';
      throw new Error(errorMessage);
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/v1/auth/logout');
      set({ isAuthenticated: false, user: null, isSessionChecked: true }); // 로그아웃 후에도 isSessionChecked 유지
    } catch (error) {
      console.error('❌ 로그아웃 실패:', error);
    }
  },

  checkSession: async () => {
    try {
      const response = await axiosInstance.get('/v1/members/check-session');
      set({ isAuthenticated: true, isSessionChecked: true });
    } catch (error: any) {
      if (error.response?.status === 401) {
        // 401 오류 발생 시 콘솔에 출력하지 않고 상태만 업데이트
        set({ isAuthenticated: false, isSessionChecked: true });
      } else {
        // 401 외의 다른 오류만 콘솔에 출력
        console.error('❌ 세션 체크 중 오류 발생:', error);
      }
    }
  },
}));
