<template>
  <div id="app" class="container-fluid fuenteIvan">
    <router-view />
  </div>
</template>
<script>
  
export default {
  setup() {
    return {
    };
  },
};
</script>
<style>
body {
  background-color: #fff5e9;
}
@font-face {
  font-family: "Poppins";
  src: url("assets/Poppins-Medium.woff2");
}
.fuenteIvan {
  font-family: "Poppins", sans-serif;
}
.estiloActivoTicketCaja {
  background-color: #ffb5bc85 !important;
}

@media (min-width: 768px) {
  .seven-cols .col-md-1,
  .seven-cols .col-sm-1,
  .seven-cols .col-lg-1 {
    width: 100%;
    *width: 100%;
  }
}

@media (min-width: 992px) {
  .seven-cols .col-md-1,
  .seven-cols .col-sm-1,
  .seven-cols .col-lg-1 {
    width: 14.285714285714285714285714285714%;
    *width: 14.285714285714285714285714285714%;
    max-width: 14.285714285714285714285714285714% !important;
    flex: none !important;
  }
}

@media (min-width: 1200px) {
  .seven-cols .col-md-1,
  .seven-cols .col-sm-1,
  .seven-cols .col-lg-1 {
    width: 14.285714285714285714285714285714%;
    *width: 14.285714285714285714285714285714%;
    max-width: 14.285714285714285714285714285714% !important;
    flex: none !important;
  }
}
.clientesAnchoNombre {
  width: 40%;
}
.clientesAnchoBotones {
  width: 60%;
}

.estiloTicketSeleccionado {
  background-color: #f07070;
}

/* CIERRE */
.cierreCaja {
  font-family: "Consolas";
}
.cierreCaja #tienda {
  text-align: center;
}
#tiendaResum {
  display: block;
  width: 100px;
  height: 100%;
  margin: 0 auto;
  margin-top: -3vh;
}
#datosTienda {
  font-size: 14px;
}
#datosVenta {
  font-size: 20px;
}
#pagosTargeta {
  position: absolute;
  right: 0px;
  height: 263px;
  overflow-y: scroll;
  width: 445px;
  margin-top: -36%;
}
/* DATOS */
.iconoDatos {
  font-size: 72px;
  cursor: pointer;
}
.botonBorrar {
  cursor: pointer;
  padding-right: 5px;
  margin: 0 70px 0px 70px;
}

.container {
  position: absolute;
  width: 600px;
  height: 200px;
  z-index: 15;
  top: 45%;
  left: 45%;
  margin: -100px 0 0 -150px;
}
.version {
  bottom: 0;
  right: 0;
  position: absolute;
}
.vers {
  bottom: 0;
}
/* BOTONES */
.boton {
  box-shadow: inset 0px 1px 0px 0px #dcecfb;
  background-color: #bddbfa;
  border-radius: 6px;
  border: 1px solid #84bbf3;
  display: inline-block;
  cursor: pointer;
  color: #000000;
  font-family: Arial;
  font-size: 20px;
  font-weight: bold;
  padding: 20px 29px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #528ecc;
  margin: 0.5vw;
}
.boton:hover {
  background-color: #80b5ea;
}
.boton:active {
  position: relative;
  top: 1px;
}
/*****/
/* EDICIONES BOOTSTRAP */
.btn-lg {
  width: 10vw;
  margin: 15px;
}
.btn_empty {
  background: none !important;
  color: inherit !important;
  border: none !important;
  padding: 0 !important;
  font: inherit !important;
  cursor: default !important;
  outline: inherit !important;
}
.btn_fc {
  width: 7vw;
}
.btn-group {
  width: 45% !important;
  margin: 0 auto !important;
}
/* MODAL DERECHA */
/*******************************
  * MODAL AS LEFT/RIGHT SIDEBAR
  * Add "left" or "right" in modal parent div, after class="modal".
  * Get free snippets on bootpen.com
  *******************************/
.modal.left .modal-dialog,
.modal.right .modal-dialog {
  position: fixed;
  margin: auto;
  width: 320px;
  height: 100%;
  -webkit-transform: translate3d(0%, 0, 0);
  -ms-transform: translate3d(0%, 0, 0);
  -o-transform: translate3d(0%, 0, 0);
  transform: translate3d(0%, 0, 0);
}

.modal.left .modal-content,
.modal.right .modal-content {
  height: 100%;
  overflow-y: auto;
}

.modal.left .modal-body,
.modal.right .modal-body {
  padding: 15px 15px 80px;
}

/*Left*/
.modal.left.fade .modal-dialog {
  left: -320px;
  -webkit-transition: opacity 0.3s linear, left 0.3s ease-out;
  -moz-transition: opacity 0.3s linear, left 0.3s ease-out;
  -o-transition: opacity 0.3s linear, left 0.3s ease-out;
  transition: opacity 0.3s linear, left 0.3s ease-out;
}

.modal.left.fade.in .modal-dialog {
  left: 0;
}

/*Right*/
.modal.right.fade .modal-dialog {
  right: -320px;
  -webkit-transition: opacity 0.3s linear, right 0.3s ease-out;
  -moz-transition: opacity 0.3s linear, right 0.3s ease-out;
  -o-transition: opacity 0.3s linear, right 0.3s ease-out;
  transition: opacity 0.3s linear, right 0.3s ease-out;
}

.modal.right.fade.in .modal-dialog {
  right: 0;
}

.estiloCesta {
  background-color: #ffffff;
}
.table-responsive {
  height: 20vh;
  width: 50vw;
  overflow: auto;
}
thead tr:nth-child(1) th {
  background: white;
  position: sticky;
  top: 0;
  z-index: 10;
}
.colorFuente {
  color: #606060 !important;
}
.ordenado {
  padding-top: 2px;
  padding-left: 3px;
  padding-right: 0px;
  padding-bottom: 1px;
}

.botonEze {
  min-height: 70px;
  min-width: 70px;
  box-shadow: inset 0px 1px 0px 0px #dcecfb;
  background-color: #bddbfa;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 45px;
  font-weight: bold;
  padding-left: 21px;
  text-decoration: none;
  /* text-shadow: 0px 1px 0px #528ecc; */
  margin: 0.3vw;
}
.botonEze:hover {
  background-color: #80b5ea;
}
.botonEze:active {
  position: relative;
  top: 1px;
}
.scrollVer {
  max-height: 150px;
  overflow-y: scroll;
}
</style>
