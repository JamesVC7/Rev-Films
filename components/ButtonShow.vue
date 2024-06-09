<template>
    <div class="card flex justify-center">
        <Button label="Ver más" @click="visible = true" class="shadow-none"/>
        <Dialog id="dialog" v-model:visible="visible" modal header="Reseñas" >
            <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4 shadow-md max-w-3xl">
            <div class="flex items-center gap-4 mb-4">
              <Avatar :image="getAvatarUrl(avatar_path)" class="mr-2" size="large" shape="circle" />
              <p class="font-bold">{{ author }}</p>
            </div>
            <p class="text-base mb-4">{{ content }}</p>
            <p>Rating: {{ rating }}/10</p>
          </div>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface MovieCardProps {
  author: string;
  avatar_path: string | null;
  content: string;
  rating: number | null;
}

function getAvatarUrl(avatarPath: string | null): string {
  return avatarPath
    ? `https://image.tmdb.org/t/p/w500${avatarPath}`
    : '/avatar.png';
}

defineProps<MovieCardProps>();

const visible = ref(false);
</script>

<style>
#dialog{
  max-width: 90%;
}
</style>