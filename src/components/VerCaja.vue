<template>
    <div class="row justify-content-center mt-4">
        <div class="col-7">
            <div class="card">
                <div class="card-header">
                    <h4>Último cierre de caja</h4>
                </div>
                <div class="card-body">
                    <div class="row row-2">
                        <div class="col-6">
                            <h6 class="text-center">Detalle</h6>
                            <div class="card">
                                <div class="card-body">
                                    <div class="text-muted">
                                        <div class="row row-2">
                                            <div class="col-4">Resp:</div>
                                            <div class="col-8 text-start">{{name}}</div>

                                            <div class="col-4">Inici:</div>
                                            <div class="col-8 text-start">{{inicioTime}}</div>

                                            <div class="col-4">Final:</div>
                                            <div class="col-8 text-start">{{finalTime}}</div>
                                            
                                            <div class="col-6  mb-2 mt-4">Calaix fet:</div>
                                            <div class="col-4 mb-2 mt-4 text-start">{{calaixFetZ}}</div>

                                            <div class="col-6 mt-2">Descuadre:</div>
                                            <div class="col-4 mt-2 text-start">{{descuadre}}</div>

                                            <div class="col-6 mt-2">Clients atessos:</div>
                                            <div class="col-4 mt-2 text-start">{{nClientes}}</div>
                                            
                                            <div class="col-6 mt-2">Rescaudat:</div>
                                            <div class="col-4 mt-2 text-start">{{recaudado}}</div>

                                            <div class="col-6 mt-2">Total 3G:</div>
                                            <div class="col-4 mt-2 text-start">{{totalDatafono3G}}</div>

                                            <div class="col-6 mt-2">Canvi inicial:</div>
                                            <div class="col-4 mt-2 text-start">{{cambioInicial}}</div>

                                            <div class="col-6 mt-2">Canvi final:</div>
                                            <div class="col-4 mt-2 text-start">{{cambioFinal}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-6 overflow-scroll">
                            <h6 class="text-center">Moviments de Caixa</h6>
                            <div class="card mb-2" v-for="(item, index) in moviments" v-bind:key="index">
                                <div class="card-body">
                                    <div class="row row-2 text-muted">
                                        <div class="col-4">Cantidad: </div>
                                        <div class="col-6 text-start">{{item.valor}}</div>
                                        <div class="col-4">Fecha: </div>
                                        <div class="col-6 text-start">{{item.fecha}}</div>
                                        <div class="col-4">Concepto: </div>
                                        <div class="col-6 text-start">{{item.concepto}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <button @click="imprimirUltimoCierre()" type="button" class="btn botonesPrincipales w-50">
                        <i class="bi bi-printer-fill fs-3"></i>
                    </button>
</div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { Modal } from 'bootstrap';
import axios from 'axios';
import router from '../router/index';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';

export default {
  name: 'VerCaja',
  setup() {
    const toast = useToast();
    const store = useStore();
    const activo = ref(0);

    const name = ref('');
    const inicioTime = ref(0);
    const finalTime = ref(0);
    const calaixFetZ = ref(0);
    const descuadre = ref(0);
    const totalDatafono3G = ref(0);
    const nClientes = ref(0);
    const moviments = ref([]);
    const cambioInicial = ref(0);
    const cambioFinal = ref(0);
    const recaudado = ref(0);
    const fecha = ref(0);
    const valor = ref(0);
    const concepto = ref('');
  

    function setActivo(x) {
      activo.value = x;
    }

    function volver() {
      router.push('/menu/caja');
    }

function imprimirUltimoCierre(){
    axios.post('/caja/getDatosUltimoCierre').then((arrayVerCajas) => {
 axios.post('/trabajadores/getTrabajadorByID',{id: arrayVerCajas.data.info[0].idDependienta }).then((trabajador)=>{
             arrayVerCajas.data.info[0].idDependienta = trabajador.data.trabajador.nombre

 axios.post('/caja/getDatosMoviments', {fechaInicio: arrayVerCajas.data.info[0].inicioTime, fechaFinal: arrayVerCajas.data.info[0].finalTime}).then((arrayMoviments) => {
 arrayVerCajas.data.info[0].movimientos = arrayMoviments.data.info;
                axios.post('impresora/imprimircaja',{caja:arrayVerCajas.data.info[0]}).then((resultado)=>{

      })
          })
 })
   
    })
}
  

    onMounted(() => {
      axios.post('/caja/getDatosUltimoCierre').then((arrayVerCajas) => {
        console.log(arrayVerCajas.data.info[0]);
          axios.post('/trabajadores/getTrabajadorByID',{id: arrayVerCajas.data.info[0].idDependienta }).then((trabajador)=>{
              name.value = trabajador.data.trabajador.nombre
          })
             

              const fechaInicio = new Date(arrayVerCajas.data.info[0].inicioTime);
              const fechaFinal = new Date(arrayVerCajas.data.info[0].finalTime);

              inicioTime.value = fechaInicio.getDate()+'-'+fechaInicio.getMonth()+'-'+fechaInicio.getFullYear()+'  '+fechaInicio.getHours()+':'+fechaInicio.getMinutes();
              finalTime.value = fechaFinal.getDate()+'-'+fechaFinal.getMonth()+'-'+fechaFinal.getFullYear()+'  '+fechaFinal.getHours()+':'+fechaFinal.getMinutes();

              calaixFetZ.value = arrayVerCajas.data.info[0].calaixFetZ;
              totalDatafono3G.value = arrayVerCajas.data.info[0].totalDatafono3G;

              descuadre.value = arrayVerCajas.data.info[0].descuadre;
              nClientes.value = arrayVerCajas.data.info[0].nClientes;
              recaudado.value = arrayVerCajas.data.info[0].recaudado;
              cambioInicial.value = arrayVerCajas.data.info[0].infoExtra.cambioInicial;
              cambioFinal.value = arrayVerCajas.data.info[0].infoExtra.cambioFinal;
        // setTicketActivo('', true);

              axios.post('/caja/getDatosMoviments', {fechaInicio: arrayVerCajas.data.info[0].inicioTime, fechaFinal: arrayVerCajas.data.info[0].finalTime}).then((arrayMoviments) => {
               
               arrayMoviments.data.info.forEach(element => {
                console.log(element)
                const fechamoviment= new Date( element._id);
                const date = fechamoviment.getDate()+'-'+fechamoviment.getMonth()+'-'+fechamoviment.getFullYear()+'  '+fechamoviment.getHours()+':'+fechamoviment.getMinutes();
                    moviments.value.push({
                      "fecha": date,
                      "concepto":  element.concepto,
                      "valor" :  element.valor
                    })
               }); 
         
             
        // setTicketActivo('', true);
      });

    });


      });

   



   


    // onMounted(() => {
    //   modalConfirmacionClausura = new Modal(document.getElementById('modalConfirmacionClausura'), {
    //     keyboard: false,
    //   });

    //   let infoTemporal = JSON.parse(localStorage.getItem("infoDinero"));
    //   if (infoTemporal) {
    //     infoDinero.value = infoTemporal;
    //   }

    // });

    return {
        name,
      inicioTime, 
      finalTime, 
      calaixFetZ,
      totalDatafono3G, 
      descuadre,
      recaudado,
      nClientes,
      cambioInicial,
      cambioFinal,
      moviments,
      concepto,
      valor,
      fecha,
      imprimirUltimoCierre
    };
  },
};
</script>
<style scoped>
    .infoDineros {
        color: red;
        font-weight: bold;
    }
    .colorTexto {
        color: #c95907;
    }

    .totalStyle {
        font-size: 60px;
        font-weight: bold;
    }
  .botonesCalculadora {
    background-color: #fff5e9;
    color: #c95907;
    border-width: 3px;
    border: 1px solid #bf5c18;
  }
  .unidadesSize {
    font-size: 25px;
  }

  .total3GInput {
    font-size: 2rem;
  }
</style>
