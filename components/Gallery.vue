<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getMovieByTitle, getMovieImages} from '~/api/movies'; 

interface Movie {
  id: number;
}
interface Image {
  file_path: string;
}

const route = useRoute();
const movie = ref<Movie | null>(null);
const images = ref<Image[]>([]);

const responsiveOptions = ref([
    {
        breakpoint: '1300px',
        numVisible: 4
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
]);

onMounted(async () => {
    const movieTitle = route.params.title;
    movie.value = await getMovieByTitle(movieTitle);
    if (movie.value) {
        images.value = await getMovieImages(movie.value.id);
    }
});
</script>

<template>
    <div class="flex justify-center p-4">
        <Galleria v-if="movie" :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" containerStyle="max-width: 680px">
            <template #item="slotProps">
                <img :src="'https://image.tmdb.org/t/p/w1280' + slotProps.item.file_path" :alt="slotProps.item.file_path" class="w-full"/>
            </template>
            <template #thumbnail="slotProps" >
                <img :src="'https://image.tmdb.org/t/p/w200' + slotProps.item.file_path" :alt="slotProps.item.file_path" />
            </template>
        </Galleria>
    </div>
</template>


