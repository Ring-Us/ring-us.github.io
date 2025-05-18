import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookmarkHeader from '@/bookmark/components/BookmarkHeader';
import BookmarkFilterBar from '@/mentorship/components/mentorlist/MentorshipFilterBar';
import BookmarkSortDropdown from '@/bookmark/components/BookmarkSortDropdown';
import BookmarkMentorCard from '@/bookmark/components/BookmarkMentorCard';
import BookmarkListFilter from '@/mentorship/components/mentorlist/MentorshipListFilter';
import Footer from '@/global/components/Footer';

// 👉 최신 Mentor 타입
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
    jobCategory: string; // 직무
    detailedJob: string; // 세부직무
    experience: number;
  };
  message: string;
  mentoringCount: number;
}

const Bookmark = () => {
  const navigate = useNavigate();

  // 👉 멘토 리스트 (임시 데이터)
  const [mentors, setMentors] = useState<Mentor[]>([
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
  ]);

  //정렬 상태
  const [sortOption, setSortOption] = useState<string>('oldest');

  //필터 상태
  const [selectedField, setSelectedField] = useState<string | null>(null);       // 직무
  const [selectedSubField, setSelectedSubField] = useState<string | null>(null); // 세부직무

  //필터 팝업을 열기 위한 상태
  const [activeFilterType, setActiveFilterType] = useState<'직무' | '세부직무' | null>(null);

  //필터링된 멘토 리스트
  const filteredMentors = mentors.filter((mentor) => {
    const matchField =
      !selectedField || selectedField === '전체' || mentor.organization.jobCategory === selectedField;
  
    const matchSubField =
      !selectedSubField || selectedSubField === '전체' || mentor.organization.detailedJob === selectedSubField;
  
    return matchField && matchSubField;
  });

  return (
    <div className="h-screen flex flex-col bg-white relative">
      {/* 상단 헤더 + 필터바 + 정렬 */}
      <div className="sticky top-0 w-full max-w-[600px] mx-auto bg-white z-20">
        <BookmarkHeader />
        <BookmarkFilterBar
          selectedField={selectedField}
          selectedSubField={selectedSubField}
          onFilterClick={(type) => setActiveFilterType(type)} // ✅ 필터 종류에 따라 모달 열기
        />
        <BookmarkSortDropdown sortOption={sortOption} onSortChange={setSortOption} />
      </div>

      {/* 필터 팝업 */}
      {activeFilterType && (
        <BookmarkListFilter
          filterType={activeFilterType}
          onClose={() => setActiveFilterType(null)}
          selectedField={selectedField}
          onFieldSelect={setSelectedField}
          selectedSubField={selectedSubField}
          onSubFieldSelect={setSelectedSubField}
        />
      )}

      {/* 멘토 카드 리스트 */}
      <div className="flex flex-col px-4 gap-4 mt-4 pb-20 overflow-y-auto">
      {filteredMentors.length > 0 ? (
    filteredMentors.map((mentor) => (
      <BookmarkMentorCard key={mentor.mentorId} mentor={mentor} />
    ))
  ) : (
    <div className="text-center text-gray-2 mt-6">멘토 내역이 없습니다.</div>
  )}
      </div>
        <Footer />
    </div>
  );
};

export default Bookmark;