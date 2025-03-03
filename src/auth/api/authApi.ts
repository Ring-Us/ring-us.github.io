import axiosInstance from '@/global/api/axiosInstance';

export const authApi = async (requestData: {
  memberType: string;
  email: string;
  password: string;
  serviceTerms: any[];
}) => {
  //console.log('백엔드로 전송할 최종 데이터:', requestData);

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
