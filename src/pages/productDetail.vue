<template>
  <div class="product-detail">
  	<x-header style="background-color: #eb6100;">商品详情</x-header>
  	
    <div class="ps-detail-content1">
		<scroller style="margin-top: 46px;" lock-x :height=showHeight ref="scrollerEvent">
				<div class="block">
		      <!--商品详情图片-->
		      <div class="swiper-container ps_pro_img">
		        <div class="swiper-wrapper">
		          <div class="swiper-slide"
		               v-for="img in pro_detail.galleryList">
		            <img :src="img.big"
		                 class="swiper_img" />
		          </div>
		        </div>
		        <div class="swiper-pagination"></div>
		      </div>
		      <!--商品详情图片over-->
		      <!--详情标题价格-->
		      <div class="detail-con wbox">
		        <div class="title-wrap wbox-flex">
		          <h1>{{pro_detail.name}}</h1>
		          <div class="text-info clearfix">
		            <div class="price fl">￥{{pro_detail.price}}</div>
		            <div class="other-price fl"></div>
		            <div class="label-wrap fl">
		            </div>
		          </div>
		        </div>
		      </div>
		      <!--详情标题价格over-->
		      <!--商品详情-->
		      <div class="main-det-con">
		        <div class="pro-parameter">
		          <div class="bd">
		            <dl class="clearfix">
		              <dt><div id="goodsIntro"></div></dt>
		            </dl>
		          </div>
		        </div>
		        <!--商品图文介绍 sta-->
		        <div class="detail-content">
		          <p style="text-align: center;"
		             v-for="img in pro_detail.galleryList">
		            <img :src="img.small">
		          </p>
		        </div>
		      </div>
		      <!--商品详情end-->
		      <!--猜你喜欢-->
		      <youlike></youlike>
      	</div>
      </scroller>
     
      <!--猜你喜欢end-->
      <!--购物车导航栏-->
      <!--<group :title="$t('Use as a plugin')">-->
      <!--<cell :title="$t('will auto close in 3s')" @click.native="showPluginAuto" is-link></cell>-->
      <!--</group>-->
  
      <div class="foorer-nav">
        <input type="hidden"
               name="goods_id"
               value="1">
        <a href="javascript:;"
           class="footer-car" v-on:click="shop(shopId)"><em><span class="count" style="display: none;">0</span></em>店铺</a>
        <!--<a href="javascript:;"
           class="footer-car" v-on:click="cart"><em><span class="count" style="display: none;">0</span></em>关注</a>-->
        <template>
          <div class="watch_out">
            <group>
              <i class="attion_pic"></i>
              <i v-show="isFavorite"   class="attion_pic1"></i>
              <cell title="关注"
                    @click.native="showPluginAuto"
                    is-link
                    class="pro-attention act"></cell>
            </group>
          </div>
        </template>

        <!--<a href="javascript:;" class="pro-attention act" ><i class="attion_pic"></i>关注</a>-->
        <a href="javascript:;"
           class="footer-car" v-on:click="cart"><i ><span class="count" style="display: none;">0</span></i>购物车</a>
        <a href="javascript:;"
           class="button orange JinCar"  v-on:click="showCar(40)">加入购物车</a>
        <div v-if="show" class="car_shadow">
								<div class="shadow_cont">
									<div class="shadow_title">
										<a v-on:click="show = false;counte = 1" class="close_btn"></a>
										<p>{{chooseProduct.name}}</p>
									<!--	<span v-if='goodsInfo.coupPrice > 0'>{{pro_detail.coupPrice | currency}}</span>-->
										<span>{{chooseProduct.price}}</span>
									</div>
									<div class="shadow_spec">
										<!--<p v-for="spec in goodsInfo.specList" class="sp">
												<label>{{spec.spec_name}} ： </label>
												<span v-for="sp in spec.valueList" v-bind:value="sp.spec_value_id" v-on:click="changeClass($event,'act')">{{sp.spec_value}}</span>
										</p>-->
										<p v-for="spec in pro_detail.specList" class="sp">
											<label>颜色 ： </label>
											<span v-for="sp in spec.valueList" v-bind:value="sp.spec_value_id" v-on:click="changeClass($event,'act')">{{sp.spec_value}}</span>
										</p>
										<p class="g_num">
											<label>数量 ：</label>
											<span>
												<em v-if="counte > 0" v-on:click="counte -= 1">-</em>
												<em v-else class="act">-</em>
												<i>{{counte}}</i>
												<em v-if="counte < pro_detail.store" v-on:click="counte += 1">+</em>
												<em v-else class="act">+</em>
											</span>
										</p>
									</div>
									<a v-on:click="addCar(chooseProduct.product_id)" class="addCar">加入购物车</a>
								</div>
							</div>
							<!--购物车弹窗  end-->
      </div>
    </div>
<!--  </scroller>-->
  </div>
</template>
<script type="text/javascript">
import youlike from './youlike'
import { Alert, Group, XSwitch,Scroller,Loading,XHeader, Cell, TransferDomDirective as TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  data() {
    return {
      id: '',
      pro_detail: [],
      data:'',
      show: false,
      counte: 1,
      isFavorite:'',
      showHeight:'',
      shopId:'',
      productList:'',
      chooseProduct:''
      
    }
  },
  components: {
    youlike,
    Alert,
    Group,
    XSwitch,
    Cell,
    Loading,
    XHeader,
    Scroller,
    
  },
  methods: {
    productlist(id) {
    	var that=this;
				that.$vux.loading.show({
								text: 'Loading'
							})
    	var url = '/rest/goods/'+id;
				that.axios.get(url)
					.then(response => {
				
						that.pro_detail = response.data.data;
						that.productList = response.data.data.productList;
						that.data=that.pro_detail.intro;			
						that.isFavorite=that.pro_detail.isFavorite;
						$('#goodsIntro').html(that.data);	
						that.shopId=response.data.data.merchant_id;
						that.showHeight = document.documentElement.clientHeight-46+'px';
						that.$nextTick(() => {
							that.$refs.scrollerEvent.reset();
						});
						that.$vux.loading.hide();
					});
//				that.deleteFav();
    },
//  deleteFav(){
//  		var that = this;
//			var url = '/rest/collection/deleteFav/' + 38;
//			var that = this;
//			that.axios.delete(url)
//				.then(response => {
//					console.log(response);
//				})
//  	},
    shop(index){
    	this.$router.push({name:'store',params:{'storeId':index}});
			this.$router.go(0);
    },
    cart(){
    	this.$router.push({ name: 'cart'});
			this.$router.go(0);
    },
    showCar(goodsId) {
					this.show = true;
					this.chooseProduct = this.productList[this.productList.length - 1];
								
				},
				//显示弹窗
		addCar(product_id) {
					var that=this;
						that.$vux.loading.show({
										text: 'Loading'
									})
					this.show = false;
					var url = "/rest/cart/add";

					var data = {
						productId: product_id,
						num: that.counte,
					}
					that.axios.post(url, data).then(response => {
						this.$vux.alert.show({
			       		title: '',
			        	content: '加入购物车成功',
			    		});
			    	that.$vux.loading.hide();
					})
		},
		//弹出框里，商品加入购物车
		changeClass(event, className) {
			var this_ = event.currentTarget;
			$(this_).addClass(className).siblings().removeClass(className);
			//弹窗商品规格样式切换

			var val = $(this_).attr("value");
			for (var i = 0; i < this.productList.length; i++) {
				var specList = this.productList[i].specList;
				for (var j = 0; j < specList.length; j++) {
					if (specList[j].spec_value_id == val) {
						this.chooseProduct = this.productList[i];
						break;
					}
				}
			}
			//找到当前选择的产品

		},
		//弹窗商品规格样式切换
		
    showPluginAuto() {
    		var collection;
    		if(this.isFavorite)
    			collection='取消关注';
    		else
    			collection='关注成功';
	      this.$vux.alert.show({
	        title: '',
	        content: collection,
	      });
	      setTimeout(() => {
	        this.$vux.alert.hide()
	      }, 1000)
	      var url = '/rest/collection/collect';
	      var that = this;
	      var data = {
	        goodsId: that.id
	        
	      }
	      that.axios.post(url, data).then(response => {
	      });
      
      that.productlist(that.id)

    }

  },
  mounted() {
  	
    this.id = this.$route.params.pro_id;
    this.productlist(this.id);
  },
  updated() {
  	
    var mySwiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      autoplay: 3000,
      speed: 1000,
      loop: true,
    });
  }
}
</script>
<style>
.ps-detail-content1{

}
/*商品详情图片*/

.product-detail .ps_pro_img .swiper-wrapper img {
  height: 10rem;
  width: 350px;
}
/*商品价格名字*/

.product-detail .detail-con {
  color: #232323;
  padding: .8rem .64rem .88rem .64rem;
  text-align: left;
}

.product-detail .detail-con .title-wrap h1 {
  font-size: .64rem;
  color: #232323;
}

.product-detail .detail-con .title-wrap h2 {
  -webkit-line-clamp: 1;
  font-size: .52rem;
  line-height: 1.26;
  color: #999;
}

.product-detail .detail-con .title-wrap .text-info {
  padding-top: .54rem;
  height: 1.2rem;
  line-height: .66rem
}

.product-detail .detail-con .title-wrap .text-info .price {
  font-size: 1rem;
  line-height: .64rem;
  text-indent: -.12rem
}

.product-detail .detail-con .title-wrap .text-info .other-price {
  text-decoration: line-through;
}

.product-detail .detail-con .title-wrap .original-price {
  height: 1.14rem;
  font-size: .72rem;
  color: #999;
  line-height: .84rem;
  margin-top: .36rem;
  border-bottom: 0.04rem solid #eee;
}





/*商品详情图片*/

.product-detail .main-det-con {
  position: relative;
  background-color: #eee;
  padding-bottom: 0.3rem;
}

.product-detail .pro-parameter {
  overflow: hidden;
  text-align: left;
}

.product-detail .pro-parameter .bd {
  padding: 1.08rem .52rem 1.12rem;
  background: #fff;
  border-top: .12rem solid #eee;
  border-bottom: .12rem solid #eee;
  color: #999;
  font-size: .48rem
}

.product-detail .pro-parameter dt {
  font-size: .52rem;
  width: 100%;
  /*float: left;*/
  /*padding-bottom: .36rem*/
}

.product-detail .detail-content p img {
  display: block;
  width: 100%;
}





/*底部导航栏购物车*/

.product-detail .foorer-nav>a,
.product-detail .foorer-nav .watch_out {
  border-radius: 0;
  padding: 0!important;
  height: 1.96rem;
  position: relative;
  -webkit-box-flex: 1;
  box-flex: 1;
  display: block;
  color: #777;
  text-align: center;
  font-size: 0.6rem;
}

.product-detail .foorer-nav>a {
  line-height: 3rem;
  width: 8%;
}

.product-detail .foorer-nav .button {
  width: 5.72rem;
  line-height: 1.96rem;
  color: #fff;
}

.product-detail i.attion_pic {
  position: absolute;
  left: 33%;
  content: '';
  width: 30px;
  height: 30px;
  background: url(../imgs/like1.png) no-repeat;
  margin-top: -2px;
}
.product-detail i.attion_pic1 {
  position: absolute;
  left: 33%;
  content: '';
  width: 30px;
  height: 30px;
  background: url(../imgs/like.png) no-repeat;
  margin-top: -2px;
}

.product-detail .footer-car {
  width: 2.36rem;
  height: 1.96rem;
  border-width: 0.04rem;
  /*border-style: solid;*/
  border-color: rgba(153, 153, 153, 0.3);
  border-top: 0;
  border-bottom: 0;
}

.product-detail .footer-car i {
  width: .9rem;
  height: .9rem;
  /* background-position: 0 -3.94rem; */
  position: absolute;
  top: 0.6rem;
  left: 50%;
  margin: -.44rem 0 0 -.42rem;
  background: url(../imgs/cart_pic.png) no-repeat;
  background-size: cover;
}
.product-detail .footer-car em {
  width: .9rem;
  height: .9rem;
  /* background-position: 0 -3.94rem; */
  position: absolute;
  top: 0.6rem;
  left: 50%;
  margin: -.44rem 0 0 -.42rem;
  background: url(../imgs/shop.png) no-repeat;
  background-size: cover;
}

.product-detail .orange {
  background-color: #eb6100 !important;
}





/*关注*/

.product-detail .weui-cell__ft {
  display: none !important;
}

.product-detail .weui-dialog__ft {
  display: none !important;
}

.product-detail .weui-dialog {
  width: 40%;
}

.product-detail .weui-cell {
  padding: 0;
}

.product-detail .weui-cells:before,
.product-detail .weui-cell:before {
  border: none !important;
}

.product-detail .weui-cells:after {
  border: none !important;
}

.product-detail .vux-label {
  text-align: center;
}

.product-detail .vux-label {
  margin-top: 0.8rem;
  color: #777;
  margin-left: 2px;
}
.product-detail .swiper-pagination-bullet-active{
	background-color: #EB6100;
}
.product-detail .car_shadow {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .6);
		z-index: 999;
	}
	
.product-detail .shadow_cont {
		background-color: #fff;
		width: 80%;
		margin-left: auto;
		margin-right: auto;
		position: absolute;
    top: 165px;
    left: 38px;
	}
	
 .product-detail .shadow_cont .shadow_title {
		position: relative;
		padding: 0 .96rem;
		margin-bottom: 1.4rem;
		border-bottom: 1px solid #cccccc;
		text-align: left;
	}
	
 .product-detail .shadow_cont .shadow_title p {
		padding-top: 1.04rem;
		font-size: 0.6rem;
	}
	
.product-detail	 .shadow_cont .shadow_title span {
		height: 1.2rem;
		padding-top: .5rem;
		line-height: .76rem;
		margin-bottom: 0.54rem;
		font-size: .96rem;
		color: #eb6100;
		line-height: .64rem;
		margin-left: -0.12rem;
		display: block;
	}
	
.product-detail	 .shadow_cont .shadow_title .close_btn {
		position: absolute;
		top: .6rem;
		right: .4rem;
		width: .48rem;
		height: .48rem;
		display: block;
		background: url(../imgs/pop-close.png) no-repeat;
		background-size: .48rem auto;
		margin: -0.24rem 0 0 -0.24rem;
	}
	
.product-detail	 .shadow_cont .shadow_spec {
		text-align: left;
    padding: 0 1.96rem 0.00rem .96rem;
	}
	
.product-detail	 .shadow_cont .shadow_spec p.sp {
		padding-bottom: 1rem;
		overflow: hidden;
	}
	
.product-detail	 .shadow_cont .shadow_spec p.sp label {
		display: block;
		width: 2.48rem;
		-webkit-box-flex: 1;
		font-size: 0.48rem;
	}
	
.product-detail	 .shadow_cont .shadow_spec p.sp span {
		display: inline-block;
		font-size: .48rem;
		height: 1rem;
		padding: 0 .26rem;
		min-width: 2rem;
		text-align: center;
		line-height: 1rem;
		display: inline-block;
		float: left;
		margin-right: .4rem;
		margin-bottom: 0.2rem;
		border: 1px solid #ccc;
	}
	
.product-detail	 .shadow_cont .shadow_spec p.sp span.act {
		border-color: #eb6100;
		background: #eb6100;
		color: #ffffff;
	}
	
.product-detail	 .shadow_cont .shadow_spec p.g_num label {
		width: 2.48rem;
		-webkit-box-flex: 1;
		font-size: 0.48rem;
		display: block;
	}
	
.product-detail	 .shadow_cont .shadow_spec p.g_num span {
		overflow: hidden;
		display: block;
		margin-bottom: 2rem;
	}
	
.product-detail	 .shadow_cont .shadow_spec p.g_num span i {
		font-style: normal;
		color: #232323;
		box-shadow: none;
		float: left;
		width: 1rem;
		height: 1rem;
		line-height: 1rem;
		font-size: .6rem;
		border: 1px solid #999;
		background: #FFF;
		text-align: center;
		margin: 0 .08rem;
		border-radius: 0;
	}
	
.product-detail	 .shadow_cont .shadow_spec p.g_num span em {
		float: left;
		display: inline-block;
		width: 1rem;
		height: 1rem;
		background: #999;
		text-align: center;
		color: #fff;
		line-height: 1rem;
	}
	
.product-detail	 .shadow_cont .shadow_spec p.g_num span em.act {
		background-color: #ccc;
	}
	
.product-detail	 .shadow_cont a.addCar {
		width: 100%;
		padding: 0 .3rem;
		line-height: 1.76rem;
		font-size: 0.64rem;
		color: #fff;
		background: #eb6100;
		display: inline-block;
		border: none;
		cursor: pointer;
		text-align: center;
		
		bottom: 0;
		left: 0;
	}


</style>
