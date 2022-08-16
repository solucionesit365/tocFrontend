<template>
  <div class="w-50 mx-auto">
      <div class="row mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico w-100" @click="descargarClientesFinales()">Descargar clientes finales</button>
          </div>
      </div>
      <div class="row mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico w-100" @click="descargarTicketInfo()">Descargar info. ticket finales</button>
          </div>
      </div>
      <div class="row mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico w-100" @click="actualizarTrabajadores()">Actualizar trabajadores</button>
          </div>
      </div>
      <div class="row mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico w-100" @click="actualizarTeclados()">Actualizar teclado</button>
          </div>
      </div>
      <div class="row mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico w-100" data-bs-toggle="modal" data-bs-target="#modalConfigImpresora">Config. VID y PID impresora, Visor</button>
          </div>
      </div>
      <div class="row mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico w-100" data-bs-toggle="modal" data-bs-target="#modalConfigPaytef">Config. IP Paytef</button>
          </div>
      </div>
      <div class="row mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico w-100" @click="imprimirTest()">Imprimir test</button>
          </div>
      </div>
      <div class="row mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico w-100" @click="cambiarPrecio()">Editar productos</button>
          </div>
      </div>
      <div class="row mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico w-100" data-bs-toggle="modal" data-bs-target="#modalListadoVentas">Listado de ventas</button>
          </div>
      </div>
      <div class="row mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico w-100" @click="actualitzarParametros()">Actualizar parametros GDT</button>
          </div>
      </div>
      <div class="row mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico w-100" @click="goToDoctor()">Toc Doctor</button>
          </div>
      </div>
  </div>
  <div class="position-fixed bottom-0 start-0 ms-2 mb-2">
      <button class="btn btn-warning botonVolver" @click="volver()">Volver</button>
  </div>

<!-- Modal -->
<div class="modal fade" id="modalConfigImpresora" tabindex="-1" aria-hidden="true">
<div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Configuración VID y PID impresora, Visor</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">VID</span>
            <input type="text" class="form-control" placeholder="0x4B8" v-model="vid">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">PID</span>
            <input type="text" class="form-control" placeholder="0x202" v-model="pid">
        </div>
         <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Visor</span>
            <input type="text" class="form-control" placeholder="COM0" v-model="com">
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" @click="guardarCambiosImpresora()">Guardar cambios</button>
    </div>
    </div>
</div>
</div>
<!-- FIN MODAL IMPRESORA -->

<!-- Modal -->
<div class="modal fade" id="modalConfigPaytef" tabindex="-1" aria-hidden="true">
<div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Configuración IP datáfono PAYTEF</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">IP</span>
            <input type="text" class="form-control" placeholder="10.129.xxx.29" v-model="ipPaytef">
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" @click="guardarCambiosPaytef()">Guardar cambios</button>
    </div>
    </div>
</div>
</div>
<!-- FIN MODAL PAYTEF -->

<!-- MODAL LISTADO VENTAS -->
<div class="modal fade" id="modalListadoVentas" tabindex="-1" aria-hidden="true">
<div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Listado ventas</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <div class="row input-group mb-3">
            <label for='start'>
                Fecha inicio
                <input id='start' type='date' class='form-control' v-model='fechaInicio' />
            </label>
            <label for='end'>
                Fecha final
                <input id='end' type='date' class='form-control' v-model='fechaFinal' />
            </label>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <!-- <button type="button" class="btn btn-primary" @click="descargarListadoVentas()">Descargar</button> -->
    </div>
    </div>
</div>
</div>
<!-- FIN MODAL LISTADO VENTAS -->
</template>

<script>
import axios from 'axios';
import router from '../router/index';
import { useToast } from 'vue-toastification';
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
const sha1 = require('sha-1');
// var XLSX = require("xlsx");


export default {
    setup() {
        const toast = useToast();
        const store = useStore();
        const vid = ref('');
        const pid = ref('');
        const com = ref('')
        const ipPaytef = ref('');
        const enviarDatos = ref(true);
        const fechaInicio = ref();
        const fechaFinal = ref();
        function descargarClientesFinales() {
            axios.post('clientes/descargarClientesFinales').then((res) => {
                if (res.data.error == false) {
                    toast.success('Clientes descargados OK');
                } else {
                    toast.error(res.data.mensaje);
                }
            }).catch((err) => {
                console.log(err);
                toast.error('Error descargarClientesFinales CATCH');
            });
        }
        function actualitzarParametros(){
                  axios.post('parametros/actualizarParametros').then((res) => {
                if (res.data.error == false) {
                    toast.success('Parametros Actualizados OK');
                } else {
                    toast.error(res.data.mensaje);
                }
            }).catch((err) => {
                console.log(err);
                toast.error('Error al actualizar parametros CATCH');
            });
        }

        function volver() {
            router.push('/menu/caja');
        }

        function goToDoctor() {
            router.push("/doctor");
        }

        function actualizarTeclados() {
            axios.post('teclado/actualizarTeclado').then((res) => {
                if (res.data.error == false) {
                    toast.success("OK");
                } else {
                    toast.error(res.data.mensaje)
                }
            }).catch((err) => {
                console.log(err);
                toast.error('Error catch');
            });
        }

        function imprimirTest() {
            axios.post('test/imprimirAlgo');
        }

        function guardarCambiosImpresora() {
            
            axios.post('parametros/vidAndPid', { vid: vid.value, pid: pid.value, com: com.value }).then((res) => {
                if (res.data.error == false) {
                    toast.success('Cambios guardados');
                } else {
                    toast.error(res.data.mensaje);
                }
            }).catch((err) => {
                console.log(err);
                toast.error("Error guardarCambiosImpresora CATCH");
            });
        }
        function guardarCambiosPaytef() {
            axios.post('parametros/setIpPaytef', { ip: ipPaytef.value }).then((res) => {
                if (res.data.error == false) {
                    toast.success('Cambios guardados');
                } else {
                    toast.error(res.data.mensaje);
                }
            }).catch((err) => {
                console.log(err);
                toast.error("Error guardarCambiosPaytef CATCH");
            });
        }

        function actualizarTrabajadores() {
            axios.post('trabajadores/actualizarTrabajadores').then((res) => {
                if (res.data.error == false) {
                    toast.success('Trabajadores actualizados');
                } else {
                    toast.error(res.data.mensaje);
                }
            });
        }
        
        async function cambiarPrecio() {
            const passwd = prompt('Introduce la contraseña', '');
            const hash = await sha1(passwd);
            if (hash == 'dc3e4d26dfbbe6aeaa47f7c05b8e6ee02aac0f67') {
                store.dispatch('setModoActual', 'MODIFICAR_ARTICULO');
                router.push('/');
            } else {
                toast.error("Contraseña incorrecta");
            }
        }

        function descargarTicketInfo() {
            axios.post('params-ticket/descargarInfoTicket').then((res) => {
                if (res.data.error == false) {
                    toast.success('Info. ticket actualizada');
                } else {
                    toast.error(res.data.mensaje);
                }
            }).catch((err) => {
                console.log(err);
                toast.error('Error en Catch');
            });
        }

        onMounted(() => {
            axios.get('parametros/getVidAndPid').then((res) => {
                if (res.data.error == false) {
                    vid.value = res.data.info.impresoraUsbInfo.vid;
                    pid.value = res.data.info.impresoraUsbInfo.pid;
                } else {
                    toast.error(res.data.mensaje);
                }
            }).catch((err) => {
                console.log(err);
                toast.error('Error getVidPid');
            });

            axios.get('parametros/getIpPaytef').then((res) => {
                if (res.data.error == false) {
                    ipPaytef.value = res.data.info;
                } else {
                    toast.error(res.data.mensaje);
                }
            }).catch((err) => {
                console.log(err);
                toast.error('Error getIpPaytef');
            });
        });

        return {
            goToDoctor,
            guardarCambiosPaytef,
            ipPaytef,
            actualizarTrabajadores,
            imprimirTest,
            guardarCambiosImpresora,
            vid,
            com,
            pid,
            descargarTicketInfo,
            volver,
            descargarClientesFinales,
            actualizarTeclados,
            enviarDatos,
            cambiarPrecio,
            fechaInicio,
            fechaFinal,
            actualitzarParametros
        };     
    },
}
</script>

<style scoped>
    .buttonSizeTecnico {
        font-size: 25px;
    }
     .botonVolver {
        font-size: 40px;
    }
</style>