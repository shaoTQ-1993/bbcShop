<template>
	<div class="allGoods">
	
		<div class="header">
			<span class="close-pic" v-on:click="back()" style="margin-right: 10px;"></span>
			<div class="input">
				<input type="text" v-model="keyWord"  placeholder="搜索店铺内商品" >
					<em class="search-pic" v-on:click="refresh(keyWord)"><span class="pic"></span></em>
				</div>
		</div>
		<!--商品列表排列方式 sta-->
			<ul class="com-nav">
				<li v-bind:class="{active:sorter}">
					<a name="sort" v-on:click="Request(10)">综合
					</a>
				</li>
				<li v-bind:class="{active:sorter_sale}">
					<a name="sort" v-on:click="changeOrder('sales')">销量
						<i v-if="sorter_sale" v-bind:class="[sorttype=='desc'?'down':'up']"></i>
						<i v-else></i>
					</a>
				</li>
				<li v-bind:class="{active:sorter_price}">
					<a name="sort" v-on:click="changeOrder('price')">价格
						<i v-if="sorter_price" v-bind:class="[sorttype=='desc'?'down':'up']"></i>
						<i v-else></i>
					</a>
				</li>
				<li v-bind:class="{active:sorter_time}">
					<a name="sort" v-on:click="changeOrder('time')">最新
						<i v-if="sorter_time" v-bind:class="[sorttype=='desc'?'down':'up']"></i>
						<i v-else></i>
					</a>
				</li>
			
			</ul>
		
		<div class="block">
			
			<!--商品列表排列方式 end-->
			<!--商品列表 sta-->
			<article class="active_block" data-scroll="false">
				<div>
					<ul class="go-list" v-if="result">
						<li v-for="goods in webpage.result">
							
							<!--商品详情 sta-->
							<router-link :to="{name:'productDetail',params:{pro_id:goods.goods_id}}" class="del-items">
								<div class="go-item">
									<span class="sq" v-if="goods.store == 0"></span>
									<img :src="goods.thumbnail" />
									<div class="info_bar">
										<div class="tit">{{goods.name}}</div>
										<div class="price" v-if="goods.coupPrice > 0">{{goods.coupPrice | currency}}</div>
										<div class="price" v-else>{{goods.price | currency}}</div>
									</div>
								</div>
							</router-link>
							<!--商品详情 end-->

							<!--购物车弹窗 sta-->
							<a href="#" v-if="goods.store==0" class="car"><i></i></a>
							<a href="#" v-else class="car" v-on:click="showCar(goods.goods_id)"><i></i></a>
							<div v-if="show" class="car_shadow">
								<div class="shadow_cont">
									<div class="shadow_title">
										<a v-on:click="show = false;counte = 1" class="close_btn"></a>
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
							<!--购物车弹窗  end-->
						</li>
					</ul>
					<!--无搜索结果 sta-->
					<div v-else>
						<i class="null-addr"></i>
						<p class="null-txt">暂时没有找到相关单品，请重新搜索</p>
					</div>
					<!--无搜索结果 end-->
				</div>
			</article>
			<!--商品列表 end-->
		</div>
		
	</div>
</template>
<script>
	import headtitle from "../components/head"
	import {Loading,XHeader,Scroller} from 'vux'
	export default {
		data() {
				return {
					typeId: '',
					cat: '',
					goodsSelector: '',
				//	sorter: '',
					sorter:true,
					sorttype:'desc',
					webpage: '',
					result: '',
					num: 0,
					show: false,
					goodsInfo: '',
					counte: 1,
					productList: '',
					chooseProduct: '',
					
					catId:'',
					pageNo:2,
					pageSize:3,
					
					sorter_sale:false,
					sorter_price:false,
					sorter_time:false,
					index_s:0,
					keyWord:'',
					quantity:'',
					showHeight:'',
					id:''
				}
			},
			components: {
				headtitle,
				Loading,
				XHeader,
				Scroller,
			},
			methods: {
				back(){
				this.$router.go(-1);
			},
				search(){
				this.$router.push({
					name:'category'
				});
			},
				
				Request(index_sort) {
					var that=this;
					var url = "/rest/goodsSearch/getList";		
					var data = {
						sort: index_sort,
						siteId:that.id,
						pageSize:666
					}
				
					that.axios.post(url, data).then(response => {
						
						that.webpage = response.data.data.page;
						that.result = (response.data.data.page.result.length) > 0;
					
					});

						
					that.sorter_sale=false;
					that.sorter_price=false;
					that.sorter_time=false;
					that.sorter=true;
				
					that.$vux.loading.hide();
				},
				//初始化页面

				//重新刷新
				refresh(keyword){
					var that=this;
						that.$vux.loading.show({
										text: 'Loading'
									})
					var url = "/rest/goodsSearch/getList";
					var data = {
						keywords:keyword,
						siteId:that.id,
					}
					
					that.axios.post(url, data).then(response => {
						that.webpage = response.data.data.page;
						that.result = (response.data.data.page.result.length) > 0;
						that.$vux.loading.hide();
					})

				},
				shortGoods(index_sort){
					
					var that=this;
//						that.$vux.loading.show({
//										text: 'Loading'
//										
//									})
					var url = "/rest/goodsSearch/getList";		
					var data = {
						sort: index_sort,
						siteId:that.id,
						pageSize:666
					}
					
					that.axios.post(url, data).then(response => {						
						that.webpage = response.data.data.page;
					});
					
					
				},
				changeOrder(val) {
					var that = this;
					switch(val) {
						case 'sales':

							if(that.sorttype=='desc'){
								that.sorttype='asc';
								that.index_s=7;
							}
							else{
								that.sorttype='desc';
								that.index_s=6;
							}
							that.shortGoods(that.index_s);
							that.sorter_sale=true;
							that.sorter_price=false;
							that.sorter_time=false;
							that.sorter=false;
							break;
						case 'price':
							
							if(that.sorttype=='desc'){
								that.sorttype='asc';
								that.index_s=3;
							}
							else{
								that.sorttype='desc';
								that.index_s=2;
							}
							that.shortGoods(that.index_s);
							that.sorter_sale=false;
							that.sorter_price=true;
							that.sorter_time=false;
							that.sorter=false;
							break;
						case 'time':
							if(that.sorttype=='desc'){
								that.sorttype='asc';
								that.index_s=9;
							}
							else{
								that.sorttype='desc';
								that.index_s=8;
							}
							that.shortGoods(that.index_s);
							that.sorter_sale=false;
							that.sorter_price=false;
							that.sorter_time=true;
							that.sorter=false;
							break;
					}
				},
				//商品列表排列方式切换

				showCar(goodsId) {
					var that=this;
						that.$vux.loading.show({
										text: 'Loading'
									})
					this.show = true;
					var url = "/rest/goods/" + goodsId;
		

					that.axios.get(url)
						.then(response => {
							that.goodsInfo = response.data.data;
							that.productList = response.data.data.productList;
							that.chooseProduct = that.productList[that.productList.length - 1];
							
							that.$vux.loading.hide();
						})
				},
				//显示弹窗

				changeClass(event, className) {
					var this_ = event.currentTarget;
					$(this_).addClass(className).siblings().removeClass(className);
					//弹窗商品规格样式切换

					var val = $(this_).attr("value");
					for(var i = 0; i < this.productList.length; i++) {
						var specList = this.productList[i].specList;
						for(var j = 0; j < specList.length; j++) {
							if(specList[j].spec_value_id == val) {
								this.chooseProduct = this.productList[i];
								break;
							}
						}
					}
					//找到当前选择的产品

				},
				//弹窗商品规格样式切换

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

			},
			mounted() {			
				this.id = this.$route.params.id;
				this.$vux.loading.show({
					text: 'Loading'
				});
				this.Request(10);
			},
			
	}
</script>
<style type="text/css">
	@important "../../reset.css";
	.allGoods  ul.com-nav {
		left: 0;
		right: 0;
		display: flex;
		background: #fff;
		border-bottom: 0.1rem solid #eeeeee;
		line-height: 2rem;
		height: 2rem;
		position:fixed;
		z-index: 99;
		margin-top: 46px;
		
	}
	.allGoods .block  .cat_title {
		
		text-align: center;
		font-size: 15px;
		color:#000000;
		position: absolute;
		top: 38px;
		height: 40px;
		line-height: 40px;
		background-color: #FFFFFF;
		width: 100%;
		margin: 10px 0;
		border-bottom: 1px #eeeeee solid;
		}
	
	.allGoods  ul.com-nav>li {
		text-align: center;
		display: block;
		-webkit-flex: 1!important;
		-webkit-box-flex: 1;
	}
	
	.allGoods  ul.com-nav>li>a {
		font-size: .56rem;
		color: #232323;
		display: inline-block;
		position: relative;
		line-height: 1.32rem;
		height: 1.32rem;
	}
	
	.allGoods  ul.com-nav>li.active>a {
		color: #eb6100;
	}
	
	.allGoods  ul.com-nav>li>a>i {
		position: relative;
		width: .4rem;
		height: .46rem;
		display: inline-block;
		margin-left: .12rem;
		top: 0.06rem;
	}
	
	.allGoods  ul.com-nav>li>a>i:before {
		background: url(../imgs/ico_sort.png) no-repeat;
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
	
	.allGoods  ul.com-nav>li>a>i.down:before {
		background-position: 0 bottom;
	}
	
	.allGoods  ul.com-nav>li>a>i:after {
		background: url(../imgs/ico_sort.png) no-repeat;
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
	
	.allGoods  ul.com-nav>li>a>i.up:after {
		background-position: 0 -0.48rem;
	}
	
	.allGoods  article.active_block {
		visibility: visible;
		display: block;
		z-index: 1;
		width: 100%;
		height: 90vh;
		top:14vh;
		position: absolute;
		box-sizing: border-box;
		background-color: #eee;
	}
	
	.allGoods .block article.active_block p.null-txt {
		font-size: .6rem;
		color: #999;
		text-align: center;
	}
	
	.allGoods .block article.active_block i.null-addr {
		width: 4.8rem;
		height: 4rem;
		background: url(../imgs/ps_gray_logo.png) no-repeat;
		background-size: 4.8rem auto;
		display: block;
		margin: 4.4rem auto 1.34rem;
	}
	
	.allGoods .block article.active_block .go-list {
		margin-bottom: 2rem;
		margin-top: 0px;
	}
	
	.allGoods .block article.active_block .go-list>li {
		height: 7.16rem;
		position: relative;
		background: #fff;
		border-bottom: 1px solid #f1f1f1;
	}
	
	.allGoods .block article.active_block a.del-items {
		display: block;
		height: 7.16rem;
		position: relative;
		border-bottom: 1px solid #eee;
		padding-top: 0px;
	}
	
	.allGoods .block article.active_block a.car {
		width: 1.76rem;
		height: 1.76rem;
		background: url(../imgs/cart_pic1.png) no-repeat;
		background-position: 6px 7px;
		background-size: 1.1rem;
		display: inline-block;
		position: absolute;
		top: 3.8rem;
		right: 1.2rem;
		border: 2px solid #FD4433;
		background-color: #FD4433;
		border-radius: 1rem;
	}
	
	.allGoods .block article.active_block div.car_shadow {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .06);
		z-index: 999;
	}
	
	.allGoods .block article.active_block div.car_shadow .shadow_cont {
		background-color: #fff;
		width: 80%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 20vh;
		position: relative;
	}
	
	.allGoods .shadow_cont .shadow_title {
		position: relative;
		padding: 0 .96rem;
		margin-bottom: 1.4rem;
		border-bottom: 1px solid #cccccc;
		text-align: left;
	}
	
	.allGoods .shadow_cont .shadow_title p {
		padding-top: 1.04rem;
		font-size: 0.6rem;
	}
	
	.allGoods .shadow_cont .shadow_title span {
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
	
	.allGoods .shadow_cont .shadow_title .close_btn {
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
	
	.allGoods .shadow_cont .shadow_spec {
		text-align: left;
		padding: 0 .96rem 1.76rem .96rem;
	}
	
	.allGoods .shadow_cont .shadow_spec p.sp {
		padding-bottom: 1rem;
		overflow: hidden;
	}
	
	.allGoods .shadow_cont .shadow_spec p.sp label {
		display: block;
		width: 2.48rem;
		-webkit-box-flex: 1;
		font-size: 0.48rem;
	}
	
	.allGoods .shadow_cont .shadow_spec p.sp span {
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
	
	.allGoods .shadow_cont .shadow_spec p.sp span.act {
		border-color: #eb6100;
		background: #eb6100;
		color: #ffffff;
	}
	
	.allGoods .shadow_cont .shadow_spec p.g_num label {
		width: 2.48rem;
		-webkit-box-flex: 1;
		font-size: 0.48rem;
		display: block;
	}
	
	.allGoods .shadow_cont .shadow_spec p.g_num span {
		overflow: hidden;
		display: block;
		margin-bottom: 2rem;
	}
	
	.allGoods .shadow_cont .shadow_spec p.g_num span i {
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
	
	.allGoods .shadow_cont .shadow_spec p.g_num span em {
		float: left;
		display: inline-block;
		width: 1rem;
		height: 1rem;
		background: #999;
		text-align: center;
		color: #fff;
	}
	
	.allGoods .shadow_cont .shadow_spec p.g_num span em.act {
		background-color: #ccc;
	}
	
	.allGoods .shadow_cont a.addCar {
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
	
	.allGoods .block article.active_block .go-item {
		background: #fff;
		padding: 0 23px;
		position: relative;
		height: 4.72rem;
		
	}
	
	.allGoods .block article.active_block .go-item>img {
		width: 5.8rem;
		height: 5.8rem;
		position: relative;
		top: 0.5rem;;
		float: left;

	}
	
	.allGoods .block article.active_block .go-item .info_bar {
		background: #fff;
		color: #000;
		width: 6.64rem;
		float: right;
	}
	
	.allGoods .block article.active_block .go-item .info_bar .tit {
		font-size: .64rem;
		display: -webkit-box;
		height: 1.76rem;
		line-height: .9rem;
		margin-top: .86rem;
		text-align: left;
	}
	
	.allGoods .block article.active_block .go-item .info_bar .price {
		margin-top: 1.7rem;
		margin-left: -.16rem;
		text-align: left;
		font-size: .96rem;
	}
	.allGoods span.pic {
		display: inline-block;
		width: 1.2rem;
		height: 1.4rem;
		background-image: url(../assets/search.png);
		background-repeat: no-repeat;
		background-size: cover;
	}
	
	.allGoods .header {
		left: 0;
		right: 0;
		display: flex;
		background-color: #FFFFFF;
		border-bottom: 0.1rem solid #eeeeee;
		line-height: 2rem;
		height: 2rem;
		position:fixed;
		z-index: 99;
		
	}
	
	.allGoods .close-pic {
		width: 30px;
		height: 30px;
		float: left;
		background-image: url(../imgs/close.png);
		background-repeat: no-repeat;
		margin-left: 25px;
		margin-top: 10px;
		
	}
	
	.allGoods .input {
		width: 86%;

		position: relative;
	}
	
	.allGoods input {
		border-radius: 5px;
		border: 1px solid #ccc;
		height: 1.4rem;
		width: 90%;
		padding-left: 5px;
		position: absolute;
		left: 0;
		top: .3rem;
		color: #ccc;
	}
	
	.allGoods .search-pic {
		display: inline-block;
		width: 1.4rem;
		height: 1.4rem;
		background-color: #F5F5F5;
		position: absolute;
		right: 10%;
		top: .3rem;
		border: 1px solid #ccc;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	
	.allGoods .search-pic>span {
		background-position: -32px;
	}
</style>