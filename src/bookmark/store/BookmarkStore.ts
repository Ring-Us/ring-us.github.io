import { create } from 'zustand';

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
    jobCategory: string;    // 직무
    detailedJob: string;    // 세부직무
    experience: number;
  };
  message: string;
  mentoringCount: number;
}

interface BookmarkState {
  mentors: Mentor[];
  sortOption: string;
  selectedField: string | null;
  selectedSubField: string | null;
  activeFilterType: '직무' | '세부직무' | null;

  // 액션들
  setMentors: (data: Mentor[]) => void;
  setSortOption: (opt: string) => void;
  setSelectedField: (field: string | null) => void;
  setSelectedSubField: (sub: string | null) => void;
  setActiveFilterType: (type: '직무' | '세부직무' | null) => void;
}

export const useBookmarkStore = create<BookmarkState>((set) => ({
  // 초기 상태
  mentors: [
    {
      mentorId: 1,
      nickname: '트레블',
      imgUrl: '../../assets/Profile.png',
      introduction: {
        title: '함께 성장해요',
        content: '제가 가진 노하우를 공유하고 싶어요.',
      },
      organization: {
        name: '제일기획',
        jobCategory: '마케팅',
        detailedJob: '브랜드 마케팅',
        experience: 5,
      },
      message: '환영합니다!',
      mentoringCount: 15,
    },
    {
      mentorId: 2,
      nickname: '트레블',
      imgUrl: '../../assets/Profile.png',
      introduction: {
        title: '같이 성장해요!',
        content: '경험 나눠요~',
      },
      organization: {
        name: '제일기획',
        jobCategory: '마케팅',
        detailedJob: '브랜드 마케팅',
        experience: 5,
      },
      message: '연락 기다릴게요!',
      mentoringCount: 15,
    },
    {
      mentorId: 3,
      nickname: '트레블',
      imgUrl: '../../assets/Profile.png',
      introduction: {
        title: '노하우 전수!',
        content: '많이 알려드릴게요!',
      },
      organization: {
        name: '제일기획',
        jobCategory: '금융',
        detailedJob: '컨설턴트',
        experience: 5,
      },
      message: '파이팅!',
      mentoringCount: 15,
    },
  ],
  sortOption: 'oldest',
  selectedField: null,
  selectedSubField: null,
  activeFilterType: null,

  // 액션 구현
  setMentors: (data) => set(() => ({ mentors: data })),
  setSortOption: (opt) => set(() => ({ sortOption: opt })),
  setSelectedField: (field) => set(() => ({ selectedField: field })),
  setSelectedSubField: (sub) => set(() => ({ selectedSubField: sub })),
  setActiveFilterType: (type) => set(() => ({ activeFilterType: type })),
}));