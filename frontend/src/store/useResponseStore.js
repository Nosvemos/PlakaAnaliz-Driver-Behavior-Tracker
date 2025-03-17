import { create } from 'zustand';
import { toast } from 'react-toastify';
import { axiosInstance } from "../lib/axios.js";

export const useResponseStore = create((set, get) => ({
  responses: {}, // { [commentId]: Response[] }
  isLoading: false,

  createResponse: async (responseText, commentId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post(`/responses`, {
        response: responseText,
        commentId
      });

      set((state) => {
        const responseCommentId = res.data.data.comment;
        return {
          responses: {
            ...state.responses,
            [responseCommentId]: [
              ...(state.responses[responseCommentId] || []),
              res.data.data
            ]
          }
        };
      });

      toast.success('Response created successfully!');
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

  getResponses: async (commentId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/comments/${commentId}/responses`);

      const newResponses = res.data?.data || [];

      if (!newResponses.length) {
        return true;
      }

      set((state) => {
        const existingResponses = state.responses[commentId] || [];

        const existingIds = new Set(existingResponses.map(r => r._id));
        const filteredResponses = newResponses.filter(r => !existingIds.has(r._id));

        if (!filteredResponses.length) return state;

        return {
          responses: {
            ...state.responses,
            [commentId]: [...existingResponses, ...filteredResponses]
          }
        };
      });

      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message
        || error.message
        || 'Failed to load responses';
      toast.error(errorMessage);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  updateResponse: async (responseId, newText) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.patch(`/responses/${responseId}`, {
        response: newText
      });

      const updated = res.data.data;

      set((state) => {
        const responseCommentId = updated.comment;

        if (!state.responses[responseCommentId]) {
          console.warn(`No responses found for comment: ${responseCommentId}`);
          return state;
        }

        return {
          responses: {
            ...state.responses,
            [responseCommentId]: state.responses[responseCommentId].map(r =>
              r._id === responseId ? { ...r, ...updated } : r
            )
          }
        };
      });

      toast.success('Response updated!');
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

  deleteResponse: async (responseId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.delete(`/responses/${responseId}`);
      const { commentId } = res.data.data;

      set((state) => {
        if (!state.responses[commentId]) return state;

        return {
          responses: {
            ...state.responses,
            [commentId]: state.responses[commentId].filter(r => r._id !== responseId)
          }
        };
      });

      toast.success('Response deleted!');
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Deletion failed.';
      toast.error(errorMessage);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  addReaction: async (responseId, reactionType) => {
    try {
      const res = await axiosInstance.post(`/responses/${responseId}/reactions`, { reactionType });
      const updated = {
        ...res.data.data,
        reactions: res.data.data.reactions
      };

      set((state) => {
        const responseCommentId = updated.comment;

        if (!state.responses[responseCommentId]) {
          return state;
        }

        return {
          responses: {
            ...state.responses,
            [responseCommentId]: state.responses[responseCommentId].map(r =>
              r._id === responseId ? updated : r
            )
          }
        };
      });

      return true;
    } catch (error) {
      if (Array.isArray(error.response?.data?.errors) && error.response.data.errors.length > 0) {
        toast.error(error.response.data.errors[0]);
      } else {
        toast.error(error.response?.data?.message || 'Unexpected error occurred.');
      }
      return false;
    }
  },

  deleteReaction: async (responseId) => {
    try {
      const res = await axiosInstance.delete(`/responses/${responseId}/reactions`);
      const updated = {
        ...res.data.data,
        reactions: res.data.data.reactions
      };

      set((state) => {
        const responseCommentId = updated.comment;

        if (!state.responses[responseCommentId]) {
          return state;
        }

        return {
          responses: {
            ...state.responses,
            [responseCommentId]: state.responses[responseCommentId].map(r =>
              r._id === responseId ? updated : r
            )
          }
        };
      });

      return true;
    } catch (error) {
      if (Array.isArray(error.response?.data?.errors) && error.response.data.errors.length > 0) {
        toast.error(error.response.data.errors[0]);
      } else {
        toast.error(error.response?.data?.message || 'Unexpected error occurred.');
      }
      return false;
    }
  }
}));