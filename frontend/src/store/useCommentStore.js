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

      // Correctly add the new comment to the existing comments array
      set({
        comments: [...get().comments, response.data.data]
      });

      toast.success('Your comment successfully created!');
      return true;
    } catch (error) {
      if (Array.isArray(error.response?.data?.errors) && error.response.data.errors.length > 0) {
        toast.error(error.response.data.errors[0]);
      } else {
        toast.error(error.response?.data?.message || 'Unexpected error occurred.');
      }
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  getComments: async (plateId) => {
    set({ comments: [], isLoading: true });
    try {
      const response = await axiosInstance.get(`/comments/plate/${plateId}`);
      set({ comments: response.data.data || [] });
      return true;
    } catch (error) {
      if (Array.isArray(error.response?.data?.errors) && error.response.data.errors.length > 0) {
        toast.error(error.response.data.errors[0]);
      } else {
        toast.error(error.response?.data?.message || 'Unexpected error occurred.');
      }
      set({ comments: [] });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  updateComment: async (commentId, comment) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.patch(`/comments/${commentId}`, {
        comment
      });

      // Make sure we're preserving all the data from the response
      const updatedComment = response.data.data;

      // Update the comment in the comments array, maintaining all fields
      set({
        comments: get().comments.map(c =>
          c._id === commentId ? updatedComment : c
        )
      });

      toast.success('Your comment has been updated!');
      return true;
    } catch (error) {
      if (Array.isArray(error.response?.data?.errors) && error.response.data.errors.length > 0) {
        toast.error(error.response.data.errors[0]);
      } else {
        toast.error(error.response?.data?.message || 'Unexpected error occurred.');
      }
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteComment: async (commentId) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/comments/${commentId}`);

      set({
        comments: get().comments.filter(c => c._id !== commentId)
      });

      toast.success('Your comment has been deleted!');
      return true;
    } catch (error) {
      if (Array.isArray(error.response?.data?.errors) && error.response.data.errors.length > 0) {
        toast.error(error.response.data.errors[0]);
      } else {
        toast.error(error.response?.data?.message || 'Unexpected error occurred.');
      }
      return false;
    } finally {
      set({ isLoading: false });
    }
  }
}));