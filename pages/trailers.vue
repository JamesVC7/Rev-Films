<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getMovies, getMovieVideos } from '~/api/movies';
import Card from 'primevue/card';

interface Movie {
  id: number;
  title: string;
  videoKey?: string;
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

const movies = ref<Movie[]>([]);

const fetchMoviesWithVideos = async () => {
  const movieList = await getMovies();
  const moviesWithTrailers = [];

  for (const movie of movieList) {
    const videos: Video[] = await getMovieVideos(movie.id);
    const youtubeVideo = videos.find(video => video.site === 'YouTube' && video.type === 'Trailer');
    if (youtubeVideo) {
      movie.videoKey = youtubeVideo.key;
      moviesWithTrailers.push(movie);
    }
  }
  movies.value = moviesWithTrailers;
};

onMounted(fetchMoviesWithVideos);
</script>

<template>
  <div class="flex flex-wrap justify-center gap-3 p-4 bg-gradient-to-r from-blue-950 to-fuchsia-900">
    <Card v-for="movie in movies" :key="movie.id" class="w-full bg-black text-white text-center md:w-1/3">
      <template #title>{{ movie.title }}</template>
      <template #content>
        <div v-if="movie.videoKey">
          <iframe
            :src="'https://www.youtube.com/embed/' + movie.videoKey"
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
</template>

<style>
.p-card .p-card-body{
  width: 100% !important;
}
</style>
