<template>
    <div class="col">
      <br />
      <div class="row">
        <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Número ticket</th>
              <th scope="col">Hora</th>
              <th scope="col">Forma de pago</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) of listaTickets.slice().reverse()" v-bind:key={index}
            @click="setTicketActivo(item)"
            v-bind:class="{estiloActivoTicketCaja: item._id === activo}"
            >
                <td style="text-align: center">{{item._id}}</td>
                <td>
                  {{moment.unix(item.timestamp / 1000).format('DD/MM/YYYY hh:mm:ss')}}
                  </td>
                <td>{{item.tipoPago}}</td>
                <td>{{item.total.toFixed(2)}} €</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
    <div v-if="ticketInfo != null" class="col">
      <DetalleTicket :ticket="ticketInfo" />
      <div class='row'>
        <div class="col">
            <button
            @click="imprimirTicket()"
            type="button" class="btn btn-secondary
            botonesPrincipales w-100 btn-block botonesWidth">
                <i class="bi bi-printer-fill iconosBootstrap"></i>
            </button>
        </div>
      </div>
      <br>
        <div class="col mt-5">
            <button
            @click="esborraTicket()"
            type="button" class="btn btn-danger
            w-100 btn-block botonesWidth">
                <i class="bi bi-trash iconosBootstrap"></i>
            </button>
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
const toast = useToast();
export default {
  
  name: 'Caja',
  setup() {
    const activo = ref(null);
    const total = ref(0);
    const listaTickets = ref([]);
    const ticketInfo = ref(null);
    const store = useStore();
    function setTicketActivo(ticket, mounted = false) {
    
      if(mounted) ticket = listaTickets.value[listaTickets.value.length-1];
      ticketInfo.value = ticket;
      if (listaTickets.value.length > 0) activo.value = ticket._id;
    }
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

    function esborraTicket() {
      if (activo.value != null) {
        if (confirm("¿Confirma ANULACIÓN de ticket?")) {
          axios.post('tickets/rectificativa', { ticketID: activo.value }).then((ticket) => {
            if (!ticket.data.error) {
              toast.success(ticket.data.mensaje);
              goTo('/');
            } else {
              toast.error(ticket.data.mensaje);
            }
          }).catch((err) => {
            toast.error(err.message);
          });
        }
      } else {
        toast.error('Primero selecciona un ticket');
      }
    }
    
    onMounted(() => {
      axios.post('tickets/getTicketsIntervalo').then((arrayTickets) => {
        total.value = 0;
        for (let i = 0; i < arrayTickets.data.length; i += 1) {
          total.value += arrayTickets.data[i].total;
        }
        listaTickets.value = arrayTickets.data;
        setTicketActivo('', true);
      });
    });
    return {
      goTo,
      listaTickets,
      setTicketActivo,
      activo,
      total,
      moment,
      ticketInfo,
      imprimirTicket,
      esborraTicket,
    };
    /* FINAL SETUP */
  },
  components: {
      DetalleTicket,
  }
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