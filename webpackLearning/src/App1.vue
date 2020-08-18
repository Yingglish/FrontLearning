<template>
    <div>
       <my-addition></my-addition>
       <p>---------------------------</p>
       <my-subtraction></my-subtraction>
    </div>
</template>

<script>
import Addition from "./components/Addition.vue";
import Substraction from "./components/Substraction.vue";
export default {
    data() {
        return {
            
        }
    },
    components: {
        'my-addition': Addition,
        'my-subtraction': Substraction
    }
}
</script>
