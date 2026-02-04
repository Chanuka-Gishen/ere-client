import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define auth and snackbar state with Zustand and add persistence
const useItemStore = create(
  persist(
    (set) => ({
      unit: {
        selectedUnit: null,
        selectedJob: null,
      },
      selectCustomerUnit: (payload) =>
        set(() => ({
          unit: {
            selectedUnit: payload.selectedUnit,
            selectedJob: payload.selectedJob,
          },
        })),
    }),
    {
      name: 'item-storage', // storage name for localStorage
      partialize: (state) => ({ auth: state.unit }),
    }
  )
);

export default useItemStore;
