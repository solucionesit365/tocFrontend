<template>
    <button type='button' class='btn btn-sm btn-outline-info ms-4 mt-2'>
        {{nombreCompleto}}
    </button>
    <br />
</template>
<script>
export default {
    name: 'DependientasActivas',
    props: {
        nombreCompleto: {
            type: String,
            default: '',
            required: true,
        },
        id: {
            type: String,
            default: '0',
            required: true,
        },
    },
    setup() {
    },
};
</script>
<style scoped>
    button {
        width: 5rem;
    }
</style>
