import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const useSnackbarStore = create((set, get) => ({
  notifications: [],
  displayedKeys: new Set(), // Track displayed snackbars

  // Add a new snackbar
  enqueueSnackbar: (notification) => {
    const key = notification.key || uuidv4();
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          key,
          message: notification.message,
          options: notification.options || {},
          dismissed: false,
        },
      ],
    }));
    return key;
  },

  // Mark a snackbar as dismissed
  closeSnackbar: (key, dismissAll = false) => {
    set((state) => {
      if (dismissAll) {
        return {
          notifications: state.notifications.map((n) => ({
            ...n,
            dismissed: true,
          })),
        };
      }
      return {
        notifications: state.notifications.map((n) =>
          n.key === key ? { ...n, dismissed: true } : n
        ),
      };
    });
  },

  // Remove a snackbar from the store completely
  removeSnackbar: (key) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.key !== key),
    }));
  },

  // Add to displayed keys
  addDisplayedKey: (key) => {
    set((state) => {
      const newDisplayed = new Set(state.displayedKeys);
      newDisplayed.add(key);
      return { displayedKeys: newDisplayed };
    });
  },

  // Remove from displayed keys
  removeDisplayedKey: (key) => {
    set((state) => {
      const newDisplayed = new Set(state.displayedKeys);
      newDisplayed.delete(key);
      return { displayedKeys: newDisplayed };
    });
  },

  // Clear all snackbars
  clearAllSnackbars: () => {
    set({
      notifications: [],
      displayedKeys: new Set(),
    });
  },

  // Check if a key is already displayed
  isDisplayed: (key) => {
    return get().displayedKeys.has(key);
  },
}));

export default useSnackbarStore;
