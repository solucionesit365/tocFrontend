<template>
    <div class='col'>
        <iframe :src="url" style='position: absolute; height: 90%; width: 100%; border: none'></iframe>
    </div>
</template>

<script>

import { useRoute } from 'vue-router';
import { ref } from 'vue';

export default {
    setup() {
        const route = useRoute();
        console.log(route.params)
        const { codiBotiga, database } = route.params;
        
        //const url = ref(`http://silema.hiterp.com/TpvWebReposicion.asp?modo=MENU&codiBotiga=${codiBotiga}`);
       const url = ref(`http://silema.hiterp.com/TpvWeb.asp?Empresa=${database}&codiBotiga=${codiBotiga}`);
       
      
       
       return {
            url,
        };
    },
}
</script>
