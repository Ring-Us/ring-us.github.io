export interface MenteeData {
  nickname: string;
  email: string;
  education: {
    schoolName: string;
    major: string;
  };
  image: {
    fileName: string;
    filePath: string;
  };
  introduction: {
    summary: string;
    bio: string;
  };
}