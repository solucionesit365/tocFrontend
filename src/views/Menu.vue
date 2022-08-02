<template>
  <div class="row pt-1">
    <div class='col-md-1'>
  <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
  style="width: 140px; height: 100%">
      <div class="list-group list-group-flush border-bottom scrollarea">
        <router-link to="/" class="list-group-item list-group-item-action py-3 lh-tight">
          <div class="d-flex w-100 align-items-center justify-content-center">
            <!-- <img src='../assets/vender.png' class='img_size' /> -->
            <i class="bi bi-cash iconosBootstrap me-3"></i>
          </div>
        </router-link>
        <router-link to="/menu/caja/tickets"
        class="list-group-item list-group-item-action py-3 lh-tight">
          <div class="d-flex w-100 align-items-center justify-content-center">
            <!-- <img src='../assets/caja_fuerte.png' class='img_size' /> -->
            <i class="bi bi-piggy-bank iconosBootstrap me-3"></i>
          </div>
        </router-link>
        <router-link to="/menu/fichajes"
        class="list-group-item list-group-item-action py-3 lh-tight">
          <div class="d-flex w-100 align-items-center justify-content-center">
            <!-- <img src='../assets/puerta.png' class='img_size' /> -->
            <i class="bi bi-door-open iconosBootstrap me-3"></i>
          </div>
        </router-link>
        <button @click="devoluciones()"
        class="list-group-item list-group-item-action py-3 lh-tight">
          <div class="d-flex w-100 align-items-center justify-content-center">
            <!-- <img src='../assets/devoluciones.png' class='img_size' /> -->
            <i class="bi bi-trash iconosBootstrap me-3"></i>
          </div>
        </button>
        <button @click="menuPedidos()"
        class="list-group-item list-group-item-action py-3 lh-tight">
          <div class="d-flex w-100 align-items-center justify-content-center">
            <!-- <span>Pedidos</span> -->
            <!-- <img src='../assets/entregas.png' class='img_size' /> -->
            <i class="bi bi-globe iconosBootstrap me-3"></i>
          </div>
        </button>
        <button @click="imprimirEntregas()"
        class="list-group-item list-group-item-action py-3 lh-tight">
          <div class="d-flex w-100 align-items-center justify-content-center">
            <!-- <img src='../assets/entregas.png' class='img_size' /> -->
            <i class="bi bi-pencil-square iconosBootstrap me-3"></i>
          </div>
        </button>
        <router-link
        to="/menuTecnico"
        class="list-group-item list-group-item-action py-3 lh-tight">
          <div class="d-flex w-100 align-items-center justify-content-center">
            <!-- <img src='../assets/tecnico.png' class='img_size' /> -->
            <i class="bi bi-key iconosBootstrap me-3"></i>
          </div>
        </router-link>
        <!-- <router-link
        to="/menu/administracion"
        class="list-group-item list-group-item-action py-3 lh-tight">
          <div class="d-flex w-100 align-items-center justify-content-center">
            <img src='../assets/tecnico.png' class='img_size' />
            <i class="bi bi-key iconosBootstrap me-3"></i>
          </div>
        </router-link> -->
        <!-- TRABAJADORES FICHADOS -->
        <Trabajador />
        <!-- CESTAS ACTIVAS -->
           <!-- <Cesta />  -->
      </div>
    </div>
    </div>
    <div class="col">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import router from '../router/index';
import { tocGame } from '../services/tocGame';
import Trabajador from '@/components/Trabajador.vue'; // @ is an alias to /src
// import Cesta from '@/components/Cesta.vue'; // @ is an alias to /src
import { useToast } from 'vue-toastification';

export default {
  name: 'Menu',
  props: {
    tipoToast: {
      required: false
    },
    mensajeToast: {
      required: false
    }
  },
  setup(props) {
    const toast = useToast();
    const store = useStore();
    const isHidden = computed(() => store.state.Menu.hidden);
    const params = tocGame.getParametros();
    const url = ref('');

    axios.get('parametros/getParametrosBonito').then((res) => {
      if (res.data.error == false) {
        url.value = `/menu/pedidos/${res.data.parametros.codigoTienda}/${res.data.parametros.database}`;
      } else {
        toast.error("Error en parametros/getParametrosBonito");
      }
    });
    
    if (props.tipoToast != undefined && props.mensajeToast != undefined) {
      toast(props.mensajeToast, { type: props.tipoToast })
    }

    function quitarActivoTicket() {
      store.dispatch('Ticket/setActivoAction', null);
    }

    function hideMenu() {
      store.dispatch('Menu/setHiddenAction', true);
      quitarActivoTicket();
    }

    function pedidos() {
      router.push(`/menu/pedidos/${params.codigoTienda}`);
    }

    function goTo(url) {
      router.push(url);
    }
    
    function menuPedidos() {
      goTo(url.value);
    }

    /* Establece el modo y redirige a la home */
    function devoluciones() {
      store.dispatch('setModoActual', 'DEVOLUCION');
      router.push('/');
    }

    function imprimirEntregas() {
      // const licencia = this.getNumeroTresDigitos(this.getParametros().licencia);
      // const licencia = params.codigoTienda;
      // console.log(`http://dsv.hiterp.com/TpvInforma.asp?Llic=00${licencia}&Versio=6001010&Tipus=EntregasPendientes`)
      // axios.get(`http://dsv.hiterp.com/TpvInforma.asp?Llic=00${licencia}&Versio=6001010&Tipus=EntregasPendientes`).then((response) => {
      //   const { data } = response;
      //   let imprimir = '';
      //   let valid = false;
      //   // eslint-disable-next-line no-plusplus
      //   for (let i = 0; i < data.length; i++) {
      //     if (valid || (data[i - 1] === ']' && data[i - 2] === 'a')) {
      //       valid = true;
      //       if (data[i] === ']') break;
      //       imprimir += data[i];
      //     }
      //   }
      //   // Mandar al backend para imprimir
      //   console.log(imprimir);
      // });
      axios.post('impresora/imprimirEntregas');
      hideMenu();
      quitarActivoTicket();
    }

    return {
      menuPedidos,
      pedidos,
      devoluciones,
      isHidden,
      hideMenu,
      quitarActivoTicket,
      imprimirEntregas,
      goTo,
      url,
    };
  },
  components: {
    Trabajador,
    
  }
};
</script>
<style scoped>
.sidebar {
  margin: 0;
  padding: 0;
  background-color: #f1f1f1;
  position: fixed;
  height: 60%;
  overflow: scroll;
}
.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}
.sidebar a.active {
  background-color: #04AA6D;
  color: white;
}
.sidebar a:hover:not(.active) {
  background-color: #555;
  color: white;
}
.component-content {
  margin: 0 auto;
  width: 65%;
}
.hidden {
  display: none;
}
@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {float: left;}
  div.content {margin-left: 0;}
}
@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}
.img_size, img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.iconosBootstrap {
  font-size: 36px;
  color: #c95907;
}
</style>>
