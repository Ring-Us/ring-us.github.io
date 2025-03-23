import { MentorData } from '../types';
import axiosInstance from '@/global/api/axiosInstance';

// 멘토 프로필 조회 API
export const getMentorProfile = async (): Promise<MentorData> => {
  const response = await axiosInstance.get('/v1/mentor/me');
  const data = response.data.data;

  return {
    nickname: data.nickname ?? '',
    education: data.education ?? { schoolName: '', major: '' },
    organization: data.organization ?? {
      name: '',
      jobCategory: '',
      detailedJob: '',
      experience: 0,
    },
    introduction: data.introduction ?? { title: '', content: '' },
    timezone: data.timezone ?? { days: [], startTime: '', endTime: '' },
    mentoringField: data.mentoringField ?? [],
    hashtags: data.hashtags ?? [],
    message: data.message ?? '',
    portfolio: data.portfolio ?? { url: '', description: '', size: 0 },
    image: data.image ?? { fileName: '', filePath: '' },
    count: data.count ?? 0,
  };
};

// 멘토 프로필 수정 API
export const updateMentorProfile = async (mentorData: MentorData): Promise<any> => {
  const response = await axiosInstance.put('/v1/mentor', mentorData);
  return response.data;
};