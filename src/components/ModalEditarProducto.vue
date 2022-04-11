<template>
   <div class="modal" id="modalEditarProducto" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document" style="max-width: 600px">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Datos del producto</h5>
        </div>
        <div class="modal-body">
          <div class="row">
            <label for='nombre'>Nombre producto <input id='nombre' type='text' class='form-control' v-model='nombre' /></label>
            
            <label for='precioIva'>Precio con {{parseInt(tipoIva.toString().split('.')[1])}}% de IVA 
              <input id='precioIva' type='number' class='form-control' v-model='precioConIva' />
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button"
          class="btn btn-success mr-0"
          @click="cambiarPosicion()">Cambiar posición
          </button>
          <button type="button"
          class="btn btn-primary mr-0"
          @click="confirmar()">OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { Modal } from 'bootstrap';
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
// import { Modal } from 'bootstrap';
import { useToast } from 'vue-toastification';
import { tocGame } from '../services/tocGame';
import axios from 'axios';

export default {
  name: 'EditarProducto',
  setup() {
    const toast = useToast();
    const store = useStore();
    const precioBase = ref(0);
    const precioConIva = ref(0);
    const tipoIva = ref(0);
    const nombre = ref('');
    const id = ref(-1);
    const menus = ref([]);

    function confirmar() {
        axios.post('articulos/editarArticulo', { idArticulo: id.value, nombre: nombre.value, precioBase: (parseFloat(precioConIva.value)/parseFloat(tipoIva.value)), precioConIva: parseFloat(precioConIva.value) }).then((data) => {
            console.log(data);
            store.dispatch('ModalEditarProducto/cerrarModal');
        })
    }

    function cambiarPosicion() {
      store.dispatch('ModalEditarProducto/cerrarModal');
      store.dispatch('setModoActual', 'MOVER_ARTICULO');
    }

    onMounted(() => {
        store.dispatch('ModalEditarProducto/setModal');
    });

    watch(() => store.getters['ModalEditarProducto/getNombre'], () => {
        nombre.value = store.state.ModalEditarProducto.nombre;
        precioConIva.value = store.state.ModalEditarProducto.precioConIva;
        id.value = store.state.ModalEditarProducto.idArticulo;
        tipoIva.value = store.state.ModalEditarProducto.tipoIva == 1 ? '1.04' : store.state.ModalEditarProducto.tipoIva == 2 ? '1.10' : '1.21';
    })
    return {
        nombre,
        precioBase,
        precioConIva,
        id,
        tipoIva,
        confirmar,
        menus,
        cambiarPosicion,
    };
    /* FINAL SETUP */
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.teclas {
    height: 70px;
}
.colJuntitas {
    /* padding-right: 0px; */
    padding: 2px;
}
.colorIvan1 {
    background-color: #DEE3E9 !important;
    color: #5E5F61 !important;
    border-color: #DEE3E9 !important;
}
.colorIvan2 {
    background-color: #EDDECB !important;
    color: #5E5F61 !important;
    border-color: #EDDECB !important;
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
.colorIvan5 {
    background-color: #EFD8A6 !important;
    color: #5E5F61 !important;
    border-color: #EFD8A6 !important;
}
.colorIvan6 {
    background-color: #B0AEC6 !important;
    color: #5E5F61 !important;
    border-color: #B0AEC6 !important;
}
.botonesMenu {
    background-color: #d45600;
    border-color: #d45600;
    margin-right: 4px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.menus {
    height: 35px;
}
.subMenus {
  height: 50px;
}
.menusSimples {
  height: 70px;
}
.colorMenus {
    background-color: #fff5e9 !important;
    color: #c95907 !important;
    border-color: #bf5c18 !important;
}
.activo {
    
    background-color: #d45600 !important;
    color: #fffaee !important;
    border-color: #d45600 !important;
}
.btn-secondary:hover {
    color: #c95907 !important;
    background-color: #fff5e9 !important;
    border-color: #bf5c18 !important;
  }
  .btn-secondary:focus, .btn-secondary.focus {
    /* color: #c95907 !important;
    background-color: #fff5e9 !important;
    border-color: #bf5c18 !important; */
    background-color: #d45600 !important;
    color: #fffaee !important;
    border-color: #d45600 !important;
    box-shadow: none !important;
  }
  .btn-secondary.disabled, .btn-secondary:disabled {
    color: #fff !important;
    background-color: #6c757d !important;
    border-color: #6c757d !important;
  }
  .btn-secondary:not(:disabled):not(.disabled):active,
  .btn-secondary:not(:disabled):not(.disabled).active,
  .show > .btn-secondary.dropdown-toggle {
    /* color: #c95907 !important;
    background-color: #fff5e9 !important;
    border-color: #bf5c18 !important; */
    background-color: #d45600 !important;
    color: #fffaee !important;
    border-color: #d45600 !important;
  }
  .btn-secondary:not(:disabled):not(.disabled):active:focus,
  .btn-secondary:not(:disabled):not(.disabled).active:focus
  .show > .btn-secondary.dropdown-toggle:focus {
    box-shadow: none !important;
  }
  .colJuntitasMenus {
    padding-right: 0px;
  }
  div.scrollmenu {
    width: 100%;
    overflow-x: scroll;
    white-space: nowrap;
  }
  .suplementoActivo {
    background-color: #FBB5B5 !important;
  }
  .btnSuplemento:focus, .btnSuplemento:active {
    box-shadow: none !important;
  }
  .editarArticulos {
    background-color: #c95807a4 !important;
    border-color: transparent !important;
  }
</style>
