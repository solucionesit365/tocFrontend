<template>
  <div>
    <Teclas/>
    <ModalPeso/>
    <ModalEditarProducto />
    <ModalVaris/>
    <Footer/>
    <ModalMostrarAlergenos/> 

  </div>
</template>

<script>
// @ is an alias to /src
import ModalMostrarAlergenos from '@/components/ModalMostrarAlergenos.vue'; // @ is an alias to /src
import ModalVaris from '@/components/ModalVaris.vue'
import Teclas from '@/components/Teclas.vue'; // @ is an alias to /src
import ModalPeso from '@/components/ModalPeso.vue'; // @ is an alias to /src
import ModalEditarProducto from '@/components/ModalEditarProducto.vue'; // @ is an alias to /src
import Footer from '@/components/Footer.vue'; // @ is an alias to /src
import { useStore } from 'vuex';
import { useToast } from "vue-toastification";

export default {
  name: 'Home',
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
      if (props.tipoToast != undefined && props.mensajeToast != undefined) {
        toast(props.mensajeToast, { type: props.tipoToast })
      }

    return {};
  },
  components: {
   
    Teclas,
    ModalPeso,
    ModalEditarProducto,
    ModalVaris,
    ModalMostrarAlergenos,
    Footer,
  },
};
</script>
