<script setup lang="ts">
import Card from 'primevue/card';
import Image from 'primevue/image';

interface MovieCardProps {
  title: string;
  imageSrc: string;
}

defineProps<MovieCardProps>();
</script>

<template>
  <Card class="w-full m-8 bg-black text-white sm:w-5/12 sm:m-4 sm:m-0 lg:w-1/4 lg:m-4" id="cont-card">
    <template #content>
      <nuxt-link :to="{ name: 'films-title', params: { title } }" class="flex flex-wrap justify-center gap-3 p-4">
        <Image :src="imageSrc" />
        <h2 class="text-center font-bold text-xl md:text-lg">{{ title }}</h2>
      </nuxt-link>
    </template>
  </Card>
</template>

<style>
#cont-card .p-card-body{
  padding: 0;
}
#cont-card:hover{
  box-shadow: 0 0 20px #00fffc;
  transform: scale(1.1);
  animation: bounce-in 0.5s;
}

@keyframes bounce-in {
  0% {
    transform: scale(1.0);
  }
  50% {
    transform: scale(1.0);
  }
  100% {
    transform: scale(1.1);
  } 
}

</style>




