<template>
  <div>
    <Teclas />
    <ModalPeso />
    <ModalEditarProducto />
    <Footer />
    <ModalMostrarAlergenos />
  </div>
</template>

<script>
import ModalMostrarAlergenos from "@/components/ModalMostrarAlergenos.vue";
import Teclas from "@/components/Teclas.vue";
import ModalPeso from "@/components/ModalPeso.vue";
import ModalEditarProducto from "@/components/ModalEditarProducto.vue";
import Footer from "@/components/Footer.vue";
import { useToast } from "vue-toastification";

export default {
  name: "Home",
  props: {
    tipoToast: {
      required: false,
    },
    mensajeToast: {
      required: false,
    },
  },
  setup(props) {
    const toast = useToast();
    if (props.tipoToast != undefined && props.mensajeToast != undefined) {
      toast(props.mensajeToast, { type: props.tipoToast });
    }

    return {};
  },
  components: {
    Teclas,
    ModalPeso,
    ModalEditarProducto,
    ModalMostrarAlergenos,
    Footer,
  },
};
</script>
