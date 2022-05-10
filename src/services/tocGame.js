import axios from "axios";
import store from '../store/index';
import router from '../router/index';
import { useToast } from "vue-toastification";
const toast = useToast();

const baseURL = 'http://localhost:3000/'; // BUILD PARA TPV
// const baseURL = 'http://54.195.159.7:3000'; // BUILD PARA SERVIDOR

class tocGameV3 {
    parametros = null;

    constructor() {
        axios.post(baseURL + 'parametros/getParametros').then((res) => {
            console.log(res.data)
            if (res.data.error === false) {
                this.parametros = res.data.parametros;
            } else {
                throw "Error en parametros/getParametros";
            }
            
        }).catch((err) => {
            console.log(err);
        });
    }


    // document.addEventListener("keypress", function(e){
    //     if(e.keyCode != 13) {
    //         barcode.value += e.key;
    //     }
    //     e.preventDefault();
    // });

    getParametros() { return this.parametros };

    hayFichados() {
        return axios.post(baseURL + 'trabajadores/getTrabajadoresFichados').then((res) => {
            if (res.data.error == false) {
                if (res.data.res.length > 0) {
                    return true;
                }
                toast.info("No hay nadie fichado");
                return false;
            } else {
                alert('Error en tocGame.js - AXIOS trabajadores/getTrabajadoresFichados');
                return false;
            }
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }

    cajaAbierta() {
        return axios.post(baseURL + 'caja/estadoCaja').then((res) => {
            if (res.data.error == false) {
                store.dispatch('Caja/setEstadoCaja', true);
                return res.data.abierta;
            } else {
                store.dispatch('Caja/setEstadoCaja', false);
                return false;
            }
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }

    todoInstalado() {
        return axios.post(baseURL + 'parametros/todoInstalado').then((res) => {
            return res.data.todoInstalado;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }

    iniciarToc() {
        tocGame.todoInstalado().then((hayLicencia) => {
            if (hayLicencia) { // Licencia OK
              tocGame.hayFichados().then((res) => {
                if (res) { // Fichaje mínimo OK
                  tocGame.cajaAbierta().then((res2) => {
                    if (res2 == false) { 
                        router.push('/abrirCaja');
                    } else {
                        /* Cargar cesta y trabajador activo en el store */
                        axios.get('trabajadores/getCurrentTrabajadorNueva').then((infoTrabajador) => {
                            if (infoTrabajador.data.error == false) {
                                store.dispatch('Trabajadores/setTrabajadorActivo', infoTrabajador.data.trabajador.idTrabajador);
                                store.dispatch('Trabajadores/setNombreTrabajadorActivo', infoTrabajador.data.trabajador.nombre);
                                // axios.post('cestas/getCestaByTrabajadorId', { idTrabajador: infoTrabajador.data.trabajador.idTrabajador }).then((resCesta) => {
                                //     if (resCesta.data.error === false && resCesta.data.info != null) {
                                //         store.dispatch('Cesta/setCestaAction', resCesta.data.info);
                                //     } else {                                        
                                //         console.log(resCesta.data.mensaje);
                                //     }
                                // }).catch((err) => {
                                //     console.log(err);
                                //     console.log('Error catch cestas/getCestasByTrabajadorId');
                                // })
                            } else {
                                console.log(infoTrabajador.data.mensaje);
                                // toast.error(infoTrabajador.data.mensaje);
                            }
                        }).catch((err) => {
                            console.log(err);
                            console.log('Error catch trabajador/getCurrentTrabajador');
                            // toast.error('Error catch trabajador/getCurrentTrabajador');
                        });
                    }
                  }).catch((err) => {
                    console.log(err);
                  });
                } else {
                  console.log('No hay fichados');
                  router.push('/menu/fichajes');
                }
              }).catch((err) => {
                console.log(err);
                console.log('Error en catch tocGame.hayFicados()');
              });
            } else {
              router.push('/installWizard');
            }
          }).catch((err) => {
            console.log('Error en catch tocGame.todoInstalado()');
          });
    }
}



export const tocGame = new tocGameV3();