<template>
    <div class="row mt-2 ms-2">
        <div class="col">
            <div @click="abrirModalPlanes()" class="card text-white bg-primary mb-3" style="max-width: 18rem;">
                <!-- <div class="card-header">1. Crear plan de trabajador</div> -->
                <div class="card-body">
                    <span class="card-title sizeBotonesTitulo">1. Nuevo plan trabajador/a</span>
                    <p class="card-text">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                    </p>
                </div>
            </div>
            <div @click="abrirModalValidarHoras()" class="card text-white bg-success mb-3" style="max-width: 18rem;">
                <!-- <div class="card-header">1. Crear plan de trabajador</div> -->
                <div class="card-body">
                    <span class="card-title sizeBotonesTitulo">2. Validar horas</span>
                    <p class="card-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-clock mt-1" viewBox="0 0 16 16">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                    </svg>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- MODAL CREAR PLAN -->
    <div class="modal fade" id="crearPlanModal" tabindex="-1">
        <div class="modal-dialog" style="max-width: 700px">
            <div class="modal-content">
            <form @submit.prevent="crearPlan()">
                <div class="modal-header">
                    <h5 class="modal-title">Nuevo plan de trabajador</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col">
                            <label for="customRange3" class="form-label" style="font-size: 1.5rem">Hora entrada</label>
                            <div class="row">
                                <div class="col">
                                    <select v-model="horaEntrada" class="form-select">
                                        <option selected>04</option>
                                        <option>05</option>
                                        <option>06</option>
                                        <option>07</option>
                                        <option>08</option>
                                        <option>09</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                        <option>15</option>
                                        <option>16</option>
                                        <option>17</option>
                                        <option>18</option>
                                        <option>19</option>
                                    </select>
                                </div>
                                <div class="col">
                                    <select v-model="minutosEntrada" class="form-select">
                                        <option selected>00</option>
                                        <option>30</option>
                                    </select>
                                </div>
                            </div>                          
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="customRange3" class="form-label" style="font-size: 1.5rem">Hora salida</label>
                            <div class="row">
                                <div class="col">
                                    <select v-model="horaSalida" class="form-select">
                                        <option selected>04</option>
                                        <option>05</option>
                                        <option>06</option>
                                        <option>07</option>
                                        <option>08</option>
                                        <option>09</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                        <option>15</option>
                                        <option>16</option>
                                        <option>17</option>
                                        <option>18</option>
                                        <option>19</option>
                                        <option>20</option>
                                        <option>21</option>
                                        <option>22</option>
                                        <option>23</option>
                                        <option>00</option>
                                    </select>
                                </div>
                                <div class="col">
                                    <select v-model="minutosSalida" class="form-select">
                                        <option selected>00</option>
                                        <option>30</option>
                                    </select>
                                </div>
                            </div>                        
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-success">Crear plan {{getResumenPlan}}</button>
                </div>
            </form>
            </div>
        </div>
    </div>
    <!-- MODAL VALIDAR HORAS -->
    <div class="modal fade" id="validarHorasModal" tabindex="-1">
        <div class="modal-dialog" style="max-width: 1200px">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Validar horas del trabajador</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table class="table table-striped" v-if="arrayTrabajadores.length > 0">
                        <thead>
                            <tr>
                                <th scope="col">Trabajador/a</th>
                                <th scope="col">Horas asignadas</th>
                                <th scope="col">Horas extras</th>
                                <th scope="col">Horas coordinación</th>
                                <th scope="col">Horas totales</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(trabajador, index) in arrayTrabajadores" v-bind:key="index">
                                <th scope="row">{{arrayTrabajadores[index].nombre}}</th>
                                <td>0</td>
                                <td>
                                    <div class="def-number-input number-input safari_only">
                                        <button class="minus" @click="restar('EXTRA', index)"></button>
                                        <input class="quantity" disabled min="-5" name="quantity" v-model="trabajador.horasExtra" type="number">
                                        <button class="plus" @click="sumar('EXTRA', index)"></button>
                                    </div>
                                </td>
                                <td>
                                    <div class="def-number-input number-input safari_only">
                                        <button class="minus" @click="restar('COORDINACION', index)"></button>
                                        <input class="quantity" disabled min="-5" name="quantity" v-model="trabajador.horasCoordinacion" type="number">
                                        <button class="plus" @click="sumar('COORDINACION', index)"></button>
                                    </div>
                                </td>
                                <td>{{trabajador.horasExtra+trabajador.horasCoordinacion}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-else class="col text-center">
                        <h1>No hay trabajadores fichados de ayer.</h1>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
  <div class="position-fixed bottom-0 start-0 ms-2 mb-2">
      <button class="btn btn-warning buttonSizeTecnico" @click="volver()">Volver</button>
  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import { Modal } from 'bootstrap';
import router from '../router/index';
import { useToast } from 'vue-toastification';
// import { parametros } from '../services/parametros';

export default {
  name: 'MenuResponsable',
  setup() {
    const toast = useToast();
    let crearPlanModal = null;
    let validarHorasModal = null;
    const horaEntrada = ref('04');
    const minutosEntrada = ref('00');
    const horaSalida = ref('04');
    const minutosSalida = ref('00');
    const arrayTrabajadores = ref([]); // Para lista de horas extra, coordina...
    const horasCoordinacion = ref(0);
    const horasExtra = ref(0);
    const horasTotales = computed(() => horasExtra.value + horasCoordinacion.value);

    function goTo(x) {
      router.push(x);
    }

    function crearPlan() {
        const horarioEntrada = `${horaEntrada.value}:${minutosEntrada.value}`;
        const horarioSalida = `${horaSalida.value}:${minutosSalida.value}`;

        axios.post('trabajadores/crearPlan', {
            horaEntrada: horarioEntrada,
            horaSalida: horarioSalida
        }).then((res) => {
            if (res.data.error == false) {
                toast.success('Plan OK');
            } else {
                toast.error(res.data.mensaje);
            }
        }).catch((err) => {
            console.log(err);
            toast.error('Error, mirar consola');
        });
    }

    function abrirModalPlanes(x) {
        crearPlanModal.show();
    }

    function abrirModalValidarHoras(x) {
        validarHorasModal.show();
    }

    function guardarHorasExtraCoordinacion(i, auxExtra, auxCoordinacion, timestamp, idTrabajador) {
        axios.post('trabajadores/guardarHorasExtraCoordinacion', {
            horasExtra: auxExtra,
            horasCoordinacion: auxCoordinacion,
            timestamp,
            idTrabajador
        }).then((res) => {
            if (res.data.error == false) {
                arrayTrabajadores.value[i].horasExtra = auxExtra;
                arrayTrabajadores.value[i].horasCoordinacion = auxCoordinacion;
            } else {
                toast.error(res.data.mensaje);
            }
        }).catch((err) => {
            console.log(err);
            toast.error("Error en CATCH trabajadores/guardarHorasExtraCoordinacion");
        });    
    }

    function sumar(tipo, i) {
        let auxCoordinacion = arrayTrabajadores.value[i].horasCoordinacion;
        let auxExtra = arrayTrabajadores.value[i].horasExtra;

        switch(tipo) {
            case "COORDINACION": auxCoordinacion += 0.5; break;
            case "EXTRA": auxExtra += 0.5; break;
        }

        guardarHorasExtraCoordinacion(i, auxExtra, auxCoordinacion, arrayTrabajadores.value[i].timestamp, arrayTrabajadores.value[i].idTrabajador);
    }
    
    function restar(tipo, i) {
        let auxCoordinacion = arrayTrabajadores.value[i].horasCoordinacion;
        let auxExtra = arrayTrabajadores.value[i].horasExtra;

        switch(tipo) {
            case "COORDINACION": auxCoordinacion -= 0.5; break;
            case "EXTRA": auxExtra -= 0.5; break;
        }
        
        guardarHorasExtraCoordinacion(i, auxExtra, auxCoordinacion, arrayTrabajadores.value[i].timestamp, arrayTrabajadores.value[i].idTrabajador);
    }

    function volver() {
        router.push('/menu/fichajes');
    }

    const getResumenPlan = computed(() => {
        return `${horaEntrada.value}:${minutosEntrada.value} - ${horaSalida.value}:${minutosSalida.value}`;
    });

    onMounted(() => {
        crearPlanModal = new Modal(document.getElementById('crearPlanModal'), {
            keyboard: false,
        });
        validarHorasModal = new Modal(document.getElementById('validarHorasModal'), {
            keyboard: false,
        });
        axios.get('trabajadores/getTrabajaronAyer').then((res) => {
            console.log(res.data);
            arrayTrabajadores.value = res.data;
        }).catch((err) => {
            console.log(err);
            toast.error('Error, no se ha podido obtener la lista de trabajadores de ayer');
        });
    });

    return {
        guardarHorasExtraCoordinacion,
        horasTotales,
        horasExtra,
        horasCoordinacion,
        sumar,
        restar,
        arrayTrabajadores,
        abrirModalValidarHoras,
        volver,
        crearPlan,
        getResumenPlan,
        horaEntrada,
        horaSalida,
        minutosEntrada,
        minutosSalida,
        goTo,
        abrirModalPlanes
    };
  },
};
</script>

<style scoped>
  .sizeBotonesTitulo {
    font-size: 1rem;
    font-weight: bold;
  }
  
  .buttonSizeTecnico {
     font-size: 40px;
  }
  
    .number-input input[type="number"] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
    }

    .number-input input[type=number]::-webkit-inner-spin-button,
    .number-input input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    }

    .number-input {
    display: flex;
    justify-content: space-around;
    align-items: center;
    }

    .number-input button {
    -webkit-appearance: none;
    background-color: transparent;
    border: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0;
    position: relative;
    }

    .number-input button:before,
    .number-input button:after {
    display: inline-block;
    position: absolute;
    content: '';
    height: 2px;
    transform: translate(-50%, -50%);
    }

    .number-input button.plus:after {
    transform: translate(-50%, -50%) rotate(90deg);
    }

    .number-input input[type=number] {
    text-align: center;
    }

    .number-input.number-input {
    border: 1px solid #ced4da;
    width: 10rem;
    border-radius: .25rem;
    }

    .number-input.number-input button {
    width: 2.6rem;
    height: .7rem;
    }

    .number-input.number-input button.minus {
    padding-left: 10px;
    }

    .number-input.number-input button:before,
    .number-input.number-input button:after {
    width: .7rem;
    background-color: #495057;
    }

    .number-input.number-input input[type=number] {
    max-width: 4rem;
    padding: .5rem;
    border: 1px solid #ced4da;
    border-width: 0 1px;
    font-size: 1rem;
    height: 2rem;
    color: #495057;
    }

    @media not all and (min-resolution:.001dpcm) {
    @supports (-webkit-appearance: none) and (stroke-color:transparent) {

    .number-input.def-number-input.safari_only button:before,
    .number-input.def-number-input.safari_only button:after {
    margin-top: -.3rem;
    }
    }
    }
</style>