export interface MentorData {
  nickname: string;
  email: string;
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
    fileSize: number;
  } | null;
  image: {
    fileName: string;
    filePath: string;
  };

  mentoringCount: number;
}

export interface MentorViewData {
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
    fileSize: number;
  } | null;
  image: {
    fileName: string;
    filePath: string;
  };

  mentoringCount: number;
}

export interface ApplyTime {
  startTime: string;
  endTime: string;
}

export interface SuggestionRequest {
  topic: string;
  mentoringMessage: string;
  applyTimes: ApplyTime[];
  mentorId: number;
}

export interface SuggestionData extends SuggestionRequest {
  mentoringId: number;
  status: string;
  mentorName: string;
  menteeName: string;
}