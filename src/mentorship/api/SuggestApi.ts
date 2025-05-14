import axiosInstance from '@/global/api/axiosInstance';
import { SuggestionData } from '@/user/types';

export const postSuggestion = async (data: SuggestionData) => {
  const response = await axiosInstance.post('/v1/mentoring', data);
  return response.data;
};