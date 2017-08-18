<template>
	<div class="home">
	
		<headtitle></headtitle>
		<scroller style="padding-top: 46px;margin-bottom: 46px;" lock-x :height=showHeight @on-scroll="onScroll" ref="scrollerEvent">
	
			<div class="ps-content">
				<!--轮播开始-->
				<div class="banner-index">
					<swiper loop auto :list="demo03_list" style="width:100%;" :show-dots="false" height="180px">
	
					</swiper>
				</div>
				<!--轮播结束-->
				<!--首页导航按钮-->
				<div class="index-active">
					<ul class="activeList clearfix">
						<li v-for="activity in activity_list">
							<!--<a :href="activity.url">-->
							<router-link :to="{name:activity.url}">
								<img :src="activity.imageShow">
								<div class="active-info">{{activity.name}}</div>
							</router-link>
						</li>
					</ul>
				</div>
	
				<!--商城快报 -->
				<div class="News">
					<img src="../imgs/news.png" />
					<div class="news">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="item in news">
								<p>
									<em>{{item.title}}</em>
								</p>
							</div>
						</div>
					</div>
				</div>
	
				<!-- 店铺专题广告位 -->
				<div class="index-design" v-for="item in mobile_feature_adv" key="item">
					<div class="index-tit1">
						<h3>{{item.adColumnMap.adv.advList[0].module_name}}
							<router-link :to="{name:'theme',params:{id:item.adColumnMap.link.advList[0].url}}">
								<span class="more">查看更多</span>
							</router-link>
						</h3>
					</div>
					<router-link :to="{name:'themeInfo',params:{id:item.adColumnMap.adv.advList[0].url}}">
						<div class="design-banner">
							<img slot="icon" :src="item.adColumnMap.link.advList[0].atturl" style="animation-name: slideOut; animation-duration: 0.2s;">
							<div class="design-box">
								<div class="design-tip">
									<div class="des">
										{{item.adColumnMap.adv.advList[0].advdesc}}
									</div>
								</div>
							</div>
						</div>
					</router-link>
				</div>
	
				<!-- 商品广告位 -->
				<div class="index-design" v-show="goodsList.length != 0">
					<div class="index-tit index-tit2">
						<h3 style="text-align: left;font-size: 100%">人气推荐</h3>
					</div>
					<ul class="new-list clearfix">
						<li v-for="item in goodsList" key="item" class="goodsItem" v-on:click="add(item.goods_id)">
	
							<div class="goodsItem-img">
								<img slot="icon" v-bind:src="item.atturl" style="animation-name: slideOut; animation-duration: 0.2s;">
							</div>
							<div class="info-bar">
								<div class="tit">{{item.aname}}</div>
								<div class="price">￥{{item.price}}</div>
							</div>
	
						</li>
					</ul>
				</div>
			</div>
		</scroller>
		<foot></foot>
	</div>
</template>

<script type="text/javascript">
import headtitle from '../components/header'
import foot from '../components/footer'
import {
	Grid,
	GridItem,
	GroupTitle,
	Flexbox,
	FlexboxItem,
	Scroller,
	Loading,
	Swiper
} from 'vux'
export default {
	props: [],
	data() {
		return {
			showHeight: '',
			scrollTop: 0,
			bannerList: [], //轮播图
			menuList: [],
			activity_list: [],
			inspiration_list: [], //楼层广告位
			inspiration_goods: [],
			mobile_feature_adv: [],
			news: [],
			goodsList: [],
			demo03_list: [],
		}
	},
	components: {
		headtitle,
		foot,
		Grid,
		GridItem,
		GroupTitle,
		Flexbox,
		FlexboxItem,
		Scroller,
		Loading,
		Swiper
	},
	methods: {
		onScroll(pos) {
			if (pos.top <= 0) {
				$(".headerContent .white").addClass("act");

			} else {
				$(".headerContent .white").removeClass("act");

			}
		},
		// 首页导航按钮
		activelist() {
			var that = this;
			var url = '/rest/index/getIndexGrav';
			that.axios.get(url)
				.then(response => {

					that.activity_list = response.data.data.navList;
					that.shopmall();
					that.$vux.loading.hide();
					that.$nextTick(() => {
						that.$refs.scrollerEvent.reset();
					})
				})
		},
		//shopmall
		shopmall() {
			var url = '/rest/index/getShopMall';
			var that = this;
			that.axios.get(url)
				.then(response => {
					that.news = response.data.data.shopMallList;
					that.$vux.loading.hide();
					that.$nextTick(() => {
						that.$refs.scrollerEvent.reset()
					})
				})
		},
		//广告
		getAdvert() {
			var url = '/rest/index/getAdv';
			var that = this;
			that.axios.get(url)
				.then(response => {
					that.menuList = response.data.data.menuList;
					if (response.data.data.advsList.mobile_banner.length > 0) {
						that.bannerList = response.data.data.advsList.mobile_banner[0].adColumnMap.banner.advList; //轮播图
						that.demo03_list = that.bannerList.map((item, index) => ({
							url: 'javascript:',
							img: item.atturl,
							title: item.aname
						}));

					}
					if (response.data.data.advsList.mobile_feature_adv.length > 0 || response.data.data.advsList.mobile_feature_adv != null) {
						that.mobile_feature_adv = response.data.data.advsList.mobile_feature_adv;
					}
					if (response.data.data.advsList.goods_adv.length > 0) {
						that.goodsList = response.data.data.advsList.goods_adv[0].adColumnMap.adv_1.advList; //商品广告位	

					}
					that.activelist();

				})
		},
		//      添加类名
		add_img_class() {
			$(".ps_moddle_pic div").eq(0).addClass("ps_wx_imgouter3");
			$(".ps_moddle_pic div:gt(0)").addClass("ps_wx_imgouter4");
		},
		//      判断单双数
		block_odd() {
			$(".px_wbox.activeSpec-goods").each(function () {
				var len = $(this).find(".activeSpec-item").length;
				if (len % 2 == 1) {
					$(this).find(".activeSpec-item").eq(len - 1).addClass("px_spec");
				}
			})
		},
		add(index) {
			this.$router.push({ name: 'productDetail', params: { pro_id: index } });
			this.$router.go(0);

		}
	},
	mounted() {
		this.showHeight = document.documentElement.clientHeight - 46 + 'px';
		$(".headerContent .white").addClass("act");
		this.$vux.loading.show({
			text: 'Loading'
		});
		this.active("#home");
		var sessionid = localStorage.getItem("sessionid");
		if (sessionid == null) {

			this.axios.get('/rest/wechat/getToken')
				.then(response => {
					localStorage.setItem("sessionid", response.data.data.token);
					this.getAdvert();

				})

		} else {
			this.getAdvert();

		}

	},


}
</script>

<style>
@import "../../reset.css";
@import '../../static/swiper.min.css';
.home {
	background-color: #ffffff;
	overflow: hidden
}

.home .vux-slider>.vux-swiper>.vux-swiper-item>a>.vux-swiper-desc {

	font-size: 14px;
}

.home .banner-index {
	background-color: #ffffff;
}

.home .swiper_img {
	height: 7rem;
	width: 100%;
	display: block;
}

.home .banner-index {
	position: relative;
}

.index-tit1 :after {
	position: absolute;
	right: .44rem;
	top: 50%;
	/* color: #999; */
	display: inline-block;
	border: solid #999;
	border-width: .06rem 0 0 .06rem;
	-webkit-transform: rotate(135deg);
	margin-top: -0.15rem;
	width: .24rem;
	height: .24rem;
	content: '';
}

.home .banner-name {
	position: absolute;
	left: 0;
	bottom: 0;
	display: block;
	width: 100%;
	height: 1.4rem;
	line-height: 1.4rem;
	background: rgba(0, 0, 0, .5);
	color: #fff;
	text-align: left;
	padding-left: .4rem;
	font-size: .6rem;
}



























/*首页活动样式*/

.home .index-active {
	width: 100%;
	min-height: 4.8rem;
	padding-top: 0.66rem;
	background: #fff;
}

.home .index-active ul li {
	width: 100%;
	text-align: center;
	width: 25%;
	float: left;
}

.home .index-active ul li img {
	width: 1.96rem;
	height: 1.96rem;
	margin: 0 auto;
}

.home .index-active ul li .active-info {
	height: 1.52rem;
	padding-top: 0.4rem;
	font-size: 0.48rem;
	color: #666;
}

.home .News {
	border-top: 1px solid #F3F3F3;
	border-bottom: 1px solid #F3F3F3;
	overflow: hidden;
	height: 2rem;
}

.home .News img {
	width: 20%;
	float: left;
	margin-left: 2%;
	margin-top: .5rem;
}

.home .News .news {
	width: 75%;
	height: 2rem;
	line-height: 2rem;
	float: left;
	text-align: left;
}

.home .News .news p {
	font-size: .5rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	text-align: center;
}

.home .News .news p em {
	color: #f00;
	margin: 0 5px;
	font-size: .6rem;
}

.home .vux-slider>.vux-swiper>.vux-swiper-item>a>.vux-swiper-desc {

	padding: 20px 55px 29px 20px;

	text-align: left;
}

.index-design {
	width: 100%;
	height: auto;
	position: relative;
}

.index-tit1 h3 {
	color: #232323;
	text-align: left;
}

.index-tit1 h3 span {
	float: right;
	padding-right: .3rem;
	font-size: .48rem;
	color: #666;
	font-weight: 100;
}

.index-design .design-banner img {
	width: 14.12rem;
	height: 7.52rem;
}

.index-design .design-banner .design-box {
	width: 12.6rem;
	height: 2.7rem;
	position: absolute;
	top: 6.48rem;
	left: 50%;
	margin-left: -6.3rem;
	background-size: 11.6rem auto;
	background-position: .52rem bottom;
}

h3 {
	font-size: 100%;
	font-weight: 500;
}

body,
div,
h3,
img,
li,
p,
ul {
	margin: 0;
	padding: 0;
	font-family: Arial, PingFangSC-Regular, Helvetica, "Droid Sans", sans-serif;
}

.clearfix:after {
	visibility: hidden;
	display: block;
	font-size: 0;
	content: ".";
	clear: both;
	height: 0;
	overflow: hidden;
}

.index-design .design-banner .design-box .design-tip {
	width: 100%;
	height: 2.4rem;
	border: 1px solid #eee;
	display: flex;
	align-items: center;
	text-align: center;
	background: #fff;
	box-shadow: 3px 3px 4px #eee;
}

.design-box .design-tip .des {
	width: 8.92rem;
	font-size: .56rem;
	margin-left: 1.84rem;
	margin-right: 1.84rem;
	color: #232323;
}

.index-design .design-banner {
	width: 14.12rem;
	height: 9.4rem;
	margin: 0 .94rem;
	position: relative;
}

.index-tit1 {
	width: 100%;
	height: 1.8rem;
}

.index-tit1 {
	display: block;
	width: 100%;
	height: 1.8rem;
	padding: .44rem;
	position: relative;
	line-height: .92rem;
	font-size: .56rem;
}

.index-design .index-tit {
	padding: .44rem;
	font-size: .56rem;
	background: #fff;
}

.new-list {
	background: #fff;
	padding-left: 17px;
}

.new-list li {
	float: left;
	width: 50%;
	height: auto;
	margin-bottom: 0.4rem;
	margin-right: 15px;
}

.new-list .goodsItem-img img {
	width: 5.2rem;
	height: 5.2rem;
}

.new-list li {
	display: block;
	width: 6.92rem;
	border: 1px solid #eee;
}

.new-list .info-bar .tit {
	display: -webkit-box;
	font-size: 0.52rem;
	height: 1.16rem;
	line-height: 0.64rem;
	width: 100%;
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

.new-list .info-bar {
	height: 2.96rem;
	padding: 0.2rem 0.6rem;
}

.new-list .info-bar .price {
	font-size: 0.76rem;
	margin-top: 0.4rem;
	margin-left: -0.06rem;
	text-align: center;
	color: #eb6100;
	width: 100px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>