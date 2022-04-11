<template>
    <div id="modalEntradaDinero" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Entrada de dinero</h5>
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
                            <input type="text" placeholder="Concepto. Ej. Cambio" class="form-control" v-model="concepto">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" data-bs-dismiss="modal" class="btn btn-primary">
                        VOLVER
                    </button>
                    <button type="button" class="btn btn-danger" @click="confirmarEntrada()">
                        CONFIRMAR ENTRADA
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

export default {
    name: 'EntradaDinero',
    setup() {
        const toast = useToast();
        const cantidad = ref(0);
        const concepto = ref('');
        let modalEntradaDinero = null;

        function cerrarModal() {
            modalEntradaDinero.hide();
        }

        function confirmarEntrada() {
            axios.post('movimientos/nuevaEntrada', {
                cantidad: Number(cantidad.value),
                concepto: concepto.value
            }).then((res) => {
                if (!res.data.error) {
                    toast.success('Entrada OK');
                    cerrarModal();
                } else {
                    toast.error(res.data.mensaje);
                }
            }).catch((err) => {
                console.log(err);
                toast.error('Error movimientos/nuevaEntrada');
            });
        }

        onMounted(() => {
            modalEntradaDinero = new Modal(document.getElementById('modalEntradaDinero'));
        });

        return {
            cantidad,
            concepto,
            confirmarEntrada,
        };
    },
};
</script>
