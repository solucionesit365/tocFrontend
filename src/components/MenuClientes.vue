<template>
   <div class="modal" id="modalClientes" tabindex="-1" role="dialog"
   data-keyboard="false" data-backdrop="static">
      <div class="modal-dialog" role="document" style="max-width: 800px">
         <div class="modal-content">
            <div class="modal-header">
               <button type="button" class="btn btn-warning btn-lg mr-0" @click="selectGlovo()">
                   Glovo
                </button>
               <button type="button" class="btn btn-info btn-lg mr-0" @click="selectUber()">
                   Uber
                </button>
               <button type="button" class="btn btn-dark btn-lg mr-0" @click="selectToGoodToGo()">
                   To Go
                </button>
               <button type="button" class="btn btn-success btn-lg mr-0"  data-bs-toggle="modal" data-bs-target="#modalNuevoCliente">
                   NUEVO
                </button>
               <button type="button" class="btn btn-danger btn-lg mr-0" @click="reset()">
                   RESET
                </button>
               <button type="button" class="btn btn-secondary btn-lg" data-bs-dismiss="modal">
                   SALIR
                </button>
            </div>
            <div class="modal-body">
               <div class="row">
                  <input v-model="inputBusqueda" style="width: 659px; height: 50px; font-size: 20px" type="text" class="form-control" placeholder="Nombre cliente">
                  <button @click="buscar()" style="width: 100px; height: 50px; font-size: 22px" class="btn btn-primary ms-1">Buscar</button>
                  <div class="col-md-12">
                     <div class="table-responsive w-100" style="height: 400px;">
                        <table class="table table-striped mt-1">
                           <thead>
                              <tr>
                                 <th class="clientesAnchoNombre" scope="col">Nombre</th>
                                 <th class="clientesAnchoBotones" scope="col"></th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr v-for="(cliente, index) of arrayClientes" v-bind:key="index">
                                 <td class="clientesAnchoNombre">{{cliente.nombre}}</td>
                                 <td class="clientesAnchoBotones">
                                    <button
                                     @click="selectCliente(cliente)"
                                     href="#" class="btn btn-primary btn-lg" style="width: 150px">
                                        Seleccionar
                                    </button>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>


   <div class="modal" id="modalNuevoCliente" tabindex="-1" role="dialog"
   data-keyboard="false" data-backdrop="static">
      <div class="modal-dialog" role="document" style="max-width: 800px">
         <div class="modal-content">
            <div class="modal-header">
               <h4>Crear nuevo cliente</h4>
            </div>
            <div class="modal-body">
               <div class="row mx-auto">
                  <label for="exampleInputEmail1" class="form-label">Nombre Cliente</label>
                  <input v-model="nombreClienteNuevo" style="width: 659px; height: 50px; font-size: 20px" type="text" class="form-control">
                  <label for="exampleInputEmail1" class="form-label mt-4">Nº Tarjeta</label>
                  <input v-model="nTarjetaNueva" style="width: 659px; height: 50px; font-size: 20px" type="number" class="form-control">
               </div>
            </div>
            <div class='modal-footer'>
               <button type='submit' class='btn btn-success mx-auto' @click='nuevoCliente()' data-bs-dismiss="modal">Crear cliente</button>
            </div>
         </div>
      </div>
   </div>
   <div id="eventoLector"></div>
</template>
<script>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { Modal } from 'bootstrap';
import { useToast } from 'vue-toastification';
import { socket, emitSocket } from '../sockets/socket';

export default {
  name: 'MenuClientes',
  setup() {
    const toast = useToast();
    const store = useStore();
    const GLOVO = store.getters['Clientes/getGlovo'];
    const DELIVEROO = store.getters['Clientes/getDeliveroo'];
    const UBER = store.getters['Clientes/getUber'];
    const TOO_GOOD_TO_GO = store.getters['Clientes/getTooGoodToGo'];
    const nombre = 'Santy';
    const inputBusqueda = ref('');
    const nombreClienteNuevo = ref('');
    const nTarjetaNueva = ref('');
    const clienteActivo = computed(() => store.state.Clientes.clienteActivo);
    const arrayClientes = ref([]);
    let modalClientes = null;

    function selectGlovo() {
      axios.post('clientes/getClienteByID', { idCliente: GLOVO }).then((res) => {
         if (!res.data.error) {
            selectCliente(res.data.infoCliente);
         } else {
            toast.error(res.data.mensaje);
         }
      }).catch((err) => {
         console.log(err);
         toast.error(res.data.mensaje);
      }); 
    }

    function selectToGoodToGo() {
      axios.post('clientes/getClienteByID', { idCliente: TOO_GOOD_TO_GO }).then((res) => {
         if (!res.data.error) {
            selectCliente(res.data.infoCliente);
         } else {
            toast.error(res.data.mensaje);
         }
      }).catch((err) => {
         console.log(err);
         toast.error(res.data.mensaje);
      }); 
    }
    function selectUber() {
      axios.post('clientes/getClienteByID', { idCliente: UBER }).then((res) => {
         if (!res.data.error) {
            selectCliente(res.data.infoCliente);
         } else {
            toast.error(res.data.mensaje);
         }
      }).catch((err) => {
         console.log(err);
         toast.error(res.data.mensaje);
      }); 
    }

   function nuevoCliente() {
      axios.post('clientes/crearNuevoCliente', { idTarjetaCliente: nTarjetaNueva.value, nombreCliente: nombreClienteNuevo.value}).then((res) => {
         if(!res.data.error) {
            toast.success('Cliente creado con éxito.');
            axios.post('clientes/descargarClientesFinales').then((res) => {
                  
                if (res.data.error == false) {
                   nombreClienteNuevo.value = '';
                   nTarjetaNueva.value = '';
                    toast.success('Clientes descargados OK');
                } else {
                    toast.error(res.data.mensaje);
                }
            }).catch((err) => {
                console.log(err);
                toast.error('Error descargarClientesFinales CATCH');
            });
         } else {
            toast.error(res.data.mensaje);
         }       
      }).catch((err) => {
         toast.error('Error en nuevoCliente() - MenuCliente.vue');
      })

   }

   function reset() {
      store.dispatch('setModoActual', 'NORMAL');
      store.dispatch('Clientes/resetClienteActivo');
      store.dispatch('Footer/resetMenuActivo');
      axios.post('articulos/setEstadoTarifaVIP', { nuevoEstado: false }).then((res) => {
         modalClientes.hide();
         toast.info('Reset OK. Estado de cobro: NORMAL');
      }).catch((err) => {
         console.log(err);
      });
      axios.post('promociones/setEstadoPromociones', {
         estadoPromociones: true
      });
   }

    function selectCliente(cliente) {
      axios.post('clientes/comprobarVIP', { idClienteFinal: cliente.id }).then((res) => {
         if (res.data.error === false) {
            /* SET PAGA EN TIENDA */
            if (res.data.info.pagaEnTienda == false) {
               cliente['pagaEnTienda'] = false;
            }

            /* SET MODO CLIENTE */
            if (res.data.info.esVip) {
               store.dispatch('Clientes/setInfoClienteVip', res.data.info.datosCliente);
               store.dispatch('setModoActual', 'VIP');
            } else {
               cliente['puntos'] = res.data.info.puntos;
               store.dispatch('setModoActual', 'CLIENTE');
            }

            /* SET RESTO DE DATOS CLIENTE */
            store.dispatch('Clientes/setClienteActivo', cliente);
            store.dispatch('Footer/setMenuActivo', 1);

            modalClientes.hide();
            toast.success('Cliente seleccionado');
         } else {
            // Error aquí
            toast.error('Error. Comprobar consola ' + res.data.mensaje);
         }
      }).catch((err) => {
         console.log(err);
         toast.error('Error. Comprobar consola 2');
      });
    }

    function buscar() {
       axios.post('clientes/buscar', { busqueda: inputBusqueda.value }).then((res) => {
         arrayClientes.value = res.data;
       }).catch((err) => {
          console.log(err);
       });
    }

    function infoPuntos(id) {
      emitSocket('consultarPuntos', { idClienteFinal: id });
      // socket.emit('consultarPuntos', { idClienteFinal: id });
    }

    let barcode = '';

    function onKeyPressed(e) {
      let keyCode = e.keyCode;

      if (keyCode == 13) {
         axios.post('clientes/buscar', { busqueda: barcode }).then((res) => {
            if (res.data) {
               if (res.data.length > 0) {
                  axios.post('clientes/getClienteByID', { idCliente: res.data[0].id }).then((resCliente) => {
                     if (!resCliente.data.error) {
                        selectCliente(resCliente.data.infoCliente);
                     } else {
                        toast.error(resCliente.data.mensaje);
                     }
                  }).catch((err) => {
                     console.log(err);
                     toast.error(err.message);
                  });                  
               }
            }
         })
         // alert(barcode);

        barcode = '';
      } else {
         if (keyCode != 16) {
            barcode = barcode + e.key;
         }
      }
    }
    onMounted(() => {

      document.addEventListener("keydown", function(event) {
         onKeyPressed(event);
         event.stopImmediatePropagation();
      }, true);
      modalClientes = new Modal(document.getElementById('modalClientes'), {
        keyboard: false,
      });
    });

    return {
      nuevoCliente,
      reset,
      infoPuntos,
      inputBusqueda,
      buscar,
      nombre,
      arrayClientes,
      selectGlovo,
      selectUber,
      selectToGoodToGo,
      selectCliente,
      clienteActivo,
      nombreClienteNuevo,
      nTarjetaNueva,
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
    .clientesAnchoNombre {
        width: 300px !important;
    }
    .clientesAnchoBotones {
        width: 320px !important;
    }
</style>
