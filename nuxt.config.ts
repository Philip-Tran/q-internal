import type { NuxtPage } from "nuxt/schema";

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
    "nuxt-nodemailer",
    "@pinia/colada-nuxt",
    "@nuxthub/core"
  ],
  colorMode: {
    classSuffix: "",
    preference: 'dark',
  },

  hub: {
    analytics: false,
  },

  // exclude component directory from file based routing 
  hooks: {
    'pages:extend': function (pages) {
      const pagesToRemove: NuxtPage[] = []
      pages.forEach((page) => {
        if (page.path.includes('component') || page.path.includes('/api')) {
          pagesToRemove.push(page)
        }
      })
      pagesToRemove.forEach((page: NuxtPage) => {
        pages.splice(pages.indexOf(page), 1)
      })
    }
  },
  
  devServer: {
    port: 5000,
  },

  nodemailer: {
    from: 'quyet@trueedu.org',
    host: 'mail.trueedu.org',
    port: 465,
    secure: true,
    auth: {
      user: 'quyet@trueedu.org',
      pass: process.env.EMAIL_AUTH_PASSWORD,
    },
  },
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**", "./custom-folder/stores/**/**"],
  },
  tiptap: {
    prefix: "Tiptap",
  },
  // i18n: {
  //   bundle: {
  //     optimizeTranslationDirective: false,
  //   },
  // },
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