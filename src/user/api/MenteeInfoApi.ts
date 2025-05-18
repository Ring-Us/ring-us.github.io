import { MenteeData } from "../menteetypes";
import axiosInstance from "@/global/api/axiosInstance";

// 멘티 프로필 조회 API
export const getMenteeProfile = async (): Promise<MenteeData> => {
  const response = await axiosInstance.get('/v1/mentee/me');
  const data = response.data.data;
  
  console.log('멘티 프로필 응답:', response.data);

  return {
    nickname: data.nickname ?? '',
    email: data.email ?? '',
    education: data.education ?? {
      schoolName: '',
      major: '',
    },
    introduction: data.introduction ?? '',
    image: data.image ?? {
      filePath: '',
    },
  };
};

// 멘티 프로필 수정 API
export const updateMenteeProfile = async (menteeData: MenteeData): Promise<any> => {
  const response = await axiosInstance.put('/v1/mentee', menteeData);
  return response.data;
};