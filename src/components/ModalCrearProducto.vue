<template>
   <div class="modal" id="modalCrearProducto" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document" style="max-width: 600px">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Datos del producto</h5>
        </div>
        <div class="modal-body">
          <div class="row">
            <label for='nombreArticulo'>Nombre producto <input id='nombreArticulo' type='text' class='form-control' v-model='nombreArticulo' /></label>

            <label for='tipoIva'>Tipo de IVA</label>
            <select name="tipoIva" id="tipoIva" v-model='tipoIva'  class='form-control'>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>

            <label for='esSumable'>Es sumable?</label>
            <select name="esSumable" id="esSumable" v-model='esSumable' class='form-control'>
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
          
            <label for='precioBase'>Precio Base <input id='precioBase' type='number' class='form-control' v-model='precioBase'/></label>

          </div>
        </div>
        <div class="modal-footer">
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
  name: 'CrearProducto',
  setup() {
    const toast = useToast();
    const store = useStore();
    const precioBase = ref(0);
    const precioConIva = ref(0);
    const esSumable = ref('false');
    const tipoIva = ref(3);
    const nombreArticulo = ref('');
    const menus = ref('');
    const posicion = ref(0);

    function confirmar() {

      switch (tipoIva.value) {
        case '1':
          precioConIva.value = (parseFloat(precioBase.value))*1.04;
          break;
        case '2':
          precioConIva.value = (parseFloat(precioBase.value))*1.10;
          break;
        case '3':
          precioConIva.value = (parseFloat(precioBase.value))*1.21;
          break;
        default:
          break;
      }
            
        posicion.value = store.state.ModalCrearProducto.posicion;
        menus.value = store.state.ModalCrearProducto.menu;
       
        axios.post('teclado/anadirProducto', {nombreArticulo: nombreArticulo.value, precioConIva: precioConIva.value, esSumable: esSumable.value, precioBase: parseFloat(precioBase.value),  tipoIva: (parseFloat(tipoIva.value)), menus: menus.value,  posicion: posicion.value}).then((data) => {
            nombreArticulo.value= '';
            precioBase.value= 0;
            precioConIva.value = 0;
            esSumable.value = false;
            store.dispatch('ModalCrearProducto/cerrarModal');
        })
    }

    onMounted(() => {
        store.dispatch('ModalCrearProducto/setModal');
    });


    return {
        nombreArticulo,
        precioBase,
        precioConIva,
        tipoIva,
        confirmar,
        menus,
        esSumable,
        posicion,
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
