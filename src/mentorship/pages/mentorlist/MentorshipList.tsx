import React, { useRef, useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useMentorStore } from '@/mentorship/store/useMentorStore'
import MentorshipHeader from '@/mentorship/components/mentorlist/MentorshipHeader'
import MentorshipFilterBar from '@/mentorship/components/mentorlist/MentorshipFilterBar'
import MentorshipSortDropdown from '@/mentorship/components/mentorlist/MentorshipSortDropdown'
import MentorList from '@/mentorship/components/mentorlist/MentorList'
import Footer from '@/global/components/Footer'
import MentorshipListFilter from '@/mentorship/components/mentorlist/MentorshipListFilter'
import { subFieldOptions } from '@/global/components/JobCategories'

export default function MentorshipList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const {
    sortOption,
    selectedField,
    selectedSubField,
    filterType,
    bookmarked,
    loading,
    hasMore,
    setSortOption,
    setField,
    setSubField,
    setFilterType,
    toggleBookmark,
    loadMore,
    getFilteredMentors,
  } = useMentorStore()

  const subFields = subFieldOptions[selectedField ?? '전체'] ?? []

  // 1) 마운트 시 URL → zustand 세팅 + 초기 로드
  useEffect(() => {
    const cat = searchParams.get('category')
    const det = searchParams.get('detail')

    if (cat) setField(cat)
    if (det) setSubField(det)

    loadMore()
  }, [])

  // 2) 필터 상태 변경 → URL 반영 (sortOption은 제외)
  useEffect(() => {
    const params: Record<string, string> = {}
    if (selectedField) params.category = selectedField
    if (selectedSubField) params.detail = selectedSubField

    setSearchParams(params, { replace: true })
  }, [selectedField, selectedSubField])

  // 3) 필터·정렬 바뀔 때마다 데이터 다시 가져오기
  useEffect(() => {
    loadMore()
  }, [sortOption, selectedField, selectedSubField])

  // infinite scroll
  const observer = useRef<IntersectionObserver | null>(null)
  const lastRef = useCallback((node: Element | null) => {
    if (loading) return
    observer.current?.disconnect()
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore) loadMore()
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  return (
    <div className="h-screen flex flex-col bg-white relative">
      <div className="sticky top-[16px] w-full max-w-[600px] mx-auto bg-white z-20">
        <MentorshipHeader selectedField={selectedField} />

        <MentorshipFilterBar
          selectedField={selectedField}
          selectedSubField={selectedSubField}
          onFilterClick={setFilterType}
        />

        <MentorshipSortDropdown
          sortOption={sortOption}
          onSortChange={setSortOption}
        />
      </div>

      <div className="flex-grow overflow-y-auto pb-[60px] mt-[16px] no-scrollbar">
        <MentorList
          mentors={getFilteredMentors()}
          bookmarked={bookmarked}
          onToggleBookmark={toggleBookmark}
          lastMentorRef={lastRef}
        />
      </div>

      {loading && (
        <p className="text-center p-4">Loading more mentors...</p>
      )}

      {filterType && (
        <MentorshipListFilter
          filterType={filterType}
          onClose={() => setFilterType(null)}
          selectedField={selectedField}
          onFieldSelect={setField}
          selectedSubField={selectedSubField}
          onSubFieldSelect={setSubField}
          subFields={subFields}
        />
      )}

      <Footer />
    </div>
  )
}