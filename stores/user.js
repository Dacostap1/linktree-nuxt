import { defineStore } from "pinia";

import axios from "~/plugins/axios";
const $axios = axios().provide.axios;

export const useUserStore = defineStore("user", {
  state: () => ({
    id: "",
    name: "",
    email: "",
    image: "",
    bio: "",
    theme_id: "",
    themes: [],
    allLinks: [],
    isMobile: false,
    updatedLinkId: 0,
    addLinkOverlay: false,
    isPreviewOverlay: false,
  }),
  getters: {
    theme: (state) => {
      const index = state.themes.findIndex(
        (color) => color.id == state.theme_id
      );

      return index != -1 ? state.themes[index] : null;
    },
  },

  actions: {
    async setAxiosConfig() {
      //Debe ir en el componente principal para experar que se cargue Nuxt
      const { $config } = useNuxtApp();
      $axios.defaults.baseURL = $config.public.apiBase;

      await $axios.interceptors.response.use(
        (response) => {
          //Call was successfull, continue
          return response;
        },
        (error) => {
          switch (error.response.status) {
            case 401:
            case 419:
            case 503:
              this.$reset();
              window.location.href = "/";
              break;
            case 500:
              alert("Oops, something went wrong!");
              break;
            default:
              return Promise.reject(error);
          }
        }
      );
    },
    async getToken() {
      await $axios.get("/sanctum/csrf-cookie");
    },

    async login(email, password) {
      await $axios.post("/login", {
        email: email,
        password: password,
      });
    },

    async register(name, email, password, confirmPassword) {
      await $axios.post("/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      });
    },

    async getUser() {
      try {
        const user = await $axios.get("/api/get-user");

        this.$state.id = user.data.id;
        this.$state.theme_id = user.data.theme_id;
        this.$state.name = user.data.name;
        this.$state.email = user.data.email;
        this.$state.bio = user.data.bio;
        this.$state.image = user.data.image;
      } catch (error) {
        console.log(error);
      }
    },

    async logout() {
      await $axios.post("/logout");
      this.$reset();
    },

    async uploadUserImage(data) {
      const res = await $axios.post("/api/users/upload-image", data);
      this.$state.image = res.data.image;
    },

    async updateUserDetails(name, bio) {
      const res = await $axios.patch(`/api/users/${this.$state.id}`, {
        name,
        bio,
      });

      this.$state.id = res.data.id;
      this.$state.theme_id = res.data.theme_id;
      this.$state.name = res.data.name;
      this.$state.email = res.data.email;
      this.$state.bio = res.data.bio;
      this.$state.image = res.data.image;
    },

    async updateUserTheme(theme_id) {
      const res = await $axios.patch("/api/users/update-theme", {
        theme_id,
      });

      console.log(res.data);

      this.$state.theme_id = res.data.theme_id;
    },

    async getAllLinks() {
      const res = await $axios.get("api/links");

      console.log(res.data);
      this.$state.allLinks = res.data;
    },

    async addLink(name, url) {
      const res = await $axios.post("/api/links", {
        name,
        url,
      });

      console.log(res.data);

      this.$state.allLinks = [...this.$state.allLinks, res.data];
    },

    async updateLink(id, name, url) {
      const res = await $axios.patch(`/api/links/${id}`, {
        name,
        url,
      });

      console.log(res.data);
      let index = this.$state.allLinks.findIndex(
        (elemento) => elemento.id == id
      );

      console.log(index);

      if (index != -1) {
        this.$state.allLinks[index] = res.data;
      }
    },

    async deleteLink(id) {
      await $axios.delete(`/api/links/${id}`);

      let index = this.$state.allLinks.findIndex(
        (elemento) => elemento.id === id
      );

      if (index != -1) {
        this.$state.allLinks.splice(index, 1);
      }
    },

    async uploadLinkImage(data) {
      await $axios.post("/api/links/upload-image", data);
    },

    async getThemes() {
      //Clases dinamicas deben ser agregadas al safelist de tailwind para que no las purge en el treeshaking
      const res = await $axios.get("api/themes");

      console.log(res.data);
      this.$state.themes = res.data;
    },
  },
  persist: true,
});
