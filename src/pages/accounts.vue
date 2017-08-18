<template>
	<div class="accounts">
		 <x-header >确认订单</x-header>
		<!--<scroller style="margin-top: 46px;" lock-x :height=showHeight ref="scrollerEvent">-->
		<div class="car-content">
			<div class="foorer-nav1" >
				<div class="bot-price">
					<div class="JAllPrice" total="${orderPrice.goodsPrice}"><em>合计：</em>￥{{totalPrice}}</div>
					
				</div>
				
				<div  v-on:click="commitOrder" class=" button orange check-btn" style="line-height: 45px; color: #FFFFFF;">提交订单</div>
			</div>
			<div class="address" v-if="hasAdd">
				<popup-picker :data="list1" v-model="value1_1" @on-show="onShow"  @on-change="onChange" >					
				    <template slot="title" scope="props">
				    	<div class="info">
				    		<h4 class="fl">收货人:{{name}}</h4>
							<h4 class="rl">{{mobile}}</h4>
							<div class="txt fl">收货地址：{{address}}</div>							
						</div>	
				        <span class="weui-label" style="width:45px;">
				            <em></em>
				        </span>				       
				    </template>				   
     			</popup-picker>   							
			</div>
			<div class="newAdd" v-else="hasAdd">
				<router-link :to="{name:'editAdd',params:{'add_id':'0'}}">
					<span>添加新地址</span>
				</router-link>
			</div>
			<divider>订单详情</divider>
			
			<article class="" data-scroll="true">
				<div class="shopItem" v-for="(item,shopIndex) in shopList" v-model="shopIndex">
					<router-link :to="{name:'store',params:{'storeId':item.merchant.merchant_id}}">
						<div class="shopTitle">
							<b></b><h2>{{item.merchant.site_name}}</h2>
						</div>
					</router-link>
					
					
					<!--购物车列表 sta-->
					<div class="car_list"  v-for="(item, index) in item.goodsList">
						 <swipeout>
      						<swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
       							
        						<div slot="content" class="demo-content vux-1px-t">
        							<div class="carItem">
										<a href="javascript:;" v-on:click="product(item.goods_id)">
											<img :src="item.image_default" />
											<div class="goodsInfo">
												<h3>{{item.name}}</h3>
												<h4>{{item.specs}}</h4>											
												<div class="goodsInfoBottom">￥<em>{{item.coupPrice}}</em><b>x{{item.num}}</b></div>
											</div>
										</a>							
									</div>
        						</div>
     						</swipeout-item>
    					</swipeout>
					</div>
					<div class="info">
						<cell title="店铺优惠" value="并没有" ></cell>
					    <cell title="配送费" :value="item.merchant.shopOrderPrice.shippingPrice"></cell>
					    <x-input title="买家留言"  placeholder="选填：对本次交易的说明"></x-input>
					    <cell-box>
        					<div class="infoItem">
								<h5>共666件商品</h5>
								<em>小计:</em>
								<b>￥{{item.merchant.shopOrderPrice.originalPrice}}</b>
							</div>
      					</cell-box>
				    </div>
					<!--其他信息-->
					<!--<div class="info">
						<div class="infoItem">
							<h3>店铺优惠：</h3>
							<h4>并没有</h4> 
						</div>
						<div class="infoItem">
							<h3>配送方式：</h3>
							<h4>快递 ￥12.00</h4> 
						</div>
						<div class="infoItem">
							<h3>买家留言：</h3>
							<input type="text" class="say" placeholder="选填：对本次交易的说明" />
						</div>
						<div class="infoItem">
							<h5>共666件商品</h5>
							<em>小计:</em>
							<b>￥180.48</b>
						</div>
					</div>-->
						
						
					</div>
				</article>
			</div>
		<!--</scroller>-->
	</div>
</template>
<script type="text/javascript">
	import headtitle from '../components/header'
	import foot from '../components/footer'
	import youlike from './youlike'
	import { GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton, 
		XButton,XHeader,Cell,Group,PopupPicker,Picker,XInput,CellBox,Divider,Loading,Scroller  } from 'vux'

	export default {
		props: [],
		data() {
			return {
				hasGoods:'',
				goodsList: '',
				disabled: false,
				selectArr: [],
				quantity:0,
				totalPrice:0.0,
				newnum:0,
				itemPrice:0,
				shopList:'',
				shopIndex:'',
				list1: [],
				value1_1: ['iPhone'],
				info:[],
				name:'gintoki',
				mobile:'18804259057',
				address:'kkkkkkkkkkkkkk',
				test:'快递￥12.00',
				hasAdd:false,
				shipAddrId:'',
				merchantIds:'',
				showHeight:''
				
			}
		},
		components: {
			headtitle,
			youlike,
			foot,
			GroupTitle,
		    Swipeout,
		    SwipeoutItem,
		    SwipeoutButton,
		    XButton,
		    XHeader,
		    Cell,
		    Group,
		    PopupPicker,
		    Picker,
		    XInput,
		    CellBox,
		    Divider,
		    Loading,
		    Scroller
		},
		methods: {
			product(index){
			this.$router.push({name:'productDetail',params:{pro_id:index}});
			this.$router.go(0);			
			},
			onShow(){
				var url = '/rest/addressList/getAddressList';
				var aaa
				var that = this;
				that.axios.get(url)
					.then(response => {
						this.$nextTick(() => {
							var length;
							var data;
							var name,mobile,province,city,region,addr,id;
							var item;
							var aaa=[];
							data=response.data.data.addressList;
							length =  response.data.data.addressList.length;
							for(var i=0;i<length;i++){
								name=data[i].name;
								mobile=data[i].mobile;
								province=data[i].province;
								city=data[i].city;
								region=data[i].region;
								addr=data[i].addr;
								id=data[i].addr_id;
								console.log("shipAddrId-show",id);
								item=name+" "+mobile+" "+province+" "+city+" "+region+" "+addr+" "+id;								
								aaa[i]=item;
								console.log("shipAddrId-item",item);
								
							}
							that.list1 = [aaa];
						})
	
					})
			},
			onChange (index) {
      		var data=index[0];
      		var data2=[];
      		data2=data.split(" ");
      		this.name=data2[0];
      		this.mobile=data2[1];
      		this.address=data2[2]+data2[3]+data2[4]+data2[5];
      		this.shipAddrId=data2[6];
      		console.log("shipAddrId-get",this.shipAddrId);
   			 },
	
			carList(id) {
				var that = this;
				that.$vux.loading.show({
				text: 'Loading'
			})
				var url = "/rest/cart/goBuy/"+id;
				
				var count;
				that.axios.get(url)
					.then(response => {
						console.log("cl",response);
						that.shopList = response.data.data.checkoutList;
						var i;
						for(i=0;i<that.shopList.length;i++){							
							that.totalPrice+=that.shopList[i].merchant.shopOrderPrice.originalPrice;
							that.merchantIds+=that.shopList[i].merchant.merchant_id+",";
						}
//						that.$nextTick(() => {
//						that.$refs.scrollerEvent.reset()
//					})
						that.$vux.loading.hide();
					})
					
				this.getDefaultAdd();		
			},
				getDefaultAdd(){
				var url = '/rest/addressList/getAddressList';
				var that = this;
				that.axios.get(url)
					.then(response => {
						this.$nextTick(() => {
							var data;
							var length;
							data=response.data.data.addressList;
							length =  response.data.data.addressList.length;
							if(length>=1)
								that.hasAdd=true;
							else
								that.hasAdd=false;
								
							that.shipAddrId=data[0].addr_id;
							console.log("shipAddrId-get",data[0].addr_id);
							that.name=data[0].name;
							that.mobile=data[0].mobile;
							that.address=data[0].mobile+data[0].province+data[0].city+data[0].region+data[0].addr;							
						})
	
					})
				},
				commitOrder(){
					
					var that=this;
					var url = "rest/order/commitOrder";
				
					var data = {
						merchantIds: this.merchantIds,
						shipAddrId:this.shipAddrId,
						
					}
					console.log("shipAddrId",data.shipAddrId);
					console.log("merchantIds",data.merchantIds);
					that.axios.post(url, data).then(response => {
						console.log("commitOrder",response);
						})
					}
				
			},
			
			mounted() {
//				this.showHeight = document.documentElement.clientHeight - 46 + 'px';
				var that = this;
				this.active("#cart");
				var id= this.$route.params.ids;
				this.carList(id);	
			}
		}
</script>
<style type="text/css">
	@import "../../reset.css";
	.fl{
		float: left;
	}
	.rl{
		float: right;
	}
	.accounts .null-car {
		height: 15rem;
		padding-top: 5.5rem;
		text-align: center;
		background-color: #EEEEEE;
	}
	
	.accounts .null-car .ico {
		background: url(../imgs/null1.png) no-repeat;
		width: 4.74rem;
		height: 4.74rem;
		background-size: 4.74rem auto;
		display: block;
		margin: 0 auto .68rem;
	}
	
	.accounts .null-car p {
		color: #999;
		font-size: .6rem;
	}
	
	.accounts .null-car .button {
		font-size: .6rem;
		display: inline-block;
		margin-top: 1.04rem;
		border: 1px solid #eb6100;
		color: #fff;
		background: 0 0;
		background-color: #eb6100;
		padding: 0.2rem 0.9rem;
	}
	.accounts .car_list{
		
	}
	.accounts .car_list .carItem{
	
		
		padding: 15px 10px;
		overflow: hidden;
		
		background-color: #ffffff;
	}
	.accounts .carItem .pro-check{
		float: left;
		position: absolute;
		margin-top: 30px;
		width: 8%;
	
		
		height: 100%;
	}
	.accounts .carItem a{
	
		width: 90%;
		float: left;
		
	}
	.accounts .carItem img{
		width: 3.6rem;
    	height: 3.6rem;
    	float: left;
    	margin-right: .6rem;
    	margin-left: 5px;
	}
	.accounts .carItem .goodsInfo{
		float: left;
		text-align: left;
		width: 8.9rem;
	}

	.accounts .goodsInfo h3{
		font-weight: normal;
		font-size: .66rem;
		
	}
	.accounts .goodsInfo h4{
		font-weight: normal;
		font-size: .36rem;	
		color: #999;	
	}
	.accounts .goodsInfo .goodsInfoBottom{
		position: absolute;
		bottom: 15px;
		font-size: .66rem;
		color: #eb6100;
		
	}

	.accounts  .goodsInfoBottom b{
		font-weight: normal;
		position: absolute;
	    left: 230px;
	    bottom: 0px;
		color: #000000;
	}
 .foorer-nav1{
		background-color: #EB6100;
		bottom: 0;
		position: fixed;
		z-index: 99;
		width: 100%;
		height: 45px;
	}
 .foorer-nav1  .bot-price {
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
.foorer-nav1.car .bot-price em{
 	color: #ffffff;
}
	.Jcheckall {
   position: absolute;
    left: .8rem;
    top: 50%;
    margin-top: -0.15rem;
    width: 80px;

    text-align: left;
}
 .foorer-nav1 .bot-price .JAllPrice {
    color: #eb6100;
    font-size: .72rem;
	
    line-height: 45px;
    padding-left: 15px;
    text-align: left;

}
 .foorer-nav1 .bot-price .JAllPrice em{
	color: #000000;
}
 .foorer-nav1 .bot-price .JAllPrice+div {
    line-height: .7rem;
    padding-right: .36rem;
    text-align: right;

}
.accounts .header{
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
.accounts .header span{
	margin-left: 20px;
}
.accounts .header em{
	height: 2rem;
	
    line-height: 2rem;
    font-size: 15px;
    float: right;
    

}
.accounts .car-content{
	margin-top: 2rem;
	margin-bottom: 2.2rem;
}

.accounts .carItem .goodsEdit{

		float: left;
		text-align: left;
		width: 8.9rem;
	}
.accounts .goodsEdit{
	display: none;
}
.accounts .goodsEdit .count{
	border: 1px #EEEEEE solid;
	height: 1.6rem;
	
}
.accounts .goodsEdit .count-num {
    width: 5.44rem;
    height: 1.2rem;
    text-align: center;
    font-size: .6rem;
    color: #232323;
    border: none;
    margin: 0;
}
.accounts .count .count-min,.count-add{

    font-size: 1rem;
    color: #232323;
    text-align: center;
    width: 30px;
    display: inline-block;
}
.accounts .shopTitle{
	padding: 5px 15px;
}
.accounts h2{
	text-align: left;
    display: inline-block;
    font-size: 16px;
    float: left;
    margin-top: -2px;
    font-weight: normal;
}
.accounts .shopTitle b {
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
.accounts .info{

}
.accounts .info .weui-cell:before {
	left: 0px;
}
.accounts .info .vux-label{
	text-align: left;
}
.accounts .info .weui-label{
	text-align: left;
}
.accounts .info .accounts input{
	width: 100%;
}
.accounts .info .weui-cell__ft{
	color: #000000;
}
.accounts .info .vux-cell-box > div {
    padding-right: 0px;
    margin-left: 130px;
}
.accounts .infoItem{
	font-size: 17px;
	overflow: hidden;
}
.accounts .infoItem h5{
	float: left;
	font-weight:normal;
	font-size: 17px;
	display: inline-block;
	margin-right: 10px;
}
.accounts .infoItem em{
	float: left;
	font-weight: 400;
	font-size: 17px;
}
.accounts .infoItem b{
	float: left;
	font-weight: 400;
	font-size: 17px;
	color: #eb6100;
}

.accounts .infoItem h3{
	float: left;
	font-weight: 400;
	font-size: 15px;
}
.accounts .infoItem h4{
	float: right;
	font-weight: 400;
	font-size: 15px;
}
.accounts .infoItem span{
	float: left;
	font-weight: 400;
	font-size: 15px;
}

.accounts input{
	float: right;
    border: none;
    height: 20px;
    width: 100%;
}

.accounts .shopItem{
	margin-bottom: 20px;
}
.accounts .vux-divider{
	color: #EB6100;
}
.accounts .address{
	height: 100px;
}
.accounts .address .vux-popup-picker-value{
	float: left;
	display: none;
}
.accounts .address .scroller-content{
	position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0px 5px;
}
.accounts .address .vux-cell-box:before{
	border: none;
}
.accounts .address .weui-cell{
	padding: 0px 0px;
	padding-right: 10px;
}
.accounts .address .weui-cell_access .weui-cell__ft:after{
	margin-top: 9px;
    margin-right: 5px;
}
.accounts .address em{
	display: inline-block;
    width: 38px;
    height: 45px;
	background: url(../imgs/address.png);
	background-repeat: no-repeat;
    background-size: 100%;
    float: left;
    margin-top: 30px;
}
.accounts .address .info{
	width: 78%;
	position: absolute;
    top: 9px;
    left: 48px;
	overflow: hidden;
	
}
.accounts .address h4{
	font-weight: 400;
	font-size: .66rem;
	margin-top: 3px;
}
.accounts .address .txt{
	margin-top: 26px;
	float: left;
	text-align: left;
	font-size: 14px;
}
.accounts .address i{
	display: inline-block;
	width: 6%;
	height: 22px;
	background: url(../imgs/shop.png);
	background-repeat: no-repeat;
	-webkit-background-size: 100%;
	background-size: 100%;
	float: right;
	margin-top: -50px;

}
.accounts .newAdd span{
line-height: 50px;
	border-radius: 0;
	padding: 0!important;
	height: 50px;
	text-align: center;
	position: relative;
	-webkit-box-flex: 1;
	box-flex: 1;
	display: block;
	background: #eb6100;
	font-size: .64rem;
	color: white;
}
</style>