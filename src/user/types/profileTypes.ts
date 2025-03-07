export interface MentorProfileData {
  email: string;
  nickname: string;
  introduction: string;
  mentoringField: string[];
  education: {
    schoolName: string;
    major: string;
  };
  organization: {
    name: string;
    role: string;
    experience: number;
  };
  timezone: {
    startTime: { hour: number; minute: number; second: number; nano: number };
    endTime: { hour: number; minute: number; second: number; nano: number };
  };
  hashtags: string[];
  message: string;
  portfolio: { url: string; description: string };
  image: { file: File; filePath: string };
}
export interface MentorCertificateData {
  file: string; // 업로드할 파일
  certificateType: 'ENROLLMENT' | 'GRADUATION' | 'CERTIFICATION'; // 예제에 따라 추가 가능
}

export interface MenteeProfileData {
  email: string;
  nickname: string;
  introduction: string;
  education: {
    schoolName: string;
    major: string;
  };
  image: {
    fileName: string;
    filePath: string;
  };
}

export interface MenteeCertificateData {
  file: string;
  certificateType: 'ENROLLMENT' | 'GRADUATION' | 'CERTIFICATION';
}
