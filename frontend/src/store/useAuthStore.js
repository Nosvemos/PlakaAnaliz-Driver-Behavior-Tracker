import { create } from 'zustand';
import { toast } from 'react-toastify';

import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,

  register: async (username, email, password) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post(`/auth/register`, { username, email, password });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      toast.success('Your account created successfully.');
    } catch (error) {
      if (Array.isArray(error.response?.data?.errors) && error.response.data.errors.length > 0) {
        toast.error(error.response.data.errors[0]);
      } else {
        toast.error(error.response?.data?.message || 'Unexpected error occurred.');
      }
      return error.response?.data?.success ?? false;
    } finally {
      set ({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post(`/auth/login`, { email, password });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      toast.success('You logged in successfully.');
    } catch (error) {
      if (Array.isArray(error.response?.data?.errors) && error.response.data.errors.length > 0) {
        toast.error(error.response.data.errors[0]);
      } else {
        toast.error(error.response?.data?.message || 'Unexpected error occurred.');
      }
      return error.response?.data?.success ?? false;
    } finally {
      set ({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await axiosInstance.post(`/auth/logout`);
      set({ user: null, isAuthenticated: false });
      toast.success('You logged out successfully.');
    } catch (error) {
      if (Array.isArray(error.response?.data?.errors) && error.response.data.errors.length > 0) {
        toast.error(error.response.data.errors[0]);
      } else {
        toast.error(error.response?.data?.message || 'Unexpected error occurred.');
      }
      return error.response?.data?.success ?? false;
    } finally {
      set ({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get(`/auth/checkAuth`);
      set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, isAuthenticated: false });
    }
  }
}));