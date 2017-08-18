<template>
	<div class="store-page">
		<div class="search">
			<div class="inp">
				<input type="text" placeholder="店铺内搜索" v-on:click="goRouter()" />
				<i class="pic search-pic"></i>
			</div>
		</div>
	<!--	<scroller style="margin-top: 46px;" lock-x scrollbar-y :height=showHeight ref="scroller">-->
			<div class="block">
				<div class="header">
					<img class="bgi" :src="backgroundPic" alt="" />
					<div class="store-mess">
						<img class="logo" src="https://img10.360buyimg.com/jshopm/jfs/t6046/285/4201777712/6292/f2963ae5/595f5200N018194bd.jpg" alt="" />
						<span class="name" style="position: absolute;bottom: 22px;width: 50px;">{{storeMess.site_name}}</span>
						<span class="tag">品牌旗舰店</span>
					</div>
					<div class="collect">
						<span v-on:click="concern()">收藏</span>
						<span class="fans-num">1000 粉丝</span>
					</div>
				</div>
				<div class="nav">
					<span class="act" v-on:click="changeAct($event)"><i class="pic home"></i><em>首页</em></span>
					
					<span v-on:click="goGoods(id)"><i class="pic goods"></i><em>全部商品</em></span>
					
				
					<span v-on:click="goNewGoods(id)"><i class="pic new"></i><em>上新</em></span>
				
		
					<span v-on:click="goActivity(id)"><i class="pic active"></i><em>活动</em></span>
		
				</div>
				
				<!--<div class="banner">
					<div class="banner-swiper">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="item in imgs">
								<img :src="item.atturl" class="swiper_img" />
								<!--<p class="info">
								<span>什么牌子好</span>
								<span class="info-mess">{{item.info}}</span>
								<span>{{item.infoEng}}</span>
							</p>-->
							<!--</div>
						</div>
						<div class="swiper-pagination"></div>
					</div>
				</div>-->
				<div class="banner-index">
					<swiper loop auto :list="demo03_list" style="width:100%;" :show-dots="false" height="180px"></swiper>
				</div>
				
				<div class="adv" v-for="item in advList">
					<h3 class="title">{{item.module_name}}</h3>
					<div class="adv-block" v-for="i in item.adColumnMap.adv.advList">
						<router-link :to="{name:'storeActivity',params:{'id':i.url}}">
							<img :src="i.atturl" alt="" />
						</router-link>
						<!--<div class="adv-info">
							<span class="name">
								<em>{{i.name}}</em>
								{{i.mess}}
							</span>
							<span class="price">
								<em>{{i.price | currency}}</em>
								<i>立即购买</i>
							</span>
						</div>-->
					</div>
				</div>
			</div>
		<!--</scroller>-->
		<!--<div class="goods-list">
			<div class="list-blick" v-for="item in goodsList">
				<h3 class="list-title">{{item.title}}</h3>
				<div class="list-info" v-for="i in item.info">
					<img :src="i.src" alt="" />
					<p>{{i.title}} {{i.mess}}</p>
					<span>{{i.price | currency}}</span>
				</div>
			</div>
		</div>-->
		<foot></foot>
	</div>
</template>
<script type="text/javascript">
	import foot from '../../components/footer'
	import {Swiper,Scroller} from 'vux'
	export default {
		props: [],
		components: {
			foot,
			Swiper,
			Scroller
		},
		data() {
			return {
				showHeight:'',
				backgroundPic:'',
				advList:'',
				imgs:'',
				storeMess: [],
				demo03_list:[],
				
				imgs1: [{
						'info': '那消融の冰爽美味',
						'infoEng': 'Melting Icy delicious',
						'atturl': '//img.alicdn.com/tfs/TB1q9d3SpXXXXcSXpXXXXXXXXXX-1125-510.jpg_580x580q30s150.jpg_.webp'
					},
					{
						'info': '遇见糖果色的夏天',
						'infoEng': 'Meet a candy colored summer',
						'atturl': '//img.alicdn.com/tfs/TB1VgNDSpXXXXcZaXXXXXXXXXXX-1125-510.jpg_580x580q30s150.jpg_.webp'
					},
					{
						'info': '找把好椅来读书',
						'infoEng': 'Find a good chair to read',
						'atturl': '//img.alicdn.com/tps/i4/TB1Xbf0SXXXXXXraVXXSutbFXXX.jpg_580x580q30s150.jpg_.webp'
					},
				],
			}
		},
		methods: {
			goNewGoods(id){
				this.$router.push({ name: 'newGoods', params: {id:id}});
			},
			goActivity(id){
				this.$router.push({ name: 'activity', params: {id:id}});				
			},
			goGoods(id){
				this.$router.push({ name: 'allGoods', params: {id:id}});				
			},
			getStore1() {
				this.storeMess = this.storeList[1];
			},
			getStore(id){
				
		    var that = this;
			var url = '/rest/merchant/getMerchantById/'+id;
			that.axios.get(url).then(response => {			
				that.storeMess=response.data.data.merchant;
				
			})
			that.getMerchantAdv(id);
			},
			getMerchantAdv(id){
				  var url = '/rest/shopMerchant/getMerchantAdv';
			      var that = this;
			      var data = {
			        merchantId: id
			      }
			      that.axios.post(url, data).then(response => {
			       	var adv=response.data.data.advsList;
			       	that.backgroundPic=adv.mobile_merchant_background[0].adColumnMap.adv.advList[0].atturl;
			       	that.advList=adv.mobile_merchant_index;
			       	that.imgs=adv.mobile_merchant_banner[0].adColumnMap.adv.advList;
			       	that.demo03_list = that.imgs.map((item, index) => ({
							url: 'javascript:',
							img: item.atturl,
						}));
					that.showHeight = document.documentElement.clientHeight - 46 + 'px';
				
//					that.$nextTick(() => {
//						that.$refs.scroller.reset();
//					});	
			       	
			      })
			},
			
			
			
			concern() {

			},
			changeAct(e) {
				$(".nav span").removeClass('act');
				$(e.target).addClass('act');
				$(e.target).parent('span').addClass('act');
			},
			goRouter(){
				this.$router.push({
					'name':'storeSearch' , params: {id:this.id} 
				});
			}
		},
		mounted() {
			
			this.id = this.$route.params.storeId;
			this.getStore(this.id);

		},
	}
</script>
<style type="text/css">
	.store-page {
		background-color: #F8F8F8;
		margin-bottom: 2rem;
	}
	.store-page .banner-index {
	position: relative;
	background-color: #FFFFFF;
}
	.store-page .search {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 2rem;
		z-index: 888;
		background-color:rgba(202, 202, 202,.6);
	}
	.store-page .search.act{
		background-color: #fff;
	}
	.store-page .search.act .inp input{
		background-color: #eee;
	}
	.store-page .search.act .cate .cate-pic{
	    background-position: -14.2rem 0;
	}
	.store-page .search.act .cate span{
		color: #aaa;
	}
	.store-page .search .inp {
		position: relative;
		width: 80%;
		height: 2rem;
		line-height: 2rem;
		float: left;
		padding-left: 5%;
	}
	
	.store-page .search .inp input {
		width: 100%;
		height: 1.4rem;
		border-radius: 5px;
		border: none;
		padding-left: 1.4rem;
	}
	
	.store-page .search .inp .search-pic {
		position: absolute;
		left: 6%;
		top: .3rem;
		background-position: -4.6rem 0;
	}
	
	.store-page .search .cate {
		width: 20%;
		height: 2rem;
		line-height: 2rem;
		float: left;
		color: #fff;
	}
	
	.store-page .search .cate .cate-pic {
		background-position: -12.6rem 0;
		margin-top: 0.3rem;
		height: 1.4rem;
	}
	
	.store-page .search .cate span {
		float: right;
		margin-right: .4rem;
		font-size: .7rem;
	}
	
	.store-page i.pic {
		display: inline-block;
		width: 1.4rem;
		height: 1.2rem;
		background-image: url(../../assets/store.png);
		background-repeat: no-repeat;
		background-size: cover;
	}
	
	.store-page .header {
		width: 100%;
		height: 6rem;
		position: relative;
		color: #fff;
	}
	
	.store-page .header .bgi {
		width: 100%;
		height: 100%;
	}
	
	.store-page .header .store-mess {
		position: absolute;
		left: 0.4rem;
		bottom: .3rem;
		font-size: .6rem;
		line-height: .8rem;
		text-align: left;
		width: 250px;
	}
	
	.store-page .header .store-mess .logo {
		width: 4rem;
		float: left;
		border: 2px solid rgba(255, 255, 255, .6);
		margin-right: .2rem;
	}
	
	.store-page .header .store-mess .tag {
		background-color: #DD2727;
		font-size: .5rem;
		border-radius: 2px;
		padding: 1px 2px;
		position: absolute;
    	width: 65px;
    	bottom: 0px;
	}
	
	.store-page .header .collect {
		position: absolute;
		right: 0;
		bottom: 0;
		background-color: #DD2727;
		height: 2rem;
		line-height: 2rem;
	}
	
	.store-page .header .collect .fans-num {
		background-color: #D0021B;
		display: inline-block;
		height: 100%;
		width: 50%;
		line-height: .6rem;
		float: right;
		font-size: .6rem;
		padding-top: .4rem;
	}
	
	.store-page .nav {
		width: 100%;
		height: 3rem;
		background-color: #fff;
	}
	
	.store-page .nav span {
		display: inline-block;
		width: 25%;
		height: 3rem;
		float: left;
		padding: .4rem 0;
		border-bottom: 1px solid #EFEFEF;
	}
	
	.store-page .nav span.act {
		border-bottom: 2px solid #f00;
	}
	
	.store-page .nav span em {
		display: block;
		line-height: 0.2rem;
		font-size: .6rem;
		color: #8A8A8A;
	}
	
	.store-page .nav span.act em {
		color: #f00;
	}
	
	.store-page .nav span i.home {
		background-position-x: -5.8rem;
	}
	
	.store-page .nav span.act i.home {
		background-position-x: .24rem;
	}
	
	.store-page .nav span i.goods {
		background-position-x: -8.2rem;
	}
	
	.store-page .nav span.act i.goods {
		background-position-x: -2.1rem;
	}
	
	.store-page .nav span i.new {
		background-position-x: -6.94rem;
	}
	
	.store-page .nav span.act i.new {
		background-position-x: -0.94rem;
	}
	
	.store-page .nav span i.active {
		background-position-x: -9.5rem;
	}
	
	.store-page .nav span.act i.active {
		background-position-x: -3.4rem;
	}
	
	.store-page .banner {
		background-color: #fff;
		margin-top: .6rem;
		border-top: 1px solid #EFEFEF;
		padding: 4% 0;
		position: relative;
	}
	

	
	.store-page .banner img {
		height: 100%;
		width: 100%;
	}
	
	.store-page .adv {
		margin-top: 1rem;
	}
	
	.store-page .adv .title {
		width: 100%;
		height: 3rem;
		line-height: 3rem;
		color: #fff;
		background-image: url(../../imgs/titlebgi.png);
		-webkit-background-size: cover;
		background-size: cover;
		background-repeat: no-repeat;
	}
	
	.store-page .adv .adv-block {
		background-color: #fff;
		border-bottom: 1px solid #eee;
		overflow: hidden;
		padding: 1rem 0;
	}
	
	.store-page .adv .adv-block {
		position: relative;
	}
	
	.store-page .adv .adv-block img {
		width: 100%;
		float: left;
	}
	
	.store-page .adv .adv-block .adv-info {
		position: absolute;
		right: 20%;
		top: 50%;
		width: 60%;
		background-color: rgba(0, 0, 0, .7);
		padding: 2%;
		font-size: .4rem;
		color: #fff;
	}
	
	.store-page .adv .adv-block .name {
		display: inline-block;
		border: 1px solid #FFC90E;
		border-bottom: none;
		width: 100%;
	}
	
	.store-page .adv .adv-block .name em {
		display: block;
		font-weight: 600;
		font-size: 1rem;
	}
	
	.store-page .adv .adv-block .price {
		display: inline-block;
		border: 1px solid #FFC90E;
		border-top: none;
		width: 100%;
	}
	
	.store-page .adv .adv-block .price em {
		display: block;
		color: #FDEE03;
		font-size: .8rem;
	}
	
	.store-page .adv .adv-block .price i {
	    display: inline-block;
		font-style: normal;
		width: 4rem;
		height: 1rem;
		line-height: 1rem;
		border: 1px solid #fff;
		margin-bottom: .4rem;
	}
	
	.store-page .goods-list {
		margin-top: 1rem;
		overflow: hidden;
	}
	
	.store-page .goods-list .list-blick .list-title {
		background-color: #fff;
		line-height: 2rem;
		height: 2rem;
		text-align: left;
		text-indent: 1em;
		font-weight: 100;
		border-top: 1px solid #eee;
	}
	
	.store-page .goods-list .list-blick .list-info {
		width: 50%;
		float: left;
		padding: 2%;
		text-align: left;
		background-color: #fff;
	}
	
	.store-page .goods-list .list-blick .list-info img {
		width: 100%;
	}
	
	.store-page .goods-list .list-blick .list-info p {
		font-size: .6rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.store-page .goods-list .list-blick .list-info span {
		color: #f00;
		font-size: .5rem;
		line-height: 1rem;
	}

</style>