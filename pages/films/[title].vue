<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getMovieByTitle, getMovieReviews, getMovieDetails } from '~/api/movies';

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
  release_date: string;
}

interface Details {
  runtime: number | null;
  genres: { id: number; name: string }[];
}

const verticalHeight = ref('460px');

const updateHeight = () => {
  const width = window.innerWidth;
  if (width < 520) {  
    verticalHeight.value = '460px';
  } else if (width >= 520 ) {  
    verticalHeight.value = '330px';
  }
};

const route = useRoute();
const movie = ref<Movie | null>(null);
const reviews = ref<Review[]>([]);
const details = ref<Details | null>(null);

function truncateContent(content: string, wordLimit: number): string {
  const words = content.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return content;
}

function getAvatarUrl(avatarPath: string | null): string {
  return avatarPath
    ? `https://image.tmdb.org/t/p/w500${avatarPath}`
    : '/avatar.png';
}

onMounted(async () => {
  const movieTitle = route.params.title;
  movie.value = await getMovieByTitle(movieTitle);
  if (movie.value) {
    reviews.value = await getMovieReviews(movie.value.id);
    details.value = await getMovieDetails(movie.value.id);
  }
  updateHeight();
  window.addEventListener('resize', updateHeight);
});
</script>

<template>
  <div v-if="movie">
    <h1 class="text-center text-3xl m-4 sm:text-5xl">{{ movie.title }}</h1>
    <div class="m-4 sm:flex items-center justify-center" id="context">
      <Image :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" />
      <div class="flex flex-col sm:w-6/12">
        <p class="px-4 font-bold">{{ movie.release_date }}</p>
        <div v-if="details" class="flex gap-4 px-4">
          <p>{{ details.genres.map(genre => genre.name).join(', ') }}</p>
          <p><i class="pi pi-clock" style="font-size: 1rem"></i>&nbsp;{{ details.runtime }} minutos</p>
        </div>
        <p class="text-center m-4 rounded-2xl p-4 bg-gray-200 shadow-2xl ">{{ movie.overview }}</p><br>
        <span class="flex flex-row justify-center items-center gap-4 text-2xl">
          <i class="pi pi-star-fill text-2xl" style="color: #cbcb2c"></i>
          <p class="text-center">{{ movie.vote_average }}</p>
        </span>
      </div>
    </div>
    <h2 class="text-xl font-bold px-4">Reseñas</h2>
    <div class="card">
      <Carousel :value="reviews" :numVisible="1" :numScroll="1" orientation="vertical"  :verticalViewPortHeight="verticalHeight" containerClass="flex items-center"
        :autoplayInterval="5000" id="cont_carrusel">
        <template #item="slotProps">
          <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4 shadow-md max-w-3xl">
            <div class="flex items-center gap-4 mb-4">
              <Avatar :image="getAvatarUrl(slotProps.data.avatar_path)" class="mr-2" size="large" shape="circle" />
              <p class="font-bold">{{ slotProps.data.author }}</p>
            </div>
            <p class="text-xs mb-4">{{ truncateContent(slotProps.data.content, 100) }}</p>
            <p>Rating: {{ slotProps.data.rating }}/10</p>
            <ButtonShow :author="slotProps.data.author" :avatar_path="slotProps.data.avatar_path" :content="slotProps.data.content" :rating="slotProps.data.rating" />
          </div>
        </template>
      </Carousel>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
  <div class="flex flex-col p-4 text-white" id="cont_gal">
    <p class="text-center text-xl">Galeria de Imagenes</p>
    <Gallery />
  </div>
  <p class="m-4 font-bold text-xl">Reparto</p>
  <div>
    <CarouselCast />
  </div>
  <div class="bg-gradient-to-r from-red-950 via-red-800 to-red-950 p-2 text-white">
    <p class="m-4 font-bold text-xl">Trailers & Clips</p>
    <Clips />
  </div>
</template>

<style>
#context img {
  width: 400px;
  margin: 1rem;
  max-width: 100%;
  border-radius: 1rem;
}

#cont_gal {
  background: url(/public/imagen.jpg);
}

#cont_carrusel .p-carousel-item{
  display: flex;
  justify-content: center;
}
</style>
