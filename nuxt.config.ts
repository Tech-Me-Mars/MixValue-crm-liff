// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr:false,
  vue: {
    defineModel: true,
    propsDestructure: true
  },
  modules: ['nuxt-swiper',"@nuxtjs/tailwindcss", "nuxt-primevue",'@nuxtjs/i18n',],

  primevue: {
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
    components: {
      include: "*",
      exclude: ['editor']
    },
    directives: {
      include: "*",
    },
    composables: {
      include: "*",
    },
    options: {
      ripple: true,
      pt: {
        button: {
         root:{
            class: "py-1",
            style: "" 
          }
        },
        paginator: {

        },
        breadcrumb: {
          root: { class: "bg-transparent px-0 border-none" },
        },
        column: {
          root: {
            class: "px-8",
          },
          headerCell: {
            class: " px-8 border-none text-sm text-gray-700",
            style: "background-color: #F1F5F9",
          },
          sortBadge: {
            style: { width: ".3rem", height: ".3rem" },
          },
          bodyCell: {
            class: "px-8 text-sm text-gray-700",
            style: "border-bottom: 1px solid rgb(241,245,249)",
          },
        },
        calendar: {
          root: { style: "height: 2.4rem" },
        },
      },
    },
  },
  css: [
    "primevue/resources/themes/lara-light-blue/theme.css",
    "@/assets/css/fontgobal.css",
    "primeicons/primeicons.css",
    "@mdi/font/css/materialdesignicons.min.css",
    "@/assets/css/fontgobal.css",
    "@/assets/css/style.css",
    "@/themes/material/material-light/standard/indigo/theme.scss",
    "flag-icons/css/flag-icons.min.css"
    // '@/themes/tailwind/tailwind-light/theme.scss',
    // '@/themes/viva/viva-light/theme.scss'
    // '@/themes/fluent/fluent-light/theme.scss'

  ],
  plugins: [
    // '~/plugins/bootstrap.js',
    '@/plugins/registercomponents.js',
  ],
  runtimeConfig: {
    public: {
      LIFFID: process.env.LIFFID,
      LIFFURL: process.env.LIFFURL,
      // ! DEV UAT
      URL_API: "https://api-uat.mix-station.com",

    }
  },
});
