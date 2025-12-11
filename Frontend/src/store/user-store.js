import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useUserStore = create()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      token: null,
    //   addABear: () => set({ bears: get().bears + 1 }),
        login: (data) => set({isLoggedIn: true, user: data.user, token: data.token}),
        logout: () => set({isLoggedIn: false, user:null, token: null}),
    }),
    {
      name: 'user-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
