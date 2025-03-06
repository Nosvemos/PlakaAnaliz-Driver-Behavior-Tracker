import { create } from 'zustand';
import { toast } from 'react-toastify';

import { axiosInstance } from "../lib/axios.js";

export const useCommentStore = create((set, get) => ({
  comments: [],
  isLoading: false,

  sendComment: async (plateId, comment) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post(`/comments`, {
        comment,
        plateId
      });
      set({ isLoading: false, comments: get().comments.join(response.data.data) });
      toast.success('Your comment successfully created!');
    } catch (error) {
      if (Array.isArray(error.response?.data?.errors) && error.response.data.errors.length > 0) {
        toast.error(error.response.data.errors[0]);
      } else {
        toast.error(error.response?.data?.message || 'Unexpected error occurred.');
      }
      return error.response?.data?.success ?? false;
    } finally {
      set ({ isLoading: false, plateData: null });
    }
  },
}));