<template>
    <div class="card">
      <Carousel :value="cast" :numVisible="5" :numScroll="5" :responsiveOptions="responsiveOptions" id="cont_cast">
        <template #item="slotProps">
          <div class="flex flex-col items-center border border-surface-200 dark:border-surface-700 rounded m-2 p-4 shadow-md" id="cont_text">
            <div class="flex flex-col items-center gap-4 mb-4 w-full h-full">
                <Avatar :image="getProfileUrl(slotProps.data.profile_path)" class="mr-2"/>
              <p class="font-bold">{{ slotProps.data.name }}</p>
              <p>{{ slotProps.data.character}}</p>
            </div>
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
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '420px',
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

function getProfileUrl(profilePath: string | null): string {
  return profilePath
    ? `https://image.tmdb.org/t/p/w500${profilePath}`
    : '/avatar.png';
}

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
#cont_cast img{
  border-radius: 1rem;
}
#cont_cast .p-avatar{
  height: 75%;
  width: 100%;
}
#cont_text{
  height: 92%;
}
</style>