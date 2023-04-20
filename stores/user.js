import { defineStore } from "pinia";

import axios from "~/plugins/axios";
const $axios = axios().provide.axios;

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
              useUserStore().resetUser();
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

        this.$state.id = user.data[0].id;
        this.$state.theme_id = user.data[0].theme_id;
        this.$state.name = user.data[0].name;
        this.$state.email = user.data[0].email;
        this.$state.bio = user.data[0].bio;
        this.$state.image = user.data[0].image;
      } catch (error) {
        console.log(error);
      }
    },

    async logout() {
      await $axios.post("/logout");
      this.$reset();
    },
  },
  persist: true,
});
