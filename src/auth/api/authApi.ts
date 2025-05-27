import axiosInstance from '@/global/api/axiosInstance';

export const authApi = async (requestData: {
  memberType: string;
  email: string;
  password: string;
  serviceTerms: any[];
}) => {
  console.log('백엔드로 전송할 최종 데이터:', requestData);

  try {
    const response = await axiosInstance.post(
      '/v1/auth/signup', // 환경변수를 적용했으므로 상대 경로 사용 가능!
      requestData,
    );
    return response.data;
  } catch (error: any) {
    console.error('❌ 요청 실패:', error);
    console.error('❌ 서버 응답:', error.response);

    if (error.response) {
      console.log('📡 백엔드 응답 데이터:', error.response.data);
    }

    throw error.response?.data?.message || '회원가입 실패';
  }
};

//비밀번호 재설정 API
export const resetPassword = async (email: string, newPassword: string) => {
  try {
    const response = await axiosInstance.patch('/v1/members/password', {
      email,
      newPassword,
    });
    return response.data; // 성공 응답 반환
  } catch (error: any) {
    // 에러 메시지 반환
    throw error.response?.data?.message || '비밀번호 재설정에 실패했습니다.';
  }
};
