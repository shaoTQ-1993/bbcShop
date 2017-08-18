<template>
	<div class="order">
		<x-header style="background-color: #eb6100;">我的订单</x-header>
	
		<div class="ps-detail-content">
			<div>
				<tab :line-width=2 active-color='red' v-model="index">
					<tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in tabList" @click.native="onClickTab(index)" :key="index">{{item}}</tab-item>
				</tab>
			</div>
			<scroller style="background-color: #eee" lock-x scrollbar-y use-pulldown :height=showHeight @on-pulldown-loading="load3" ref="scroller" v-model="status2">
				<!--content slot-->
				<div class="box2">
					<p v-for="item in result">
						<ul class="com-list order1">
							<li class="ord-hd" style="border:0;text-align: left; padding: 0.2rem 0.52rem; overflow: hidden;">
								<div class="shopTitle fl" v-on:click="shop(item.order.merchant_id)">
									<em></em>{{item.merchantSite.site_name}}
								</div>
								<a style="display: block; float: right;">
									<span style="font-size:.5rem;color:gray;">订单号：{{item.order.sn}}
										<!-- -0 -->
									</span>
									<span class="label order-status">{{item.order.orderStatus}}</span>
								</a>
							</li>
							<li class="order-item" v-for="i in item.orderItemList" v-on:click="orderInfo(item.order.sn)">
								<a style="padding-top: 0;padding-bottom: .6rem;">
									<div class="wbox">
										<div class="pro-img">
											<img :src="i.image">
										</div>
										<div class="pro-info wbox-flex">
											<div class="wbox" style="text-align: left;">
												<div class="tit wbox-flex" style="width: 9rem;color: #232323;font-size: .56rem;">{{i.name}}</div>
												<div class="price">￥{{i.price}}</div>
											</div>
	
											<div class="wbox color-line">
												<div class="style wbox-flex" style="color:#999!important">
													<span>
														<em>{{i.specs}}</em>
													</span>
												</div>
											</div>
	
											<div class="num fr">X{{i.num}}</div>
	
										</div>
									</div>
								</a>
							</li>
	
							<li class="ordfd wbox">
								<div class=" wbox-flex" style="text-align: left;font-size: .55rem;">下单时间：{{item.order.create_time}}</div>
								<div class="">
									<a href="javascript:;" class="button gray cancelOrder-btn" sn="8939800715193">取消订单</a>
									<a href="javascript:;" class="button goPay-btn" sn="8939800715193" cpsn="8939800715193">立即付款</a>
									<!--  -->
								</div>
							</li>
	
						</ul>
					</p>
				</div>
	
				<!--pulldown slot-->
				<div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
					<span v-show="status2.pulldownStatus === 'default'"></span>
					<span class="pulldown-arrow" v-show="status2.pulldownStatus === 'down' || status2.pulldownStatus === 'up'" :class="{'rotate': status2.pulldownStatus === 'up'}">↓</span>
					<span v-show="status2.pulldownStatus === 'loading'">
						<spinner type="ios-small"></spinner>
					</span>
				</div>
			</scroller>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Tab, TabItem, Swiper, SwiperItem, Scroller, Spinner, XHeader,Loading } from 'vux'

export default {
	props: [],
	data() {
		return {
			shopId:'',
			index:0,
			date11: '',
			turn:false,
			tabList: ['全部', '待付款', '待发货', '待收货', '退换货', '已完成'],
			ordList: [],
			demo2: '全部',
			showHeight: "",
			result: '',
			status2: {
				pulldownStatus: 'default'
			}
		}
	},
	components: {
		Tab,
		TabItem,
		Swiper,
		SwiperItem,
		Scroller,
		Spinner,
		XHeader,
		Loading
	},
	methods: {
		onScroll(pos) {
			// console.log('on scroll', pos)

		},
		load3() {
			setTimeout(() => {
				this.$refs.scroller.donePulldown()
			}, 2000)
		},
		shop(index){
    		this.$router.push({name:'store',params:{'storeId':index}});
			this.$router.go(0);
   		},
		// showHeight() {
		//     this.showHeight = screen.availHeight - $(".white").height();
		//     // console.log(this.showHeight)

		// },
		onClickTab(index) {
			
			this.$vux.loading.show({
				text: 'Loading'
			})
			switch (index) {
				case 0:
					this.demo2 = '全部';
					this.getOrderType();
					break;
				case 1:
					this.demo2 = '待付款';
					this.getOrderType(0);
					break;
				case 2:
					this.demo2 = '待发货';
					this.getOrderType(4);
					break;
				case 3:
					this.demo2 = '待收货';
					this.getOrderType(5);
					break;
				case 4:
					this.demo2 = '退换货';
					this.ordList = [11, 2, 3, 4, 1, 2, 3];
					this.$vux.loading.hide();

					break;
				case 5:
					this.demo2 = '已完成';
					this.getOrderType(7);
					break;

			}
		},
		getOrderType(id) {
			var that = this;
			var url = "rest/order/getMyOrder";

			var data = {
				status: id
			}
			that.axios.post(url, data).then(response => {
				
				that.result = response.data.data.result;
				that.$nextTick(() => {
					that.$refs.scroller.reset({
						top: 0
					});
				});		
				that.$vux.loading.hide();

			})
		},
		orderInfo(index){
			this.$router.push({ name: 'orderInfo', params: {id: index } });
			this.$router.go(0);
		}
	},
	mounted() {
		this.active("#myself");

		this.index = Number(this.$route.params.index);
		this.onClickTab(this.index);
		// 获取url传的tab参数
		this.showHeight = screen.availHeight - $(".white").height() - $(".vux-tab").height() - 46 + "px";

	},
	updated() {

	}
}
</script>
<style>
.order .box2-wrap {
	height: 300px;
	overflow: hidden;
}

.order .pulldown-arrow {
	display: inline-block;
	transition: all linear 0.2s;
	color: #666;
	font-size: 25px;
}

.order .ps-detail-content {
	z-index: 1;
	margin-top: 46px;
}

.order .com-list {
	margin-bottom: .5rem;
}

.order .com-list>li {
	font-size: .6rem;
	border-bottom: 1px solid #eee;
	background: #ffffff;
}

.order .label {
	font-size: .44rem;
	padding: 0 .16rem;
	line-height: .16rem!important;
	color: #fff;
	margin-left: .5rem;
	vertical-align: middle;
	background: #eb6100;
	height: .16rem;
}

.order .wbox {
	display: -webkit-flex!important;
	display: -webkit-box;
}

.order .wbox-flex {
	-webkit-flex: 1!important;
	/* -webkit-box-flex: 1; */
}

.order .order-item {
	padding: 0.4rem 0.52rem;
}

.order .order1 .pro-img img {
	width: 3.08rem;
	height: 3.08rem;
	border-radius: 0;
	margin-right: 0.6rem;
	border: 0
}

.order .order1 .price {
	line-height: .8rem;
	color: #000;
	font-size: .6rem;
	margin-top: 0.2rem;
}

.order .order1 .color-line {
	padding: .2rem 0 .12rem
}

.order .order1 .color-line .style {
	display: -webkit-box;
	-webkit-line-clamp: 1;
	height: .58rem
}

.order .order1 .num {
	font-size: .52rem;
	line-height: .8rem;
	margin-top: .2rem;
	text-align: right
}

.order .order1 .ordfd {
	border-top: .04rem solid #eee;
	padding: .12rem .52rem;
}

.order .order1 .ordfd .wbox-flex {
	line-height: 1.2rem
}

.order .com-list .button {
	line-height: 1.2rem;
	height: 1.2rem;
	padding: 0;
	width: 3.2rem;
	text-align: center;
	border-radius: 0;
	font-size: .6rem
}

.order .button.gray {
	background: #eee;
	color: #999999;
}


.order .vux-header .vux-header-left a,
.vux-header .vux-header-left button,
.vux-header .vux-header-right a,
.vux-header .vux-header-right button {

	color: white;
}

.order .vux-header .vux-header-left .left-arrow:before {

	border: 1px solid white;
	content: "";
	position: absolute;
	width: 12px;
	height: 12px;
	border-width: 1px 0 0 1px;
	-webkit-transform: rotate(315deg);
	transform: rotate(315deg);
	top: 8px;
	left: 7px;
}

.order .button,
.order button {
	color: #fff;
	background: #eb6100;
	font-size: .6rem;
	display: inline-block;
	padding: .14rem .3rem;
	border: none;
	cursor: pointer;
}

.order .shopTitle {
	width: 100px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.order .shopTitle em {
	display: inline-block;
	width: 18px;
	height: 18px;
	background: url(../../imgs/shop.png);
	background-repeat: no-repeat;
	-webkit-background-size: 100%;
	background-size: 100%;
	float: left;
	margin-right: 10px;
}

</style>