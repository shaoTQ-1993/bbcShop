<template>
	<div class="orderInfo">
		<x-header style="background-color: #eb6100;">订单详情</x-header>
		<div class="o-info">
			<h5>订单号:{{order.sn}}</h5>
			<h5>下单时间:{{order.create_time}}</h5>
			<h5>订单状态:<em>{{order.orderStatus}}</em></h5>
		</div>
		<div class="delete">
			<div class="txt">删除订单</div>
		</div>
		<div class="address">
			<span>收货信息:</span>
			<div class="info">
				<h4 class="fl">{{order.ship_name}}</h4>
				<h4 class="rl">{{order.ship_mobile}}</h4>
				<div class="txt fl" style="text-align: left;">{{order.shipping_area}}{{order.ship_addr}}</div>							
			</div>	
		</div>
		
		
		<div class="" data-scroll="true">
				<div class="shopItem" style="margin-top: 5px;">
					<!--<router-link :to="{name:'store',params:{'storeId':0}}">-->
						<div class="shopTitle" v-on:click="shop(order.merchant_id)">
							<b></b><h2>{{shopName}}</h2>
						</div>
					<!--</router-link>-->
					
					
					<!--购物车列表 sta-->
					<div class="car_list" >
        				<div class="carItem" v-for="item in orderItemList">
        					<a href="javascript:;" v-on:click="product(item.goods_id)">
								<img :src="item.image" />
								<div class="goodsInfo">
									<h3>{{item.name}}</h3>
									<h4>{{item.specs}}</h4>											
									<div class="goodsInfoBottom">￥<em>{{item.price}}</em><b>x{{item.num}}</b></div>
								</div>	
							</a>
						</div>
					</div>
					<div style="background-color: #FFFFFF; margin-top: 5px;margin-bottom: 45px;">
						<cell title="商品金额：" :value="order.goods_amount" ></cell>
					    <cell title="运费：" :value="order.shipping_amount"></cell>
					    <cell title="优惠金额：" :value="order.refund_amount"></cell>
					    <cell title="礼券金额：" value="0"></cell>
					    <cell title="订单总额：" :value="order.order_amount" style="color: #EB6100;"></cell>					   
				 	</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import { Tab, TabItem, Swiper, SwiperItem, Scroller, Spinner, XHeader,CellBox,Cell,Divider } from 'vux'

export default {
	props: [],
	data() {
		return {
			index: 0,
			id:'',
			shopName:'',
			orderItemList:'',
			order:'',
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
		CellBox,
		Cell,
		Divider
	},
	methods: {
		getOrderInfo(sn){

			var url = '/rest/order/orderDetail/'+sn;
			var that = this;
			that.axios.get(url)
				.then(response => {
					console.log(response);
				that.shopName=response.data.data.merchantSite.site_name;
				that.orderItemList=response.data.data.orderItemList;
				that.order=response.data.data.order;
				})
		},
		shop(index){
    		this.$router.push({name:'store',params:{'storeId':index}});
			this.$router.go(0);
   		},
   		product(index){
			this.$router.push({name:'productDetail',params:{pro_id:index}});
			this.$router.go(0);			
		},
		
	},
	mounted() {
		
		this.id= this.$route.params.id;
		this.getOrderInfo(this.id);
		this.showHeight = screen.availHeight - $(".white").height() - $(".vux-tab").height() - 46 + "px";

	},

}
</script>
<style>
.orderInfo{
	background-color:#EEEEEE;
	
}
.orderInfo .delete{
	position: fixed;
	z-index: 99;
	background-color: #FFFFFF;
    width: 100%;
    padding: 10px 10px;
    border-top: 1px #EEEEEE solid;
    height: 50px; 
    bottom: 0px;  
}
.orderInfo .delete .txt{
	line-height: 30px;  
	width: 90px;
	height: 30px;
	float: right;
	background-color:#EB6100 ;
	color:#FFFFFF ;
}
.orderInfo .delete .price{
	float: left;
}
.orderInfo .delete em{
	color: red;
}
.orderInfo .o-info{
	height: 110px;
	margin-top: 50px;
	overflow: hidden;
	padding: 10px;
	background-color: #FFFFFF;
}
.orderInfo .o-info h5{
	text-align: left;
	font-weight:normal;
	font-size: 15px;
	margin-bottom: 12px;
	color: #000000;
	
}
.orderInfo .o-info h5 em{
	font-size: .44rem;
	padding: 0 .16rem;
	line-height: .16rem!important;
	color: #fff;
	margin-left: .5rem;
	vertical-align: middle;
	background: #eb6100;
	height: .16rem;
	width: 80px;
}
.orderInfo .state{

	margin-top: 45px;
	border-bottom: 1px #d9d9d9 solid;
	height: 35px;
	line-height: 35px;	
}
.orderInfo .address{
	height: 100px;
	padding-top: 15px;
	padding-right: 10px;
	margin-top: 5px;
	color: #000000;
	font-size: 15px;
	background-color: #FFFFFF;
	
}
.orderInfo .address h4{
	font-weight: normal;
	margin-bottom: 12px;
}
.orderInfo .address span{
	width: 80px;
	float: left;
}
.orderInfo .address .info{
	color: #999999;
	overflow: hidden;	
}
.orderInfo .shopTitle{
	padding: 5px 15px 0px 15px;
    height: 27px;
    background-color: #FFFFFF;
}
.orderInfo h2{
	text-align: left;
	display: inline-block;
	font-size: 16px;
	float: left;
	margin-top: -2px;
	font-weight: normal;
}
.orderInfo .shopTitle b {
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
.orderInfo .car_list .carItem{
		font-size: 15px;
		padding: 10px 10px;
		overflow: hidden;
		border-bottom: 1px #EEEEEE solid;
		background-color: #ffffff;
	}
	.orderInfo .carItem .pro-check{
		float: left;
		position: absolute;
		margin-top: 30px;
		width: 8%;
	
		
		height: 100%;
	}
	.orderInfo .carItem a{
	
		width: 90%;
		float: left;
		
	}
	.orderInfo .carItem img{
		width: 3.6rem;
    	height: 3.6rem;
    	float: left;
    	margin-right: .6rem;
    	margin-left: 5px;
	}
	.orderInfo .carItem .goodsInfo{
		float: left;
		text-align: left;
		width: 8.9rem;
	}

	.orderInfo .goodsInfo h3{
		font-weight: normal;
		font-size: 15px;
		
	}
	.orderInfo .goodsInfo h4{
		font-weight: normal;
		font-size:14px;	
		color: #999;	
	}
	.orderInfo .goodsInfo .goodsInfoBottom{
		font-size: 15px;
		color: #eb6100;
		margin-top: 15px;
		
	}

	.orderInfo  .goodsInfoBottom b{
		font-weight: normal;
		position: absolute;
    	left: 340px;
    	color: #000000;
    	font-size: 15px;
	}
	.orderInfo .weui-cell:before{
		left: 0px;
	}
	.orderInfo .vux-label{
		text-align: left;
		font-size: 15px;
	}
	.orderInfo .vux-divider {
    display: table;
    white-space: nowrap;
    height: auto;
    overflow: hidden;
    line-height: 1;
    text-align: center;
    padding:0 0;
    color: #EB6100;
}
.orderInfo .weui-cell__ft{
	color: #000000;
	font-size: 15px;
}
.orderInfo .weui-cell:before {
    left: 4%;
    width: 93%;
}

</style>