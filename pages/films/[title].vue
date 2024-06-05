<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getMovieByTitle, getMovieReviews } from '~/api/movies';

definePageMeta({
  layout: 'menu'
});

interface Review {
  author: string;
  content: string;
  avatar_path: string | null;
  rating: number | null;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
]);

const route = useRoute();
const movie = ref<Movie | null>(null);
const reviews = ref<Review[]>([]);

function truncateContent(content: string, wordLimit: number): string {
  const words = content.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return content;
}

onMounted(async () => {
  const movieTitle = route.params.title;
  movie.value = await getMovieByTitle(movieTitle);
  if (movie.value) {
    reviews.value = await getMovieReviews(movie.value.id);
  }
});
</script>

<template>
  <div v-if="movie">
    <h1 class="text-center text-3xl m-4 sm:text-5xl">{{ movie.title }}</h1>
    <div class="m-4 sm:flex items-center justify-center" id="context">
      <Image :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" />
      <div class="flex flex-col sm:w-6/12">
        <p class="text-center m-4 rounded-2xl p-4 bg-gray-200 shadow-2xl ">{{ movie.overview }}</p><br>
        <span class="flex flex-row justify-center items-center gap-4 text-2xl">
          <i class="pi pi-star-fill text-2xl" style="color: #cbcb2c"></i>
          <p class="text-center">{{ movie.vote_average }}</p>
        </span>
      </div>
    </div>
    <h2 class="text-xl font-bold px-4">Reseñas</h2>
    <div class="card">
      <Carousel :value="reviews" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
        <template #item="slotProps">
          <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4 shadow-md">
            <div class="flex items-center gap-4 mb-4">
              <Image :src="'https://image.tmdb.org/t/p/w500' + slotProps.data.avatar_path" id="avatar"
                class="w-12 h-12 rounded-full" />
              <p class="font-bold">{{ slotProps.data.author }}</p>
            </div>
            <p class="text-xs mb-4">{{ truncateContent(slotProps.data.content, 100) }}</p>
            <p>Rating: {{ slotProps.data.rating }}/10</p>
          </div>
        </template>
      </Carousel>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
  <div class="flex flex-col p-4 text-white" id="cont_gal">
    <p class="text-center">Galeria de Imagenes</p>
    <Gallery/>
  </div>
</template>

<style>
#context img {
  width: 400px;
  margin: 1rem;
  max-width: 100%;
  border-radius: 1rem;
}

#avatar img {
  border-radius: 50%;
}

#cont_gal{
  background: url(/public/imagen.jpg);
}
</style>
