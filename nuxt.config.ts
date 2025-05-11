// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    '@nuxtjs/color-mode',
    "@pinia/nuxt",
    "shadcn-nuxt",
    "@nuxt/fonts",
    '@vee-validate/nuxt',
    "nuxt-tiptap-editor",
    "@formkit/auto-animate/nuxt",
    "@nuxtjs/i18n",
    "nuxt-nodemailer"
  ],
  colorMode: {
    classSuffix: "",
    preference: 'dark',
  },
  nodemailer: {
    from: 'quyet@trueedu.org',
    host: 'mail.trueedu.org',
    port: 465,
    secure: true,
    auth: {
      user: 'quyet@trueedu.org',
      pass: 'Tranquyetrc213v',
    },
  },
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**", "./custom-folder/stores/**/**"],
  },
  tiptap: {
    prefix: "Tiptap",
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

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  experimental: {
    defaults: {
      nuxtLink: {
        // default values
        componentName: 'NuxtLink',
        prefetch: true,
        prefetchOn: { visibility: true, interaction: true }
      }
    }
  }
});