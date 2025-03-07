import axiosInstance from '@/global/api/axiosInstance';
import {
  MentorProfileData,
  MentorCertificateData,
  MenteeProfileData,
  MenteeCertificateData,
} from '@/user/types/profileTypes';

// ✅ 멘티 프로필 이미지 업로드 API
export const uploadProfileImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file); // ✅ 이미지 파일 추가
  formData.append('memberType', 'MENTEE'); // ✅ 사용자 유형 추가

  try {
    const response = await axiosInstance.post(
      'v1/storage/profile/image',
      formData,
    );
    console.log('이미지 URL:', response.data.message);
    return response.data.message; // ✅ 백엔드에서 반환한 이미지 URL
  } catch (error) {
    throw new Error('이미지 업로드 실패');
  }
};

// 멘토 프로필 등록 API
export const createMentorProfile = async (mentorData: MentorProfileData) => {
  try {
    const response = await axiosInstance.post('/v1/mentor', mentorData);
    return response.data;
  } catch (error: any) {
    console.error('❌ 멘토 프로필 등록 실패:', error.response);
    throw error.response?.data?.message || '멘토 프로필 등록 실패';
  }
};

// 멘토 증명서 등록 API
export const createMentorCertification = async (
  mentorSetupData: MentorCertificateData,
) => {
  try {
    const response = await axiosInstance.post(
      '/v1/storage/certificate/mentor',
      mentorSetupData,
    );
    return response.data;
  } catch (error: any) {
    console.error('❌ 멘토 설정 등록 실패:', error.response);
    throw error.response?.data?.message || '멘토 설정 등록 실패';
  }
};

// 멘티 프로필 등록 API
export const createMenteeProfile = async (menteeData: MenteeProfileData) => {
  try {
    const response = await axiosInstance.post('/v1/mentee', menteeData);
    return response.data;
  } catch (error: any) {
    console.error('❌ 멘티 프로필 등록 실패:', error.response);
    throw error.response?.data?.message || '멘티 프로필 등록 실패';
  }
};

// 멘티 인증서 업로드 API

export const uploadMenteeCertificate = async (
  file: File,
  certificateType: string,
): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file); // ✅ 백엔드에서 file 필드로 받음
  formData.append('certificateType', certificateType); // ✅ 증명서 타입 추가

  try {
    const response = await axiosInstance.post(
      '/v1/storage/certificate/mentee',
      formData,
    );

    console.log('📤 인증서 업로드 응답:', response.data);
    return response.data.message; // ✅ 백엔드 응답에서 파일 경로 반환
  } catch (error) {
    console.error('❌ 인증서 업로드 실패:', error);
    throw error;
  }
};
