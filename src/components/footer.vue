<template>
  <div class="foorer-nav">
    <span id="home" class='active'>
      <router-link to="/m/home">
        <i class="ficon home3"></i>
        <div>首页</div>
      </router-link>
    </span>
    <span id="category">
      <router-link to="/m/category">
        <i class="ficon home2"></i>
        <div>分类</div>
      </router-link>
    </span>
    <!--<span id="discovery"> <router-link to="/m/discovery"><i class="ficon home1"></i><div>发现</div></router-link></span>-->
    <span id="cart">
      <router-link to="/m/cart">
        <i class="ficon home4"></i>
        <div>购物车</div>
      </router-link>
    </span>
    <span id="myself">
      <router-link to="/m/myself">
        <i class="ficon home5"></i>
        <div>我的</div>
      </router-link>
    </span>
  </div>
</template>


<script>
import jquery from '../../static/js/jquery-1.8.1.js'
export default {
  methods: {

  },
  mounted() {
    $(".foorer-nav span").each(function () {
      $(this).click(function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
      });
    });
  }

}
</script>

<style>
/*footer的样式*/

.foorer-nav {
  display: -webkit-box;
  /*display: box;*/
  position: fixed;
  left: 0;
  bottom: 0;
  height: 2rem;
  line-height: 0;
  width: 100%;
  z-index: 2;
  background-color: #fff;
  border-top: 1px solid #eee;
}

.foorer-nav a {
  width: 100%;
  height: 100%;
  display: inline-block;
}

.foorer-nav>span {
  border-radius: 0;
  padding: 0 !important;
  height: 1.96rem;
  position: relative;
  -webkit-box-flex: 1;
  box-flex: 1;
  display: block;
  color: #777;
  text-align: center;
}

.foorer-nav#foorer-nav>span {
  line-height: 0;
}

.foorer-nav>span.active {
  color: #fd3c2b;
}

.foorer-nav .ficon {
  margin-top: .2rem;
  display: inline-block;
  width: .7rem;
  height: 0.9rem;
}

.foorer-nav+.foorer-nav1 {
  bottom: 1.96rem;
  box-shadow: none;
}

article+.foorer-nav1 {
  bottom: 0;
}

.foorer-nav>span.button {
  line-height: 1.96rem;
  color: #fff;
}

.foorer-nav1 .bot-price {
  width: 6.22rem;
}

.foorer-nav .ficon {
  background-image: url(../imgs/footer-ico.png);
  background-size: 8.6rem auto;
  height: 1rem;
}

.ficon.home1 {
  width: 1.01rem;
  background-position: -3.8rem 0.1rem;
}

.ficon.home2 {
  width: 1rem;
  background-position: -1.8rem -0.00rem;
}

.ficon.home3 {
  width: 1rem;
  background-position: 0rem -0rem;
}

.ficon.home4 {
  width: 1rem;
  background-position: -5.85rem 0rem;
}

.ficon.home5 {
  width: 1rem;
  background-position: -7.6rem 0.03rem;
}

.foorer-nav .active .home1 {
  background-position: -3.8rem -1.4rem;
}

.foorer-nav .active .home2 {
  background-position: -1.8rem -1.4rem;
}

.foorer-nav .active .home3 {
  background-position: 0rem -1.4rem;
}

.foorer-nav .active .home4 {
  background-position: -5.85rem -1.4rem;
}

.foorer-nav .active .home5 {
  background-position: -7.6rem -1.4rem;
}

.foorer-nav div {
  font-size: .36rem;
  line-height: 1;
  margin-top: 0.12rem;
  color: #333;
}

.foorer-nav .active div {
  color: #eb6100;
}
</style>
