<script setup lang="ts">
import { useRouter } from 'vue-router';
import { searchMovies } from '~/api/movies';

const value1 = ref<string | null>(null);
const router = useRouter();
const searchQuery = ref<string>('');
const suggestedMovies = ref<Movie[]>([]);
const showSuggestions = ref(false);

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const searchMovie = () => {
  if (value1.value) {
    router.push({ name: 'films-title', params: { title: value1.value } });
  }
};

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && value1.value) {
    searchMovie();
  }
};

const searchMoviesHandler = async () => {
  if (!searchQuery.value) {
    suggestedMovies.value = [];
    showSuggestions.value = false;
    return;
  }

  const moviesResult = await searchMovies(searchQuery.value);
  suggestedMovies.value = moviesResult;
  showSuggestions.value = true;
};

const handleInput = () => {
  if (value1.value !== null) {
    searchQuery.value = value1.value;
    searchMoviesHandler(); 
  }
};

const selectMovie = (title: string) => {
  const movie = suggestedMovies.value.find(movie => movie.title === title);
  if (movie) {
    router.push({ name: 'films-title', params: { title: movie.title } });
  }
  showSuggestions.value = false;
};
</script>

<template>
    <div class="flex flex-wrap justify-center gap-3 p-4" id="rsearch">
        <IconField class="w-full shadow-md">
            <InputIcon class="pi pi-search" @click="searchMovie" />
            <InputText v-model="value1" placeholder="Busca una película" class="w-full shadow-none"
                @keypress="handleKeyPress" @input="handleInput" />
        </IconField>
        <ul v-if="showSuggestions"
            class="absolute z-10 mt-1 bg-white border border-gray-300 w-full rounded-md shadow-lg">
            <li v-for="movie in suggestedMovies" :key="movie.id" @click="selectMovie(movie.title)"
                class="px-2 py-1 cursor-pointer hover:bg-gray-100">{{ movie.title }}</li>
            <li v-if="suggestedMovies.length === 0" class="px-2 py-1">No hay resultados</li>
        </ul>
    </div>
</template>

<style>
  #rsearch ul {
    max-height: 200px;
    width: 98%;
    margin: 3rem;
    overflow-y: auto;
  }
</style>