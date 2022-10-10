<template>
  <div class="row pb-1" id="menusColores" v-if="showBackButton">
    <div
      v-for="(item, index) of listaSubmenus"
      :key="index"
      @click="clickSubmenu(item.tag)"
      class="col colJuntitas menus"
      styled="padding-left: 4px;"
    >
      <button
        class="btn btn-secondary w-100 menus menusColorIvan colorMenus"
        v-bind:class="[{ activo: submenuEsActivo(item.tag) }]"
      >
        {{ item.nombre }}
      </button>
    </div>
  </div>

  <div
    class="row"
    id="menusColores"
    v-bind:class="[
      { 'mb-3': showBackButton === true, 'p-2': showBackButton === false },
    ]"
  >
    <template v-if="listaMenus.length <= 11">
      <template v-if="showBackButton">
        <div
          v-for="(item, index) of listaMenus"
          :key="item.nomMenu"
          @click="clickMenu(index)"
          class="col colJuntitasMenus subMenus"
          style="padding-left: 4px;"
        >
          <button
            class="btn btn-secondary w-100 subMenus menusColorIvan colorMenus"
            v-bind:class="[{ activo: esActivo(index) }]"
          >
            {{ item.nomMenu.replace(item.tag, "") }}
          </button>
        </div>
      </template>
      <template v-else>
        <div
          v-for="(item, index) of listaMenus"
          :key="item.nomMenu"
          @click="clickMenu(index)"
          class="col colJuntitasMenus menusSimples"
          style="padding-left: 4px;"
        >
          <button
            class="btn btn-secondary w-100 menusSimples menusColorIvan colorMenus"
            v-bind:class="[{ activo: esActivo(index) }]"
          >
            {{ item.nomMenu }}
          </button>
        </div>
      </template>
    </template>
    <template v-else class="scrollmenu">
      <div class="scrollmenu" style="-webkit-transform: translateZ(0); ">
        <div class="col colJuntitasMenus menus">
          <button
            v-for="(item, index) of listaMenus"
            :key="index"
            style="width: 200px"
            class="btn btn-secondary menus menusColorIvan ms-2"
            v-bind:class="[{ activo: esActivo(index) }, 'colorMenus']"
            @click="clickMenu(index)"
          >
            {{ item.nomMenu }}
          </button>
        </div>
      </div>
    </template>
  </div>

  <div>
    <div class="row" v-for="index in 6" :key="index">
      <div class="col colJuntitas" v-for="index2 in 6" :key="index2">
        <template
          v-if="
            listadoTeclas[(index - 1) * 6 + (index2 - 1)].esSumable === true
          "
        >
          <div v-if="botonesPrecio === true">
            <button
              v-bind:id="listadoTeclas[(index - 1) * 6 + (index2 - 1)].idBoton"
              class="btn btn-primary rounded-0 w-100 teclas"
              v-bind:class="[
                listadoTeclas[(index - 1) * 6 + (index2 - 1)].color,
                {
                  invisible:
                    listadoTeclas[(index - 1) * 6 + (index2 - 1)].idArticle ==
                      -1 &&
                    !isEditarArticulos(
                      listadoTeclas[(index - 1) * 6 + (index2 - 1)].idArticle
                    ),
                },
                {
                  editarArticulos: isEditarArticulos(
                    listadoTeclas[(index - 1) * 6 + (index2 - 1)].idArticle
                  ),
                },
              ]"
              @click="
                clickTecla(listadoTeclas[(index - 1) * 6 + (index2 - 1)]);
                mostrarInfoVisor(listadoTeclas[(index - 1) * 6 + (index2 - 1)]);
              "
              v-on:contextmenu="
                abrirFicha(
                  listadoTeclas[(index - 1) * 6 + (index2 - 1)].idArticle
                )
              "
              style="background-color: #dee3e9; font-size: 1.02vw;"
            >
              {{
                listadoTeclas[(index - 1) * 6 + (index2 - 1)].nombreArticulo
                  .nombre
              }}
              {{
                listadoTeclas[(index - 1) * 6 + (index2 - 1)].nombreArticulo
                  .precio
              }}
            </button>
          </div>
          <div v-else>
            <!-- Botones de los productos -->
            <button
              v-bind:id="listadoTeclas[(index - 1) * 6 + (index2 - 1)].idBoton"
              class="btn btn-primary rounded-0 w-100 teclas"
              v-bind:class="[
                listadoTeclas[(index - 1) * 6 + (index2 - 1)].color,
                {
                  invisible:
                    listadoTeclas[(index - 1) * 6 + (index2 - 1)].idArticle ==
                      -1 &&
                    !isEditarArticulos(
                      listadoTeclas[(index - 1) * 6 + (index2 - 1)].idArticle
                    ),
                },
                {
                  editarArticulos: isEditarArticulos(
                    listadoTeclas[(index - 1) * 6 + (index2 - 1)].idArticle
                  ),
                },
              ]"
              @touchstart="mousedown"
              @touchend="
                mouseup(listadoTeclas[(index - 1) * 6 + (index2 - 1)].idArticle)
              "
              @click="
                clickTecla(listadoTeclas[(index - 1) * 6 + (index2 - 1)]);
                mostrarInfoVisor(listadoTeclas[(index - 1) * 6 + (index2 - 1)]);
              "
              style="background-color: #dee3e9;"
            >
              {{
                listadoTeclas[(index - 1) * 6 + (index2 - 1)].nombreArticulo
                  .nombre
              }}
            </button>
          </div>
        </template>
        <template v-else>
          <button
            v-bind:id="listadoTeclas[(index - 1) * 6 + (index2 - 1)].idBoton"
            class="btn btn-primary rounded-0 w-100 teclas"
            v-bind:class="[
              listadoTeclas[(index - 1) * 6 + (index2 - 1)].color,
              {
                invisible:
                  listadoTeclas[(index - 1) * 6 + (index2 - 1)].idArticle ==
                    -1 &&
                  !isEditarArticulos(
                    listadoTeclas[(index - 1) * 6 + (index2 - 1)].idArticle
                  ),
              },
              {
                editarArticulos: isEditarArticulos(
                  listadoTeclas[(index - 1) * 6 + (index2 - 1)].idArticle
                ),
              },
            ]"
            @click="
              modalesSumable(
                listadoTeclas[(index - 1) * 6 + (index2 - 1)],
                listadoTeclas[(index - 1) * 6 + (index2 - 1)].idBoton
              );
              mostrarInfoVisor(listadoTeclas[(index - 1) * 6 + (index2 - 1)]);
            "
            style="background-color: #dee3e9;"
          >
            {{
              listadoTeclas[(index - 1) * 6 + (index2 - 1)].nombreArticulo
                .nombre
            }}
          </button>
        </template>
      </div>
    </div>
  </div>
  <!-- MODAL SUPLEMENTOS -->
  <div
    class="modal fade"
    id="modalSuplementos"
    data-backdrop="static"
    data-keyboard="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Suplementos</h5>
        </div>
        <div class="modal-body">
          <div class="row">
            <div
              v-for="(item, index) of suplementos"
              :key="index"
              class="col mb-3"
            >
              <template v-if="item != null">
                <button
                  class="btn w-100 h-100 colorIvan1 btnSuplemento"
                  @click="selectSuplemento(item._id)"
                  v-bind:class="[
                    { suplementoActivo: checkSuplementoActivo(item._id) },
                  ]"
                >
                  {{ item.nombre }}
                  <br />
                  {{ item.precioConIva }} €
                </button>
              </template>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary btn-lg colorIvan3"
            @click="cerrarModal(true)"
          >
            Cancelar
          </button>
          <button
            type="button"
            class="btn btn-secondary btn-lg colorIvan4"
            @click="addSuplemento()"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { Modal } from "bootstrap";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
// import { Modal } from 'bootstrap';
import axios from "axios";
import router from "../router/index";
import { useToast } from "vue-toastification";
import { socket, emitSocket } from "../socket";
import { tocGame } from "../services/tocGame";

export default {
  name: "Teclas",
  setup() {
    const toast = useToast();
    const store = useStore();
    let inicioMagic = null;
    let finalMagic = null;
    const cesta = computed(() => store.state.Cestas.cesta);
    const listaMenus = ref([{ nomMenu: "" }]);
    const listaSubmenus = ref([{ nombre: "", tag: "" }]);
    const dobleMenu = ref(false);
    const showBackButton = ref(false);
    let clickBack = false;
    let clickMenuBloqueado = false;
    const listaPrecios = ref([
      {
        _id: -1,
        nombre: "",
        precioConIva: 0,
        precioBase: 0,
        tipoIva: 0,
        esSumable: true,
        familia: "",
      },
    ]);
    const listadoTeclas = ref([]);
    let menuActivo = 0;
    let subMenuActivo = "01";
    const botonesPrecio = false;
    const edadState = computed(() => store.state.modalPeso.edadState);
    let idArticulo = null;
    let modalSuplementos = null;
    let suplementos = ref([]);
    //let suplementosSeleccionados = computed(() => store.state.Suplementos.suplementosSeleccionados);
    let suplementosSeleccionados = ref([]);
    const modoActual = computed(() => store.state.modoActual);
    function cerrarModal(borrarItem = false) {
      if (borrarItem) {
        axios
          .post("/cestas/borrarItemCesta", {
            _id: cesta.value._id,
            idArticulo,
            idArticulo,
          })
          .then((res) => {
            if (res.data.okey) {
              console.log("tecals borrar item ");

              store.dispatch("Cestas/setCestaAction", res.data.cestaNueva);
            } else {
              console.log(res.data.okey);
            }
          });
      }
      modalSuplementos.hide();
    }

    function mouseup(producto) {
      finalMagic = new Date();
      const diffTime = Math.abs(finalMagic - inicioMagic);
      if (diffTime < 2000) {
      } else {
        store.dispatch("Alergenos/abrirModal", {
          codiBotiga: tocGame.getParametros().codigoTienda,
          producto,
        });
      }
    }
    function mousedown() {
      inicioMagic = new Date();
    }

    // function test() {
    //   emitSocket('test', { destino: 'La concha de tu hermana' });
    //   // socket.emit('test', { destino: 'La concha de tu hermana' });
    //   console.log(socket.sendBuffer);
    // }
    // function test2() {
    //   // socket.sendBuffer = [];
    //   // console.log(socket.sendBuffer);
    //   console.log("Hey",  socket.connected);
    // }
    // function test3() {
    //   emitSocket('lawea', { destino: 'fdssad' });
    //   // socket.emit('lawea', { destino: 'La concha de tu prima' });
    //   console.log(socket.sendBuffer);
    // }
    function esActivo(x) {
      return x === menuActivo;
    }
    function submenuEsActivo(x) {
      return x === subMenuActivo;
    }
    function modalesSumable(articuloAPeso, idBoton) {
      axios
        .post("articulos/getArticulo", { idArticulo: articuloAPeso.idArticle })
        .then((res) => {
          if (res.data.error == false) {
            store.dispatch("ModalPeso/abrirModal", {
              idArticulo: articuloAPeso.idArticle,
              idBoton,
              precioConIva: res.data.info.precioConIva,
            });
          } else {
            toast.error(res.data.mensaje);
          }
        });
    }
    function mostrarInfoVisor(objListadoTeclas) {
      const a = objListadoTeclas;
      a.toString();
    }
    function resetTeclado() {
      listadoTeclas.value = [
        {
          idBoton: "tecla0",
          idArticle: -1,
          pos: -1,
          color: "colorIvan1",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla1",
          idArticle: -1,
          pos: -1,
          color: "colorIvan1",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla2",
          idArticle: -1,
          pos: -1,
          color: "colorIvan1",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla3",
          idArticle: -1,
          pos: -1,
          color: "colorIvan1",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla4",
          idArticle: -1,
          pos: -1,
          color: "colorIvan1",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla5",
          idArticle: -1,
          pos: -1,
          color: "colorIvan1",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla6",
          idArticle: -1,
          pos: -1,
          color: "colorIvan2",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla7",
          idArticle: -1,
          pos: -1,
          color: "colorIvan2",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla8",
          idArticle: -1,
          pos: -1,
          color: "colorIvan2",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla9",
          idArticle: -1,
          pos: -1,
          color: "colorIvan2",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla10",
          idArticle: -1,
          pos: -1,
          color: "colorIvan2",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla11",
          idArticle: -1,
          pos: -1,
          color: "colorIvan2",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla12",
          idArticle: -1,
          pos: -1,
          color: "colorIvan3",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla13",
          idArticle: -1,
          pos: -1,
          color: "colorIvan3",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla14",
          idArticle: -1,
          pos: -1,
          color: "colorIvan3",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla15",
          idArticle: -1,
          pos: -1,
          color: "colorIvan3",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla16",
          idArticle: -1,
          pos: -1,
          color: "colorIvan3",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla17",
          idArticle: -1,
          pos: -1,
          color: "colorIvan3",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla18",
          idArticle: -1,
          pos: -1,
          color: "colorIvan4",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla19",
          idArticle: -1,
          pos: -1,
          color: "colorIvan4",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla20",
          idArticle: -1,
          pos: -1,
          color: "colorIvan4",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla21",
          idArticle: -1,
          pos: -1,
          color: "colorIvan4",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla22",
          idArticle: -1,
          pos: -1,
          color: "colorIvan4",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla23",
          idArticle: -1,
          pos: -1,
          color: "colorIvan4",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla24",
          idArticle: -1,
          pos: -1,
          color: "colorIvan5",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla25",
          idArticle: -1,
          pos: -1,
          color: "colorIvan5",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla26",
          idArticle: -1,
          pos: -1,
          color: "colorIvan5",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla27",
          idArticle: -1,
          pos: -1,
          color: "colorIvan5",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla28",
          idArticle: -1,
          pos: -1,
          color: "colorIvan5",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla29",
          idArticle: -1,
          pos: -1,
          color: "colorIvan5",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla30",
          idArticle: -1,
          pos: -1,
          color: "colorIvan6",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla31",
          idArticle: -1,
          pos: -1,
          color: "colorIvan6",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla32",
          idArticle: -1,
          pos: -1,
          color: "colorIvan6",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla33",
          idArticle: -1,
          pos: -1,
          color: "colorIvan6",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla34",
          idArticle: -1,
          pos: -1,
          color: "colorIvan6",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla35",
          idArticle: -1,
          pos: -1,
          color: "colorIvan6",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
      ];
    }
    function cargarTeclado(data) {
      resetTeclado();
      for (let i = 0; i < data.length; i += 1) {
        listadoTeclas.value[data[i].pos].nombreArticulo.nombre =
          data[i].nombreArticulo;
        if (data[i].nombreArticulo != null) {
          listadoTeclas.value[data[i].pos].idArticle = data[i].idArticle;
        } else {
          listadoTeclas.value[data[i].pos].idArticle = -1;
        }
        // this.listadoTeclas[data[i].pos].color = this.auxTranslateColor(i);
        listadoTeclas.value[data[i].pos].esSumable = data[i].esSumable;
        /* LISTADO PRECIOS */
        const datosProducto = listaPrecios.value.find(
          (x) => x.nombre === data[i].nombreArticulo
        );
        listadoTeclas.value[data[i].pos].nombreArticulo.precio =
          datosProducto !== undefined ? `${datosProducto.precioConIva}€` : "0€";
      }
    }
    function clickMenu(index) {
      if (!clickMenuBloqueado) {
        clickMenuBloqueado = true;
        /* Debe existir al menos 1 menú en el array */
        if (listaMenus.value.length > 0) {
          axios
            .post("/menus/clickMenu", {
              nombreMenu: listaMenus.value[index].nomMenu,
            })
            .then((res) => {
              if (!res.data.bloqueado) {
                menuActivo = index;
                clickMenuBloqueado = false;
                cargarTeclado(res.data.resultado);
              } else {
                console.log("Pero donde vas, Rayo McQueen");
              }
            })
            .catch((err) => {
              console.log(err);
              clickMenuBloqueado = false;
            });
        }
      } else {
        console.log("Estoy bloqueado");
      }
    }

    function clickSubmenu(tag) {
      axios.post("/doble-menus/clickMenu", { tag }).then((res) => {
        if (!res.data.bloqueado) {
          listaMenus.value = res.data.resultado;

          subMenuActivo = tag;
          clickMenuBloqueado = false;
          clickMenu(0);
          dobleMenu.value = false;
        } else {
          console.log("Kachau");
        }
      });
    }

    function goBackSubmenus() {
      clickBack = true;
      getSubmenus(true);
    }

    /* Eze 4.0 */
    function clickTecla(item) {
      const unidades = store.getters["getUnidades"];
      axios.post("teclado/clickTeclaArticulo", {
        idArticulo: item.idArticle,
        gramos: 0,
        idCesta: store.getters["Cestas/getIdCestaActiva"],
        unidades: unidades,
        arraySuplementos: null
      }).then((res) => {
        if (!res.data) {
          toast.error("Error, no se ha podido añadir el item a la cesta");
        }
      }).catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
      document.activeElement.blur();
    }

    function selectSuplemento(idSuplemento) {
      const supl = suplementosSeleccionados.value.findIndex(
        (o) => o.suplemento === idSuplemento
      );
      if (supl !== -1) {
        suplementosSeleccionados.value.splice(supl, 1);
        return;
      }
      suplementosSeleccionados.value.push({
        suplemento: idSuplemento,
        activo: true,
      });
    }

    function checkSuplementoActivo(idSuplemento) {
      const s = suplementosSeleccionados.value.findIndex(
        (o) => o.suplemento === idSuplemento
      );
      return s !== -1 ? true : false;
    }

    function addSuplemento() {
      axios
        .post("cestas/addSuplemento", {
          idCesta: cesta.value._id,
          suplementos: suplementosSeleccionados.value,
          idArticulo,
          posArticulo: -100,
        })
        .then((res) => {
          if (!res.data.error && !res.data.bloqueado) {
            store.dispatch("resetUnidades");
            console.log("añadir suplemento ");

            store.dispatch("Cestas/setCestaAction", res.data.cesta);

            suplementosSeleccionados.value = [];
            idArticulo = null;
            cerrarModal();
          } else {
            console.log("Error en clickSuplemento");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error. Comprobar consola");
        });
    }
    resetTeclado();
    if (!showBackButton.value) {
      axios.post("/menus/getMenus").then((res) => {
        if (!res.data.bloqueado) {
          listaMenus.value = res.data.resultado;
          clickMenu(0);
        } else {
          console.log("EN ESTE MOMENTO NO ES POSIBLE CARGAR EL TECLADO");
        }
      });
    }
    function getSubmenus(backButton = false) {
      axios.post("/doble-menus/getMenus").then((res) => {
        if (!res.data.bloqueado) {
          if (res.data.resultado.length > 0) {
            listaSubmenus.value = res.data.resultado;

            if (!backButton) clickSubmenu(res.data.resultado[0].tag);
            else dobleMenu.value = true;
            showBackButton.value = true;
            if (!clickBack) {
              axios
                .post("/menus/getSubmenus", { tag: res.data.resultado[0].tag })
                .then((res2) => {
                  if (!res2.data.bloqueado) {
                    listaMenus.value = res2.data.resultado;
                    clickMenuBloqueado = false;
                    clickMenu(0);
                  } else {
                    console.log("F TECLADO");
                  }
                });
            }
          } else {
            dobleMenu.value = false;
          }
        }
      });
    }
    getSubmenus();
    function isEditarArticulos(index) {
      return (modoActual.value === "MODIFICAR_ARTICULO" ||
        modoActual.value === "MOVER_ARTICULO") &&
        index === -1
        ? true
        : false;
    }
    onMounted(() => {
      // axios.post('impresora/bienvenida')
      // modalSuplementos = new Modal(document.getElementById('modalSuplementos'), {
      //   keyboard: false,
      //   backdrop: 'static',
      // });
      document.onselectstart = function() {
        return false;
      };
      /* OBSERVAR SI LA CAJA ESTÁ ABIERTA */
      tocGame.iniciarToc();
      // axios.post('caja/estadoCaja').then((res) => {
      //   if (!res.data.error) {
      //     if (res.data.abierta) {
      //       store.dispatch('Caja/setEstadoCaja', true);
      //       console.log('establezco cajaAbierta = true');
      //     } else {
      //       store.dispatch('Caja/setEstadoCaja', false);
      //       router.push('/abrirCaja');
      //     }
      //   }
      // }).catch((err) => {
      //   console.log(err);
      //   toast.error('Error, contactar con informática');
      // });
    });

    return {
      mousedown,
      mouseup,
      edadState,
      listaMenus,
      menuActivo,
      listadoTeclas,
      esActivo,
      botonesPrecio,
      clickMenu,
      clickTecla,
      mostrarInfoVisor,
      modalesSumable,
      dobleMenu,
      listaSubmenus,
      clickSubmenu,
      submenuEsActivo,
      showBackButton,
      goBackSubmenus,
      suplementos,
      addSuplemento,
      cerrarModal,
      suplementosSeleccionados,
      selectSuplemento,
      checkSuplementoActivo,
      isEditarArticulos,
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
  background-color: #dee3e9 !important;
  color: #5e5f61 !important;
  border-color: #dee3e9 !important;
}
.colorIvan2 {
  background-color: #eddecb !important;
  color: #5e5f61 !important;
  border-color: #eddecb !important;
}
.colorIvan3 {
  background-color: #fbb5b5 !important;
  color: #5e5f61 !important;
  border-color: #fbb5b5 !important;
}
.colorIvan4 {
  background-color: #dce9d5 !important;
  color: #5e5f61 !important;
  border-color: #dce9d5 !important;
}
.colorIvan5 {
  background-color: #efd8a6 !important;
  color: #5e5f61 !important;
  border-color: #efd8a6 !important;
}
.colorIvan6 {
  background-color: #b0aec6 !important;
  color: #5e5f61 !important;
  border-color: #b0aec6 !important;
}
.botonesMenu {
  background-color: #d45600;
  border-color: #d45600;
  margin-right: 4px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
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
.btn-secondary:focus,
.btn-secondary.focus {
  /* color: #c95907 !important;
    background-color: #fff5e9 !important;
    border-color: #bf5c18 !important; */
  background-color: #d45600 !important;
  color: #fffaee !important;
  border-color: #d45600 !important;
  box-shadow: none !important;
}
.btn-secondary.disabled,
.btn-secondary:disabled {
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
  .show
  > .btn-secondary.dropdown-toggle:focus {
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
  background-color: #fbb5b5 !important;
}
.btnSuplemento:focus,
.btnSuplemento:active {
  box-shadow: none !important;
}
.editarArticulos {
  background-color: #c95807a4 !important;
  border-color: transparent !important;
}
</style>
