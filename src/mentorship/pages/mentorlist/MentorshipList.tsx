import { useState, useEffect, useRef } from 'react';
import { MentorType } from './MentorshipList.types';
import MentorshipHeader from '../../components/MentorshipHeader';
import MentorshipFilterBar from '../../components/MentorshipFilterBar';
import MentorshipSortDropdown from '../../components/MentorshipSortDropdown';
import MentorList from '../../components/MentorList';
import MentorshipFooter from '../../components/MentorshipFooter';
import MentorshipListFilter from '../../components/MentorshipListFilter';

const mentorshipData: MentorType[] = [
  { mName: '트레블', mJob: '마케팅', mcompany: '제일기획', mJobDetail: '퍼포먼스 마케팅', mYear: '5년차', respond: 29, intro: '“퍼포먼스 마케팅에 대해 알려드립니다.”' },
  { mName: '트레블2', mJob: '마케팅', mcompany: '하나기획', mJobDetail: '디지털/소셜 마케팅', mYear: '7년차', respond: 54, intro: '“소셜 미디어 최적화와 브랜딩 노하우를 알려드립니다.”' },
  { mName: '트레블3', mJob: '서비스 기획', mcompany: '삼송회사', mJobDetail: '전략 기획', mYear: '3년차', respond: 123, intro: '“시장 조사 및 제품 기획에 관한 경험을 공유합니다.”' },
  { mName: '트레블4', mJob: '디자인', mcompany: '엘지물산', mJobDetail: 'UX/UI디자인', mYear: '5년차', respond: 85, intro: '“UI/UX 디자인의 최신 트렌드를 안내합니다.”' },
  { mName: '트레블5', mJob: '개발', mcompany: '아플', mJobDetail: '풀스택 개발자', mYear: '7년차', respond: 190, intro: '“웹 개발에 필요한 기술들을 알려드립니다.”' },
  { mName: '트레블6', mJob: '개발', mcompany: 'HSAD', mJobDetail: 'iOS/Android 개발자', mYear: '3년차', respond: 165, intro: '“모바일 앱 및 AI/ML 개발에 대해 경험을 공유합니다.”' },
  { mName: '트레블7', mJob: '마케팅', mcompany: '최고기업', mJobDetail: '디지털/소셜 마케팅', mYear: '5년차', respond: 80, intro: '“브랜딩 전략과 소셜 미디어 마케팅에 관해 설명합니다.”' },
  { mName: '트레블8', mJob: '데이터', mcompany: '두리티비', mJobDetail: '데이터 애널리스트', mYear: '7년차', respond: 88, intro: '“데이터 분석과 엔지니어링의 노하우를 공유합니다.”' },
  { mName: '트레블9', mJob: '의료', mcompany: '삼송기획', mJobDetail: '의료 데이터 분석', mYear: '5년차', respond: 75, intro: '“의료 분야의 데이터 분석과 임상 연구를 소개합니다.”' },
  { mName: '트레블10', mJob: '법률', mcompany: '제일기획', mJobDetail: '법률자문', mYear: '7년차', respond: 95, intro: '“법률 자문과 계약 검토에 대해 전문적인 조언을 드립니다.”' }
];

const MentorshipList = () => {
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMentors, setFilteredMentors] = useState(mentorshipData);
  const [sortOption, setSortOption] = useState('review');
  const [filterType, setFilterType] = useState<string | null>(null);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedSubField, setSelectedSubField] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<{ [key: string]: boolean }>({});

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const currentScrollY = container.scrollTop;
      if (currentScrollY > lastScrollYRef.current) {
        setIsFooterVisible(false);
      } else {
        setIsFooterVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-100 relative">
      {/* 헤더 */}
      <div className="sticky top-0 w-full max-w-[600px] mx-auto bg-gray-100 z-20">
        <MentorshipHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <MentorshipFilterBar
          selectedField={selectedField}
          selectedSubField={selectedSubField}
          selectedYear={selectedYear}
          onFilterClick={setFilterType}
        />
        <MentorshipSortDropdown sortOption={sortOption} onSortChange={setSortOption} />
      </div>

      {/* 스크롤 영역 */}
      <div ref={scrollContainerRef} className="flex-grow overflow-y-auto pb-[60px] no-scrollbar">
        <MentorList
          mentors={filteredMentors}
          bookmarked={bookmarked}
          onToggleBookmark={(mName) =>
            setBookmarked((prev) => ({ ...prev, [mName]: !prev[mName] }))
          }
        />
      </div>

      {/* 필터 모달 */}
      {filterType && (
        <MentorshipListFilter
          filterType={filterType}
          onClose={() => setFilterType(null)}
          selectedField={selectedField}
          onFieldSelect={setSelectedField}
          selectedSubField={selectedSubField}
          onSubFieldSelect={setSelectedSubField}
        />
      )}

      {/* 푸터 */}
      <MentorshipFooter isVisible={isFooterVisible} />
    </div>
  );
};

export default MentorshipList;