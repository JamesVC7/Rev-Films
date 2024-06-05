<template>
  <Card class="w-full md:w-1/3 lg:w-1/4">
    <template #title>{{ title }}</template>
    <template #content>
      <nuxt-link :to="{ name: 'films-title', params: { title } }" class="flex flex-wrap justify-center gap-3 p-4">
        <Image :src="imageSrc" />
      </nuxt-link>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import Image from 'primevue/image';

interface MovieCardProps {
  title: string;
  imageSrc: string;
}

defineProps<MovieCardProps>();
</script>


