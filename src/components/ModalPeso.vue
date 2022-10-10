<template>
  <div class="modal" id="modalTecladoPeso" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document" style="max-width: 600px">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Introduce los gramos</h5>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <span class="text-center" style="font-size: 40px"
                >{{ getUnidades }}<br />g.</span
              >
              <hr />
              <span class="text-center" style="font-size: 40px"
                >{{ Math.round(getPrecio * 100) / 100 }} €</span
              >
            </div>
            <div class="col-md-8">
              <div class="btn-group-vertical" role="group">
                <div class="btn-group">
                  <a class="boton" @click="agregarTecla(7)">7</a>
                  <a class="boton" @click="agregarTecla(8)">8</a>
                  <a class="boton" @click="agregarTecla(9)">9</a>
                </div>
                <div class="btn-group">
                  <a class="boton" @click="agregarTecla(4)">4</a>
                  <a class="boton" @click="agregarTecla(5)">5</a>
                  <a class="boton" @click="agregarTecla(6)">6</a>
                </div>
                <div class="btn-group">
                  <a class="boton" @click="agregarTecla(1)">1</a>
                  <a class="boton" @click="agregarTecla(2)">2</a>
                  <a class="boton" @click="agregarTecla(3)">3</a>
                </div>
                <div class="btn-group">
                  <a class="boton" @click="eliminarTecla()">&lt;</a>
                  <a class="boton" @click="agregarTecla(0)">0</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary btn-lg mr-0"
            @click="confirmar()"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import axios from "axios";

export default {
  name: "ModalPeso",
  setup() {
    const store = useStore();
    const toast = useToast();
    const gramos = ref("0");
    const infoArticulo = computed(() => store.state.ModalPeso);
    const getUnidades = computed(() => {
      const valor = parseInt(gramos.value, 10);
      if (!valor.isNaN) {
        return valor;
      }
      return 0;
    });
    const getPrecio = computed(
      () => (Number(gramos.value) / 1000) * infoArticulo.value.precioConIva
    );

    function agregarTecla(x) {
      gramos.value += String(x);
    }
    function eliminarTecla() {
      gramos.value = gramos.value.slice(0, -1);
    }

    function confirmar() {
      store.dispatch("ModalPeso/cerrarModal");
      axios
        .post("teclado/clickTeclaArticulo", {
          idArticulo: infoArticulo.value.idArticulo,
          gramos: gramos.value,
          idCesta: store.getters["Cestas/getIdCestaActiva"],
          unidades: gramos.value / 1000, // Da igual, el backend lo calcula otra vez
          arraySuplementos: null,
        })
        .then((res2) => {
          if (!res2.data) {
            toast.error("Error, no se ha podido añadir el item a la cesta");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
      gramos.value = "0";
      document.activeElement.blur();
    }

    onMounted(() => {
      store.dispatch("ModalPeso/setModal");
    });

    return {
      confirmar,
      eliminarTecla,
      agregarTecla,
      getPrecio,
      getUnidades,
    };
    /* FINAL SETUP */
  },
};
</script>
