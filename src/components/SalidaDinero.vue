<template>
    <div id="modalSalidaDinero" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Salida de dinero</h5>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <div class="input-group input-group-lg mb-3">
                            <span class="input-group-text" id="basic-addon1">Cantidad</span>
                            <input type="number" class="form-control" v-model="cantidad">
                        </div>
                    </div>
                    <div class="form-group row mt-2">
                        <div class="input-group mb-3">
                            <select v-model="concepto" class="form-select form-select-lg mb-3">
                                <option value="Entrega Diària" selected>ENTREGA DIARIA</option>
                                <option value="COMPRAS">COMPRAS</option>
                                <option value="OTROS">OTROS</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" @click="confirmarSalida()">
                        CONFIRMAR SALIDA
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { Modal } from 'bootstrap';
import { useToast } from 'vue-toastification';
import router from '../router/index';

export default {
    name: 'SalidaDinero',
    setup() {
        const toast = useToast();
        const cantidad = ref(0);
        const concepto = ref('Entrega Diària');
        let modalSalidaDinero = null;

        function cerrarModal() {
            modalSalidaDinero.hide();
        }

        function confirmarSalida() {
            if (cantidad.value <= 500 && cantidad.value > 0 ) {
                axios.post('movimientos/nuevaSalida', {
                    cantidad: Number(cantidad.value),
                    concepto: concepto.value
                }).then((res) => {
                    if (!res.data.error) {
                        toast.success('Salida OK');
                        cerrarModal();
                    } else {
                        toast.error(res.data.mensaje);
                    }
                    router.push('/');
                }).catch((err) => {
                    console.log(err);
                    toast.error('Error movimientos/nuevaSalida');
                });
            } else {
                toast.error('La cantidad debe ser un número entre 0 y 500');
            }
        }

        onMounted(() => {
            modalSalidaDinero = new Modal(document.getElementById('modalSalidaDinero'));
        });

        return {
            cantidad,
            concepto,
            confirmarSalida,
        };
    },
};
</script>
