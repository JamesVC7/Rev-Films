<template>
  <div v-if="limitedVideos.length > 0" class="flex flex-wrap justify-center gap-4 m-8">
  <Card class="w-full bg-black text-white text-center md:w-5/12" v-for="video in limitedVideos" :key="video.id" id="cont_video">
      <template #content>
        <div>
          <iframe
            :src="'https://www.youtube.com/embed/'+ video.key"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="w-full"
            style="aspect-ratio: 16/9;"
          ></iframe>
        </div>
      </template>
    </Card>
  </div>
  <div v-else class="m-4">No hay trailers disponible por el momento</div>
</template>

<script setup lang="ts">
import { ref, onMounted,computed } from 'vue';
import { useRoute } from 'vue-router';
import { getMovieByTitle, getMovieVideos } from '~/api/movies';

interface Movie {
  id: number;
}

interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

const route = useRoute();
const movie = ref<Movie | null>(null);
const videos = ref<Video[]>([]);
const limitedVideos = computed(() => {
  return videos.value.slice(0, 4);
});

onMounted(async() => {
    const movieTitle = route.params.title;
    movie.value = await getMovieByTitle(movieTitle);
    if (movie.value) {
        videos.value = await getMovieVideos(movie.value.id);
    }
})
</script>

<style>
#cont_video .p-card-content{
  padding: 0;
}
#cont_video .p-card-body{
  width: 100%;
}
</style>