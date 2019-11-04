<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="24">
        <img :src="errGif" class="pan-img" alt="Girl has dropped her ice cream.">
      </el-col>
      <el-col :span="24">
        <h1 class="text-jumbo text-ginormous">OOPS!</h1>
        <h2>您没有权限访问该页面</h2>
        <h3>或者您可以:</h3>
        <ul class="list-unstyled">
          <li class="link-type">
            <router-link to="/">回首页</router-link>
          </li>
        </ul>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import errGif from 'src/assets/401_images/401.gif'

export default {
  name: 'Page401',
  data() {
    return {
      errGif: errGif + '?' + +new Date(),
      dialogVisible: false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .errPage-container {
    width: 600px;
    max-width: 100%;
    margin: 30px auto;
    .pan-img {
      display: block;
      width: 60%;
      margin: 0 auto;
    }
    .text-jumbo {
      font-size: 20px;
      font-weight: 700;
      color: #484848;
    }
    .list-unstyled {
      font-size: 14px;
      li {

      }
      a {
        display: block;
        height: .5rem;
        line-height: .5rem;
        margin: 0 30px;
        border-radius: 8px;
        border: 1px solid #666;
        background: #1C212B;
        font-size: 20px;
        color: #f03838;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss">
  .errPage-container{
    .el-col{
      text-align: center;
    }
  }
</style>
