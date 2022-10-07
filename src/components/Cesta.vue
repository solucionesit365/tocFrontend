<template>
    <div class='btn mb-3' v-bind:class="[{'btn-info': esActivo(cesta.idMongo), 'btn-outline-info': !esActivo(cesta.idMongo)}]"
    v-for='(cesta, index) in cestas' :key='index'
    @click='changeActivo(cesta.idMongo)'>
        {{cesta.nombre}}
    </div>
</template>
<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import router from '../router';

export default {
    name: 'Cesta',
    setup() {
        const store = useStore();
        const { cestas } = store.state.CestasActivas;
        const activo = store.state.Cesta.cesta._id;

        function esActivo(x) {
            return activo === x;
        }

        function changeActivo(id) {
            store.dispatch('Cestas/setIdAction', id);
            router.push('/');
        }

        return {
            cestas,
            esActivo,
            changeActivo,
        } 
    },
}
</script>
<style scoped>
</style>
  