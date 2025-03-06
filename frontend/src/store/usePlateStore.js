import { create } from 'zustand';
import { toast } from 'react-toastify';

import { axiosInstance } from "../lib/axios.js";

export const usePlateStore = create((set, get) => ({
  plateData: null,
  isLoading: false,

  findPlate: async (plate) => {
    set({ isLoading: true, plateData: null });
    try {
      const response = await axiosInstance.get(`/plates/${plate}`);
      set({ isLoading: false, plateData: response.data.data });
      return response.data.data;
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
}));