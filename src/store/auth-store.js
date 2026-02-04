import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialUserState = {
  id: '',
  token: '',
  name: '',
  userName: '',
  userRole: '',
  userNewPwd: true,
};

// Define auth and snackbar state with Zustand and add persistence
const useAuthStore = create(
  persist(
    (set) => ({
      // Auth State
      auth: {
        isLoggedIn: false,
        user: initialUserState,
      },
      loginUser: (payload) =>
        set((state) => ({
          auth: {
            isLoggedIn: true,
            user: {
              id: payload._id,
              token: payload.userToken,
              name: payload.userFullName,
              userName: payload.userName,
              userRole: payload.userRole,
              userNewPwd: payload.userNewPwd,
            },
          },
        })),
      logoutUser: () =>
        set(() => ({
          auth: {
            isLoggedIn: false,
            user: initialUserState,
          },
        })),
    }),
    {
      name: 'auth-storage', // storage name for localStorage
      partialize: (state) => ({ auth: state.auth }),
    }
  )
);

export default useAuthStore;
