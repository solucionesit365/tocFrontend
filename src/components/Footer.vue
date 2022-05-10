<template>
  <div class="row pt-1 align-items-center">
    <div v-if="menuActivo === 0" class="col text-center" style="max-width: 245px; max-height: 196px;">
      <div class="row ms-2" style="max-width: 230px">
        <button
        style="max-width: 106px"
        class="btn btn-secondary btn-sm botonesPrincipales menusColorIvan" @click="showMenu">
          <i class="bi bi-list display-6"></i>
        </button>
        <button
        style="max-width: 106px"
          class="btn btn-secondary ms-1 btn-block sizeMenus btn-sm botonesPrincipales
          me-2 menusColorIvan"
          @click="buscarProducto()"><i class="bi bi-search display-6"></i>
        </button>
      </div>

      <div class="row mt-1 ms-2" style="max-width: 220px">
        <button
        style="max-width: 106px"
        class="btn btn-secondary botonesPrincipales btn-sm menusColorIvan"
          data-bs-toggle="modal" data-bs-target="#modalClientes">
          <i class="bi bi-person-fill display-6"></i>
        </button>
        <router-link
        style="max-width: 106px"
        class="btn btn-secondary botonesPrincipales btn-sm ms-1 menusColorIvan"
        to='/mesas'>
        
          <i class="bi bi-cart-plus-fill display-6"></i>
         </router-link>
      </div>

      <div class="row mt-1 ms-2" style="max-width: 220px">
        <button
        style="max-width: 106px"
        data-bs-toggle="modal" data-bs-target="#modalUnidades"
        class="btn btn-secondary botonesPrincipales btn-sm menusColorIvan">
        <i class="bi bi-calculator display-6"></i>
        </button>
        <button
        style="max-width: 106px"
        class="btn btn-secondary botonesPrincipales btn-sm ms-1 menusColorIvan"
          @click="borrar()">
          <i v-if='activo === null' class="bi bi-trash display-6"></i>
          <i v-else class="bi bi-x-lg display-6"></i>
        </button>
      </div>

    </div>

    <div v-if="menuActivo === 1 && infoCliente.id != DELIVEROO && infoCliente.id != GLOVO && infoCliente.id != UBER && infoCliente.id != TOO_GOOD_TO_GO"   class="col text-center"
    :class="{
      tipoNormal: modoActual === 'NORMAL',
      tipoDevolucion: modoActual === 'DEVOLUCION',
      tipoCliente: modoActual === 'CLIENTE'
    }"
    style="max-width: 245px; max-height: 196px;">
      <p v-if="modoActual == 'VIP'" class="estiloVip">{{modoActual}}</p>
      <p v-if="modoActual == 'CONSUMO PERSONAL'" class="estiloConsumoPersonal">CONSUMO</p>
      <p v-if="modoActual == 'CONSUMO PERSONAL'" class="estiloConsumoPersonal">PERSONAL</p>
      <p v-if="modoActual == 'DEVOLUCION'" class="tipoDevolucion">{{modoActual}}</p>
      <p v-if="modoActual == 'MODIFICAR_ARTICULO'" class="tipoDevolucion">EDITAR ARTÍCULOS</p>
      <p v-if="modoActual == 'MOVER_ARTICULO'" class="tipoDevolucion">MOVER ARTÍCULO</p>
      <p v-if="modoActual == 'NORMAL'" class="tipoNormal">{{modoActual}}</p>
      <p v-if="modoActual == 'CLIENTE'" class="infoCliente">
        {{infoCliente.puntos}} puntos
      </p>
      <p v-if="modoActual == 'CLIENTE'" class="infoCliente">
        {{infoCliente.nombre}}
      </p>
    </div>

    <!-- VISTA DELIVEROO -->
    <div class="col text-center" v-if="infoCliente.id === DELIVEROO && menuActivo === 1"
    style="max-width: 245px; max-height: 196px;">
      <img src="../assets/logoDeliveroo.png" width="200" alt="Logo Deliveroo">
    </div>

    <!-- VISTA GLOVO -->
    <div class="col text-center" v-if="infoCliente.id === GLOVO && menuActivo === 1"
    style="max-width: 245px; max-height: 196px;">
      <img src="../assets/logoGlovo.png" width="200" alt="Logo Glovo">
    </div>

    <!-- VISTA UBER -->
    <div class="col text-center" v-if="infoCliente.id === UBER && menuActivo === 1"
    style="max-width: 245px; max-height: 196px;">
      <img src="../assets/logoUber.png" width="200" alt="Logo Uber">
    </div>

    <!-- VISTA TOO GOOD TO GO -->
    <div class="col text-center" v-if="infoCliente.id === TOO_GOOD_TO_GO && menuActivo === 1"
    style="max-width: 245px; max-height: 196px;">
      <img src="../assets/tooGoodToGo.png" width="200" alt="Logo Too Good To Go">
    </div>

    <div class="col" style="max-width:50px"
    @touchstart="touchStart"
    @touchend="touchEnd"
    @click="cambiarMenu()">
      <div class="row">
        <button class="btn rotate rounded-0">
          <i class="bi bi-star display-6"></i>
        </button>
      </div>
    </div>

    <div class="col ms-3">
        <div class="table-responsive estiloCesta section" style="height: 26vh !important;">
          <table class="table fuenteIvan colorFuente" id="job-table">
            <thead style="background-color: red">
              <tr>
                <th scope="col">Productos</th>
                <th scope="col">Unidades</th>
                <th scope="col">Precio</th>
                <th v-if="infoCliente.puntos > 0" scope="col">Regalo</th>
              </tr>
            </thead>
            <tbody class="tableBody" :style="conCliente">
              <tr v-for="(item, index) of cestaAlReves"
              :key="index"
              v-bind:class="{
                'estiloPromo': item.promocion.esPromo,
                'seleccionado': activo === index
              }">
                <td @click="setActivo(index)">{{item.nombre}}</td>
                <td @click="setActivo(index)">{{item.unidades}}</td>
                <td @click="setActivo(index)">{{item.subtotal.toFixed(2)}}</td>
                <td v-if="infoCliente.puntos > 0 && item.promocion.esPromo == false && sePuedeRegalar(item.subtotal, item._id)"><img @click="regalar(index)" src="../assets/gift.png" alt="Regalo"></td>
                <td v-if="infoCliente.puntos > 0 && (!sePuedeRegalar(item.subtotal, item._id) || (item.promocion.esPromo == true))"><img src="../assets/x.svg" width="30" alt="No se puede regalar"></td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
    <div class="col">
      <div class="row me-1">
        <!--<select @change="cambioActivo()" class="form-select" v-model="trabajadorActivo">
          <option v-for="(trabajador, index) in arrayTrabajadores" v-bind:key="index">
            {{trabajador.nombre}}
          </option>
        </select>-->
      </div>
      <div class="row me-1 mt-1">
        <button
          class="btn btn-secondary w-100 botonesPrincipales menusColorIvan mb-1">
          <span style="font-size: 14px;">
            {{ cesta.nombreCesta && cesta.nombreCesta.split(' ')[0] === 'Trabajador' ? nombreTrabajador : cesta.nombreCesta }}
          </span>
        </button>
        <button
          class="btn btn-secondary w-100 botonesPrincipales menusColorIvan">
          <i class="bi bi-bell-fill display-6"></i>
          <span style="font-size: 27px;"
          :class="{'bg-warning': notificaciones > 0}">
          &nbsp; Mensajes: {{notificaciones}} &nbsp;</span>
        </button>
      </div>
      <div class="row mt-1 me-1">
        <button
          class="btn btn-secondary w-100 botonesPrincipales menusColorIvan"
          @click="goToCobrar()"><i class="bi bi-cash-coin sizeBotonCobrar"></i>
          <span class="sizeBotonCobrar">&nbsp;{{modoActual === 'MODIFICAR_ARTICULO' || modoActual === 'MOVER_ARTICULO' ? 'OK' : `${thisIsCatalunya}€`}} </span>
        </button>
      </div>
    </div>

    <MenuClientes />
  </div>

  <!-- Modal unidades -->
  <div class="modal fade" id="modalUnidades" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Introduce las unidades</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col text-center ">
              <span class="unidadesStyle">{{unidades}} uds.</span>
            </div>
          </div>
          <div class="row">
            <div class="col ps-5" style="max-width: 325px;">
                <div class="btn-group-vertical" role="group">
                    <div class="btn-group">
                        <a class="botonEze botonesCalculadora"
                          @click="agregarTecla('7')">7</a>
                        <a class="botonEze botonesCalculadora"
                        @click="agregarTecla('8')">8</a>
                        <a class="botonEze botonesCalculadora"
                          @click="agregarTecla('9')">9</a>
                    </div>
                    <div class="btn-group">
                        <a class="botonEze botonesCalculadora"
                          @click="agregarTecla('4')">4</a>
                        <a class="botonEze botonesCalculadora"
                          @click="agregarTecla('5')">5</a>
                        <a class="botonEze botonesCalculadora"
                          @click="agregarTecla('6')">6</a>
                    </div>
                    <div class="btn-group">
                        <a class="botonEze botonesCalculadora"
                          @click="agregarTecla('1')">1</a>
                        <a class="botonEze botonesCalculadora"
                          @click="agregarTecla('2')">2</a>
                        <a class="botonEze botonesCalculadora"
                          @click="agregarTecla('3')">3</a>
                    </div>
                    <div class="btn-group">
                        <a class="botonEze botonesCalculadora"
                          @click="borrarDigitoUnidades()">C</a>
                        <a class="botonEze botonesCalculadora"
                          @click="agregarTecla('0')">0</a>

                    </div>
                </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button type="button" class="btn btn-primary btn-lg" data-bs-dismiss="modal">Aceptar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- MODAL SUPLEMENTOS -->
  <div class="modal fade" id="modalSuplementosModificar" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modificar suplementos</h5>
        </div>
        <div class="modal-body">
            <div class="row">
                <div v-for='(item, index) of suplementos' :key='index' class='col mb-3'>
                  <button class='btn w-100 h-100 colorIvan1 btnSuplemento' @click="selectSuplemento(item._id)" v-bind:class="[{'suplementoActivo': checkSuplementoActivo(item._id)}]">
                    {{item.nombre}}
                    <br />
                    {{item.precioConIva}} €
                  </button>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-lg colorIvan4" @click="addSuplemento()">OK</button>
        </div>
        </div>
    </div>
  </div>
  <div style="position:fixed; bottom: 2px; left: 2px;">
    <span style="font-weight: bold">(v{{tocVersion}})  ({{nombreTienda}})  {{getClock}}</span>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';

import axios from 'axios';

import { useStore } from 'vuex';

import MenuClientes from '@/components/MenuClientes.vue'; // @ is an alias to /src
import { useToast } from "vue-toastification";
import { Modal } from 'bootstrap';
import router from '../router/index';

export default {
  name: 'Footer',
  setup() {
    const toast = useToast();
    const tocVersion = ref('');
    const nombreTienda = ref('');
    const store = useStore();
    const cesta = computed(() => store.state.Cesta.cesta);
    const nombreCesta = computed(() => store.state.Cesta.cesta.nombreCesta);
    const activo = computed(() => store.state.Cesta.activo);
    const notificaciones = computed(() => store.state.Notificaciones.cantidad);
    const conCliente = null;
    const unidades = computed(() => store.state.unidades);
    const trabajadorActivo = computed(() => store.state.Trabajadores.trabajadorActivo);
    const nombreTrabajador = computed(() => store.state.Trabajadores.nombreTrabajadorActivo);
    const arrayTrabajadores = ref([]);
    const menuActivo = computed(() => store.state.Footer.menuActivo);
    const modoActual = computed(() => store.state.modoActual);
    const infoCliente = computed(() => store.state.Clientes.infoCliente);
    const GLOVO = store.getters['Clientes/getGlovo'];
    const DELIVEROO = store.getters['Clientes/getDeliveroo'];
    const UBER = store.getters['Clientes/getUber'];
    const TOO_GOOD_TO_GO = store.getters['Clientes/getTooGoodToGo'];
    const getClock = ref('');

  function actualizarHora() {
    const d = new Date();
    const s = d.getSeconds();
    const m = d.getMinutes();
    const h = d.getHours();
    getClock.value = ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
  }

  setInterval(actualizarHora, 1000);

    let inicioMagic = null;
    let finalMagic = null;
  
    let modalSuplementos = null;
    let suplementos = ref([]);
    let suplementosSeleccionados = ref([]);

    function touchStart() {
      inicioMagic = new Date();
    }

    function touchEnd() {
    	finalMagic = new Date();
      const diffTime = Math.abs(finalMagic - inicioMagic);
      if (diffTime < 2000) {
        console.log('Pulsación rápida');
      } else {
        console.log('Pulsación lenta');
        store.dispatch('setModoActual', 'NORMAL');
        store.dispatch('Clientes/resetClienteActivo');
        store.dispatch('Footer/resetMenuActivo');
        axios.post('articulos/setEstadoTarifaVIP', { nuevoEstado: false }).then((res) => {
          modalClientes.hide();
          toast.info('Reset OK. Estado de cobro: NORMAL');
        }).catch((err) => {
          console.log(err);
        });
        router.go('/');
      }
    }

    function regalar(index) {
      axios.post('cestas/regalarProducto', { idCesta: store.getters['Cesta/getCestaId'], index: (index - (cesta.value.lista.length -1))*-1 }).then((res) => {
        if (res.data.error == false) {
          store.dispatch('Cesta/setCestaAction', res.data.cesta);
        } else {
          toast.error(res.data.mensaje);
        }
      }).catch((err) => {
        console.log(err);
        toast.error('Error, no se ha podido modificar la cesta para regalo');
      });
      // cesta.value.lista[index].subtotal = 0;
    }

    function productoRegalable(idArticulo) {
      const arrayRegalables = [
        8641, 8654, 8640, 8675, 99, 315, 314, 312, 5603
      ];
      for (let i = 0; i < arrayRegalables.length; i++) {
        if (arrayRegalables[i] == idArticulo) {
          return true;
        }
      }
      return false;
    }

    function sePuedeRegalar(precio, idArticulo) {
      if (Math.trunc(infoCliente.value.puntos*0.03*0.02) >= precio) {
        if (productoRegalable(idArticulo)) {
          return true;
        }
      }
      return false;
    }

    // const puntosClienteActivo = 0;
    const lineaDeRegalo = null;
    // var prohibirBuscarArticulos = true;
    const getTotal = computed(() => {
      let suma = 0;
      for (let i = 0; i < cesta.value.lista.length; i += 1) {
        if (i !== lineaDeRegalo) {
          suma += cesta.value.lista[i].subtotal;
        }
      }
      return suma.toFixed(2);
    });
    const cestaAlReves = computed(() => {
      const aux = cesta.value.lista; // Reverse muta el array.
      return aux.reverse();
    });
    // onBeforeMount(() => {
    //   axios.post('/getCesta').then((res) => {
    //     store.dispatch('Cesta/setCestaAction', res);
    //   });
    // });
    function cambioActivo() { // VIEJO
      axios.post('trabajadores/setActivo', { nombre: trabajadorActivo.value }).then((res) => {
        if (!res.data.error) {
          store.dispatch('Trabajadores/setTrabajadorActivo', trabajadorActivo.value);
        } else {
          console.log('Error al cambiar trabajador activo');
        }
      });
    }

    function buscarProducto() {
      toast.info('Deshabilitado temporalmente');
    }

    const thisIsCatalunya = computed(() => {
      return getTotal.value.replace('.', ',');
    });

    function crearTicketDeuda(total, idCesta, idClienteFinal, infoClienteVip) {
      if (trabajadorActivo.value != '') {
        axios.post('tickets/crearTicketDeuda', {
          total: Number(total),
          idCesta: idCesta,
          idCliente: idClienteFinal,
          infoClienteVip: infoClienteVip
        }).then((res) => {
          if (!res.data.error) {
            axios.post('/cestas/getCesta').then((res) => {
              store.dispatch('Cesta/setCestaAction', res.data);
            });
            /* Ejemplo de como limpiar el estado al completo */
            store.dispatch('setModoActual', 'NORMAL');
            store.dispatch('Clientes/resetClienteActivo');
            store.dispatch('Footer/resetMenuActivo');
            /* Final del ejemplo */
            toast.success('¡Ticket en modo DEUDA creado!');

          } else {
            toast.error('Error al insertar el ticket');
          }
        }).catch((err) => {
          console.log(err);
          toast.error('Error al insertar el ticket');
        });
      } else {
        toast.info('¡ Es necesario un trabajador/a activ@ !');
      }
    }

    function crearDevolucion(total, idCesta) {
      axios.post('devoluciones/nuevaDevolucion', {total, idCesta}).then((res) => {
        if (res.data.error == false) {
          axios.post('promociones/setEstadoPromociones', {
            estadoPromociones: true
          });
          axios.post('/cestas/getCesta').then((res) => {
            store.dispatch('Cesta/setCestaAction', res.data);
          });
          store.dispatch('setModoActual', 'NORMAL');
          store.dispatch('Clientes/resetClienteActivo');
          store.dispatch('Footer/resetMenuActivo');
          toast.success('¡Devolución OK!');
        } else {
          toast.error(res.data.mensaje);
        }
      }).catch((err) => {
        console.log(err);
        toast.error('Error, no se ha podido crear la devolución');
      });
    }

    function crearConsumoPersonal(idCesta) {
      axios.post('tickets/crearTicketConsumoPersonal', {
        idCesta: idCesta,
      }).then((res) => {
        if (!res.data.error) {
          axios.post('/cestas/getCesta').then((res) => {
            store.dispatch('Cesta/setCestaAction', res.data);
          });
          store.dispatch('setModoActual', 'NORMAL');
          store.dispatch('Clientes/resetClienteActivo');
          store.dispatch('Footer/resetMenuActivo');
          toast.success('¡Consumo personal OK!');
        } else {
          toast.error('Error al insertar el ticket');
        }
      }).catch((err) => {
        console.log(err);
        toast.error('Error al insertar el ticket');
      });
    }

    function goToCobrar() {
      if(modoActual.value === 'MODIFICAR_ARTICULO' || modoActual.value === 'MOVER_ARTICULO') {
        store.dispatch('setModoActual', 'NORMAL');
        router.push('/');
        return;
      }
      if (getTotal.value != 0) {
      if (trabajadorActivo.value != '') {
        let pagaEnTienda = store.getters['Clientes/getClientePagaEnTienda'];
        let modoActual = store.getters['getModoActual'];
        let infoClienteVip = store.getters['Clientes/getInfoClienteVip'];
        let idClienteFinal = store.getters['Clientes/getInfoCliente'];
        let idCesta = store.getters['Cesta/getCestaId'];
        
        /* Si se cumple que es VIP y no paga en tienda, se crea la deuda, sino, cobro normal */
        if ((pagaEnTienda == true && modoActual != 'DEVOLUCION' && modoActual != 'CONSUMO PERSONAL') || (modoActual == 'CLIENTE')) {
          router.push('/cobro');
        } else if(modoActual == 'VIP' && pagaEnTienda == false) {
          crearTicketDeuda(Number(getTotal.value), idCesta, idClienteFinal, infoClienteVip);
        }
        if (modoActual == 'DEVOLUCION') {
          crearDevolucion(Number(getTotal.value), idCesta);
        }

        if (modoActual == 'CONSUMO PERSONAL') {
          crearConsumoPersonal(idCesta);
        }
      } else {
        toast.info('¡ Es necesario un trabajador/a activ@ !');
      }
      }else{
        toast.error('¡Seleciona un artículo para cobrar!')
      }
    }

    function cambiarMenu() {
      (menuActivo.value === 1) ? (store.dispatch('Footer/setMenuActivo', 0)) : (store.dispatch('Footer/setMenuActivo', menuActivo.value + 1))
    }

    function agregarTecla(tecla) {
      store.dispatch('addDigitoUnidades', tecla);
    }

    function borrarDigitoUnidades() {
      store.dispatch('borrarDigitoUnidades');
    }

    onMounted(() => {
      axios.get('getInfo/tocGame').then((res) => {
        if (res.data != undefined && res.data != null) {
          tocVersion.value = res.data.version;
          nombreTienda.value = res.data.nombreTienda;
        }
      }).catch((err) => {
        console.log(err);
        toast.error('Error en getVersion CATCH');
      })

      modalSuplementos = new Modal(document.getElementById('modalSuplementosModificar'), {
        keyboard: false,
        backdrop: 'static',
      });
      /* SET MODO ACTUAL */
      if (modoActual.value == 'DEVOLUCION' || modoActual.value == 'CLIENTE' || modoActual.value === 'MODIFICAR_ARTICULO') {
        store.dispatch('Footer/setMenuActivo', 1);
      }

      /* INICIALIZACIÓN DE CESTA */
      axios.post('/cestas/getCestaByID', { idCesta: store.getters['Cesta/getCestaId'] }).then((res) => {
        if (!res.data.error) {
          console.log('hjdfgshjfk', res.data.info)
          store.dispatch('Cesta/setCestaAction', res.data.info);
        } else {
            toast.error(res.data.mensaje);
        }
      });
      axios.post('/trabajadores/getCurrentTrabajador').then((res) => {
        
        nombreTrabajador.value = res.data.trabajador.nombre;

        store.dispatch('Trabajadores/setTrabajadorActivo', res.data.trabajador.idTrabajador);
      });
      
    });

    function setActivo(index) {
      if(activo.value === index) {
        axios.post('/cestas/modificarSuplementos', { cestaId: store.getters['Cesta/getCestaId'], idArticulo: store.getters['Cesta/getItem'], posArticulo: index }).then((res) => {
          if(res.data.suplementos) {
            suplementos.value = res.data.suplementosData;
            console.log("🚀 ~ file: Footer.vue ~ line 516 ~ axios.post ~ suplementos.value", suplementos.value)
            for(let i = 0; i < res.data.suplementosSeleccionados.length; i++) {
              selectSuplemento(res.data.suplementosSeleccionados[i]);
            }
            modalSuplementos.show();
          }
        }).catch((err) => {
          console.log(err);
        });
      }
      store.dispatch('Cesta/setActivoAction', index);
    }
    function selectSuplemento(idSuplemento) {
      const supl = suplementosSeleccionados.value.findIndex(o => o.suplemento === idSuplemento);
      if(supl !== -1) {
        suplementosSeleccionados.value.splice(supl, 1);
        return;
      }
      suplementosSeleccionados.value.push({ suplemento: idSuplemento, activo: true });
    }

    function checkSuplementoActivo(idSuplemento) {
      const s = suplementosSeleccionados.value.findIndex(o => o.suplemento === idSuplemento)
      return s !== -1 ? true : false;
    }
    function addSuplemento() {
      axios.post('cestas/addSuplemento', { idCesta: store.getters['Cesta/getCestaId'], suplementos: suplementosSeleccionados.value, idArticulo: store.getters['Cesta/getItem'], posArticulo: activo.value }).then((res) => {
        if(!res.data.error && !res.data.bloqueado) {
          store.dispatch('resetUnidades');
          store.dispatch('Cesta/setCestaAction', res.data.cesta);
          suplementosSeleccionados.value = [];
          cerrarModal();
        } else {
          console.log('Error en clickSuplemento');
        }
      }).catch((err) => {
        console.log(err);
        toast.error('Error. Comprobar consola.');
      });
    }
    
    function cerrarModal() {
      modalSuplementos.hide();
    }

    function borrar() {
      if (activo.value === null) {
        /* eslint no-underscore-dangle: 0 */
        axios.post('/cestas/borrarArticulosCesta', { idCesta: cesta.value._id }).then((res) => {
          if (res.data.error == false) {
            store.dispatch('Cesta/setCestaAction', res.data.info);
          } else {
            toast.error(res.data.mensaje);
          }
        });
        // ipcRenderer.send('mostrar-visor', {texto: "", p
        // recio: "", total: toc.getCesta().tiposIva.importe2, dependienta: ""});
      } else {
        
        // toc.borrarItemCesta(activo.value);
        // ipcRenderer.send('mostrar-visor', {texto: "", pre
        // cio: "", total: toc.getCesta().tiposIva.importe2, dependienta: ""});
        axios.post('/cestas/borrarItemCesta', { _id: store.state.Cesta.cesta._id, idArticulo: store.getters['Cesta/getItem'] }).then((res) => {
          if (res.data.okey) {
            store.dispatch('Cesta/setCestaAction', res.data.cestaNueva);
          } else {
            console.log(res.data.okey);
          }
        });
      }
      store.dispatch('Cesta/setActivoAction', null);
    //   this.lineaDeRegalo = null;
    }

    function showMenu() {
      router.push('/menu/caja/tickets');
    }

    return {
      tocVersion,
      nombreTienda,
      regalar,
      agregarTecla,
      borrarDigitoUnidades,
      unidades,
      buscarProducto,
      GLOVO,
      TOO_GOOD_TO_GO,
      DELIVEROO,
      UBER,
      thisIsCatalunya,
      infoCliente,
      modoActual,
      touchStart,
      touchEnd,
      menuActivo,
      cambiarMenu,
      getTotal,
      conCliente,
      cesta,
      sePuedeRegalar,
      activo,
      cestaAlReves,
      setActivo,
      borrar,
      showMenu,
      notificaciones,
      trabajadorActivo,
      arrayTrabajadores,
      cambioActivo,
      goToCobrar,
      cerrarModal,
      suplementos,
      selectSuplemento,
      checkSuplementoActivo,
      addSuplemento,
      nombreTrabajador,
      getClock,
      nombreCesta,
    };
  },
  components: {
    MenuClientes,
  },
};
</script>

<style scoped>
.seleccionado {
  background-color: rgb(255, 221, 176);
}
.anchoBotonMenu {
  width: 125px;
  height: 100px;
  margin: 5px;
}
.botonesPrincipales{
  background-color: #fff5e9;
  color: #c95907;
  border-color: #bf5c18;
  border-width: 3px;
}
.iconosBootstrap {
  font-size: 1rem;
}
.botonesLateralesIzq {
  height: 15.5vh;
  width: 7vw;
  margin: 5px;
}

.sizeBotonCobrar {
  font-size: 54px;
  font-weight: bold;
}
.menusColorIvan.btn-secondary:hover {
    color: #c95907 !important;
    background-color: #fff5e9 !important;
    border-color: #bf5c18 !important;
    border-width: 3px;
  }
.menusColorIvan.btn-secondary:focus, .btn-secondary.focus {
  color: #c95907 !important;
  background-color: #fff5e9 !important;
  border-color: #bf5c18 !important;
  box-shadow: none !important;
  border-width: 3px;
}
.menusColorIvan.btn-secondary:not(:disabled):not(.disabled):active,
.btn-secondary:not(:disabled):not(.disabled).active,
.show > .btn-secondary.dropdown-toggle {
  color: #c95907 !important;
  background-color: #fff5e9 !important;
  border-color: #bf5c18 !important;
  border-width: 3px;
}

.menusColorIvan.btn-secondary:not(:disabled):not(.disabled):active:focus,
.btn-secondary:not(:disabled):not(.disabled).active:focus,
.show > .btn-secondary.dropdown-toggle:focus {
  box-shadow: none !important;
}
.section::-webkit-scrollbar {
    width: 16px;
}

.section::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
}

.section::-webkit-scrollbar-thumb {
    background-color: #c95907;
    border-radius: 100px;
}

.rotate {
  /* transform: rotateZ(90deg); */
  width: 65px !important;
  max-width: 196px;
  height: 196px !important;
  background-color: #fff5e9 !important;
  color: #bf5c18;
}

.tipoNormal {
  color: #c95907;
  font-size: 54px;
  font-weight: bold;
}
.tipoDevolucion {
  color: #e45656;
  font-weight: bold;
  font-size: 30px;
}

.tipoCliente {
  color: #c95907;
  font-size: 30px;
}

.infoCliente {
  color: #c95907;
  font-size: 23px;
}
.estiloVip {
  color: #c95907;
  font-size: 50px;
  font-weight: bold;
}
.estiloConsumoPersonal {
  color: #c95907;
  font-size: 40px;
  font-weight: bold;
}

.botonesCalculadora {
  background-color: #fff5e9;
  color: #c95907;
  border-width: 3px;
  border: 1px solid #bf5c18;
}

.unidadesStyle {
  font-size: 44px;
  font-weight: bold;
}

.suplementoActivo {
  background-color: #FBB5B5 !important;
}

.btnSuplemento:focus, .btnSuplemento:active {
  box-shadow: none !important;
}

.colorIvan3 {
  background-color: #FBB5B5 !important;
  color: #5E5F61 !important;
  border-color: #FBB5B5 !important;
}

.colorIvan4 {
  background-color: #DCE9D5 !important;
  color: #5E5F61 !important;
  border-color: #DCE9D5 !important;
}
</style>
