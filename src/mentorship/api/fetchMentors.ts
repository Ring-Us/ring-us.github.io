import axiosInstance from '@/global/api/axiosInstance';

export interface Mentor {
  mentorId: number; 
  nickname: string;
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
  introduction: {
    title: string;
    content: string;
  };
  mentoringField: string[];
  hashtags: string[];
  timezone: {
    days: string[];
    startTime: string;
    endTime: string;
  };
  message: string;
  portfolio: {
    url: string;
    description: string;
  };
  image: {
    fileName: string;
    filePath: string;
  };
  mentoringCount: number;
}

// 페이지 정보 타입

export interface SliceInfo {
  size: number;
  numberOfElements: number;
  last: boolean;
  empty: boolean;
  cursor: number;
}


//전체 응답 구조
 
export interface MentorResponse {
  status: number;
  message: string;
  data: {
    content: Mentor[];
    sliceInfo: SliceInfo;
  };
}

//멘토 리스트를 서버에서 페이징 방식으로 불러오는 API

export const fetchMentors = async (
  cursor?: number,
  size: number = 5,
  sortOption?: string
): Promise<MentorResponse> => {
  try {
    const nextUrl = new URL(`${import.meta.env.VITE_API_BASE_URL}/v1/mentor`);

    // 기본 쿼리 파라미터
    nextUrl.searchParams.append('bookmarked', 'false');
    nextUrl.searchParams.append('suggested', 'false');
    nextUrl.searchParams.append('commissioned', 'false');
    nextUrl.searchParams.append('size', size.toString());

    // 정렬 옵션 있을 경우 DESC 추가
    if (sortOption) {
      nextUrl.searchParams.append('sort', `${sortOption},DESC`);
    }

    // 커서가 있을 경우 추가
    if (cursor != null) {
      nextUrl.searchParams.append('cursor', cursor.toString());
    }

    // API 요청
    const response = await axiosInstance.get<MentorResponse>(nextUrl.toString());
    return response.data;
  } catch (error: any) {
    console.error('❌ 멘토 목록 조회 실패:', error.response);
    throw error.response?.data?.message || '멘토 목록 조회 실패';
  }
};