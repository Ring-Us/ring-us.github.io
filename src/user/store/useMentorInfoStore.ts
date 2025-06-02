import { create } from 'zustand';
import { MentorData } from '../types';

interface MentorInfoState {
  mentorData: MentorData | null;
  setMentorData: (data: MentorData) => void;
  updateMentorField: <K extends keyof MentorData>(key: K, value: MentorData[K]) => void;
}

export const useMentorInfoStore = create<MentorInfoState>((set) => ({
  mentorData: null,
  setMentorData: (data) => set({ mentorData: data }),
  updateMentorField: (key, value) =>
    set((state) => ({
      mentorData: {
        ...state.mentorData!,
        [key]: value,
      },
    })),
}));