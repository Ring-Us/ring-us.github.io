export interface MentorProfileData {
  nickname: string;
  introduction: {
    title: string;
    content: string;
  };
  mentoringField: string[];
  education: {
    schoolName: string;
    major: string;
  };
  organization: {
    name: string;
    jobCategory: string;
    detailedJob: string;
    experience: number;
  };
  timezone: {
    days: string[];
    startTime: string;
    endTime: string;
  };
  hashtags: string[];
  message: string;
  portfolio: { url: string; description: string } | null;
  image: { fileName: string; filePath: string };
}
export interface MentorCertificateData {
  file: string; // 업로드할 파일
  certificateType: 'ENROLLMENT' | 'GRADUATION' | 'CERTIFICATION'; // 예제에 따라 추가 가능
}

export interface MenteeProfileData {
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
