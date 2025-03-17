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
      set((state) => ({
        responses: {
          ...state.responses,
          [commentId]: res.data.data || []
        }
      }));
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

  updateResponse: async (responseId, newText) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.patch(`/responses/${responseId}`, {
        response: newText
      });

      const updated = res.data.data;

      set((state) => {
        const responseCommentId = updated.commentId;

        if (!state.responses[responseCommentId]) {
          console.warn(`No responses found for commentId: ${responseCommentId}`);
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
      const deleted = res.data.data;

      set((state) => {
        const responseCommentId = deleted.commentId;

        if (!state.responses[responseCommentId]) {
          console.warn(`No responses found for commentId: ${responseCommentId}`);
          return state;
        }

        return {
          responses: {
            ...state.responses,
            [responseCommentId]: state.responses[responseCommentId].filter(
              (r) => r._id !== responseId
            ),
          },
        };
      });

      toast.success('Response deleted!');
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

  addReaction: async (responseId, reactionType) => {
    try {
      const res = await axiosInstance.post(`/responses/${responseId}/reactions`, {
        reactionType,
      });

      const updated = res.data.data;
      set((state) => {
        const responseCommentId = updated.commentId;

        if (!state.responses[responseCommentId]) {
          console.warn(`No responses found for commentId: ${responseCommentId}`);
          return state;
        }

        return {
          responses: {
            ...state.responses,
            [responseCommentId]: state.responses[responseCommentId].map((r) =>
              r._id === responseId ? updated : r
            ),
          },
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
      const updated = res.data.data;

      set((state) => {
        const responseCommentId = updated.commentId;

        if (!state.responses[responseCommentId]) {
          console.warn(`No responses found for commentId: ${responseCommentId}`);
          return state;
        }

        return {
          responses: {
            ...state.responses,
            [responseCommentId]: state.responses[responseCommentId].map((r) =>
              r._id === responseId ? updated : r
            ),
          },
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
}));