import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookmarkHeader from '@/bookmark/components/BookmarkHeader';
import BookmarkFilterBar from '@/mentorship/components/mentorlist/MentorshipFilterBar';
import BookmarkSortDropdown from '@/bookmark/components/BookmarkSortDropdown';
import BookmarkMentorCard from '@/bookmark/components/BookmarkMentorCard';
import BookmarkListFilter from '@/mentorship/components/mentorlist/MentorshipListFilter';
import Footer from '@/global/components/Footer';
import { useBookmarkStore, Mentor } from '@/bookmark/store/BookmarkStore';

const Bookmark = () => {
  const navigate = useNavigate();

  // Zustand에서 상태와 액션 가져오기
  const {
    mentors,
    sortOption,
    selectedField,
    selectedSubField,
    activeFilterType,
    setSortOption,
    setSelectedField,
    setSelectedSubField,
    setActiveFilterType,
  } = useBookmarkStore();

  // 필터링된 멘토 리스트 계산
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
          onFilterClick={(type) => setActiveFilterType(type)} // Zustand 액션 호출
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