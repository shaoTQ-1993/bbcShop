<template lang="html">
  <div class="youlike">

  		<div class="pro-title ps_love_outer"></div>

    <ul class="pro-list clearfix">
      <li v-for="one in youLike">

        <!--<router-link :to="{name:'productDetail',params:{pro_id:one.goods_id}}" v-on:click="add(one.goods_id)">-->
        <div  v-on:click="add(one.goods_id)">
          <img :src="one.thumbnail">
          <div class="info-bar">
            <div class="tit">{{one.name}}</div>
            <span class="price" v-if="one.coupPrice > 0">{{one.coupPrice | currency}}</span>
            <span class="price" v-else>{{one.price | currency}}</span>
          </div>
        </div>
        <!--</router-link>-->
      </li>
    </ul>
  </div>

</template>


<script>
import {XHeader,Loading} from 'vux'
export default {
  data() {
    return {
      youLike: [],
    }
  },
  components: {
			XHeader,
			Loading
		},
  methods: {
    youlike() {
      var that=this;
      var url = '/rest/goodsLike/getMyLike';
      that.axios.get(url)
        .then(response => {
          that.youLike = response.data.data.goodsList;
          
        })

    },
    add(index) {
      this.$router.push({ name: 'productDetail', params: { pro_id: index } });
      this.$router.go(0);

    }
  },
  mounted() {
    this.youlike();
  },
  updated() {

  }
}
</script>

<style lang="css">
.youlike .ps_love_outer {
  background: url(../imgs/ps_maybe_love.png) no-repeat;
  background-size: 100% 100%;
  height: 1.7rem !important;
  margin: 0.72rem 0 0.72rem 0;
}

.youlike .pro-list {
  background: #fff;
  overflow: hidden;
}

.youlike .pro-list li {
  float: left;
  overflow: hidden;
  margin-top: .2rem;
  width: 50%;
  height: 7.4rem;
  position: relative;
  padding-left: 2%;
}

.youlike .pro-list li:nth-child(even) {
  padding-left: 0;
  padding-right: 0.7rem;
}

.youlike .pro-list li img {
  width: 5.2rem;
  height: 5.2rem;
  display: block;
  margin: 0 auto;
  color: #000000;
}

.youlike .pro-list li a {
  margin: 0 .5rem;
  position: relative;
  height: 100%;
  display: block;
}

.youlike .pro-list li .info-bar {
  position: absolute;
  left: 18%;
  bottom: -10%;
  height: 2.62rem;
  width: 70%;
  background: #ffffff;
  text-align: left;
}
.youlike .pro-list li:nth-child(even) .info-bar{
	left: 13%;
}
.youlike .pro-list .info-bar .tit {
  font-size: .48rem;
  height: .68rem;
  line-height: .68rem;
  margin: .2rem 0 0;
  overflow: hidden;
}

.youlike .pro-list .info-bar .price {
  font-size: 0.56rem;
  display: block;
  
}

.youlike .pro-list .info-bar .price i {
  padding-right: 0.24rem;
}
</style>
