import { create } from 'zustand'
import { fetchMentors, Mentor } from '@/mentorship/api/fetchMentors'

interface MentorState {
  mentors: Mentor[]
  sortOption: string
  selectedField: string | null
  selectedSubField: string | null
  filterType: '직무' | '세부직무' | null
  bookmarked: Record<string, boolean>
  cursor: number | null
  hasMore: boolean
  loading: boolean

  // 액션들
  setSortOption: (opt: string) => void
  setField: (field: string | null) => void
  setSubField: (sub: string | null) => void
  setFilterType: (type: '직무' | '세부직무' | null) => void
  toggleBookmark: (nick: string) => void

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

  setSortOption: (opt) => set({ sortOption: opt, mentors: [], cursor: null, hasMore: true }),
  setField: (field) => set({ selectedField: field, selectedSubField: null, mentors: [], cursor: null, hasMore: true }),
  setSubField: (sub) => set({ selectedSubField: sub, mentors: [], cursor: null, hasMore: true }),
  setFilterType: (type) => set({ filterType: type }),

  toggleBookmark: (nick) =>
    set((state) => ({ bookmarked: { ...state.bookmarked, [nick]: !state.bookmarked[nick] } })),

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

      set((state) => ({
        mentors: [
          ...state.mentors,
          ...content.filter((m) => !state.mentors.some((x) => x.mentorId === m.mentorId)),
        ],
        cursor: content.length ? content[content.length - 1].mentorId : state.cursor,
        hasMore: !sliceInfo.last,
      }))
    } catch (e) {
      console.error(e)
    } finally {
      set({ loading: false })
    }
  },
}))