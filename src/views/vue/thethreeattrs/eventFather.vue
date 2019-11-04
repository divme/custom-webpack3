<template>
    <div>
        <events @things="event1"></events>
    </div>
</template>

<script>
    import Events from './event'
    export default {
        components:{Events},
        data(){
            return {

            }
        },
        methods:{
            event1(e){
                console.log('event1:' + e)
            }
        }
    }
</script>

<style scoped>

</style>