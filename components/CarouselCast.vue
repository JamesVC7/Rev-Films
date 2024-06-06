<template>
    <div class="card">
      <Carousel :value="cast" :numVisible="5" :numScroll="5" :responsiveOptions="responsiveOptions" id="cont_cast">
        <template #item="slotProps">
          <div class="flex flex-col items-center h-5/6 border border-surface-200 dark:border-surface-700 rounded m-2 p-4 shadow-md ">
            <div class="flex flex-col items-center gap-4 mb-4">
                <Avatar :image="'https://image.tmdb.org/t/p/w500' + slotProps.data.profile_path" class="mr-2" size="large" shape="circle" />
              <p class="font-bold">{{ slotProps.data.name }}</p>
            </div>
            <p>{{ slotProps.data.character}}</p>
          </div>
        </template>
      </Carousel>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted} from "vue";
import { useRoute } from 'vue-router';
import { getMovieByTitle, getMovieCast } from '~/api/movies';

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 5,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 4,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
]);

interface Movie {
  id: number;
}

interface Cast{
  name: string;
  content: string;
  profile_path: string | null;
  character: string;
}

const route = useRoute();
const movie = ref<Movie | null>(null);
const cast = ref<Cast[]>([]);

onMounted(async() => {
    const movieTitle = route.params.title;
    movie.value = await getMovieByTitle(movieTitle);
    if (movie.value) {
        cast.value = await getMovieCast(movie.value.id);
        console.log(movie.value.id)
    }
})

</script>

<style>

#cont_cast ul{
  display: none;
}

</style>