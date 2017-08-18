<template>
	<div class="store-list">
		<x-header style="background-color: #eb6100">品牌管理</x-header>
		<scroller style="margin-top: 46px;" lock-x :height=showHeight ref="scrollerEvent">
			<div style="overflow:hidden">
				<!--轮播广告位-->
	
				<!--<div class="swiper-container banner">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="item in mobile_merchant_banner">
							<img :src="item.atturl" class="swiper_img" />
							<p class="info">
								<span>{{item.aname}}</span>
								<span class="info-mess">{{item.advdesc}}</span>
							</p>
						</div>
					</div>
					<div class="swiper-pagination"></div>
				</div>-->
				<div class="banner-index">
					<swiper loop auto :list="demo03_list" style="width:100%;" :show-dots="false" height="180px"></swiper>
				</div>
	
				<!--<div class="swiper-container banner">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="item in imgs">
								<img :src="item.atturl" class="swiper_img" />
								<p class="info">
									<span>什么牌子好</span>
									<span class="info-mess">{{item.info}}</span>
									<span>{{item.infoEng}}</span>
								</p>
							</div>
						</div>
						<div class="swiper-pagination"></div>
					</div>-->
	
				<!--店铺广告位-->
				<div class="site">
					<div class="site-block" v-for="item in advBrand">
						<img :src="item.src" alt="" />
						<p>
							<span>{{item.title}}</span>{{item.info}}</p>
					</div>
				</div>
				<!--店铺列表-->
				<div class="brand">
					<div v-for="item in mobile_merchant" class="item">
						<router-link :to="{name:'store',params:{'storeId':item.url}}">
							<img v-bind:src="item.atturl" />
						</router-link>
					</div>
				</div>
				<!--商品列表-->
				<div class="pic-adv">
					<div v-for="item in mobile_recommand_activity" class="item">
						<div v-for="item in item.adColumnMap.adv.advList">
							<router-link :to="{name:'storeActivity',params:{'id':item.url}}">
								<img v-bind:src="item.atturl" />
								<p>
									<span class="title">{{item.aname}}</span>{{item.advdesc}}
									<span class="time">{{item.time}}</span>
								</p>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</scroller>
	
	</div>
</template>
<script type="text/javascript">
import swipers from "../../../static/swiper.min.js"
import { Scroller, Spinner, XHeader,Swiper } from 'vux'

export default {
	props: [],
	components: {
		XHeader,
		Scroller,
		Swiper
	},
	data() {
		return {
			demo03_list:[],
			showHeight: '',
			mobile_merchant_banner: '',
			mobile_merchant: '',
			mobile_recommand_activity:'',
			imgs: [
				{ 'info': '那消融の冰爽美味', 'infoEng': 'Melting Icy delicious', 'atturl': '//img.alicdn.com/tfs/TB1q9d3SpXXXXcSXpXXXXXXXXXX-1125-510.jpg_580x580q30s150.jpg_.webp' },
				{ 'info': '遇见糖果色的夏天', 'infoEng': 'Meet a candy colored summer', 'atturl': '//img.alicdn.com/tfs/TB1VgNDSpXXXXcZaXXXXXXXXXXX-1125-510.jpg_580x580q30s150.jpg_.webp' },
				{ 'info': '找把好椅来读书', 'infoEng': 'Find a good chair to read', 'atturl': '//img.alicdn.com/tps/i4/TB1Xbf0SXXXXXXraVXXSutbFXXX.jpg_580x580q30s150.jpg_.webp' },
			],
			advBrand: [{
				'src': '//img.alicdn.com/tps/i4/TB1q3f5PVXXXXcGaXXXSutbFXXX.jpg_300x300q30s150.jpg_.webp',
				'title': '为你推荐',
				'info': '不及回眸一笑',
			}, {
				'src': '//img.alicdn.com/tps/i4/TB1DhP7RVXXXXcoXpXXSutbFXXX.jpg_300x300q30s150.jpg_.webp',
				'title': '大牌入驻',
				'info': 'GET天猫最新大牌',
			}, {
				'src': '//img.alicdn.com/tps/i4/TB1t0f9RVXXXXbtXpXXSutbFXXX.jpg_300x300q30s150.jpg_.webp',
				'title': '什么牌子好',
				'info': '优质品牌最新指南',
			}],
			brands: {
				'img': [
					'//img.alicdn.com/bao/uploaded/TB1T0E_IXXXXXbBaXXXwu0bFXXX.png_150x150q50s150.jpg_.webp',
					'//img.alicdn.com/bao/uploaded/TB196F.LpXXXXXZaXXXSutbFXXX.jpg_150x150q50s150.jpg_.webp',
					'//img.alicdn.com/bao/uploaded/TB1C8TCKVXXXXX0apXXSutbFXXX.jpg_150x150q50s150.jpg_.webp',
					'//img.alicdn.com/bao/uploaded/TB1a9UiRVXXXXaiXXXXXXXXXXXX?abtest=&pos=4&abbucket=&acm=03518.1003.1.224415&scm=1003.1.03518.BRAND_4533216_224415_150x150q50s150.jpg_.webp',
					'//img.alicdn.com/bao/uploaded/TB1H4McKFXXXXcaXFXXSutbFXXX.jpg_150x150q50s150.jpg_.webp',
					'//img.alicdn.com/bao/uploaded/TB1BYnWKXXXXXaeXFXXSutbFXXX.jpg_150x150q50s150.jpg_.webp',
					'//img.alicdn.com/bao/uploaded/TB1Qxj7RVXXXXcpXFXXXXXXXXXX?abtest=&pos=7&abbucket=&acm=03518.1003.1.224415&scm=1003.1.03518.BRAND_116296827_224415_150x150q50s150.jpg_.webp',
					'//img.alicdn.com/bao/uploaded/TB1LdWsSpXXXXaQXXXXXXXXXXXX?abtest=&pos=8&abbucket=&acm=03518.1003.1.224415&scm=1003.1.03518.BRAND_87794701_224415_150x150q50s150.jpg_.webp',
					'//img.alicdn.com/bao/uploaded/TB16cJPIpXXXXaqXpXXSutbFXXX.jpg_150x150q50s150.jpg_.webp'
				]
			},
			goods: [{
				'src': 'http://b1.hucdn.com/upload/show/1612/13/35191856381601_750x350.jpg!750x350.webp',
				'title': '1.4折起',
				'info': '手表的时尚聚会',
				'time': '剩4天',
			},
			{
				'src': 'http://b1.hucdn.com/upload/show/1702/15/54988875003635_750x350.jpg!750x350.webp',
				'title': '3折起',
				'info': '夏季热卖女装专场',
				'time': '剩4天',
			},
			{
				'src': 'http://b1.hucdn.com/upload/show/1602/15/26523201395791_750x350.jpg!750x350.webp',
				'title': '3.2折起',
				'info': '品质婴装夏季清仓',
				'time': '剩4天',
			},
			{
				'src': 'http://b1.hucdn.com/upload/show/1702/24/18479357715771_750x350.jpg!750x350.webp',
				'title': '3.5折起',
				'info': '轻松孕期生活',
				'time': '剩4天',
			},
			{
				'src': 'http://b1.hucdn.com/upload/show/1602/27/73750088971538_750x350.jpg!750x350.webp',
				'title': '1.1折起',
				'info': '蜗家家居收纳专场',
				'time': '剩4天',
			},
			{
				'src': 'http://b1.hucdn.com/upload/show/1607/22/84168501701735_750x350.jpg!750x350.webp',
				'title': '2.1折起',
				'info': '解放妈妈双手',
				'time': '剩4天',
			},
			{
				'src': 'http://b1.hucdn.com/upload/show/1607/13/01308666249069_750x350.jpg!750x350.webp',
				'title': '2.7折起',
				'info': '睡衣的韩版时尚潮流',
				'time': '剩4天',
			}
			]
		}
	},
	methods: {
		change() {

		},
		getStore() {
			var advList;
			var url = '/rest/index/getAdv';
			var that = this;
			that.axios.get(url)
				.then(response => {
					advList = response.data.data.advsList;
					that.mobile_merchant = advList.mobile_merchant[0].adColumnMap.adv.advList;
					that.mobile_merchant_banner = advList.mobile_merchant_banner[0].adColumnMap.adv.advList;
					that.demo03_list = that.imgs.map((item, index) => ({
							url: 'javascript:',
							img: item.atturl,
					}));
					that.mobile_recommand_activity=advList.mobile_recommand_activity;
					that.showHeight = document.documentElement.clientHeight - 50 + 'px';
					that.$nextTick(() => {
						that.$refs.scrollerEvent.reset()
					})
				})
		}
	},
	watch: {

	},
	mounted() {
		this.getStore();
//		var banner = new Swiper('.banner', {
//			pagination: '.swiper-pagination',
//			paginationClickable: true,
//			loop: true,
//			speed: 600,
//			autoplay: 4000,
//			onTouchEnd: function () {
//				banner.startAutoplay()
//			}
//		});
	},
}
</script>
<style type="text/css">
@import '../../../static/swiper.min.css';
.store-list {
	background-color: #fff;
}

.store-list .swiper-container {
	background-color: #ffffff;
}

.store-list .swiper_img {
	height: 7rem;
	width: 100%;
	display: block;
}

.store-list .swiper-container .swiper-slide {
	position: relative;
}

.store-list .vux-header .vux-header-left a,
.vux-header .vux-header-left button,
.vux-header .vux-header-right a,
.vux-header .vux-header-right button {

	color: white;
}

.store-list .vux-header .vux-header-left .left-arrow:before {

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

.store-list .swiper-container .info {
	position: absolute;
	left: 12%;
	top: 2.5rem;
	display: inline-block;
	width: 76%;
	height: 3.2rem;
	background-color: rgba(255, 255, 255, .8);
	padding: .55rem;
}

.store-list .swiper-container .info span {
	display: block;
	font-size: .3rem;
}

.store-list .swiper-container .info .info-mess {
	font-size: 1rem;
}

.store-list .site {
	display: -webkit-flex;
	display: flex;
	margin-top: .1rem;
	justify-content: space-around;
	padding: 1%;
}

.store-list .site-block {
	width: 30%;
	flex-grow: 1;
	position: relative;
	padding: 1%;
}

.store-list .site-block img {
	width: 100%;
	height: 100%;
}

.store-list .site-block p {
	position: absolute;
	left: 0;
	bottom: 0;
	background-color: rgba(255, 255, 255, .8);
	width: 100%;
	font-size: .4rem;
	color: #666;
	padding: .1rem;
}

.store-list .site-block p span {
	display: block;
	font-size: .8rem;
	color: #333;
}

.store-list .brand {
	overflow: hidden;
	border-left: 1px solid #eeeeee;
	width: 97%;
	margin-left: auto;
	margin-right: auto;
}

.store-list .brand .item {
	width: 25%;
	float: left;
	border-top: 1px solid #eeeeee;
	border-bottom: 1px solid #eeeeee;
	border-right: 1px solid #eeeeee;

	box-sizing: border-box;
	height: 88px;
	padding: 10px;
}

.store-list .brand .item:nth-child(3n) {
	border-right: 1px solid #eee;
}

.store-list .brand .item img {
	width: 60px;
	height: 60px;
}

.store-list .pic-adv {
	overflow: hidden;
	margin-top: .5rem;
	background-color: #F2F2F2;
	padding-bottom: .3rem;
}

.store-list .pic-adv .item {
	width: 100%;
	height: 10rem;
	display: block;
	margin-bottom: .6rem;
	background-color: #fff;
	text-align: left;
}

.store-list .pic-adv .item:last-child {
	margin-bottom: 0;
}

.store-list .pic-adv .item a {
	display: block;
}

.store-list .pic-adv .item img {
	width: 100%;
	height: 8rem;
	float: left;
}

.store-list .pic-adv .item p {
	padding: 0 .6rem;
	font-size: .6rem;
	border-top: 1px solid #F5F5F5;
	border-bottom: 1px solid #F5F5F5;
	width: 100%;
	height: 2rem;
	line-height: 2rem;
	float: left;
}

.store-list .pic-adv .item .title {
	color: #f00;
	margin-right: .2rem;
}

.store-list .pic-adv .item .time {
	float: right;
}
</style>