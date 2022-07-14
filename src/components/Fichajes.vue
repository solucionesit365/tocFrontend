<template>
    <div class="row">
        <div class='col-md-6 ms-3 mt-3'>
            <div class='row ms-3'>
                <div class="card cardWidth">
                    <div class="card-body" style='text-align: center;'>
                        <span><i class="bi bi-fingerprint"></i></span>
                        <a href="#" class="btn btn-primary" @click="abrirModal()">Fichaje</a>
                    </div>
                </div>

<!-- <div class="card" style="width: 18rem;">
  <img src="/fingerprint.svg" class="card-img-top mt-1" height="80" alt="...">
  <div class="card-body">
    <h5 class="card-title">Fichajes</h5>
    <p class="card-text">RegistroEntrada y salida para los trabajadores</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> -->

                <div class="card cardWidth">
                    <div class="card-body" style='text-align: center;'>
                        <span><i class="bi bi-cup-straw"></i></span>
                        <button @click="consumoPersonal()" class="btn btn-primary">Consumo personal</button>
                    </div>
                </div>
                <div class="card cardWidth">
                    <div class="card-body" style='text-align: center;'>
                        <span><i class="bi bi-file-earmark-lock"></i></span>
                        <button @click="abrirModalPassword()" class="btn btn-primary">Menú responsable</button>
                    </div>
                    
               
                </div>
            <div class="card cardWidth">
                    <div class="card-body" style='text-align: center;'>
                        <span><i class="bi bi-power"></i></span>
                        <button @click="apagarEquipo()" class="btn btn-danger">Apagar</button>
                    </div>
                </div>
            </div>
            <div class='row ms-3'>

                <div class="card cardWidth">
                    <div class="card-body" style='text-align: center;'>
                        <span><i class="bi bi-door-open"></i></span>
                        <button @click="desfichar()" class="btn btn-primary">DesFichar</button>
                    </div>
                </div>
              
                
            </div>
            
        </div>
    </div>
    <!-- <div class="row mt-2">
        <div class="col text-center">
            <span class="tituloFichajes">Fichajes del día 01/02/2022</span>
            <table class="table table-striped mx-auto" style="width: 50%">
            <thead>
                <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Entrada</th>
                <th scope="col">Salida</th>
                <th scope="col">Turno seleccionado</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Miguel</th>
                    <td>08:01</td>
                    <td>16:00</td>
                    <td>6:00 a 14:00h</td>
                </tr>
                <tr>
                    <th>Miguel</th>
                    <td>08:01</td>
                    <td>16:00</td>
                    <td>6:00 a 14:00h</td>
                </tr>
                <tr>
                    <th>Miguel</th>
                    <td>08:01</td>
                    <td>16:00</td>
                    <td>6:00 a 14:00h</td>
                </tr>
            </tbody>
            </table>
        </div>
    </div> -->

    <!-- Modal -->
    <div class="modal fade" id="modalFichajes" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
        <div class="modal-dialog" style="max-width: 700px">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Fichaje</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <input v-model="inputBusqueda" class="form-control" style="width: 350px; height: 50px; font-size: 20px" type="text" placeholder="Introduce tu nombre">
                    <button type="button" style="width: 100px" class="btn btn-primary ms-2" @click="buscar()">Buscar</button>
                    <button type="button" style="width: 200px" class="btn btn-warning ms-2" @click="actualizarLista()">Actualizar lista</button>
                    <div class="row mt-2">
                        <!-- Selcion de los turnos solo para silema  -->

                        <!-- <select v-if="mostrarTurnos" v-model="idPlanificacion" class="form-select" style="height: 50px; font-size: 20px">
                            <option value="SIN_TURNO">Sin turno</option>
                            <option v-for="(item, index) in arrayPlanes" :key="index" :value="arrayPlanes[index].idPlan">{{arrayPlanes[index].turno}}</option>
                        </select> -->
                    </div>
                    <div class="row mt-2">
                        <div class="table" style="height: 400px;">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Fichar/Desfichar</th>
                                        <th scope="col">Descanso</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(trabajador, index) of arrayTrabajadores" v-bind:key="index">
                                        <td>{{trabajador.nombre}}</td>
                                        <td v-if="trabajador.fichado === false || trabajador.fichado == undefined"><a href="#" style="width: 150px" class="btn btn-outline-primary btn_fc" @click="fichar(trabajador, index)">FICHAR</a></td>
                                         <td v-else><a href="#" style="width: 150px" class="btn btn-success">Fichada/o</a></td>
                                         <td v-if="trabajador.descanso === false || trabajador.descanso == undefined"><a href="#" style="width: 150px" class="btn btn-outline-primary btn_fc" @click="descanso(trabajador,index)">DESCANSO</a></td>
                                         <td v-else><a href="#" style="width: 150px" class="btn btn-warning ms-2">Fin Descanso</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger btn-lg" data-bs-dismiss="modal" @click="goTo('/')">Confirmar</button>
            </div>
            </div>
        </div>
    </div>

    <!-- MODAL PASSWORD -->
    <div class="modal fade" id="modalPassword" tabindex="-1">
        <div class="modal-dialog" style="max-width: 700px">
            <div class="modal-content">
            <form @submit.prevent="goToMenuResponsable()">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ingresa la contraseña</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col">
                                <div class="mb-3">
                                    <label class="form-label">Contraseña</label>
                                    <input type="password" minlength="3" maxlength="20" class="form-control" v-model="password">
                                </div>
                            
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-success" data-bs-dismiss="modal">Confirmar</button>
                </div>
            </form>
            </div>
        </div>
    </div>

</template>
<script>
import { Modal } from 'bootstrap';
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import router from '../router/index';
import { useToast } from 'vue-toastification';
import { tocGame } from '../services/tocGame';
const sha1 = require('sha-1');

export default {
    name: 'Dependientas',
    setup() {
        const store = useStore();
        const idPlanificacion = ref('SIN_TURNO');
        const nombre = 'Santy';
        const id = 156;
        const mostrarTurnos = ref(false);
        let modalFichajes = null;
        let modalPassword = null;
        const arrayTrabajadores = ref([]);
        const inputBusqueda = ref('');
        const toast = useToast();
        const arrayPlanes = ref([]);
        const password = ref('');

        function test() {
            console.log("El selected es: ", idPlanificacion.value);
        }

        async function goToMenuResponsable() {
            const hash = await sha1(password.value);
            if (hash == '4cd914fef37199909adb4c0ba5e31439429995c4') {
                router.push('/menuResponsable');
            } else {
                toast.error("Contraseña incorrecta");
            }
        }

        function abrirModal() {
            modalFichajes.show();

            //La peticion que solo tiene que hacer silema 
          if (mostrarTurnos.value){
              // actualizarTurnos().then(() => {
            //     modalFichajes.show();
            // }).catch((err) => {
            //     console.log(err);
            //     modalFichajes.show();
            // }); 
          }
                      
        }
        function abrirModalPassword() {
            modalPassword.show();
        }

        function cerrarModal() {
            modalFichajes.hide();
        }

        function buscar() {
            axios.post('trabajadores/buscar', { busqueda: inputBusqueda.value }).then((res) => {
                arrayTrabajadores.value = res.data;
            }).catch((err) => {
                console.log(err);
            });
        }

        function actualizarTurnos() {
            return axios.get('turnos/getPlanes').then((resPlanes) => {
                if (resPlanes.data.error == false) {
                    arrayPlanes.value = resPlanes.data.info;
                } else {
                    toast.error(resPlanes.data.mensaje);
                }
            }).catch((err) => {
                console.log(err);
                toast.error('Error frontend catch: axios turnos/getPlanes');
            });
        }

        function ficharReal(trabajador, index) {
            axios.post('trabajadores/fichar', { idTrabajador: trabajador.idTrabajador, idPlan: idPlanificacion.value }).then((res) => {
                if (!res.data.error) {
                    store.dispatch('Cesta/setIdAction', trabajador.idTrabajador);
                    arrayTrabajadores.value[index].fichado = true;
                   // actualizarTurnos();
                    idPlanificacion.value = 'SIN_TURNO';
                } else {
                    console.log(res.data.mensaje);
                    arrayTrabajadores.value[index].fichado = false;
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        function descanso(trabajador, index) {
     toast.error('Esta deshabilitado ')
            // axios.post('trabajadores/descanso', { idTrabajador: trabajador.idTrabajador, idPlan: idPlanificacion.value }).then((res) => {
            //     if (!res.data.error) {
            //         store.dispatch('Cesta/setIdAction', trabajador.idTrabajador);
            //         arrayTrabajadores.value[index].fichado = true;
            //        // actualizarTurnos();
            //         idPlanificacion.value = 'SIN_TURNO';
            //     } else {
            //         console.log(res.data.mensaje);
            //         arrayTrabajadores.value[index].fichado = false;
            //     }
            // }).catch((err) => {
            //     console.log(err);
            // });
        }


        function fichar(trabajador, index) {
            console.log(trabajador)
            ficharReal(trabajador, index);
            // if (idPlanificacion.value == 'SIN_TURNO') {
            //     if (confirm("No has seleccionado turno. ¿CONTINUAR?")) {
            //         ficharReal(trabajador, index);
            //     }
            // } else {
            //     ficharReal(trabajador, index);
            // }
        }

        function actualizarLista() {
            axios.post('trabajadores/actualizarTrabajadores').then((res) => {
                if (res.data.error == false) {
                    toast.success('Trabajadores actualizados');
                } else {
                    toast.error(res.data.mensaje);
                }
            });
        }

        function desfichar() {
            axios.post('trabajadores/desfichar', { idTrabajador: store.state.Trabajadores.trabajadorActivo }).then((res) => {
                if (!res.data.error) {
                  //  arrayTrabajadores.value[index].fichado = false;
                    store.dispatch('CestasActivas/deleteCestaActivaAction',store.state.Trabajadores.trabajadorActivo);
                    axios.post('cestas/getCestaDiferente', { id_cesta: store.state.Trabajadores.trabajadorActivo }).then((data) => {
                        store.dispatch('Cesta/setIdAction', data.data._id);
                        // store.dispatch('Trabajadores/setTrabajadorActivo', parseInt(data.data._id));
                        axios.post('trabajadores/setActivo', { id: data.data._id }).then((data2) =>{
                            if (data2.data.error) {
                               toast.error(data2.data.mensaje);
                            } 
                            
                        
                        });
                        router.push('/')
                    }).catch((err)=>{
                        console.log(err);
                    })

                } else {
                    console.log('Error al desfichar');
                }
            }).catch((err) => {
                console.log(err);
            });
          
            
        }

        function consumoPersonal() {
            store.dispatch('setModoActual', 'CONSUMO PERSONAL');
            store.dispatch('Footer/setMenuActivo', 1);
            router.push('/');
        }

        function goTo(x) {
            router.push(x);
        }
        function apagarEquipo(){
            
              axios.get('apagarEquipo').then((res) => {
                 console.log(res.data)
                if (res.data.error == false) {
          
                  console.log(res.data.mensaje)
                } else {
                   
                }
            }).catch((err) => {
                console.log(err);
                toast.error('Error frontend catch: axios apagar/apagar');
            });
        }

        onMounted(() => {
            modalFichajes = new Modal(document.getElementById('modalFichajes'), {
                keyboard: false,
            });
            modalPassword = new Modal(document.getElementById('modalPassword'), {
                keyboard: false,
            });
              if(tocGame.getParametros().database.toLowerCase() == 'fac_tena'){
               mostrarTurnos.value = true;
            }
            axios.get('turnos/getPlanes').then((res) => {
                if (res.data.error == false) {
                    arrayPlanes.value = res.data.info;
                } else {
                    toast.error(res.data.mensaje);
                }
            }).catch((err) => {
                console.log(err);
                toast.error('Error frontend catch: axios turnos/getPlanes');
            });
        });

        return {
            mostrarTurnos,
            goTo,
            goToMenuResponsable,
            abrirModalPassword,
            password,
            test,
            arrayPlanes,
            idPlanificacion,
            actualizarLista,
            consumoPersonal,
            fichar,
            desfichar,
            inputBusqueda,
            arrayTrabajadores,
            buscar,
            cerrarModal,
            abrirModal,
            apagarEquipo,
            nombre,
            id,
            descanso
        };
    },
    watch: {
        inputBusqueda: function () {
            if (this.inputBusqueda.length >= 3) {
                this.buscar();
            }
        }
    }
};
</script>
<style scoped>
    .cardWidth {
       width: 10rem;
       margin: 5px;
    }
    span i {
        font-size: 5rem;
    }
    .tituloFichajes {
        font-size: 1.5rem;
        text-transform: uppercase;
        font-weight: bold;
    }
</style>
