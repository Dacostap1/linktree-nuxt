import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: "",
    theme_id: "",
    name: "",
    email: "",
    image: "",
    bio: "",
    theme: null,
    colors: null,
    allLinks: null,
    isMobile: null,
    updatedLinkId: 0,
    addLinkOverlay: false,
    isPreviewOverlay: false,
  }),

  actions: {},
  persist: true,
});
