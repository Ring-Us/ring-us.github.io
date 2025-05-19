export interface MenteeData {
  nickname: string;
  email: string;
  education: {
    schoolName: string;
    major: string;
  };
  introduction: string;
  image: {
    fileName: string;
    filePath: string;
  };
}