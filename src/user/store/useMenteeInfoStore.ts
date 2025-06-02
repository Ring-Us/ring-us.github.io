import { create } from 'zustand';
import { MenteeData } from '../menteetypes';

interface MenteeInfoState {
  menteeData: MenteeData | null;
  setMenteeData: (data: MenteeData) => void;
  updateMenteeField: <K extends keyof MenteeData>(key: K, value: MenteeData[K]) => void;
  updateMenteeImage: (fileName: string, filePath: string) => void;
}

export const useMenteeInfoStore = create<MenteeInfoState>((set) => ({
  menteeData: null,
  setMenteeData: (data) => set({ menteeData: data }),
  updateMenteeField: (key, value) =>
    set((state) => {
      if (!state.menteeData) return state;
      return {
        menteeData: {
          ...state.menteeData,
          [key]: value,
        },
      };
    }),
  updateMenteeImage: (fileName: string, filePath: string) =>
    set((state) => {
      if (!state.menteeData) return state;
      return {
        menteeData: {
          ...state.menteeData,
          image: {
            fileName,
            filePath,
          },
        },
      };
    }),
}));