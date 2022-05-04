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
        console.log(cestas)
        function esActivo(x) {
            console.log(typeof activo, typeof x)
            return activo === x;
        }
        function changeActivo(id) {

             console.log(' changeActivo')
                    axios.get('trabajadores/getCurrentTrabajadorNueva').then((infoTrabajador) => {
                            if (infoTrabajador.data.error == false) {
                                axios.post('cestas/cambiarCestaTrabajador', { id:infoTrabajador.data.trabajador.idTrabajador, id_cesta: id }).then((res) => {
                        if (res.data.error == false) {
                        router.push('/');
                        } else {
                            toast.error(res.data.mensaje);
                        }
                    }).catch((err) => {
                        console.log(err);
                        toast.error('Error, no se ha podido selecionar la cesta ');
                    });
                            } else {
                                console.log(infoTrabajador.data.mensaje);
                                // toast.error(infoTrabajador.data.mensaje);
                            }
                        }).catch((err) => {
                            console.log(err);
                            console.log('Error catch MesasComponents/getCurrentTrabajador');
                            // toast.error('Error catch trabajador/getCurrentTrabajador');
                        });







            // store.dispatch('Cesta/setIdAction', id);
      
            // console.log('esto es en change activooo ')
            // console.log(store.getters['Cesta/getCestaId'])
            // router.push('/');

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
  