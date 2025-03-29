// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "shadcn-nuxt", "@nuxt/fonts",'@nuxtjs/color-mode'
  ],
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  vite: {},

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === "icon",
    },
  },

  runtimeConfig: {
    // apiKey: process.env.GITHUB_CLIENT_ID,
    // baseUrl: process.env.GITHUB_CLIENT_SECRET,
  },
});
