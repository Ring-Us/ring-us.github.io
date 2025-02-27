import apiClient from '@/auth/api/apiClient';

// 이메일 인증번호 요청 API
export const sendVerificationCode = async (email: string) => {
  return await apiClient.post(`/v1/auth/email/code`, { email });
};

// 이메일 인증번호 검증 API
export const verifyCode = async (email: string, code: string) => {
  const response = await apiClient.post(`/v1/auth/email/code/verify`, {
    email,
    code,
  });
  return response.data; // 백엔드 응답 반환 (성공/실패 여부 포함)
};
