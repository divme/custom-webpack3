<template>
        <div class="container">
            <basic-topbar title="首页"></basic-topbar>
            <div class="title-box">
                <div class="title-text">{{titleText}}</div>
                <div class="title-time">{{titleTime}}</div>
            </div>
            <div class="content-box year"  v-show="curItem.year">
                <div class="content" v-for="content in year.contents" :content="content" :key="">
                    <div class="content-img" :style="content.style">
                        <img :src="content.img" alt="">
                    </div>
                    <div class="content-text">
                        <div class="content-money">{{content.money}}</div>
                        <div class="content-name">{{content.name}}</div>
                    </div>
                </div>
            </div>
            <div class="content-box month" v-show="curItem.month">
                <div class="content" v-for="content in month.contents" :content="content" :key="">
                    <div class="content-img" :style="content.style">
                        <img :src="content.img" alt="">
                    </div>
                    <div class="content-text">
                        <div class="content-money">{{content.money}}</div>
                        <div class="content-name">{{content.name}}</div>
                    </div>
                </div>
            </div>
            <div class="content-box day" v-show="curItem.day">
                <div class="content" v-for="content in day.contents" :content="content" :key="">
                    <div class="content-img" :style="content.style">
                        <img :src="content.img" alt="">
                    </div>
                    <div class="content-text">
                        <div class="content-money">{{content.money}}</div>
                        <div class="content-name">{{content.name}}</div>
                    </div>
                </div>
            </div>
            <div class="tab-box">
                <div @click="changeItem('year')"  :class="{active : curItem.year}">年度积累</div>
                <div @click="changeItem('month')" :class="{active : curItem.month}">月度更新</div>
                <div @click="changeItem('day')"   :class="{active : curItem.day}">每日更新</div>
            </div>
        </div>
</template>
<style scoped>
    .container{
        padding: 0 15px;
        background: #f7f7f7;
    }
    .title-box{
        margin-top: 50px;
        padding-top: 20px;
        line-height: 1.6;
        font-size: 20px;
        text-align: center;
        border-bottom: 1px solid #ccc;
        color: #666;
    }
    .title-text{
        margin-bottom: 10px;
    }
    .title-time{

    }
    .content-box{

    }
    .content{
        display: flex;
        margin: 40px auto;
    }
    .content-img{
        flex: 0 1 40%;

        text-align: right;
        border-right: 4px solid;
    }
    .content-img img{
        margin-right: 15px;
        width: 55px;
    }
    .content-text{
        flex: 1 1 60%;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-left: 15px;
        font-weight: bold;
        color: #333;
    }
    .content-money{
        height: 25px;
        line-height: 25px;
        font-size: 24px;

    }
    .content-name{
        height: 15px;
        line-height: 15px;
        font-size: 15px;
    }

    .tab-box{
        display: flex;
        justify-content: space-around;
    }
    .tab-box .active{
        font-size: 16px;
        color: #42b0c9;
    }
    .tab-box div{
        flex: 1 0 30%;

        padding: 20px 0;
        font-size: 14px;
        text-align: center;
        color: #a0d2cf;
    }
</style>

<script>
    import BasicTopbar from './components/basicTopbar'
    import img1 from './img/year1.png';
    import img2 from './img/year2.png';
    import img3 from './img/year3.png';
    import img4 from './img/year4.png';
    import img5 from './img/month3.png';

    export default {
        components: {
            BasicTopbar
        },
        mounted(){
            document.querySelector('.container').style.minHeight = window.innerHeight - 50 + 'px';
        },
        data(){
           return{
               curItem:{
                   year : true,
                   month: false,
                   day: false
               },
               titleText: '银河证券年度数据',
               titleTime: '2015.1.1 - 2015.11.30',
               year : {
                   titleText: '银河证券年度数据',
                   titleTime: '2015.1.1 - 2015.11.30',
                   contents: [
                       {
                           img : img1,
                           style: {
                             borderColor: '#0dcafa'
                           },
                           money : '228.56亿元',
                           name: '总收入'
                       },
                       {
                           img : img2,
                           style: {
                               borderColor: '#f6d171'
                           },
                           money : '116.54亿元',
                           name: '总支出'
                       },
                       {
                           img : img3,
                           style: {
                               borderColor: '#c362d4'
                           },
                           money : '84.54亿元',
                           name: '净利润'
                       },
                       {
                           img : img4,
                           style: {
                               borderColor: '#81dedd'
                           },
                           money : '38.79%',
                           name: '成本收入比'
                       }
                   ]
               },
               month : {
                   titleText: '银河证券月度数据',
                   titleTime: '2015.11',
                   contents: [
                       {
                           img : img1,
                           style: {
                               borderColor: '#0dcafa'
                           },
                           money : '12.86亿元',
                           name: '手续费'
                       },
                       {
                           img : img2,
                           style: {
                               borderColor: '#f6d171'
                           },
                           money : '1325.74亿元',
                           name: '保证金'
                       },
                       {
                           img : img5,
                           style: {
                               borderColor: '#c362d4'
                           },
                           money : '42,629户',
                           name: '新开客户数'
                       },
                       {
                           img : img4,
                           style: {
                               borderColor: '#81dedd'
                           },
                           money : '4.70%',
                           name: '股基市占率'
                       }
                   ]
               },
               day : {
                   titleText: '银河证券当天数据',
                   titleTime: '2015.11.30',
                   contents: [
                       {
                           img : img5,
                           style: {
                               borderColor: '#0dcafa'
                           },
                           money : '228.56亿元',
                           name: '总收入'
                       },
                       {
                           img : img4,
                           style: {
                               borderColor: '#f6d171'
                           },
                           money : '116.54亿元',
                           name: '总支出'
                       },
                       {
                           img : img3,
                           style: {
                               borderColor: '#c362d4'
                           },
                           money : '84.54亿元',
                           name: '净利润'
                       },
                       {
                           img : img2,
                           style: {
                               borderColor: '#81dedd'
                           },
                           money : '38.79%',
                           name: '成本收入比'
                       }
                   ]
               },
           }
        },
        methods:{
            changeItem(option){
                for(var  n in this.curItem){
                    // debugger
                    if(this.curItem.hasOwnProperty(n)){
                        this.curItem[n] = false
                    }
                }
                this.curItem[option] = true
            }
        }
    }
</script>

