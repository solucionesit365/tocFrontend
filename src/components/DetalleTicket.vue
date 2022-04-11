<template>
    <div id="detalleTicket">
        <h2 class="text-center">Ticket {{ticket._id}}</h2>
        <h6 class="text-center">{{ticket.fecha}}</h6>
        <br />
        <hr />
        <table class="table">
            <tr>
                <th class="titulosTicket">Producto</th>
                <th class="titulosTicket">Subtotal</th>
                <th class="titulosTicket">Unidades</th>
            </tr>
            <tr v-for="(item, index) of ticket.lista" v-bind:key={index}>
                <td>{{item.nombre}}</td>
                <td>{{item.subtotal}}</td>
                <td>{{item.unidades}}</td>
            </tr>
        </table>
        <hr />
        <p>Forma de pago: {{ticket.tipoPago}}</p>
        <h1 class="text-center">Total: {{ticket.total}}</h1>
    </div>
</template>

<script>

export default {
    name: 'detalleTicket',
    props: {
        ticket: {
            type: Object,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: '',
            required: true,
        },
    },
};
/*
// eslint-disable-next-line max-len
{ "_id": 170013, "lista": [ { "promocion": { "_id": null, "esPromo": false },
"_id": 4560, "nombre": "VICHY", "subtotal": 1.75, "unidades": 1 },
{ "promocion": { "_id": null, "esPromo": false },
_id": 8572, "nombre": "Zumo Piña Brick", "subtotal": 0.75, "unidades": 1 },
{ "promocion": { "_id": null, "esPromo": false },
"_id": 8571, "nombre": "Granini Melocoton Botella", "subtotal": 1.7, "unidades": 1 } ],
"total": 4.2, "tipoPago": "EFECTIVO" }
*/
</script>

<style>
    #detalleTicket {
        font-family: Consolas, monaco, monospace;
        font-size: 14px;
        font-style: normal;
        font-variant: normal;
        font-weight: 700;
        line-height: 26.4px;
        margin: 1rem;
    }
    .titulosTicket {
        font-weight: bold;
        font-size: 18px;
    }
    .ocultarDetalle {
        display: none;
    }
</style>
