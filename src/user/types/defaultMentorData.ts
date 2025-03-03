// src/user/types/defaultMentorData.ts
import { MentorProfileData, MentorCertificateData } from './profileTypes';

export const defaultMentorProfile: MentorProfileData = {
  email: '',
  nickname: '',
  introduction: '',
  mentoringField: [],
  education: { schoolName: '', major: '' },
  organization: { name: '', role: '', experience: 0 },
  timezone: {
    startTime: { hour: 0, minute: 0, second: 0, nano: 0 },
    endTime: { hour: 0, minute: 0, second: 0, nano: 0 },
  },
  hashtags: [],
  message: '',
  portfolio: { url: '', description: '' },
  image: { file: new File([], ''), filePath: '' },
};

export const defaultMentorSetup: MentorCertificateData = {
  file: '', // 기본값: 빈 파일
  certificateType: 'ENROLLMENT',
};
