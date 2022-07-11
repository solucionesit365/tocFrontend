<template>
  <div class="container-fliud">
      <div class="row text-center mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico" @click="descargarClientesFinales()">Descargar clientes finales</button>
          </div>
      </div>
      <div class="row text-center mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico" @click="descargarTicketInfo()">Descargar info. ticket finales</button>
          </div>
      </div>
      <div class="row text-center mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico" @click="actualizarTrabajadores()">Actualizar trabajadores</button>
          </div>
      </div>
      <div class="row text-center mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico" @click="actualizarTeclados()">Actualizar teclado</button>
          </div>
      </div>
      <div class="row text-center mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico" data-bs-toggle="modal" data-bs-target="#modalConfigImpresora">Config. VID y PID impresora</button>
          </div>
      </div>
      <div class="row text-center mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico" data-bs-toggle="modal" data-bs-target="#modalConfigPaytef">Config. IP Paytef</button>
          </div>
      </div>
      <div class="row text-center mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico" @click="imprimirTest()">Imprimir test</button>
          </div>
      </div>
      <div class="row text-center mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico" @click="cambiarPrecio()">Editar productos</button>
          </div>
      </div>
      <div class="row text-center mt-2">
          <div class="col">
            <button class="btn btn-primary buttonSizeTecnico" data-bs-toggle="modal" data-bs-target="#modalListadoVentas">Listado de ventas</button>
          </div>
      </div>
  </div>
  <div class="position-fixed bottom-0 start-0 ms-2 mb-2">
      <button class="btn btn-warning buttonSizeTecnico" @click="volver()">Volver</button>
  </div>

<!-- Modal -->
<div class="modal fade" id="modalConfigImpresora" tabindex="-1" aria-hidden="true">
<div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Configuración VID y PID impresora</h5>
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
            axios.post('parametros/vidAndPid', { vid: vid.value, pid: pid.value }).then((res) => {
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

        // function descargarListadoVentas() {
        //     console.log(fechaInicio.value, fechaFinal.value);
        //     console.log(new Date(fechaInicio.value).getTime(), new Date(fechaFinal.value).getTime());
        //     if(!fechaInicio.value) {
        //         toast.error('La fecha inicio no puede estar vacía');
        //         return;
        //     }
        //     if(!fechaFinal.value) {
        //         toast.error('La fecha final no puede estar vacía');
        //         return;
        //     }
        //     const initalDate = new Date(fechaInicio.value);
        //     const startDateUnix = initalDate.getTime();
        //     const finalDate = new Date(fechaFinal.value);
        //     const endDateUnix = new Date(finalDate.getTime() + ( 3600 * 1000 * 24)).getTime();
        //     let result = [];
        //     for(let i = initalDate.getDate(); i <= finalDate.getDate(); i++) {
        //         const obj = {
        //             dia: i,
        //             iva4: 0,
        //             valorIva4: 0,
        //             iva10: 0,
        //             valorIva10: 0,
        //             iva21: 0,
        //             valorIva21: 0,
        //             total: 0
        //         };
        //         result.push(obj);
        //     }
        //     axios.get(`tickets/getListadoVentas?start=1&end=2`).then((res) => {
        //         if(res.data.length) {
        //             const { data } = res;
        //             console.log(data)
        //             const intervalTickets = data.filter(i => (i.timestamp >= startDateUnix && i.timestamp <= endDateUnix));
        //             const dataTickets = intervalTickets.map(o => ({
        //                 dia: new Date(o.timestamp).getDate(),
        //                 iva4: o.tiposIva.base1,
        //                 valorIva4: o.tiposIva.valorIva1,
        //                 iva10: o.tiposIva.base2,
        //                 valorIva10: o.tiposIva.valorIva2,
        //                 iva21: o.tiposIva.base3,
        //                 valorIva21: o.tiposIva.valorIva3,
        //                 total: o.total,
        //             }));
                    
        //             dataTickets.reduce(function(res, value) {
        //                 // console.log('RES', res)
        //                 // console.log('VALUE', value)
        //                 // if (!res[value.dia]) {
        //                 //     res[value.dia] = { dia: value.dia, iva4: 0, iva10: 0, iva21: 0, total: 0 };
        //                 //     result.push(res[value.dia])
        //                 // }
        //                 const index = result.findIndex(x => x.dia === value.dia);
        //                 // console.log(resu)
        //                 result[index].iva4 += value.iva4;
        //                 result[index].valorIva4 += value.valorIva4;
        //                 result[index].iva10 += value.iva10;
        //                 result[index].valorIva10 += value.valorIva10;
        //                 result[index].iva21 += value.iva21;
        //                 result[index].valorIva21 += value.valorIva21;
        //                 result[index].total += value.total;
        //                 return res;
        //             }, {});
        //             result.push({
        //                 dia: 'TOTAL',
        //                 iva4: result.reduce(( total, obj ) => obj.iva4 + total, 0),
        //                 valorIva4: result.reduce(( total, obj ) => obj.valorIva4 + total, 0),
        //                 iva10: result.reduce(( total, obj ) => obj.iva10 + total, 0),
        //                 valorIva10: result.reduce(( total, obj ) => obj.valorIva10 + total, 0),
        //                 iva21: result.reduce(( total, obj ) => obj.iva21 + total, 0),
        //                 valorIva21: result.reduce(( total, obj ) => obj.valorIva21 + total, 0),
        //                 total: result.reduce(( total, obj ) => obj.total + total, 0),
        //             })
        //             let info = XLSX.utils.json_to_sheet(result);
        //             info['A1'].v = 'DÍA';
        //             info['B1'].v = 'BASE IMPONIBLE 4%';
        //             info['C1'].v = 'IVA 4%';
        //             info['D1'].v = 'BASE IMPONIBLE 10%';
        //             info['E1'].v = 'IVA 10%';
        //             info['F1'].v = 'BASE IMPONIBLE 21%';
        //             info['G1'].v = 'IVA 21%';
        //             info['H1'].v = 'TOTAL';
        //             const workbook = XLSX.utils.book_new()
        //             const filename = 'listado_ventas';
        //             XLSX.utils.book_append_sheet(workbook, info, filename)
        //             XLSX.writeFile(workbook, `${filename}.xlsx`)
        //         }
        //     })
        // }

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
            guardarCambiosPaytef,
            ipPaytef,
            actualizarTrabajadores,
            imprimirTest,
            guardarCambiosImpresora,
            vid,
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
     font-size: 40px;
 }
</style>