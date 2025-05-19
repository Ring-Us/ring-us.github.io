import axiosInstance from '@/global/api/axiosInstance';
import { SuggestionRequest } from '@/user/types';

export const postSuggestion = async (data: SuggestionRequest) => {
  const response = await axiosInstance.post('/v1/mentoring', data);
  return response.data;
};