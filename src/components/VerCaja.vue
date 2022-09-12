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
                                            <div class="col-8 text-start">Miguel Cortez Chávez</div>

                                            <div class="col-4">Inici:</div>
                                            <div class="col-8 text-start">29-8-20221 14:04</div>

                                            <div class="col-4">Final:</div>
                                            <div class="col-8 text-start">29-8-20221 21:9</div>
                                            
                                            <div class="col-6  mb-2 mt-4">Calaix fet:</div>
                                            <div class="col-4 mb-2 mt-4 text-start">285.80</div>

                                            <div class="col-6 mt-2">Descuadre:</div>
                                            <div class="col-4 mt-2 text-start">0.00</div>

                                            <div class="col-6 mt-2">Clients atessos:</div>
                                            <div class="col-4 mt-2 text-start">86</div>
                                            
                                            <div class="col-6 mt-2">Rescaudat:</div>
                                            <div class="col-4 mt-2 text-start">166.30</div>

                                            <div class="col-6 mt-2">Total 3G:</div>
                                            <div class="col-4 mt-2 text-start">4.00</div>

                                            <div class="col-6 mt-2">Canvi inicial:</div>
                                            <div class="col-4 mt-2 text-start">169.27</div>

                                            <div class="col-6 mt-2">Canvi final:</div>
                                            <div class="col-4 mt-2 text-start">135.57</div>
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
                                        <div class="col-6 text-start">{{ item.Cantidad }}</div>
                                        <div class="col-4">Fecha: </div>
                                        <div class="col-6 text-start">{{ item.fecha }}</div>
                                        <div class="col-4">Concepto: </div>
                                        <div class="col-6 text-start">{{ item.concepto }}</div>
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
    const cajaAbierta = computed(() => store.state.Caja.cajaAbierta);
    const valor3G = ref(0);
    const infoDinero = ref([
      { valor: 0, style: '' },
      { valor: 0, style: '' },
      { valor: 0, style: '' },
      { valor: 0, style: '' },
      { valor: 0, style: '' },
      { valor: 0, style: '' },
      { valor: 0, style: '' },
      { valor: 0, style: '' },
      { valor: 0, style: '' },
      { valor: 0, style: '' },
      { valor: 0, style: '' },
      { valor: 0, style: '' },
      { valor: 0, style: '' },
      { valor: 0, style: '' },
      { valor: 0, style: '' },
    ]);

    const activo = ref(0);
    const totalClearOne = 0;
    const sizeBilletes = '160';
    const cantidad3G = ref(0);
    let modalConfirmacionClausura = null;
    let modalClausura = null;
    const getTotal = computed(() => {
      let total = 0;
      total += infoDinero.value[0].valor * 0.01;
      total += infoDinero.value[1].valor * 0.02;
      total += infoDinero.value[2].valor * 0.05;
      total += infoDinero.value[3].valor * 0.10;
      total += infoDinero.value[4].valor * 0.20;
      total += infoDinero.value[5].valor * 0.50;
      total += infoDinero.value[6].valor * 1;
      total += infoDinero.value[7].valor * 2;
      total += infoDinero.value[8].valor * 5;
      total += infoDinero.value[9].valor * 10;
      total += infoDinero.value[10].valor * 20;
      total += infoDinero.value[11].valor * 50;
      total += infoDinero.value[12].valor * 100;
      total += infoDinero.value[13].valor * 200;
      total += infoDinero.value[14].valor * 500;
      return total;
    });

    const getDetalle = computed(() => {
      const info = [
        { _id: '0.01', valor: infoDinero.value[0].valor * 0.01, unidades: infoDinero.value[0].valor },
        { _id: '0.02', valor: infoDinero.value[1].valor * 0.02, unidades: infoDinero.value[1].valor },
        { _id: '0.05', valor: infoDinero.value[2].valor * 0.05, unidades: infoDinero.value[2].valor },
        { _id: '0.10', valor: infoDinero.value[3].valor * 0.10, unidades: infoDinero.value[3].valor },
        { _id: '0.20', valor: infoDinero.value[4].valor * 0.20, unidades: infoDinero.value[4].valor },
        { _id: '0.50', valor: infoDinero.value[5].valor * 0.50, unidades: infoDinero.value[5].valor },
        { _id: '1', valor: infoDinero.value[6].valor * 1, unidades: infoDinero.value[6].valor },
        { _id: '2', valor: infoDinero.value[7].valor * 2, unidades: infoDinero.value[7].valor },
        { _id: '5', valor: infoDinero.value[8].valor * 5, unidades: infoDinero.value[8].valor },
        { _id: '10', valor: infoDinero.value[9].valor * 10, unidades: infoDinero.value[9].valor },
        { _id: '20', valor: infoDinero.value[10].valor * 20, unidades: infoDinero.value[10].valor },
        { _id: '50', valor: infoDinero.value[11].valor * 50, unidades: infoDinero.value[11].valor },
        { _id: '100', valor: infoDinero.value[12].valor * 100, unidades: infoDinero.value[12].valor },
        { _id: '200', valor: infoDinero.value[13].valor * 200, unidades: infoDinero.value[13].valor },
        { _id: '500', valor: infoDinero.value[14].valor * 500, unidades: infoDinero.value[14].valor },
      ];
      return info;
    });

    function setActivo(x) {
      activo.value = x;
    }

    function volver() {
      router.push('/menu/caja');
    }


    function addNumero(x) {
      infoDinero.value[activo.value].valor = Number(
        infoDinero.value[activo.value].valor.toString() + x,
      );
      localStorage.setItem("infoDinero", JSON.stringify(infoDinero.value));
    }

    function resetTodo() {
      infoDinero.value = [
        { valor: 0, style: '' },
        { valor: 0, style: '' },
        { valor: 0, style: '' },
        { valor: 0, style: '' },
        { valor: 0, style: '' },
        { valor: 0, style: '' },
        { valor: 0, style: '' },
        { valor: 0, style: '' },
        { valor: 0, style: '' },
        { valor: 0, style: '' },
        { valor: 0, style: '' },
        { valor: 0, style: '' },
        { valor: 0, style: '' },
        { valor: 0, style: '' },
        { valor: 0, style: '' },
      ];
      cantidad3G.value = 0;
      localStorage.setItem("infoDinero", JSON.stringify(infoDinero.value));
    }

    function sistemaIngles(x) {

    }

    function cerrarCajaReal() {
      axios.post('/caja/cerrarCaja', {
        total: getTotal.value,
        detalle: getDetalle.value,
        infoDinero: infoDinero.value,
        cantidad3G: cantidad3G.value
      }).then((res) => {
        if (!res.data.error) {
          resetTodo();
          modalConfirmacionClausura.hide();
          store.dispatch('Caja/setEstadoCaja', false);
    
          toast.success('Cierre caja OK');
          router.push('/menu/caja');
        } else {
          toast.error(res.data.mensaje);
        }
      }).catch((err) => {
        console.log(err);
        toast.error('Error en el cierre de caja. Contacta con informática');
      });
    }

    function cerrarCaja() {
      if (cantidad3G.value == 0) {
        if (confirm("Has marcado 0 € de datáfono de banco (3G), ¿Estás segur@?")) {
          cerrarCajaReal();
        }
      } else {
        cerrarCajaReal();
      }
    }

    function borrarNumero() {
      infoDinero.value[activo.value].valor = Number(
        infoDinero.value[activo.value].valor.toString().slice(0, -1),
      );
      localStorage.setItem("infoDinero", JSON.stringify(infoDinero.value));
    }

    function abrirModalConfirmacion() {
      modalConfirmacionClausura.show();
    }

    function cerrarModalConfirmacion() {
      modalConfirmacionClausura.toggle();
    }

    onMounted(() => {
      modalConfirmacionClausura = new Modal(document.getElementById('modalConfirmacionClausura'), {
        keyboard: false,
      });

      let infoTemporal = JSON.parse(localStorage.getItem("infoDinero"));
      if (infoTemporal) {
        infoDinero.value = infoTemporal;
      }

    });

    return {
      valor3G,
      volver,
      infoDinero,
      activo,
      totalClearOne,
      sizeBilletes,
      setActivo,
      addNumero,
      resetTodo,
      borrarNumero,
      getTotal,
      cantidad3G,
      cerrarCaja,
      abrirModalConfirmacion,
      cerrarModalConfirmacion,
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
