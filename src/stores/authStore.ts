// authStore.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    justLoggedOut: false
  }),
  actions: {
    setJustLoggedOut(value: any) {
      this.justLoggedOut = value
    }
  }
})
