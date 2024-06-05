<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getMovies } from '~/api/movies';

definePageMeta({
  layout: 'menu'
});

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const movies = ref<Movie[]>([]);

onMounted(async () => {
  movies.value = await getMovies();
});
</script>

<template>
  <div class="flex flex-wrap justify-center gap-3 p-4">
    <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :title="movie.title"
        :imageSrc="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
      />
  </div>
</template>

