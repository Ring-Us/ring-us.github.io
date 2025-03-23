import axiosInstance from '@/global/api/axiosInstance';

export interface Mentor {
  mentorId: number;
  nickname: string;
  imgUrl: string;
  introduction: {
    title: string;
    content: string;
  };
  organization: {
    name: string;
    jobCategory: string;
    detailedJob: string;
    experience: number;
  };
  message: string;
  mentoringCount: number;
}

export interface MentorResponse {
  status: number;
  message: string;
  data: {
    content: Mentor[];
    sliceInfo: {
      size: number;
      numberOfElements: number;
      last: boolean;
      empty: boolean;
      cursor: number;
    };
  };
}

// ✅ 멘토 목록 조회 API
export const fetchMentors = async (cursor?: number , size: number = 5): Promise<MentorResponse> => {
  try {
    // URL 객체
    const nextUrl = new URL(`${import.meta.env.VITE_API_BASE_URL}/v1/mentor`);
    // 파라미터 추가
    nextUrl.searchParams.append('bookmarked', 'false');
    nextUrl.searchParams.append('suggested', 'false');
    nextUrl.searchParams.append('commissioned', 'false');
    nextUrl.searchParams.append('size', size.toString());
    nextUrl.searchParams.append('sort', 'mentorId,DESC');

    // 커서 있을때만 추가
    if (cursor !== undefined){
      nextUrl.searchParams.append('cursor', cursor.toString());
    }
    
    //요청
    const response = await axiosInstance.get<MentorResponse>(nextUrl.toString());
    return response.data;
  } catch (error: any) {
    console.error('❌ 멘토 목록 조회 실패:', error.response);
    throw error.response?.data?.message || '멘토 목록 조회 실패';
  }
};
