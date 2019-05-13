<template>
     <div>
         <div class="header">
             <slot name="header"></slot>
         </div>
         <div class="content">
             <slot name="content" v-bind:dd="gotofather"></slot>
         </div>
         <div class="footer">
             <slot name="footer"></slot>
         </div>
     </div>
</template>

<script>
    export default {
        data(){
            return {
                gotofather: 'come from slot son'
            }
        }
    }
</script>

<style scoped>

</style>