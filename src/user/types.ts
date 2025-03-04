export interface MentorData {
  nickname: string;
  email: string;
  education: {
    schoolName: string;
    major: string;
  };
  organization: {
    name: string;
    role: string;
    experience: number;
  };
  count: string;
  image: {
    fileName: string;
    filePath: string;
  };

  introduction: {
    summary: string;
    bio: string;
  };
  availableDays: string[];
  timezone: {
    startTime: {
      period: string;
      hour: string;
      minute: string;
    };
    endTime: {
      period: string;
      hour: string;
      minute: string;

    };
  };
    
  mentoringField: string[];
  hashtags: string[];
  message: string;
  portfolio: { 
    url: string;
    description: string;
    size: number;
  }[];
}