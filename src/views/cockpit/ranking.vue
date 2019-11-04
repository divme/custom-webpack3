<template>
    <div>
        <basic-topbar title="财务报表分析"></basic-topbar>
        <basic-title :title="pageTitle"></basic-title>

        <div class="province-box">
            <div class="province" v-for="item in provinces" >
                <div class="img-box">
                    <img :src="item.img" alt="">
                </div>
                <div class="detail-box">
                    <div class="name">{{item.province}}</div>
                    <div class="percent">{{item.percent}}</div>
                    <div class="money">{{item.num}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

     .province-box{
         display: flex;
         flex-wrap: wrap;
         margin-top: 20px;
     }
     .province{
         flex: 0 1 50%;

         display: flex;
         justify-content: space-between;
         margin-top: 15px;
         width: 50%;
     }
     .img-box{
         flex: 1 0 40%
     }
     .img-box img{
         width: 100%;
     }

    .detail-box {
        flex: 1 1 60%;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .name{
        font-size: 15px;
        font-weight: 700;
        color: #333;
    }
    .percent{
        margin: 5px 0;
        font-size: 18px;
        font-weight: 700;
        color: #888;
    }
    .money{
        font-size: 12px;
        /*font-weight: bold;*/
        color: #666;
    }

</style>
<script>
    import BasicTitle from './components/basicTitle'
    import BasicTopbar from './components/basicTopbar'

    import BeiJing from './img/beijing.png';
    import ShangHai from './img/shanghai.png';
    import HuBei from './img/hubei.png';
    import HeBei from './img/hebei.png';
    import JiangSu from './img/jiangsu.png';
    import GuangDong from './img/guangdong.png';
    import ShanXi from './img/shanxi.png';
    import SiChuan from './img/sichuan.png';
    import ZheJiang from './img/zhejiang.png';
    import Other from './img/other.png';

    export default {
        components: {
            BasicTitle, BasicTopbar
        },
        data () {
            return {
                pageTitle: '2015年营业收入机构排名',
                provinces: [
                    {
                        province: '浙江',
                        img: ZheJiang,
                        percent: '16.93%',
                        num: '257,919,72 万元'
                    },
                    {
                        province: '北京',
                        img: BeiJing,
                        percent: '13.77%',
                        num: '209,786,42 万元'
                    },

                    {
                        province: '广东',
                        img: GuangDong,
                        percent: '13.77%',
                        num: '209,786,42 万元'
                    },
                    {
                        province: '上海',
                        img: ShangHai,
                        percent: '13.77%',
                        num: '209,786,42 万元'
                    },
                    {
                        province: '湖北',
                        img: HuBei,
                        percent: '13.77%',
                        num: '209,786,42 万元'
                    },
                    {
                        province: '山西',
                        img: ShanXi,
                        percent: '13.77%',
                        num: '209,786,42 万元'
                    },
                    {
                        province: '河北',
                        img: HeBei,
                        percent: '13.77%',
                        num: '209,786,42 万元'
                    },
                    {
                        province: '四川',
                        img: SiChuan,
                        percent: '13.77%',
                        num: '209,786,42 万元'
                    },
                    {
                        province: '江苏',
                        img: JiangSu,
                        percent: '13.77%',
                        num: '209,786,42 万元'
                    },
                    {
                        province: '其他',
                        img: Other,
                        percent: '13.77%',
                        num: '209,786,42 万元'
                    }
                ]
            }
        },
        methods: {
            afterConfig (options){
                return options
            }
        }
    }
</script>
