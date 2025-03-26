export interface MentorData {
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
  portfolio: {
    url: string;
    description: string;
    size: number;
  } | null;
  image: {
    fileName: string;
    filePath: string;
  };

  mentoringCount: number;
}
