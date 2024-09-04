'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IAnimationState {
  isAnimation: boolean | null
  setIsAnimation: (value: boolean) => void;
}

// const loadAnimationState = () => {
//   const savedState = localStorage.getItem('isAnimation');
//   return savedState === 'true' ? true : savedState === 'false' ? false : null; // Вернуть null, если нет значения
// };

export const useStateAnimation = create<IAnimationState>()(persist(set => ({
  isAnimation: true,
  setIsAnimation: (value: boolean) => set({ isAnimation: value })
}),{
  name: 'isAnimation',

  onRehydrateStorage: (state) => {

    return (state, error) => {
      if (error) {
        console.log('an error happened during hydration', error)
      } else {
        console.log('hydration finished')
      }
    }
  },
}))