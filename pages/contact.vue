<script setup lang="ts">
import { ref } from 'vue';
const value = ref(null);
const val = ref(null);
const valu = ref(null);
const loading = ref(false);
const load = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 2000);
};


</script>

<template>
    <div class="flex flex-col p-2 items-center gap-y-4" >
    <p>CONTACTO</p>
    <div class="card flex flex-col justify-content-center w-6/12 gap-y-4">
        <div class="flex flex-col gap-2">
            <label for="username">Nombre</label>
            <InputText id="username" v-model="value" aria-describedby="username-help" />
            <small id="username-help">Ingresa tu nombre para ponernos en contacto.</small>
        </div>
        <div class="flex flex-col gap-2">
            <label for="username">Correo</label>
            <InputText id="username" v-model="val" aria-describedby="username-help" />
            <small id="username-help">Ingresa su correo para ponernos en contacto.</small>
        </div>
        <div class="flex flex-col gap-2">
            <label>Mensaje</label>
            <Textarea v-model="valu" autoResize rows="5" cols="30" />
        </div>
        <div class="card flex justify-content-center ">
        <Button class="shadow-none w-full" type="button" label="Search" icon="pi pi-check" :loading="loading" @click="load" />
        </div>
    </div>
</div>
</template>

