<template>
    <div class='btn mb-3' v-bind:class="[{'btn-color': esActivo(trabajador.idTrabajador), 'btn-outline-color': !esActivo(trabajador.idTrabajador)}]"
    v-for='(trabajador, index) in arrayTrabajadores' :key='index'
    @click='changeActivo(trabajador.idTrabajador)'>
        {{trabajador.nombre}}
    </div>
</template>
<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import router from '../router/index';

export default {
    name: 'Trabajador',
    setup() {
        const store = useStore();
        const trabajadorActivo = ref();
        const arrayTrabajadores = ref([]);
        function esActivo(x) {
            return trabajadorActivo.value === x;
        }
        function changeActivo(id) {
            console.log('Cambiode trabajadores ')
            
            axios.post('trabajadores/setActivo', { id }).then((res) => {
                if (!res.data.error) {
                    store.dispatch('Trabajadores/setTrabajadorActivo', id);
                    // store.dispatch('Cesta/setIdAction', id.toString());
                    store.dispatch('Cesta/setNameAction', '');
                    store.dispatch('Cesta/setIdAction', id);
                    getFichados();
                    router.push('/');
                } else {
                    console.log('Error al cambiar trabajador activo');
                }
            });
        }
        function getFichados() {
            
            axios.post('trabajadores/getTrabajadoresFichados').then((info) => {
                if(!info.data.error) {
                    if (info.data.res.length > 0) {
                        store.dispatch('Trabajadores/setArrayTrabajadores', info.data.res);
                        arrayTrabajadores.value = info.data.res;
                        axios.post('trabajadores/getCurrentTrabajador').then((infoTrabajador) => {
                        if (!infoTrabajador.data.error) {
                            console.log(infoTrabajador.data)
                            trabajadorActivo.value = infoTrabajador.data.trabajador.idTrabajador;
                            store.dispatch('Trabajadores/setTrabajadorActivo', infoTrabajador.data.trabajador.idTrabajador);
                        } else {
                            console.log('Error en getCurrentTrabajador');
                        }
                        }).catch((err) => {
                            console.log(err);
                        });
                    } else {
                        // ENVIAR DIRECTAMENTE A FICHAR TRABAJADOR !!!
                    }
                } else {
                    console.log('Error en getTrabajadoresFichados');
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        onMounted(() => {
            getFichados();
        })
        return {
            arrayTrabajadores,
            esActivo,
            changeActivo,
        } 
    },
}
</script>
<style scoped>
.btn-color {
    background-color: #c95907;
    color: white;
}
.btn-outline-color {
    border-color: #c95907;
    color: #c95907;
}
.btn-outline-color:hover {
    background-color: #c95907;
    color: white;
}
</style>
  