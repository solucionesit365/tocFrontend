<template v-if='true'>
  <div class="row ms-4 align-items-center">
    <div class="row">
      <!-- <div class="col">
        <button
        @click="goTo('/abrirCaja')"
        type="button" class="btn btn-secondary
          botonesPrincipales w-100 btn-block botonesWidth"><i class="bi bi-unlock-fill iconosBootstrap"></i>
        </button>
      </div> -->
      <div class="col">
        <router-link to="/menu/caja/tickets" class="btn btn-secondary
          botonesPrincipales w-100 btn-block botonesWidth">
          <!-- <i class="bi bi-box-arrow-right iconosBootstrap"></i> -->
          Tickets
        </router-link>
      </div>
      <div class="col">
        <router-link to="/menu/caja/salida" class="btn btn-secondary
          botonesPrincipales w-100 btn-block botonesWidth">
          <!-- <i class="bi bi-box-arrow-right iconosBootstrap"></i> -->
          Salida de dinero
        </router-link>
      </div>

      <div class="col">
        <template v-if='NoEntradaDiners'>
        <router-link to="" class="btn btn-secondary
          botonesPrincipales w-100 btn-block botonesWidth">
          <!-- <i class="bi bi-box-arrow-in-right iconosBootstrap"></i> -->
          Opcion no disponible
        </router-link>
        </template>
        <template v-else>
          <router-link to="/menu/caja/entrada" class="btn btn-secondary
          botonesPrincipales w-100 btn-block botonesWidth">
          <!-- <i class="bi bi-box-arrow-in-right iconosBootstrap"></i> -->
          Entrada de dinero
          </router-link>
        </template>
      </div>

      <div class="col">
        <router-link to="/menu/caja/cerrar-caja" class="btn btn-secondary
          botonesPrincipales w-100 h-100 btn-block botonesWidth">
          <!-- <i class="bi bi-lock-fill iconosBootstrap"></i> -->
          Cerrar caja
        </router-link>
      </div>
    </div>
    <div class='row'>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import DetalleTicket from '@/components/DetalleTicket.vue';
import SalidaDinero from '@/components/SalidaDinero.vue';
import EntradaDinero from '@/components/EntradaDinero.vue';
import axios from 'axios';
import moment from 'moment';
import { useStore } from 'vuex';
import router from '../router/index';
import { useToast } from 'vue-toastification';

export default {
  name: 'Caja',
  setup() {
    const activo = ref(null);
    const total = ref(0);
    const listaTickets = ref([]);
    const ticketInfo = ref(null);
    const store = useStore();
    const NoEntradaDiners = ref(false);

    // function setTicketActivo(ticket, mounted = false) {
    //   if(mounted) ticket = listaTickets.value[listaTickets.value.length-1];
    //   ticketInfo.value = ticket;
    //   activo.value = ticket._id;
    // }

    function goTo(url) {
      router.push(url);
    }

    function imprimirTicket() {
      if (activo.value != null) {
        axios.post('impresora/imprimirTicket', { idTicket: activo.value });
        goTo('/');
      } else {
        console.log('Primero selecciona un ticket');
      }
    }


    onMounted(() => {
      axios.post('tickets/getTicketsIntervalo').then((arrayTickets) => {
        total.value = 0;
        for (let i = 0; i < arrayTickets.data.length; i += 1) {
          total.value += arrayTickets.data[i].total;
        }


        axios.post('parametros/getParametros').then((res) => {
          if(res.data.parametros.NoEntradaDiners != undefined){
            if(res.data.parametros.NoEntradaDiners == 'Si'){
              NoEntradaDiners.value = true;
            }
          }else{
              NoEntradaDiners.value = false;
          }
        })


        
        listaTickets.value = arrayTickets.data;
        // setTicketActivo('', true);
      });
    });
    return {
      goTo,
      listaTickets,
      activo,
      total,
      moment,
      ticketInfo,
      imprimirTicket,
      NoEntradaDiners
    };
    /* FINAL SETUP */
  },
};
</script>
<style scoped>
  .table-responsive {
    height: 80vh;
  }
  .estiloActivoTicketCaja {
    background-color:rgb(255, 221, 176) !important;
  }
  .iconosBootstrap {
    font-size: 30px;
  }
  .botonesWidth {
    width: 5vw;
    border: solid black 1px;
  }

  .botonesPrincipales{
    background-color: #fff5e9;
    color: #c95907;
    border-color: #bf5c18;
    border-width: 3px;
}
</style>
