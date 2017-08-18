<template>
	<div class="list-brand">
		<!--顶部 top-->
		<div class="top">
			<div class="wrap">
				<div class="logo">
				</div>
				<div class="menu">
					<ul>
						<li>
							<a href="register.html">Sign up</a>
						</li>
						<li>
							<a href="shop.html">Store</a>
						</li>
					</ul>
				</div>
				<div class="keep">
				</div>
			</div>
			<div class="clear"></div>
		</div>

		<!--中间菜单brand-menu-->
		<div class="brand-menu">
			<div class="wrap">
				<ul>
					<li v-for="item in menu">
						<a href="#" v-on:click="changeBlock(item.id)">{{item.name}}</a>
					</li>
				</ul>
			</div>
			<div class="clear"></div>
		</div>

		<!--HOME页-->
		<div id="M1">
			<!--banner展示-->
			<div class="brand-banner">
				<div class="banner-wrap">
					<div class="leftPic">
						<a href="#">
							<img src="https://img.alicdn.com/imgextra/i4/5/TB2q5r2pVXXXXajXpXXXXXXXXXX_!!5-0-yamato.jpg_210x1000q90.jpg" />
						</a>
					</div>
					<div class="rightInfo">
						<h1>Classic</h1>
						<h2>White</h2>
						<p>Lorem ipsum dolor sit amet</p>
						<div class="btn">
							<a href="#">Shop Now</a>
						</div>
					</div>
				</div>
			</div>

			<!--主要内容  -->
			<div class="main">
				<div class="main-wrap">
					<!--分享栏 -->
					<div class="main-top">
						<div class="leftInfo">
							<p>Lorem ipsum dolor sit amet</p>
						</div>
						<div class="rightShare">
							<div class="share">
								<div class="sharePic">
									<a href="#">
										<img src="../../imgs/home.png" width="30px" height="30px" /></a>
								</div>
								<div class="shareInfo">
									<p>1.5k</p>
								</div>
							</div>
						</div>
					</div>
					<!--新品轮播开始-->
					<h2>新品上市</h2>
					<div class="swiper-container banner">
						<div class="swiper-wrapper">
							<div class="swiper-slide">
								<img :src="imgs.atturl" class="swiper_img" />
							</div>
						</div>
						<div class="swiper-pagination"></div>
					</div>

					<!--模块标题 -->
					<h2>本月主推</h2>
					<!--主要商品 -->
					<div class="goods-box">
						<div v-for="item in goods" class="goods">
							<div class="wrap">
								<h3 class="goodsTitle">{{item.title}}</h3>
								<p>{{item.info}}</p>
								<a href="#">
									<img v-bind:src="item.img" width="145px" />
								</a>
								<h4>￥{{item.price}}</h4>
								<div class="addCar">
									<a href="#" v-on:click="addCar">
										<div class="addCarPic"></div>
										<div class="addCarTxt">ADD TO BAG</div>
									</a>
								</div>
							</div>
						</div>
					</div>
					<h2>优惠促销</h2>
					<div class="sale">
						<div v-for="item in sale" class="sale-goods">
							<a href="#">
								<img v-bind:src="item.img" />
							</a>
							<p><span>￥{{item.price}}</span><s>￥{{item.oldPrice}}</s></p>
						</div>

					</div>

				</div>
			</div>
		</div>
		<!--MEN-->
		<div id="M2" style=" display: none;">
			<div class="men-menu">
				<!--<ul v-for="item in menTitle">					
					<li>
						{{item.name}}
					</li>					
				</ul>
			</div>	-->
				<ul>
					<li v-on:click="checkIt()" class="titleItem activeTitle">最新活动</li>
					<li v-on:click="checkIt()" class="titleItem">鞋类</li>
					<li v-on:click="checkIt()" class="titleItem">服饰类</li>
					<li v-on:click="checkIt()" class="titleItem">配件</li>
				</ul>
			</div>

			<!--<div class="shadow-block">-->
			<div class="L">
				<ul v-for="item in menNews">
					<li>
						<a href="#" class="list-txt">{{item.name}}</a>
					</li>
				</ul>
			</div>
			<div class="L" style="display: none;">
				<ul v-for="item in menShoes">
					<li>
						<a href="#" class="list-txt">{{item.name}}</a>
					</li>
				</ul>
			</div>
			<div class="L" style="display: none;">
				<ul v-for="item in menSuit">
					<li>
						<a href="#" class="list-txt">{{item.name}}</a>
					</li>
				</ul>
			</div>
			<div class="L" style="display: none;">
				<ul v-for="item in menOrther">
					<li>
						<a href="#" class="list-txt">{{item.name}}</a>
					</li>
				</ul>
			</div>

			<!--商品列表--->
			<div class="brand-list">
				<div class="wrap">
					<div class="shadow" style="display: none;">

						<div id="fullbg" class="fullbg"></div>
						<div id="dialog" class="dialog">

							<p class="close"><em>跑步鞋</em>
								<a href="#" v-on:click="closeAddCart()">关闭</a>
							</p>
							<div class="dialog-wrap">
								<em>单价:</em><em id="brand-price">{{price}}</em>

								<div class="selectIt" v-on:click="editNumber()">
									<em class="selectColor" v-for="(item,$index) in brandColor" v-on:click="cBlock($event,$index)">
										{{item}}
 										</em>
									<p>
										<input id="min" name="" type="button" value="-" style="width: 19px; height: 19px;" />
										<input id="quantity" v-model="quantity" type="text" style="width: 50px;" />
										<input id="add" name="" type="button" value="+" style="width: 19px; height: 19px;" />
									</p>
								</div>
								<div class="show-info">颜色：{{totalColor}} ||总价：{{totalPrice}}元</div>
								<div class="addSure" v-on:click="closeAddCart()">确定</div>
							</div>

						</div>

					</div>
					<div v-for="(item,$index) in info" class="brand-info">
						<div class="info-wrap">
							<div class="brand-pic">
								<img v-bind:src="item.img" />
							</div>
							<div class="brand-txt">
								<div class="brandTitle">{{item.title}}<br>
									<h4>{{item.color}}</h4></div>
								<h5>￥{{item.price}}</h5>
								<span><a href="#" v-on:click="addCart($event,$index)">买</a></span>

							</div>
						</div>
					</div>

				</div>
			</div>

		</div>
		<!--WOMEN-->
		<div id="M3" style=" display: none;">WOMEN</div>
		<!--KIDS-->
		<div id="M4" style=" display: none;">KIDS</div>
		<!--底部-->
		<div class="bottom">
			<div class="wrap">
				<div class="picTxt">
					<img src="http://www.5imoban.net/view/html/e-shop/demo/images/f_icon.png" />
					<p>Free delivery on all orders</p>
				</div>
				<div class="picTxt">
					<img src="http://www.5imoban.net/view/html/e-shop/demo/images/f_icon1.png" />
					<p>(800) 000-2587 (freephone)</p>
				</div>
			</div>
		</div>
		<foot></foot>
	</div>
</template>
<script type="text/javascript">
	import foot from '../../components/footer'
	import swipers from "../../../static/swiper.min.js"
	export default {
		props: [],
		data() {
			return {
				brandColor: [],
				brandId: '',
				price: '',
				quantity: 0,
				totalColor: '',
				menu: [{
					name: 'HOME',
					id: '1'
				}, {
					name: 'MEN',
					id: '2'
				}, {
					name: 'WOMEN',
					id: '3'
				}, {
					name: 'KIDS',
					id: '4'
				}],
				menTitle: [{
					name: '最新活动',
					id: '1'
				}, {
					name: '鞋类',
					id: '2'
				}, {
					name: '服饰类',
					id: '3'
				}, {
					name: '配件',
					id: '4'
				}],
				menNews: [{
					name: '新品上市',
					id: '1'
				}, {
					name: '折扣专区',
					id: '2'
				}],
				menShoes: [{
					name: '足球',
					id: '1'
				}, {
					name: '篮球',
					id: '2'
				}, {
					name: '网球',
					id: '3'
				}, {
					name: '跑步',
					id: '4'
				}],
				menSuit: [{
					name: '上衣',
					id: '1'
				}, {
					name: '裤子',
					id: '2'
				}],
				menOrther: [{
					name: '袜子',
					id: '1'
				}, {
					name: '书包',
					id: '2'
				}, {
					name: '手表',
					id: '3'
				}],
				imgs: {
					'atturl': [
						'http://www.adidas.com.cn/media/wysiwyg/adidas_IMG/2017/BESTSELLERS-july1-468x262.jpg'
					]
				},
				/*
				 sale:{
							'img':[
							'http://www.adidas.com.cn/media/catalog/product/cache/1/small_image/230x230/9df78eab33525d08d6e5fb8d27136e95/5/3/53_913.jpg',
							'http://www.adidas.com.cn/media/catalog/product/cache/1/small_image/230x230/9df78eab33525d08d6e5fb8d27136e95/3/2/32_928.jpg',
							'http://www.adidas.com.cn/media/catalog/product/cache/1/small_image/230x230/9df78eab33525d08d6e5fb8d27136e95/5/7/57_912.jpg']
						},
				*/
				sale: [{
					img: 'http://www.adidas.com.cn/media/catalog/product/cache/1/small_image/230x230/9df78eab33525d08d6e5fb8d27136e95/5/3/53_913.jpg',
					oldPrice: '120',
					price: '50'
				}, {
					img: 'http://www.adidas.com.cn/media/catalog/product/cache/1/small_image/230x230/9df78eab33525d08d6e5fb8d27136e95/3/2/32_928.jpg',
					oldPrice: '140',
					price: '30'
				}, {
					img: 'http://www.adidas.com.cn/media/catalog/product/cache/1/small_image/230x230/9df78eab33525d08d6e5fb8d27136e95/5/7/57_912.jpg',
					oldPrice: '120',
					price: '40'
				}],
				info: [{
					img: 'http://www.adidas.com.cn/media/catalog/product/cache/1/small_image/230x230/9df78eab33525d08d6e5fb8d27136e95/a/3/a3_631.jpg',
					title: '跑步 男子 equipment 10 u hpc 男女跑步鞋 亮白 CG4226',
					color: '1种颜色',
					price: '50',
					cart: '买',
					brandColor: [
						'黑色',
						'灰色'
					]

				}, {
					img: 'http://www.adidas.com.cn/media/catalog/product/cache/1/small_image/230x230/9df78eab33525d08d6e5fb8d27136e95/5/3/53_913.jpg',
					title: '跑步 男子 equipment 10 u hpc 男女跑步鞋 亮白 CG4226',
					color: '1种颜色',
					price: '50',
					cart: '加入购物车',
					brandColor: [
						'黑色',
						'灰色'
					]
				}, {
					img: 'http://www.adidas.com.cn/media/catalog/product/cache/1/small_image/230x230/9df78eab33525d08d6e5fb8d27136e95/5/3/53_913.jpg',
					title: '跑鞋',
					color: '1种颜色',
					price: '50',
					cart: '加入购物车',
					brandColor: [
						'白色',
						'蓝色'
					]
				}, {
					img: 'http://www.adidas.com.cn/media/catalog/product/cache/1/small_image/230x230/9df78eab33525d08d6e5fb8d27136e95/5/3/53_913.jpg',
					title: '跑鞋',
					color: '1种颜色',
					price: '50',
					cart: '加入购物车',
					brandColor: [
						'绿色',
						'灰色'
					]
				}, {
					img: 'http://www.adidas.com.cn/media/catalog/product/cache/1/small_image/230x230/9df78eab33525d08d6e5fb8d27136e95/5/3/53_913.jpg',
					title: '跑鞋',
					color: '1种颜色',
					price: '50',
					cart: '加入购物车',
					brandColor: [
						'黑色',
						'灰色'
					]
				}],
				/*		goods:{
									'img':[
									'http://www.5imoban.net/view/html/e-shop/demo/images/pic.jpg',
									'http://www.5imoban.net/view/html/e-shop/demo/images/pic1.jpg',
									'http://www.5imoban.net/view/html/e-shop/demo/images/pic2.jpg',
									'http://www.5imoban.net/view/html/e-shop/demo/images/pic3.jpg'],
									'title':[
									'ONE','TWO','THREE','FOUR','FIVE','SIX']
								},
				*/
				goods: [{
					img: 'http://www.5imoban.net/view/html/e-shop/demo/images/pic.jpg',
					title: 'ONE',
					info: '1',
					price: '200'
				}, {
					img: 'http://www.5imoban.net/view/html/e-shop/demo/images/pic1.jpg',
					title: 'TWO',
					info: '2',
					price: '100'
				}, {
					img: 'http://www.5imoban.net/view/html/e-shop/demo/images/pic2.jpg',
					title: 'THREE',
					info: '3',
					price: '120'
				}, {
					img: 'http://www.5imoban.net/view/html/e-shop/demo/images/pic3.jpg',
					title: 'FOUR',
					info: '4',
					price: '170'
				}]
			}
		},
		computed: { //vue计算器
			totalPrice: function() {
				return this.price * this.quantity;
			}
		},
		components: {
			foot
		},
		methods: {
			addCar: function(event) {
				alert('添加购物车成功！')
			},
			changeBlock: function(index) {
				for(var i = 1; i <= this.menu.length; i++) {
					if(i == index) {
						$("#M" + i + "").show();
					} else
						$("#M" + i + "").hide();
				}

			},
			shadow: function(index) {
				//					$(".ta").siblings().removeClass("haha");
				//					$(".ta").addClass("haha");

				for(var i = 1; i <= this.menTitle.length; i++) {
					if(i == index) {
						$(".shadow-block").show();
						$(".L" + i + "").show();
					} else {
						$(".L" + i + "").hide();
					}
				}
			},
			checkIt: function() {
				$(".titleItem").click(function() {
					$(this).siblings().removeClass("activeTitle");
					$(this).addClass("activeTitle");
					$(".L").css("display", "none");
					$(".L").eq($(this).index()).css("display", "block");

				});
			},
			addCart: function(e, index) {
				var bh = $("body").height();
				var bw = $("body").width();

				//			$('#fullbg').css({
				//			height:bh,
				//			width:bw,
				//			display:"block"
				//			});
				//			$("#dialog").show();
				//			objdia.show();
				this.brandColor = this.info[index].brandColor;
				this.price = this.info[index].price;
				$(".shadow").show();
			},
			closeAddCart: function() {
				var that = this;
				that.totalColor = '';
				that.quantity = 0;
				$(".shadow").hide();
			},
			cBlock: function(e, index) {
				console.log(index);
				this.totalColor = this.brandColor[index];
				$(e.target).siblings().removeClass("activeColor");
				$(e.target).addClass("activeColor");

				//	$("#select-color").html(color);

			},

			editNumber: function() {
				var that = this;
				var a = this.quantity;
				//console.log(index);
				//			var t = $("#quantity"); 
				//			var price=parseFloat($("#brand-price").text());
				//			
				//			
				//			var a=parseInt(t.val());
				//			var b;
				//			var color=$(".selectColor");  //获取选中的项

				$("#add").click(function() {
					console.log(that.quantity);
					that.quantity = a + 1;
					//b=a+1;
					//t.val(b);  
					//$("#min").removeAttr("disabled");
					//setTotal();
				})
				$("#min").click(function() {
					that.quantity = a - 1;
					//b=a-1
					if(that.quantity < 0)
						that.quantity = 0;
					//t.val(b);

					//setTotal();

				})

				function setTotal() {
					//	$("#select-color").html(color.text());
					//	$("#total").html((quantity*price).toFixed(2));
				}
				//	setTotal();
			},

			Request() {
				var url = '/rest/feature/featureDetail';
				var that = this;
				var data = {
					brandId: that.brandId
				}
				that.axios.post(url, data).then(response => {
					that.mcontent = response.data.data.brand.mcontent;

				})
			},

			mounted() {
				var banner = new Swiper('.banner', {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					loop: true,
					speed: 600,
					autoplay: 4000,
					onTouchEnd: function() {
						banner.startAutoplay()
					}
				});
			}
		}
	}
</script>
<style>
	.clear {
		clear: both;
	}
	
	.list-brand {
		color: #000000;
		background-color: #ffffff;
	}
	
	.wrap {
		width: 90%;
		margin: 0 auto;
	}
	
	.list-brand .top {
		height: 55px;
		background-color: #FFFFFF;
		margin-top: 45px;
		;
	}
	
	.list-brand .top .logo {
		height: 27px;
		width: 173px;
		background-image: url(http://www.adidas.com.cn/media/wysiwyg/adidas_IMG/2016/v2/top-5-athletics-top.png);
		float: left;
		margin-top: 19px;
	}
	
	.list-brand .top .menu {
		float: left;
		margin-top: 25px;
		margin-left: 15px;
	}
	
	.list-brand .top .menu ul li {
		display: inline-block;
	}
	
	.list-brand .top .menu ul li a {
		color: #000;
		display: block;
		margin-right: 15px;
		text-transform: uppercase;
		font-size: 2px;
	}
	
	.list-brand .top .keep {
		float: right;
		height: 25px;
		width: 25px;
		background-color: #000000;
	}
	
	.list-brand .brand-menu {
		height: 35px;
		background-color: #000000;
		border-bottom: 1px #eeeeee solid;
	}
	
	.list-brand .brand-menu ul li a {
		float: left;
		color: #FFFFFF;
		margin: 0px 22px;
		padding-top: 7px;
	}
	
	.list-brand .brand-banner {
		height: 245px;
		background-color: #ffffff;
		color: #000000;
	}
	
	.list-brand .brand-banner .banner-wrap {
		width: 70%;
		height: 100%;
		margin: 0 auto;
	}
	
	.list-brand .brand-banner .banner-wrap .leftPic {
		float: left;
		width: 72%;
		height: 100%;
	}
	
	.list-brand .brand-banner .banner-wrap .rightInfo {
		float: left;
		width: 28%;
		text-align: right;
		margin-top: 15%;
	}
	
	.list-brand .brand-banner .banner-wrap .rightInfo h1 {
		font-size: 22px;
	}
	
	.list-brand .brand-banner .banner-wrap .rightInfo h2 {
		font-size: 20px;
	}
	
	.list-brand .brand-banner .banner-wrap .rightInfo p {
		color: #999;
		font-size: 1px;
	}
	
	.list-brand .brand-banner .banner-wrap .rightInfo .btn {
		margin-top: 10px;
		border: 1px solid #C5C5C5;
	}
	
	.list-brand .brand-banner .banner-wrap .rightInfo .btn a {
		font-size: 2px;
		margin: 5px 10px;
	}
	
	.list-brand .main {
		background-color: #ffffff;
		overflow: hidden;
	}
	
	.list-brand .main .swiper-container {
		background-color: #ffffff;
		margin: 16px 0;
	}
	
	.list-brand .main .swiper_img {
		height: 7rem;
		width: 100%;
		display: block;
	}
	
	.list-brand .main h2 {
		padding-top: 15px;
		padding-bottom: 15px;
		line-height: 20px;
		color: #000000;
	}
	
	.list-brand .main .main-wrap {
		width: 90%;
		margin: 0 auto;
	}
	
	.list-brand .main .main-top {
		height: 55px;
	}
	
	.list-brand .main .main-top .leftInfo {
		padding-top: 15px;
		float: left;
		width: 40%;
	}
	
	.list-brand .main .main-top .leftInfo p {
		color: #999;
		font-size: 1px;
	}
	
	.list-brand .main .main-top .rightShare {
		float: left;
		width: 50%;
		height: 100%;
		margin-left: 25px;
	}
	
	.list-brand .main .main-top .rightShare .sharePic {
		float: left;
		width: 30%;
		height: 55px;
		padding: 7px 0;
	}
	
	.list-brand .main .main-top .rightShare .shareInfo {
		float: left;
		width: 70%;
		padding-top: 10px;
		border-bottom: 1px darkslategray solid;
	}
	
	.list-brand .main .main-top .rightShare .shareInfo p {
		float: left;
		padding-left: 45px;
		color: #000000;
		font-size: 16px;
	}
	
	.list-brand .main .goods-box {
		border-left: 1px #EEEEEE solid;
		border-bottom: 1px #EEEEEE solid;
		margin: 16px 0;
		overflow: hidden;
	}
	
	.list-brand .main .goods-box .goods {
		height: 240px;
		float: left;
		width: 50%;
		height: 100%;
		border-right: 1px #EEEEEE solid;
		border-top: 1px #EEEEEE solid;
	}
	
	.list-brand .main .goods-box .goods .wrap {
		margin: 10px 10px;
	}
	
	.list-brand .main .goods-box .goods .goodsTitle {
		color: #555;
		font-size: 0.9em;
		text-transform: uppercase;
		font-weight: 500;
		text-align: left;
		text-indent: 8px;
	}
	
	.list-brand .main .goods-box .goods p {
		text-align: left;
		text-indent: 8px;
		color: #999;
		font-size: 1px;
	}
	
	.list-brand .main .goods-box .goods h4 {
		text-align: left;
		text-indent: 8px;
		color: #000000;
		font-weight: 500;
		line-height: 35px;
	}
	
	.list-brand .main .goods-box .goods img {
		padding-top: 10px;
	}
	
	.list-brand .main .goods-box .goods .addCar {
		background-color: #CBCBCB;
		height: 30px;
		border-radius: 8px;
		width: 150px;
		margin-left: 8px;
	}
	
	.list-brand .main .goods-box .goods .addCar .addCarPic {
		width: 19%;
		height: 30px;
		background-image: url(../../../../../web/common/img/loading.png);
		float: left;
		margin-left: 10px;
	}
	
	.list-brand .main .goods-box .goods .addCar .addCarTxt {
		margin-left: 40px;
		width: 70%;
		height: 30px;
		margin-top: -27px;
		float: left;
		color: #ffffff;
		line-height: 33px;
		font-size: 14px;
	}
	
	.list-brand .main .sale {
		margin: 16px 0;
	}
	
	.list-brand .main .sale .sale-goods {
		width: 33.3%;
		flex-grow: 1;
		position: relative;
		padding: 1%;
		float: left;
	}
	
	.list-brand .main .sale .sale-goods img {
		width: 100%;
		height: 100%;
	}
	
	.list-brand .main .sale .sale-goods p {
		position: absolute;
		left: 0;
		bottom: 0;
		background-color: rgba(255, 255, 255, .8);
		width: 100%;
		font-size: .4rem;
		color: black;
		padding: .1rem;
	}
	
	.list-brand .main .sale .sale-goods p span {
		display: block;
		font-size: .8rem;
		color: black;
		font-family: "微软雅黑";
	}
	
	.list-brand .bottom {
		height: 45px;
		background-color: #000000;
	}
	
	.list-brand .bottom .picTxt {
		float: left;
		height: 45px;
		width: 50%;
		background-color: #000000;
	}
	
	.list-brand .bottom .picTxt img {
		float: left;
		margin-top: 12px;
		width: 20px;
		height: 20px;
	}
	
	.list-brand .bottom .picTxt p {
		margin-top: 14px;
		color: #ffffff;
		font-size: 1px;
	}
	
	.list-brand .men-menu {
		height: 19px;
	}
	
	.list-brand .men-menu ul li {
		/*float: left;
	  color: #000000;
	  font-size: 13px;
	  margin:0px 28px;
	  padding-top: 7px;*/
	}
	
	.list-txt {
		font-size: 12px;
		background-color: #000000;
		color: #ffffff;
	}
	
	.list-brand .brand-list {
		width: 100%;
		background-color: #ffffff;
	}
	
	.list-brand .brand-list .brand-info {
		width: 100%;
		padding: 10px 0;
		background-color: #ffffff;
		border-bottom: 1px #EEEEEE solid;
		overflow: hidden;
		height: 150px;
	}
	
	.list-brand .brand-list .brand-info .info-wrap {
		height: 4.72rem;
	}
	
	.list-brand .brand-list .brand-info .brand-pic {
		float: left;
	}
	
	.list-brand .brand-list .brand-info .brand-pic img {
		width: 130px;
		height: 120px;
	}
	
	.list-brand .brand-list .brand-info .brand-txt {
		margin-left: 155px;
		height: 6.64rem;
	}
	
	.list-brand .brand-list .brand-info .brand-txt .brandTitle {
		font-size: .64rem;
		display: -webkit-box;
		height: 1.76rem;
		line-height: .9rem;
		margin-top: 0rem;
		text-align: left;
	}
	
	.list-brand .brand-list .brand-info .brand-txt h4 {
		font-size: 1px;
		text-align: left;
		color: #262626;
		font-weight: 100;
		float: left;
	}
	
	.list-brand .brand-list .brand-info .brand-txt h5 {
		margin-top: 1.7rem;
		margin-left: -.16rem;
		text-align: left;
		font-size: .96rem;
		font-weight: normal;
	}
	
	.list-brand .brand-list .brand-info .brand-txt span {
		color: #ffffff;
		position: absolute;
		margin-top: -50px;
		margin-left: 40px;
		font-size: 15px;
		width: 45px;
		height: 45px;
		font-size: 25px;
		line-height: 45px;
		border-radius: 1rem;
		font-family: "微软雅黑";
		background-color: #fd4433;
	}
	
	.list-brand .brand-list .brand-info .brand-txt span a {
		color: #ffffff;
	}
	
	.list-brand .activeTitle {
		background-color: #000000;
		color: #ffffff;
	}
	
	.list-brand .titleItem {
		float: left;
		font-size: 13px;
		padding-left: 47.7px;
		padding-right: 20px;
		text-align: center;
		border-bottom: 1px #eeeeee solid;
	}
	
	.list-brand .L {
		background-color: #000000;
		color: #ffffff;
	}
	
	.list-brand #fullbg {
		height: 785px;
		width: 500px;
		display: block;
		background-color: gray;
		left: 0;
		opacity: 0.5;
		position: absolute;
		top: 0;
		z-index: 3;
		filter: alpha(opacity=50);
		-moz-opacity: 0.5;
		-khtml-opacity: 0.5;
	}
	
	.list-brand .shadown {
		display: none;
	}
	
	.list-brand #dialog {
		background-color: #fff;
		border: 5px solid rgba(0, 0, 0, 0.4);
		height: 230px;
		left: 45%;
		margin: -100px -100px;
		padding: 1px;
		position: fixed !important;
		/* 浮动对话框 */
		position: absolute;
		top: 50%;
		width: 250px;
		z-index: 5;
		border-radius: 5px;
		display: block;
	}
	
	.list-brand #dialog p {
		margin: 0 0 12px;
		height: 30px;
		line-height: 30px;
		background: #FD4433;
	}
	
	.list-brand #dialog p.close {
		text-align: right;
		padding-right: 10px;
	}
	
	.list-brand #dialog p.close a {
		color: #fff;
		text-decoration: none;
		border: 1px #ffffff solid;
		font-size: 13px;
	}
	
	.list-brand #dialog p.close em {
		color: #fff;
		font-size: 13px;
		margin-right: 152px;
	}
	
	.list-brand #dialog .selectColor {
		color: #cccccc;
		margin-right: 10px;
	}
	
	.list-brand #dialog h5 {
		color: #000000;
		margin-right: 50px;
		position: absolute;
		left: 50px;
		bottom: 40px;
	}
	
	.list-brand #dialog .dialog-wrap {
		margin: 0 10px;
		height: 80%;
		width: 90%;
		text-align: left;
	}
	
	.list-brand #dialog .dialog-wrap p {
		background-color: #ffffff;
		margin-top: 10px;
	}
	
	.list-brand #dialog .dialog-wrap .selectIt {
		height: 20px;
		margin: 10px 0;
	}
	
	.list-brand #dialog .show-info {
		height: 20px;
		margin-top: 50px;
	}
	
	.list-brand .activeColor {
		border: 1px #CBCBCB solid;
		color: #777777;
	}
	
	.list-brand .addSure {
		margin-top: 15px;
		border: 1px #CBCBCB solid;
		color: #FFFFFF;
		background-color: #fd4433;
		width: 100px;
		border-radius: 5px;
		text-align: center;
		margin-left: 50px;
	}
</style>