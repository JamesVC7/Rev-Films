<template>
  <div class="card w-full sticky top-0 z-10">
      <Menubar :model="items" active-class="active"/>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    url: '/',
    class: computed(() => (route.path === '/' ? 'active' : '')),
  },
  {
    label: 'Films',
    icon: 'pi pi-star',
    url: '/films',
    class: computed(() => (route.path === '/films' ? 'active' : '')),
  },
  {
    label: 'Trailers',
    icon: 'pi pi-video',
    url: '/trailers',
    class: computed(() => (route.path === '/trailers' ? 'active' : '')),
  },
  {
    label: 'Contacto',
    icon: 'pi pi-envelope',
    url: '/contact',
    class: computed(() => (route.path === '/contact' ? 'active' : '')),
  },
]);
</script>

<style>
.p-component{
    display: flex;
    justify-content: center;
}

.active{
    border-bottom: 2px solid purple;
}
</style>
