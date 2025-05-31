import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookmarkHeader from '@/bookmark/components/BookmarkHeader';
import BookmarkFilterBar from '@/mentorship/components/mentorlist/MentorshipFilterBar';
import BookmarkSortDropdown from '@/bookmark/components/BookmarkSortDropdown';
import BookmarkMentorCard from '@/bookmark/components/BookmarkMentorCard';
import BookmarkListFilter from '@/mentorship/components/mentorlist/MentorshipListFilter';
import Footer from '@/global/components/Footer';
import { useBookmarkStore } from '@/bookmark/store/BookmarkStore';
import { useMentorStore } from '@/mentorship/store/useMentorStore';
import { subFieldOptions } from '@/global/components/JobCategories';

const Bookmark = () => {
  const navigate = useNavigate();

  // Zustand에서 상태와 액션 가져오기
  const {
    sortOption,
    selectedField,
    selectedSubField,
    activeFilterType,
    setSortOption,
    setSelectedField,
    setSelectedSubField,
    setActiveFilterType,
  } = useBookmarkStore();

  const { mentors, bookmarked, toggleBookmark } = useMentorStore();

  const subFields = subFieldOptions[selectedField ?? '전체'] ?? [];

  // 필터 선택 핸들러
  const handleFieldSelect = (field: string | null) => {
    setSelectedField(field);
    // 필터 선택 후 모달 닫기
    const modalElement = document.querySelector('.animate-slide-out');
    if (modalElement) {
      modalElement.addEventListener('animationend', () => {
        setActiveFilterType(null);
      }, { once: true });
    } else {
      setActiveFilterType(null);
    }
  };

  const handleSubFieldSelect = (sub: string | null) => {
    setSelectedSubField(sub);
    // 필터 선택 후 모달 닫기
    const modalElement = document.querySelector('.animate-slide-out');
    if (modalElement) {
      modalElement.addEventListener('animationend', () => {
        setActiveFilterType(null);
      }, { once: true });
    } else {
      setActiveFilterType(null);
    }
  };

  // 필터링된 멘토 리스트 계산
  const filteredMentors = mentors.filter((mentor) => {
    const matchField =
      !selectedField || selectedField === '전체' || mentor.organization.jobCategory === selectedField;
    const matchSubField =
      !selectedSubField || selectedSubField === '전체' || mentor.organization.detailedJob === selectedSubField;
    const isBookmarked = bookmarked[mentor.nickname] === true;
    return matchField && matchSubField && isBookmarked;
  });

  return (
    <div className="h-screen flex flex-col bg-white relative">
      {/* 상단 헤더 + 필터바 + 정렬 */}
      <div className="sticky top-0 w-full max-w-[600px] mx-auto bg-white z-20">
        <BookmarkHeader />
        <BookmarkFilterBar
          selectedField={selectedField}
          selectedSubField={selectedSubField}
          onFilterClick={(type) => setActiveFilterType(type)}
        />
        <BookmarkSortDropdown sortOption={sortOption} onSortChange={setSortOption} />
      </div>

      {/* 필터 팝업 */}
      {activeFilterType && (
        <BookmarkListFilter
          filterType={activeFilterType}
          onClose={() => setActiveFilterType(null)}
          selectedField={selectedField}
          onFieldSelect={handleFieldSelect}
          selectedSubField={selectedSubField}
          onSubFieldSelect={handleSubFieldSelect}
          subFields={subFields}
        />
      )}

      {/* 멘토 카드 리스트 */}
      <div className="flex flex-col px-4 gap-4 mt-4 pb-20 overflow-y-auto">
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <BookmarkMentorCard
              key={mentor.mentorId}
              mentor={mentor}
              isBookmarked={bookmarked[mentor.nickname]}
              onToggleBookmark={toggleBookmark}
            />
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