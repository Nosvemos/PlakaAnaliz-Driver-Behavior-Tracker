import { create } from 'zustand';
import { toast } from 'react-toastify';

import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isValidToken: null,
  isCheckingAuth: true,
  message: null,

  register: async (username, email, password) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post(`/auth/register`, { username, email, password });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      toast.success('Your account created successfully.');
      return response?.data.success;
    } catch (error) {
      toast.error(error.response.data.message);
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
      toast.error(error.response.data.message);
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
      toast.error(error.response.data.message);
    } finally {
      set ({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get(`/auth/check-auth`);
      set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, isAuthenticated: false });
    }
  }
}));