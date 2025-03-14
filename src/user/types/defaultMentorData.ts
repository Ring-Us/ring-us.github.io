// src/user/types/defaultMentorData.ts
import { MentorProfileData, MentorCertificateData } from './profileTypes';

export const defaultMentorProfile: MentorProfileData = {
  nickname: '',
  introduction: { title: '', content: '' },
  mentoringField: [],
  education: { schoolName: '', major: '' },
  organization: {
    name: '',
    jobCategory: '',
    detailedJob: '',
    experience: 0,
  },
  timezone: {
    days: [], // 'MON','TUE'
    startTime: '', // '09:30:00:00
    endTime: '',
  },
  hashtags: [],
  message: '',
  portfolio: { url: '', description: '' },
  image: { fileName: '', filePath: '' },
};

export const defaultMentorSetup: MentorCertificateData = {
  file: '', // 기본값: 빈 파일
  certificateType: 'ENROLLMENT',
};
