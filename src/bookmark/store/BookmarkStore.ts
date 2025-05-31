import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Mentor } from '@/mentorship/api/fetchMentors';

interface BookmarkState {
  bookmarkedMentors: Record<string, boolean>;
  sortOption: 'oldest';
  selectedField: string | null;
  selectedSubField: string | null;
  activeFilterType: '직무' | '세부직무' | null;

  // 액션들
  toggleBookmark: (nickname: string) => void;
  setSortOption: (opt: 'oldest') => void;
  setSelectedField: (field: string | null) => void;
  setSelectedSubField: (sub: string | null) => void;
  setActiveFilterType: (type: '직무' | '세부직무' | null) => void;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set) => ({
      // 초기 상태
      bookmarkedMentors: {},
      sortOption: 'oldest',
      selectedField: null,
      selectedSubField: null,
      activeFilterType: null,

      // 액션 구현
      toggleBookmark: (nickname) =>
        set((state) => ({
          bookmarkedMentors: {
            ...state.bookmarkedMentors,
            [nickname]: !state.bookmarkedMentors[nickname],
          },
        })),

      setSortOption: (opt) => set(() => ({ sortOption: opt })),
      setSelectedField: (field) => set(() => ({ selectedField: field })),
      setSelectedSubField: (sub) => set(() => ({ selectedSubField: sub })),
      setActiveFilterType: (type) => set(() => ({ activeFilterType: type })),
    }),
    {
      name: 'bookmark-storage',
      partialize: (state) => ({ bookmarkedMentors: state.bookmarkedMentors }),
    }
  )
);