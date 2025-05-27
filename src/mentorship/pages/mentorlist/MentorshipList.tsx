import { useState, useEffect, useRef, useCallback } from 'react';
import MentorshipHeader from '@/mentorship/components/mentorlist/MentorshipHeader';
import MentorshipFilterBar from '@/mentorship/components/mentorlist/MentorshipFilterBar';
import MentorshipSortDropdown from '@/mentorship/components/mentorlist/MentorshipSortDropdown';
import MentorList from '@/mentorship/components/mentorlist/MentorList';
import Footer from '@/global/components/Footer';
import MentorshipListFilter from '@/mentorship/components/mentorlist/MentorshipListFilter';
import { fetchMentors } from '../../api/fetchMentors';
import { Mentor } from '../../api/fetchMentors';
import {
  fieldOptions,
  subFieldOptions,
} from '@/global/components/JobCategories';

const MentorshipList = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [sortOption, setSortOption] = useState<string>('respond');
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedSubField, setSelectedSubField] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'직무' | '세부직무' | null>(null);
  const [bookmarked, setBookmarked] = useState<{ [key: string]: boolean }>({});
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const subFields = subFieldOptions[selectedField || '전체'] ?? [];
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
  }, [loading, hasMore, cursor, sortOption]); 
  
  const filteredMentors = mentors.filter((mentor) => {
    const matchField =
      !selectedField || selectedField === '전체' ? true : mentor.organization.jobCategory === selectedField;

    const matchSubField =
      !selectedSubField || selectedSubField === '전체' ? true : mentor.organization.detailedJob === selectedSubField;
    
    return matchField && matchSubField;
  });

  const loadMoreMentors = async () => {
    if (loading || !hasMore) return;
  
    setLoading(true);
    const currentCursor = cursor ?? undefined;
  
    try {
      // 세 번째 인자로 sortOption 추가! 
      const res = await fetchMentors(currentCursor, size, sortOption);
      const { content, sliceInfo } = res.data;
  
      setMentors((prev) => {
        const existingIds = new Set(prev.map((m) => m.mentorId));
        const filteredNew = content.filter((m) => !existingIds.has(m.mentorId));
        return [...prev, ...filteredNew];
      });
  
      if (content.length > 0) {
        setCursor(content[content.length - 1].mentorId);
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

  useEffect(() => {
    console.log('Mentor 리스트', mentors);
  }, [mentors]);

  return (
    <div className="h-screen flex flex-col bg-white relative">
      <div className="sticky top-[16px] w-full max-w-[600px] mx-auto bg-white z-20">
        <MentorshipHeader selectedField={selectedField} />
        <MentorshipFilterBar
          selectedField={selectedField}
          selectedSubField={selectedSubField}
          onFilterClick={(type: '직무' | '세부직무') => setFilterType(type)}
        />
        <MentorshipSortDropdown sortOption={sortOption} onSortChange={setSortOption} />
      </div>
      <div className="flex-grow overflow-y-auto pb-[60px] mt-[16px] no-scrollbar">
        <MentorList
          mentors={filteredMentors}
          bookmarked={bookmarked}
          onToggleBookmark={(nickname) => setBookmarked((prev) => ({ ...prev, [nickname]: !prev[nickname] }))}
          lastMentorRef={lastMentorElementRef}
        />
      </div>
      {loading && <p className="text-center p-4">Loading more mentors...</p>}
      {filterType && (
        <MentorshipListFilter
          filterType={filterType}
          onClose={() => setFilterType(null)}
          selectedField={selectedField}
          onFieldSelect={(field) => {
            setSelectedField(field);
            setSelectedSubField(null); 
          }}
          selectedSubField={selectedSubField}
          onSubFieldSelect={setSelectedSubField}
        />
      )}
      <Footer />
    </div>
  );
};

export default MentorshipList;