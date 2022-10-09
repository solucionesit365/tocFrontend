import axios from "axios";
import store from "../store/index";
import router from "../router/index";
import { useToast } from "vue-toastification";
const toast = useToast();

const baseURL = "http://localhost:3000/"; // BUILD PARA TPV
//const baseURL = 'http://10.137.0.201:3000/'; // BUILD PARA ITERUM
//const baseURL = 'http://10.137.0.243:3000/'; // BUILD PARA ITERUM windows

// const baseURL = 'http://54.195.159.7:3000'; // BUILD PARA SERVIDOR

class tocGameV3 {
  parametros = null;

  constructor() {
    axios
      .post(baseURL + "parametros/getParametros")
      .then((respuesta) => {
        if (respuesta.data) {
          this.parametros = respuesta.data;
        } else {
          throw Error("Error en el constructor de tocGame class");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // document.addEventListener("keypress", function(e){
  //     if(e.keyCode != 13) {
  //         barcode.value += e.key;
  //     }
  //     e.preventDefault();
  // });

  getParametros = () => this.parametros;

  hayFichados() {
    // return axios.post(baseURL + 'trabajadores/getTrabajadoresFichados').then((res) => {
    //     if (res.data.error == false) {
    //         if (res.data.res.length > 0) {
    //             return true;
    //         }
    //         toast.info("No hay nadie fichado");
    //         return false;
    //     } else {
    //         alert('Error en tocGame.js - AXIOS trabajadores/getTrabajadoresFichados');
    //         return false;
    //     }
    // }).catch((err) => {
    //     console.log(err);
    //     return false;
    // });
  }

  cajaAbierta() {
    return axios
      .post(baseURL + "caja/estadoCaja")
      .then((res) => {
        if (res.data.error == false) {
          store.dispatch("Caja/setEstadoCaja", true);
          return res.data.abierta;
        } else {
          store.dispatch("Caja/setEstadoCaja", false);
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  todoInstalado() {
    return axios
      .post(baseURL + "parametros/todoInstalado")
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  iniciarToc() {
    console.log("INICIANDO TOC");
    tocGame
      .todoInstalado()
      .then((hayLicencia) => {
        if (hayLicencia) {
          // Licencia OK
          tocGame
            .hayFichados()
            .then((res) => {
              if (res) {
                // Fichaje mínimo OK
                tocGame
                  .cajaAbierta()
                  .then((res2) => {
                    if (res2 == false) {
                      router.push("/abrirCaja");
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                router.push("/menu/fichajes");
              }
            })
            .catch((err) => {
              console.log(err);
              console.log("Error en catch tocGame.hayFicados()");
            });
        } else {
          router.push("/installWizard");
        }
      })
      .catch((err) => {
        console.log("Error en catch tocGame.todoInstalado()");
      });
  }
}

export const tocGame = new tocGameV3();
