<template>
    <div class="title-box">
        <span class="title">{{title}}</span>
        <div class="subtitle">
            <slot name="subLeft"></slot>
            <slot name="subRight"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            title: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>
    .title-box{
        margin: 30px 15px 10px;
    }
    .title{
        display: inline-block;
        padding-right: 25px;
        padding-bottom: 10px;
        border-bottom: 2px solid #333;
        color: #666;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;

        margin-top: 5px;
    }
    .subtitle a{
        text-decoration: underline;
    }
</style>