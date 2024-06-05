<template>
  <div class="card ">
      <Menubar :model="items" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
  {
      label: 'Home',
      icon: 'pi pi-home',
      url: '/'
  },
  {
      label: 'Films',
      icon: 'pi pi-star',
      url: '/films'
  },
  {
      label: 'Trailers',
      icon: 'pi pi-video',
      url: '/trailers',
  },
  {
      label: 'Contacto',
      icon: 'pi pi-envelope',
      url: '/contact',
  }
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
