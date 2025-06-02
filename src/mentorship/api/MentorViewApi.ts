import axiosInstance from '@/global/api/axiosInstance';
import { MentorViewData } from '@/user/types';

export const getMentorById = async (mentorId: number): Promise<MentorViewData> => {
  const response = await axiosInstance.get(`/v1/mentor/${mentorId}`);
  const data = response.data.data;

  console.log('멘토 프로필 응답:', response.data);

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
    portfolio: data.portfolio ?? { url: '', description: '', fileSize: 0 },
    image: data.image ?? { fileName: '', filePath: '' },
    mentoringCount: data.mentoringCount ?? '',
  };
};