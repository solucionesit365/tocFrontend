<template>
   <div class="modal" id="modalMostrarAlergenos" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document" style="max-width: 600px  ">
      <div class="modal-content">
        
        <div class="modal-body" style="height: 20em">
       
         <iframe :src="url" style='position: absolute; height: 90%; width: 90%; border: none'></iframe>
  
        </div>
        <!-- <div class="modal-footer">
          <button type="button"
          class="btn btn-success mr-0"
          @click="cambiarPosicion()">Cambiar posición
          </button>
          <button type="button"
          class="btn btn-primary mr-0"
          @click="confirmar()">OK
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>

import { useRoute } from 'vue-router';
import {  onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
      const store = useStore();
        const route = useRoute();
        const codiBotiga = ref(0);
        const producto = ref(0);
       const url = ref('');
        //const url = ref(`http://silema.hiterp.com/Facturacion/ElForn/gestion/FichaTecnicaHtml.asp?codi=3&Llic=00842  `);     
    onMounted(() => {
        store.dispatch('Alergenos/setModal');
    });


        watch(() => store.getters['Alergenos/getProducto'], () => {
        producto.value = store.state.Alergenos.producto;
        codiBotiga.value = store.state.Alergenos.codiBotiga;
        url.value = `http://silema.hiterp.com/Facturacion/ElForn/gestion/FichaTecnicaHtml.asp?codi=${producto.value}&Llic=${codiBotiga.value}`;
    })
        
        return {
            url,
        };
    },
}
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
