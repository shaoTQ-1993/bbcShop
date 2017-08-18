<template>
  <div id="app">
    <router-view></router-view>
    <!--<div class="foorer-nav">
            <span id="home" class='active'> <router-link to="/m/home"><i class="ficon home3"></i><div>首页</div></router-link></span>
            <span id="category"> <router-link to="/m/category"><i class="ficon home2"></i><div>分类</div></router-link></span>-->
    <!--<span id="discovery"> <router-link to="/m/discovery"><i class="ficon home1"></i><div>发现</div></router-link></span>-->
    <!--<span id="cart"> <router-link to="/m/cart"><i class="ficon home4"></i><div>购物车</div></router-link></span>
            <span id="myself"> <router-link to="/m/myself"><i class="ficon home5"></i><div>我的</div></router-link></span>
          </div>-->
  </div>
</template>


<script>
import jquery from '../static/js/jquery-1.8.1.js'

export default {
  name: 'app',
  components: {

  },
  created: function () {
      // this.$router.push('/m/home'); // 页面加载时跳转
  },
  methods: {

  },
  mounted() {

  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
