// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-primevue'],
  css: [
    'primeicons/primeicons.css',
    'primevue/resources/themes/lara-light-blue/theme.css',
    'assets/css/tailwind.css'
     
  ],

})
