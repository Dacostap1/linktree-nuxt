// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: "123",
    // Keys within public are also exposed client-side
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "/api",
    },
  },
  css: ["~/assets/css/main.css"],
  pages: true,
  experimental: {
    payloadExtraction: false,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: [
    { path: "~/components" },
    { path: "~/components/dialogs", extensions: ["vue"] },
  ],
  modules: [
    "nuxt-icon",
    "nuxt-lodash",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vite-pwa/nuxt", //sudo npm cache clean --force
  ],
  pwa: {
    manifest: {
      name: "Linktree Clone",
      short_name: "Linktree Clone",
      description: "This is a Linktree Clone",
      theme_color: "#32CD32",
      icons: [
        { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
        { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    devOptions: {
      enabled: false,
      type: "module",
    },
  },
  app: {
    head: {
      charset: "utf-8",
      //evitar que en movil haga zoom
      viewport: "width=device-width, initial-scale=1, maximun-scale=1",
    },
  },
});
