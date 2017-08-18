<template>
	<div class="collection">
		<div class="block">
			<x-header>我的收藏</x-header>
			
			<!--购物车    -->
			<div v-if="show" class="car_shadow">
				<div class="shadow_cont">
					<div class="shadow_title">
						<a v-on:click="show = false" class="close_btn"></a>
						<p>{{chooseProduct.name}}</p>
						<span v-if='goodsInfo.coupPrice > 0'>{{chooseProduct.coupPrice | currency}}</span>
						<span v-else>{{chooseProduct.price | currency}}</span>
					</div>
					<div class="shadow_spec">
						<p v-for="spec in goodsInfo.specList" class="sp">
							<label>{{spec.spec_name}} ： </label>
							<span v-for="sp in spec.valueList" v-bind:value="sp.spec_value_id" v-on:click="changeClass($event,'act')">{{sp.spec_value}}</span>
						</p>
						<p class="g_num">
							<label>数量 ：</label>
							<span>
								<em v-if="counte > 0" v-on:click="counte -= 1">-</em>
								<em v-else class="act">-</em>
								<i>{{counte}}</i>
								<em v-if="counte < chooseProduct.store" v-on:click="counte += 1">+</em>
								<em v-else class="act">+</em>
							</span>
						</p>
					</div>
					<a v-on:click="addCar(chooseProduct.product_id)" class="addCar">加入购物车</a>
				</div>
			</div>
			<!--商品列表 sta-->
	
		<!--	<scroller  style="margin-top: 46px;" lock-x scrollbar-y :height=showHeight ref="scroller" >-->
				<div>
				<div class="active_block" v-show="hasGoods">
					<ul class="go-list">
						<li v-for="goods in collection_list">
							<!--商品详情 sta-->
							<router-link :to="{name:'productDetail',params:{pro_id:goods.goods_id}}" class="del-items">
								<div class="go-item">
									<img v-bind:src="goods.thumbnailShow" />
									<div class="info_bar">
										<div class="tit">{{goods.name}}</div>
										<div class="price" v-if="goods.coupPrice > 0">{{goods.coupPrice | currency}}</div>
										<div class="price" v-else>{{goods.price | currency}}</div>
									</div>
								</div>
							</router-link>
							<!--商品详情 end-->
							<!--购物车弹窗 start-->
							<a href="#" class="car" v-on:click="showCar(goods.goods_id)">
								<i></i>
							</a>
							<!--<a href="#" v-if="goods.store==0" class="car"><i></i></a>-->
							
							<!--购物车弹窗 end-->
						</li>
					</ul>
				</div>
				<div  class="null-car" v-show="!hasGoods">
					<i class="ico"></i>
					<p>没有任何收藏!</p>
					<router-link :to="{name:'home'}" class="button">去逛逛</router-link>
					
				</div>
				<youlike></youlike>
				</div>
		<!--	</scroller>-->
			<!--商品列表 end-->
		</div>
	
	</div>
</template>
<script type="text/javascript">
import { XHeader, Scroller } from 'vux'
import youlike from '.././youlike'
export default {

	data() {
		return {
			collection_list: [],
			goodsInfo: [],
			productList: [],
			chooseProduct: [],
			show: false,
			counte: 1,
			showHeight: "",
			hasGoods:false,

		}
	},
	components: {
		XHeader,
		Scroller,
		youlike
	},
	methods: {
		collection() {
			var that = this;
			var url = '/rest/collection/collectionList/1';
			that.axios.get(url).then(response => {
				
				that.collection_list = response.data.data.favoriteList;
				var count=response.data.data.totalCount;
				
				if (count == 0) {						
						that.hasGoods = false;
					}
				else {						
						that.hasGoods = true;
					}
				that.showHeight = document.documentElement.clientHeight - 46 + 'px';
				
//				that.$nextTick(() => {
//					that.$refs.scroller.reset()
//				})
			});
//			that.deleteFav();

		},
		//商品列表排列方式切换
 		
		showCar(goodsId) {
			this.show = true;
			var url = "/rest/goods/" + goodsId;
			var that = this;
			that.axios.get(url).then(response => {
				that.gooodsInfo = response.data.data;
				that.productList = response.data.data.productList;
				
				that.chooseProduct = response.data.data.productList[that.productList.length - 1];
				

			})
		},
		//显示弹窗

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

		addCar(product_id) {
			/*alert(goodsId);*/
			this.show = false;
			var url = "/rest/cart/add";
			var that = this;
			var data = {
				productId: product_id,
				num: that.counte,
			}
			that.axios.post(url, data).then(response => {
				alert(res.message);
			})
		},
		//弹出框里，商品加入购物车

	},
	mounted() {
		
		this.collection();

	}
}
</script>
<style>
.collection .null-car {
	height: 15rem;
	padding-top: 3rem;
	text-align: center;
	background-color: #EEEEEE;
}

.collection .null-car .ico {
	background: url(../../imgs/collection.png) no-repeat;
	width: 4.74rem;
	height: 4.74rem;
	background-size: 4.74rem auto;
	display: block;
	margin: 0 auto .68rem;
}

.collection .null-car p {
	color: #999;
	font-size: .6rem;
}

.collection .null-car .button {
	font-size: .6rem;
	display: inline-block;
	margin-top: 1.04rem;
	border: 1px solid #eb6100;
	color: #fff;
	background: 0 0;
	background-color: #eb6100;
	padding: 0.2rem 0.9rem;
}
.collection .block ul.com-nav {
	position: absolute;
	top: 1.76rem;
	left: 0;
	right: 0;
	display: flex;
	background: #fff;
	border-bottom: 0.08rem solid #eeeeee;
	line-height: 1.32rem;
	height: 1.32rem;
}

.collection .block ul.com-nav>li {
	text-align: center;
	display: block;
	-webkit-flex: 1!important;
	-webkit-box-flex: 1;
}

.collection .block ul.com-nav>li>a {
	font-size: .56rem;
	color: #232323;
	display: inline-block;
	position: relative;
	line-height: 1.32rem;
	height: 1.32rem;
}

.collection .block ul.com-nav>li.active>a {
	color: #eb6100;
}

.collection .block ul.com-nav>li>a>i {
	position: relative;
	width: .4rem;
	height: .46rem;
	display: inline-block;
	margin-left: .12rem;
	top: 0.06rem;
}

.collection .block ul.com-nav>li>a>i:before {
	background: url(../../imgs/ico_sort.png) no-repeat;
	background-size: 100% auto;
	position: absolute;
	left: 0;
	content: '';
	display: inline-block;
	width: .4rem;
	height: 0.2rem;
	bottom: 0;
	background-position: 0 -0.98rem;
}

.collection .block ul.com-nav>li>a>i.down:before {
	background-position: 0 bottom;
}

.collection .block ul.com-nav>li>a>i:after {
	background: url(../../imgs/ico_sort.png) no-repeat;
	background-size: 100% auto;
	position: absolute;
	left: 0;
	content: '';
	display: inline-block;
	width: .4rem;
	height: 0.2rem;
	top: 0;
	background-position: 0 0;
}

.collection .block ul.com-nav>li>a>i.up:after {
	background-position: 0 -0.48rem;
}

.collection .block article.active_block {
	visibility: visible;
	display: block;
	z-index: 1;
	top: 0;
	width: 100%;
	bottom: 2rem;
	position: absolute;
	box-sizing: border-box;
	background-color: #eee;
}

.collection .block article.active_block p.null-txt {
	font-size: .6rem;
	color: #999;
	text-align: center;
}
.active_block i.null-addr {
	width: 4.8rem;
	height: 4rem;
	background: url(../../imgs/ps_gray_logo.png) no-repeat;
	background-size: 4.8rem auto;
	display: block;
	margin: 4.4rem auto 1.34rem;
}

.active_block .go-list {
	margin-bottom: 2rem;
	margin-top: 46px;
}
.active_block .go-list li {
	height: 7.16rem;
	position: relative;
	background: #fff;
	border-top: 1px solid #f1f1f1;
}

.active_block a.del-items {
	display: block;
	padding: 1.2rem .66rem 0;
	height: 7.16rem;
	position: relative;
	
}
.active_block a.car {
	width: 1.76rem;
	height: 1.76rem;
	background: url(../../imgs/cart_pic1.png) no-repeat;
	background-position: 6px 7px;
	background-size: 1.1rem;
	display: inline-block;
	position: absolute;
	top: 4.4rem;
	right: 1.2rem;
	border: 2px solid #FD4433;
	background-color: #FD4433;
	border-radius: 1rem;
}

.collection .car_shadow {
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, .6);
	position: fixed;
	z-index: 99;
}

.collection .car_shadow .shadow_cont {
	position: absolute;
	background-color: #fff;
	width: 80%;
	margin-top: 190px;
    margin-left: 10%;
}

.vux-header {
	background-color: rgb(235, 97, 0);
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	z-index: 99;
}

.collection .vux-header .vux-header-left a {
	color: white;
}

.collection .vux-header .vux-header-left .left-arrow:before {
	content: "";
	position: absolute;
	width: 12px;
	height: 12px;
	border: 1px solid white;
	border-width: 1px 0 0 1px;
	-webkit-transform: rotate(315deg);
	transform: rotate(315deg);
	top: 8px;
	left: 7px;
}

.collection .shadow_cont .shadow_title {
	position: relative;
	padding: 0 .96rem;
	margin-bottom: 1.4rem;
	border-bottom: 1px solid #cccccc;
	text-align: left;
}

.collection .shadow_cont .shadow_title p {
	padding-top: 1.04rem;
	font-size: 0.6rem;
}

.collection .shadow_cont .shadow_title span {
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

.collection .shadow_cont .shadow_title .close_btn {
	position: absolute;
	top: .6rem;
	right: .4rem;
	width: .48rem;
	height: .48rem;
	display: block;
	background: url(../../imgs/pop-close.png) no-repeat;
	background-size: .48rem auto;
	margin: -0.24rem 0 0 -0.24rem;
}

.collection .shadow_cont .shadow_spec {
	text-align: left;
	padding: 0 .96rem 1.76rem .96rem;
}

.collection .shadow_cont .shadow_spec p.sp {
	padding-bottom: 1rem;
	overflow: hidden;
}

.collection .shadow_cont .shadow_spec p.sp label {
	display: block;
	width: 2.48rem;
	-webkit-box-flex: 1;
	font-size: 0.48rem;
}

.collection .shadow_cont .shadow_spec p.sp span {
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

.collection .shadow_cont .shadow_spec p.sp span.act {
	border-color: #eb6100;
	background: #eb6100;
	color: #ffffff;
}

.collection .shadow_cont .shadow_spec p.g_num label {
	width: 2.48rem;
	-webkit-box-flex: 1;
	font-size: 0.48rem;
	display: block;
}

.collection .shadow_cont .shadow_spec p.g_num span {
	overflow: hidden;
	display: block;
	margin-bottom: 2rem;
}

.collection .shadow_cont .shadow_spec p.g_num span i {
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

.collection .shadow_cont .shadow_spec p.g_num span em {
	float: left;
	display: inline-block;
	width: 1rem;
	height: 1rem;
	background: #999;
	text-align: center;
	color: #fff;
}

.collection .shadow_cont .shadow_spec p.g_num span em.act {
	background-color: #ccc;
}

.collection .shadow_cont a.addCar {
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
	position: absolute;
	bottom: 0;
	left: 0;
}

.active_block .go-item {
	background: #fff;
	padding: 0 .56rem 0 0;
	position: relative;
	height: 4.72rem;
}

.active_block .go-item>img {
	width: 5.8rem;
	height: 5.8rem;
	position: relative;
	top: -.54rem;
	float: left;
}
.active_block .go-item .info_bar {
	background: #fff;
	color: #000;
	width: 6.64rem;
	float: right;
}

.active_block .go-item .info_bar .tit {
	font-size: .64rem;
	display: -webkit-box;
	height: 1.76rem;
	line-height: .9rem;
	margin-top: .56rem;
	text-align: left;
}

.active_block .go-item .info_bar .price {
	margin-top: 1.7rem;
	margin-left: -.16rem;
	text-align: left;
	font-size: .96rem;
}
</style>