<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getMovies } from '~/api/movies';
import Card from 'primevue/card';
import Image from 'primevue/image';
import MovieCard from '~/components/MovieCard.vue';

const movies = ref<Movie[]>([]);

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

onMounted(async () => {
  const fetchedMovies: Movie[] = await getMovies();
  movies.value = fetchedMovies.slice(0, 4);
});

</script>

<template>
  <div class="absolute top-0 left-0 w-full h-full">
    <video class=" w-full h-full object-cover sm:object-contain sm:h-auto" src="/public/video.mp4" muted autoplay loop></video>
  </div>
  <div class="p-6 sm:p-20 md:p-28">
    <div class="relative">
      <div class="flex justify-center text-5xl p-4">
        <p class="font-sans text-3xl font-bold bg-gradient-to-r from-amber-300 to-red-500 text-transparent bg-clip-text sm:text-5xl">REV-FILMS</p>
      </div>
      <Search/>
    </div>
  </div>
  <div class="flex flex-col relative bg-gradient-to-r from-blue-950 to-fuchsia-900 text-white" id="cont2">
    <span class="flex justify-end p-4 "><nuxt-link class="hover:text-indigo-600" to="/films">Ver mas</nuxt-link></span>
    <p class="p-4 text-2xl">Ultimos estrenos</p>
    <div class="flex flex-wrap p-4 gap-4 justify-center lg:flex-nowrap">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :title="movie.title"
        :imageSrc="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
      />
    </div>
  </div>
</template>

