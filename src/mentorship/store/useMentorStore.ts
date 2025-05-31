import { create } from 'zustand'
import { fetchMentors, Mentor } from '@/mentorship/api/fetchMentors'

export type SortOption = 'respond' | 'recent' 

interface MentorState {
  mentors: Mentor[]
  sortOption: SortOption
  selectedField: string | null
  selectedSubField: string | null
  filterType: '직무' | '세부직무' | null
  bookmarked: Record<string, boolean>
  cursor: number | null
  hasMore: boolean
  loading: boolean

  // 액션들
  setSortOption: (opt: SortOption) => void
  setField: (field: string | null) => void
  setSubField: (sub: string | null) => void
  setFilterType: (type: '직무' | '세부직무' | null) => void
  toggleBookmark: (nick: string) => void
  getFilteredMentors: () => Mentor[]

  loadMore: () => Promise<void>
  reset: () => void
}

export const useMentorStore = create<MentorState>((set, get) => ({
  mentors: [],
  sortOption: 'respond',
  selectedField: null,
  selectedSubField: null,
  filterType: null,
  bookmarked: {},
  cursor: null,
  hasMore: true,
  loading: false,

  setSortOption: (opt) => {
    get().reset()
    set({ sortOption: opt })
  },

  setField: (field) => {
    get().reset()
    set({ selectedField: field, selectedSubField: null })
  },

  setSubField: (sub) => {
    get().reset()
    set({ selectedSubField: sub })
  },

  setFilterType: (type) => set({ filterType: type }),

  toggleBookmark: (nick) =>
    set((state) => ({ bookmarked: { ...state.bookmarked, [nick]: !state.bookmarked[nick] } })),

  getFilteredMentors: () => {
    const { mentors, selectedField, selectedSubField } = get()
    return mentors.filter(m => {
      const okField = !selectedField || selectedField === '전체'
        ? true
        : m.organization.jobCategory === selectedField
      const okSub = !selectedSubField || selectedSubField === '전체'
        ? true
        : m.organization.detailedJob === selectedSubField
      return okField && okSub
    })
  },

  reset: () =>
    set({
      mentors: [],
      cursor: null,
      hasMore: true,
      loading: false,
    }),

  loadMore: async () => {
    const { loading, hasMore, cursor, sortOption, mentors } = get()
    if (loading || !hasMore) return

    set({ loading: true })
    try {
      const res = await fetchMentors(cursor ?? undefined, 5, sortOption)
      const { content, sliceInfo } = res.data

      // 중복 제거를 위한 Set 사용
      const existingIds = new Set(mentors.map(m => m.mentorId))
      const newMentors = content.filter(m => !existingIds.has(m.mentorId))

      set((state) => {
        // mentorId 기준으로 중복 제거
        const allMentors = [...state.mentors, ...newMentors];
        const uniqueMentors = Array.from(
          new Map(allMentors.map(m => [m.mentorId, m])).values()
        );
        return {
          mentors: uniqueMentors,
          cursor: content.length ? content[content.length - 1].mentorId : state.cursor,
          hasMore: !sliceInfo.last,
        };
      })
    } catch (e) {
      console.error(e)
    } finally {
      set({ loading: false })
    }
  },
}))