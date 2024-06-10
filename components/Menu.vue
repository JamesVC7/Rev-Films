<template>
  <div class="card w-full sticky top-0 z-10">
      <Menubar :model="items" active-class="active"/>
      <div v-if="showSearch">
        <Search class="!p-0 !px-4 "/>
      </div>
      
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const showSearch = ref(false);
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
  {
    label: 'Search',
    icon: 'pi pi-search',
    command: () => {
      showSearch.value = !showSearch.value; 
    },
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
