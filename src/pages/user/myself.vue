<template>
	<div class="myself">
	
		<!-- <x-header :left-options="{showBack: false}">我的</x-header> -->
	
		<div class="ps-detail-content">
			<div class="usericon">
				<blur :blur-amount=0 :url="backPic">
					<p class="center">
						<img v-bind:src="headPic" />
					</p>
					<p class="username">{{name}}</p>
				</blur>
				<div class="top-setting" v-on:click="logOut()">
					<!--<div class="setting-icon"></div>-->
					<span class="setting-text">退出</span>
				</div>
			</div>
			<div class="header">
				<card>
	
					<div slot="content" class="card-demo-flex card-demo-content01">
						<div class="vux-1px-l vux-1px-r">
							<router-link :to="{name:'order',params:{index:1}}">
								<span>{{orderIndex[0]}}</span>
								<br/> 待付款 </router-link>
						</div>
	
						<div class="vux-1px-r">
							<router-link :to="{name:'order',params:{index:2}}">
								<span>{{orderIndex[1]}}</span>
								<br/> 待发货 </router-link>
						</div>
	
						<div class="vux-1px-r">
							<router-link :to="{name:'order',params:{index:3}}">
								<span>{{orderIndex[2]}}</span>
								<br/> 待收货 </router-link>
						</div>
	
						<div class="vux-1px-r">
							<router-link :to="{name:'order',params:{index:4}}">
								<span>{{orderIndex[3]}}</span>
								<br/> 退换货 </router-link>
						</div>
	
						<div>
							<router-link :to="{name:'order',params:{index:5}}">
								<span>{{orderIndex[4]}}</span>
								<br/> 已完成 </router-link>
						</div>
					</div>
				</card>
			</div>
			<div class="myself-item">
				<router-link :to="{name:'order',params:{index:0}}">
					<i class="order"></i>
					<span>我的订单</span>
					<em class="right-pic"></em>
				</router-link>
				<router-link :to="{name:'address'}">
					<i class="address"></i>
					<span>地址管理</span>
					<em class="right-pic"></em>
				</router-link>
				<router-link :to="{name:'collection'}">
					<i class="collect"></i>
					<span>我的收藏</span>
					<em class="right-pic"></em>
				</router-link>
				<router-link :to="{name:'footprint'}">
					<i class="footprint"></i>
					<span>我的足迹</span>
					<em class="right-pic"></em>
				</router-link>
				<router-link :to="{name:'feedback'}">
					<i class="feedback"></i>
					<span>意见反馈</span>
					<em class="right-pic"></em>
				</router-link>
	
			</div>
		</div>
		<foot></foot>
	</div>
</template>

<script type="text/javascript">
import foot from '../../components/footer'
import { Blur, Card, XHeader, Loading } from 'vux'

export default {
	props: [],
	data() {
		return {
			name: '',
			orderIndex: [],
			url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
			headPic: '',
			backPic: 'http://i4.bvimg.com/1949/abed21e62c7dfcab.png'
		}
	},
	components: {
		Blur,
		Card,
		XHeader,
		foot,
		Loading
	},
	methods: {
		Request() {
			var that = this;
			that.$vux.loading.show({
				text: 'Loading'
			});
			var url = '/rest/my/getMyInfo';
			that.axios.get(url)
				.then(response => {
					that.$vux.loading.hide();

					if (response.data.code == '0000') {
						var message = response.data.data.member;
						that.name = message.nickname;
						if (message.faceShow) {
							that.headPic = message.faceShow;
						} else {
							that.headPic = "https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg";
						} //如果头像存在，显示，不存在，显示本地头像
						var mess = JSON.stringify(response.data.data.member);
						localStorage.setItem("myInfo", mess);
						that.getUserOrderIndex();
					} else {
						that.logOut();

					}

				});
		},
		getUserOrderIndex() {
			var that = this;
			var url = '/rest/order/getMyIndexTop';
			that.axios.get(url)
				.then(response => {
					that.$vux.loading.hide();
					var indexs = response.data.data;
					that.orderIndex = [indexs.dfk, indexs.dfh, indexs.yfh, indexs.thh, indexs.ywc];
				});

		},
		logOut() {
			var that = this;
			that.$vux.loading.show({
				text: 'Loading'
			})
			var url = '/rest/logOut';
			that.axios.get(url)
				.then(response => {
					that.$vux.loading.hide();
					localStorage.removeItem('myInfo');
					localStorage.setItem('login', false);
					that.$router.push({
						path: '/m/home'
					});
				})
		},
	},
	mounted() {

		var that = this;

		this.active("#myself");
		this.Request();

	}
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
.myself .ps-detail-content {
	background-color: #F0F2F5;
	margin-top: 0px;
	z-index: 1;
}

.myself .center {
	text-align: center;
	padding-top: 1rem;
	color: #fff;
}

.myself .center img {
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
	border: 2px solid #ececec;
	margin-top: 1rem;
}

.top-setting {
	position: absolute;
	right: 0;
	top: 1rem;
	height: 1.2rem;
	width: 3rem;
	border: 1.5px solid white;
	border-right: none;
	border-radius: .52rem 0 0 .52rem;
}

.setting-text {
	display: inline-block;
	font-size: .6rem;
	color: white;
	padding-left: .5rem;
	padding-top: .04rem;
}

.myself .username {
	font-size: .7rem;
	color: white;
}

.myself .card-demo-flex {
	display: flex;
}

.myself .card-demo-content01 {
	padding: 10px 0;
}

.myself .card-demo-flex>div {
	flex: 1;
	text-align: center;
	font-size: .55rem;
}

.myself .card-demo-flex span {
	color: #EB6100;
}

.myself .myself-item {
	margin-top: .5rem;
}

.myself .myself-item a {
	display: block;
	width: 100%;
	background-color: #fff;
	height: 2rem;
	line-height: 2rem;
	border-bottom: 1px solid #eee;
	text-align: left;
	padding-left: .5rem;
	box-sizing: border-box;
}

.myself .myself-item span {
	display: inline-block;
	line-height: 2rem;
	height: 2rem;
	margin-left: .5rem;
}

.myself .myself-item a i {
	background-image: url(../../assets/myself.png);
	display: inline-block;
	width: .8rem;
	height: 1rem;
	margin-top: .5rem;
	background-repeat: no-repeat;
	background-size: cover;
	float: left;
}

i.order {
	background-position: -3.3rem 0;
}

i.address {
	background-position: -4.1rem 0;
}

i.collect {
	background-position: -1.6rem 0;
}

i.coupon {
	background-position: -2.4rem 0;
}

i.footprint {
	background-position: 0.03rem 0;
}

i.feedback {
	background-position: -.7rem 0;
}

.myself .myself-item a em.right-pic {
	background-image: url(/static/img/myself.3827d7a.png);
	display: inline-block;
	width: 1rem;
	height: 2rem;
	background-repeat: no-repeat;
	background-size: cover;
	float: right;
	background-position: -10rem 0.1rem;
}
</style>