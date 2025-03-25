import { useState, useEffect, useRef, useCallback } from 'react';
import MentorshipHeader from '@/mentorship/components/mentorlist/MentorshipHeader';
import MentorshipFilterBar from '@/mentorship/components/mentorlist/MentorshipFilterBar';
import MentorshipSortDropdown from '@/mentorship/components/mentorlist/MentorshipSortDropdown';
import MentorList from '@/mentorship/components/mentorlist/MentorList';
import Footer from '@/global/components/Footer';
import MentorshipListFilter from '@/mentorship/components/mentorlist/MentorshipListFilter';
import { fetchMentors } from '../../api/fetchMentors';
import { Mentor } from '../../api/fetchMentors';

const MentorshipList = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [sortOption, setSortOption] = useState<string>('respond');
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedSubField, setSelectedSubField] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<{ [key: string]: boolean }>({});
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const size = 5;

  const observer = useRef<IntersectionObserver | null>(null);
  const lastMentorElementRef = useCallback((node: Element | null) => {
    if (loading) return;
  
    if (observer.current) observer.current.disconnect();
  
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        loadMoreMentors();
      }
    });
  
    if (node) observer.current.observe(node);
  }, [loading, hasMore, cursor]); 

  const loadMoreMentors = async () => {
    if (loading || !hasMore) return;
  
    setLoading(true);
  
    // ✅ 현재 커서 값을 따로 저장
    const currentCursor = cursor ?? undefined;
  
    try {
      const res = await fetchMentors(currentCursor, size);
      const { content, sliceInfo } = res.data;
  
      // ✅ 받은 mentorId 배열
      const newMentors = content;
  
      // ✅ 중복 방지를 위해 mentorId 기준 필터링
      setMentors((prev) => {
        const existingIds = new Set(prev.map((m) => m.mentorId));
        const filteredNew = newMentors.filter((m) => !existingIds.has(m.mentorId));
        return [...prev, ...filteredNew];
      });
  
      // ✅ 다음 요청을 위한 커서 업데이트
      if (newMentors.length > 0) {
        const nextCursor = newMentors[newMentors.length - 1].mentorId;
        setCursor(nextCursor);
      }
  
      setHasMore(!sliceInfo.last);
    } catch (err) {
      console.error('멘토 로드 실패:', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadMoreMentors();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-100 relative">
      <div className="sticky top-[16px] w-full max-w-[600px] mx-auto bg-gray-100 z-20">
        <MentorshipHeader />
        <MentorshipFilterBar
          selectedField={selectedField}
          selectedSubField={selectedSubField}
          selectedYear={selectedYear}
          onFilterClick={(field: string) => setSelectedField(field)}
        />
        <MentorshipSortDropdown sortOption={sortOption} onSortChange={setSortOption} />
      </div>
      <div className="flex-grow overflow-y-auto pb-[60px] mt-[16px] no-scrollbar">
        <MentorList
          mentors={mentors}
          bookmarked={bookmarked}
          onToggleBookmark={(nickname) => setBookmarked((prev) => ({ ...prev, [nickname]: !prev[nickname] }))}
          lastMentorRef={lastMentorElementRef}
        />
      </div>
      {loading && <p className="text-center p-4">Loading more mentors...</p>}
      {selectedField && (
        <MentorshipListFilter
          filterType={selectedField}
          onClose={() => setSelectedField(null)}
          selectedField={selectedField}
          onFieldSelect={setSelectedField}
          selectedSubField={selectedSubField}
          onSubFieldSelect={setSelectedSubField}
        />
      )}
      <Footer />
    </div>
  );
};

export default MentorshipList;
