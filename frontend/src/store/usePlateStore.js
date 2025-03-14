import { create } from 'zustand';

import { axiosInstance } from "../lib/axios.js";

export const usePlateStore = create((set) => ({
  plateData: null,
  isLoading: false,

  findPlate: async (plate) => {
    set({ isLoading: true, plateData: null });
    try {
      const response = await axiosInstance.get(`/plates/${plate}`);
      set({ plateData: response.data.data });
      return response.data.data;
    } catch {
      set({ plateData: null });
      return null;
    } finally {
      set ({ isLoading: false });
    }
  },

  resetPlateData: () => set({ plateData: null }),

  createPlate: async (plate) => {
    set({ isLoading: true, plateData: null });
    try {
      const response = await axiosInstance.post(`/plates/`, {
        plate
      });
      set({ isLoading: false, plateData: response.data.data });
      return response.data.data;
    } catch (error) {
      return error.response?.data?.success ?? false;
    } finally {
      set ({ isLoading: false });
    }
  }
}));