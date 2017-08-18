<template>
	<div class="car">
		<x-header :left-options="{showBack: false}">购物车
			<em v-on:click="editCart" class="editBtn" slot="right" style="color: #ffffff; font-size: 15px ;">编辑</em>
			<em v-on:click="saveCart" style="display: none;color: #ffffff; font-size: 15px ;" class="saveBtn " slot="right">保存</em>
		</x-header>
		<scroller style="margin-top: 46px;" lock-x :height=showHeight ref="scrollerEvent">
	
			<div class="car-content">
				<div class="shopItem" v-show="hasGoods" v-for="(item,shopIndex) in shopList" v-model="shopIndex">
					<div class="shopTitle" v-on:click="shop(item.merchant.merchant_id)">
						<b></b>
						<h2>{{item.merchant.site_name}}</h2>
					</div>
	
					<!--购物车列表 sta-->
					<div class="car_list" v-for="(item, index) in item.goodsList">
						<swipeout>
							<swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
								<div slot="right-menu">
									<swipeout-button @click.native="deleteGoods(item.id)" type="warn">删除</swipeout-button>
								</div>
								<div slot="content" class="demo-content vux-1px-t">
									<div class="carItem">
										<div class="pro-check">
											<div class="checkbox">
												<input type="checkbox" v-model="selectArr" :value="index" v-on:change="selectItem(index,shopIndex)" name="cbxSelectAll">
												<div class="check-handle"></div>
											</div>
										</div>
	
										
											<img :src="item.image_default" />
											<div class="goodsInfo">
												<a href="javascript:;" v-on:click="product(item.goods_id)">
												<h3>{{item.name}}</h3>
												<h4>{{item.specs}}</h4>
												<div class="goodsInfoBottom">￥
													<em>{{item.coupPrice}}</em>
													<b>x{{item.num}}</b>
												</div>
												</a>
											</div>
										
											<div class="goodsEdit">
												<div class="count">
													<div class="count-min" @click="subtract(index,shopIndex)">-</div>
													<input id="quantity" v-model="item.num" type="text" class="count-num" />
													<div class="count-add" @click="add(index,shopIndex)">+</div>
												</div>
											</div>
										
									</div>
								</div>
							</swipeout-item>
						</swipeout>
					</div>
					<!--空购物车 sta-->
					<!--空购物车 end-->
					<!--</#if>-->
					<!--购物车列表 end-->
				</div>
				<div class="null-car" v-show="!hasGoods">
					<i class="ico"></i>
					<p>购物车空空如也!</p>
					<router-link :to="{name:'home'}" class="button">去逛逛</router-link>
				</div>
				<!--猜你喜欢-->
				<youlike></youlike>
				<!--猜你喜欢end-->
			</div>
		</scroller>
		<div class="foorer-nav1" v-show="hasGoods">
			<div class="bot-price">
				<div class="Jcheckall pro-check">
					<div class="checkbox ">
						<input type="checkbox" style="margin-right: 8px;" v-on:click="selectAll">全选
						<div class="check-handle"></div>
					</div>
	
				</div>
				<div class="JAllPrice" total="${orderPrice.goodsPrice}">￥{{totalPrice}}</div>
				<div>不含运费</div>
			</div>
			<router-link :to="{name:'accounts',params:{ids:itemid}}">
				<div v-on:click="goBuy" class=" button orange check-btn" style="line-height:45px; color: #FFFFFF;">结算</div>
			</router-link>
		</div>
	
		<foot></foot>
	</div>
</template>
<script type="text/javascript">
import headtitle from '../components/header'
import foot from '../components/footer'
import youlike from './youlike'
import { GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton, XButton, XHeader, Loading, Scroller } from 'vux'

export default {
	props: [],
	data() {
		return {
			showHeight: '',
			hasGoods: false,
			goodsList: '',
			disabled: false,
			selectArr: [],
			quantity: 0,
			totalPrice: 0.0,
			newnum: 0,
			itemPrice: 0,
			shopList: '',
			shopIndex: '',
			itemids: [],
			itemid: ''


		}
	},
	components: {
		headtitle,
		youlike,
		Scroller,
		foot,
		GroupTitle,
		Swipeout,
		SwipeoutItem,
		SwipeoutButton,
		XButton,
		XHeader,
		Loading
	},
	methods: {
		shop(index){
			this.$router.push({name:'store',params:{'storeId':index}});
			this.$router.go(0);	
			
		},
		product(index){
			this.$router.push({name:'productDetail',params:{pro_id:index}});
			this.$router.go(0);			
		},
		editCart() {
			var that = this;
			$(".goodsInfo").hide();
			$(".goodsEdit").show();
			$(".editBtn").hide();
			$(".saveBtn").show();
		},
		saveCart() {
			$(".goodsInfo").show();
			$(".goodsEdit").hide();
			$(".editBtn").show();
			$(".saveBtn").hide();
			var vm = this;
			vm.shopList.forEach(function (item, i) {
				vm.shopList[i].goodsList.forEach(function (mess) {
					var that = vm;
					that.$vux.loading.show({
						text: 'Loading'
					})
					var url = "/rest/cart/update/";
					var that = vm;
					var data = {
						id: mess.id,
						productId: mess.product_id,
						num: mess.num
					}

					that.axios.post(url, data).then(response => {
						that.$vux.loading.hide();
					})

				});

			});

		},
		carList() {
			var that = this;
			that.$vux.loading.show({
				text: 'Loading'
			})
			var url = "/rest/cart/getCart/";
			that.axios.get(url)
				.then(response => {
					that.shopList = response.data.data.cartList;
					if (that.shopList.length == 0) {
						that.hasGoods = false;
						that.showHeight = document.documentElement.clientHeight - 92 + 'px';

					}
					else {
						that.hasGoods = true;
						that.showHeight = document.documentElement.clientHeight - 138 + 'px';

					}

					that.$nextTick(() => {
						that.$refs.scrollerEvent.reset();
					});

					that.$vux.loading.hide();

				})

		},

		selectAll(event) {
			var that = this;
			console.log(event.currentTarget)
			if (!event.currentTarget.checked) {
				this.selectArr = [];
				that.totalPrice = 0;
				that.shopList.forEach(function (item, i) {

					that.shopList[i].goodsList.forEach(function (item, i) {
						that.itemids.pop(item.id);

					});

				});
			} else { //实现全选
				that.selectArr = [];
				that.totalPrice = 0;
				that.shopList.forEach(function (item, i) {

					that.shopList[i].goodsList.forEach(function (item, i) {
						that.itemids.push(item.id);

						that.selectArr.push(i);

						that.totalPrice += parseInt(item.price * item.num);

					});

				});

			}

		},
		selectItem(index, shopIndex) {

			var that = this;
			var id = that.shopList[shopIndex].goodsList[index].id;
			var isChecked = document.getElementsByName("cbxSelectAll")[index].checked;
			that.itemPrice = that.shopList[shopIndex].goodsList[index].num * that.shopList[shopIndex].goodsList[index].price;
			if (isChecked) {
				that.totalPrice += that.itemPrice;
				that.itemids.push(id);
			}
			else {
				if (that.totalPrice > 0) {
					that.totalPrice -= that.itemPrice
					that.itemids.pop(id);
				}
			}
		},
		deleteGoods(id) {
			var that = this;
			that.$vux.loading.show({
				text: 'Loading'
			})
			var url = '/rest/cart/delete/' + id;
			var that = this;
			that.axios.delete(url)
				.then(response => {
					that.carList();
				})
		},
		handleEvents(type) {

		},
		subtract(index, shopIndex) {
			var that = this;
			that.shopList[shopIndex].goodsList[index].num--;
			if (that.shopList[shopIndex].goodsList[index].num <= 0) {
				if (confirm("你确定移除该商品？")) {
					that.deleteGoods(that.shopList[shopIndex].goodsList[index].id);
				}
				else
					that.shopList[shopIndex].goodsList[index].num = 1;
			}
		},
		add(index, shopIndex) {
			var that = this;
			that.shopList[shopIndex].goodsList[index].num++;
		},
		goBuy() {
			var that = this;
			var i = 0;
			for (i = 0; i < that.itemids.length; i++) {
				that.itemid += that.itemids[i] + ",";
			}
		},
	},
	mounted() {
		this.active("#cart");
		this.carList();

	}
}
</script>
<style type="text/css">
@import "../../reset.css";
.car .null-car {
	height: 15rem;
	padding-top: 3rem;
	text-align: center;
	background-color: #EEEEEE;
}

.car .null-car .ico {
	background: url(../imgs/null1.png) no-repeat;
	width: 4.74rem;
	height: 4.74rem;
	background-size: 4.74rem auto;
	display: block;
	margin: 0 auto .68rem;
}

.car .null-car p {
	color: #999;
	font-size: .6rem;
}

.car .null-car .button {
	font-size: .6rem;
	display: inline-block;
	margin-top: 1.04rem;
	border: 1px solid #eb6100;
	color: #fff;
	background: 0 0;
	background-color: #eb6100;
	padding: 0.2rem 0.9rem;
}

.car .car_list {}

.car .car_list .carItem {


	padding: 15px 10px;
	overflow: hidden;

	background-color: #ffffff;
}

.car .carItem .pro-check {
	float: left;
	position: absolute;
	margin-top: 30px;
	width: 8%;


	height: 100%;
}

.car .carItem a {

	width: 90%;
	float: left;
	margin-left: 10px;
}

.car .carItem img {
	width: 3.6rem;
    height: 3.6rem;
    float: left;
    margin-left: 30px;
}

.car .carItem .goodsInfo {
	float: left;
	text-align: left;
	width: 8.9rem;
}

.car .goodsInfo h3 {
	font-weight: normal;
	font-size: .66rem;
}

.car .goodsInfo h4 {
	font-weight: normal;
	font-size: .36rem;
	color: #999;
}

.car .goodsInfo .goodsInfoBottom {
	bottom: 15px;
    position: absolute;
	font-size: .66rem;
	color: #eb6100;
}

.car .goodsInfoBottom b {
	font-weight: normal;
	position: absolute;
    left: 200px;
    bottom: 0px;
	color: #000000;
}

.car .foorer-nav1 {
	background-color: #EB6100;
	bottom: 1.96rem;
	position: fixed;
	z-index: 99;
	width: 100%;
}

.car .foorer-nav1 .bot-price {
	width: 8rem;
	font-size: .48rem;
	height: 45px;
	overflow: hidden;
	background-color: #FFFFFF;
	position: relative;
	text-align: center;
	display: inline-block;
	float: left;
	border-top: 1px #eeeeee solid;
}

.car.foorer-nav1.car .bot-price em {
	color: #ffffff;
}

.car .Jcheckall {
	position: absolute;
	left: .8rem;
	top: 50%;
	margin-top: -0.15rem;
	width: 80px;

	text-align: left;
}

.car .foorer-nav1 .bot-price .JAllPrice {
	color: #eb6100;
	font-size: .72rem;
	height: .82rem;
	line-height: 1.1rem;
	padding-right: .36rem;
	text-align: right;
	margin-top: 3px;
}

.car .foorer-nav1 .bot-price .JAllPrice+div {
	line-height: .7rem;
	padding-right: .36rem;
	text-align: right;
}

.car .header {
	height: 2rem;
	background-color: #ffffff;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 99;
	line-height: 2rem;
	font-size: 18px;
	border-bottom: 1px #EEEEEE solid;
	padding-right: 20px;
	text-align: center;
}

.car .header span {
	margin-left: 20px;
}

.car .header em {
	height: 2rem;

	line-height: 2rem;
	font-size: 15px;
	float: right;
}

.car .carItem .goodsEdit {

	float: left;
	text-align: left;
	width: 8.9rem;
}

.car .goodsEdit {
	display: none;
}

.car .goodsEdit .count {
	border: 1px #EEEEEE solid;
    height: 1.6rem;
    margin-left: 10px;
    margin-top: 25px;
}

.car .goodsEdit .count-num {
	width: 5.44rem;
	height: 1.2rem;
	text-align: center;
	font-size: .6rem;
	color: #232323;
	border: none;
	margin: 0;
}

.car .count .count-min,
.count-add {

	font-size: 1rem;
	color: #232323;
	text-align: center;
	width: 30px;
	display: inline-block;
}

.car .shopTitle {
	padding: 5px 15px;
}

.car h2 {
	text-align: left;
	display: inline-block;
	font-size: 15px;
	float: left;
	font-weight: normal;
}

.car .shopTitle b {
	display: inline-block;
	width: 18px;
	height: 18px;
	background: url(../imgs/shop.png);
	background-repeat: no-repeat;
	-webkit-background-size: 100%;
	background-size: 100%;
	float: left;
	margin-right: 10px;
}
</style>