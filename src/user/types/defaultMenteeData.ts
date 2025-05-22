// src/user/types/defaultMenteeData.ts
import { MenteeProfileData, MenteeCertificateData } from './profileTypes';

export const defaultMenteeProfile: MenteeProfileData = {
  nickname: '',
  introduction: '',
  education: { schoolName: '', major: '' },
  image: {
    fileName: '',
    filePath: '/assets/ringusprofile.png',
  },
};

export const defaultMenteeSetup: MenteeCertificateData = {
  file: '', // 기본값: 빈 파일
  certificateType: 'ENROLLMENT',
};
