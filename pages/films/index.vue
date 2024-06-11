<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getMovies } from '~/api/movies';

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
  <Search class="bg-gradient-to-r from-blue-950 to-fuchsia-900" id="sch" />
  <div class="flex flex-wrap justify-center gap-3 p-4 bg-gradient-to-r from-blue-950 to-fuchsia-900">
    <MovieCard v-for="movie in movies" :key="movie.id" :title="movie.title"
      :imageSrc="'https://image.tmdb.org/t/p/w500' + movie.poster_path" />
  </div>
</template>

<style>
#sch ul {
  max-height: 200px;
  width: 98%;
  margin: 3rem;
  overflow-y: auto;
  background: black;
  color: white;
}

#sch li:hover {
  background-color: rgb(90, 55, 179);
}

#sch .p-inputtext {
  background: black;
  color: white;
}
</style>
