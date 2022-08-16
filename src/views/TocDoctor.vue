<template>
    <span class="titulo">TOC DOCTOR</span>
    <div class="row">
        <div class="col">
            <button class="btn btn-primary btn-lg" @click="ejecutarDoctor()">Comenzar</button>
        </div>        
    </div>
    
    <div class="row">
        <div class="col">
            <table class="table">
                <thead class="headerNegro">
                    <tr>
                        <th>º</th>
                        <th>Módulo</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Diagnóstico</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1</th>
                        <th>Token</th>
                        <th>Comprobando si el dispositivo tiene un token válido para identificarse con el backend service</th>
                        <th @click="ejecutarToken()">
                            <i v-if="estadoToken == 'SIN_COMENZAR'" class="bi bi-caret-right-square iconsSize"></i>
                            <div v-if="estadoToken == 'EN_PROCESO'" class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </th>
                        <th>
                            <i v-if="diagnosticoToken == 'SIN_COMENZAR'" class="bi bi-question-square iconsSize"></i>
                            <i v-if="diagnosticoToken == 'CORRECTO'" class="bi bi-check-square iconsSize"></i>
                            <i v-if="diagnosticoToken == 'FALLIDO'" class="bi bi-x-square iconsSize"></i>
                        </th>
                    </tr>
                    <tr>
                        <th>2</th>
                        <th>Trabajadores</th>
                        <th>Existen trabajadores, trabajadores fichados, trabajadores con cesta siempre</th>
                        <th @click="ejecutarTrabajadores()">
                            <i v-if="estadoTrabajadores == 'SIN_COMENZAR'" class="bi bi-caret-right-square iconsSize"></i>
                            <div v-if="estadoTrabajadores == 'EN_PROCESO'" class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </th>
                        <th>
                            <i v-if="diagnosticoTrabajadores == 'SIN_COMENZAR'" class="bi bi-question-square iconsSize"></i>
                            <i v-if="diagnosticoTrabajadores == 'CORRECTO'" class="bi bi-check-square iconsSize"></i>
                            <i v-if="diagnosticoTrabajadores == 'FALLIDO'" class="bi bi-x-square iconsSize"></i>
                        </th>
                    </tr>
                    <tr>
                        <th>3</th>
                        <th>Cestas</th>
                        <th>Mínimo de cestas, mesas relacionadas</th>
                        <th @click="ejecutarCestas()">
                            <i v-if="estadoCestas == 'SIN_COMENZAR'" class="bi bi-caret-right-square iconsSize"></i>
                            <div v-if="estadoCestas == 'EN_PROCESO'" class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </th>
                        <th>
                            <i v-if="diagnosticoCestas == 'SIN_COMENZAR'" class="bi bi-question-square iconsSize"></i>
                            <i v-if="diagnosticoCestas == 'CORRECTO'" class="bi bi-check-square iconsSize"></i>
                            <i v-if="diagnosticoCestas == 'FALLIDO'" class="bi bi-x-square iconsSize"></i>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  <div class="position-fixed bottom-0 start-0 ms-2 mb-2">
    <button class="btn btn-warning botonVolver" @click="volver()">Volver</button>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import router from "../router/index";
import axios from "axios";
import { useToast } from "vue-toastification";
import { setCookie, getCookie } from "../services/cookies";

export default {
    name: "TocDoctor",
    setup () {
        const toast = useToast();
        const estadoTrabajadores = ref("SIN_COMENZAR");
        const estadoCestas = ref("SIN_COMENZAR");
        const estadoToken = ref("SIN_COMENZAR");

        const diagnosticoTrabajadores = ref("SIN_COMENZAR");
        const diagnosticoCestas = ref("SIN_COMENZAR");
        const diagnosticoToken = ref("SIN_COMENZAR");

        function ejecutarToken() {
            estadoToken.value = "EN_PROCESO";
            return axios.post("satelites/verifyToken", { token: getCookie("token") })
            .then((res) => {
                estadoToken.value = "SIN_COMENZAR";
                if (res.data) {
                    diagnosticoToken.value = "CORRECTO";
                    return true;
                } else {
                    diagnosticoToken.value = "FALLIDO";
                }
                return false;
            })
            .catch((err) => {
                console.log(err);
                diagnosticoToken.value = "FALLIDO";
                estadoToken.value = "SIN_COMENZAR";
                return false;
            });
        }

        function ejecutarTrabajadores() {
            estadoTrabajadores.value = "EN_PROCESO";
            return axios.get("doctor/checkTrabajadores").then((res) => {
                estadoTrabajadores.value = "SIN_COMENZAR";
                if (res.data) {
                    diagnosticoTrabajadores.value = "CORRECTO";
                    return true;
                } else {
                    diagnosticoTrabajadores.value = "FALLIDO";    
                }
                return false;
            }).catch((err) => {
                console.log(err);
                estadoTrabajadores.value = "SIN_COMENZAR";
                diagnosticoTrabajadores.value = "FALLIDO";
                return false;
            });
        }

        function ejecutarCestas() {
            estadoCestas.value = "EN_PROCESO";
            return axios.get("doctor/checkCestas").then((res) => {
                estadoCestas.value = "SIN_COMENZAR";
                if (res.data) {
                    diagnosticoCestas.value = "CORRECTO";
                    return true;
                } else {
                    diagnosticoCestas.value = "FALLIDO";
                }
                
                return false;
            }).catch((err) => {
                console.log(err);
                estadoCestas.value = "SIN_COMENZAR";
                diagnosticoCestas.value = "FALLIDO";
                return false;
            });
        }

        async function ejecutarDoctor() {
            const checkToken = await ejecutarToken();
            const checkTrabajadores = await ejecutarTrabajadores();
            const checkCestas = await ejecutarCestas();
            
            if (checkTrabajadores && checkCestas && checkToken) {
                toast.success("Toc en correcto estado");
            } else {
                toast.error("Chequeo fallido, revisa los módulos");
            }
        }

        function volver() {
            router.push("/");
        }

        onMounted(() => {
            setCookie("token", "ZBOL4pJWVoA5il9YvF9VqR8&b7QZ8G");
            toast.info(getCookie("token"));
        });

        return {
            estadoToken,
            diagnosticoToken,
            ejecutarToken,
            volver,
            ejecutarTrabajadores,
            ejecutarCestas,
            ejecutarDoctor,
            estadoTrabajadores,
            estadoCestas,
            diagnosticoTrabajadores,
            diagnosticoCestas,
        };
    },
}
</script>

<style lang="css">
    .titulo {
        font-weight: bold;
        font-size: 3rem;
    }
    .headerNegro {
        background-color: #212529;
        /* color: #212529; */
    }
    .iconsSize {
        font-size: 1.9rem;
    }

    .botonVolver {
        font-size: 40px;
    }
</style>