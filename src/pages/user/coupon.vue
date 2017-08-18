<template>
	<div class="coupon">
		<x-header style="background-color: #eb6100;">我的优惠券</x-header>
		<div class="ps-detail-content">
			<div>
				<tab :line-width=2 active-color='red' v-model="index">
					<tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in tabList" @click.native="onClickTab(index)" :key="index">{{item}}</tab-item>
	
				</tab>
	
				<scroller lock-x scrollbar-y  use-pulldown :height=showHeight @on-pulldown-loading="load3" ref="myScroller" v-model="status2">
					<div class="box2">
						<p v-for="i in couponList">
							<ul class="gift-list" id="coupon-list">
								<li>
									<a href="javascript:;" couponid="6">
										<div class="ticket-name">满100可用（全品类,满100可用）</div>
										<h2 class="ticket-price">
											50
											<span>元</span>
										</h2>
										<div class="ticket-info"></div>
										<div class="ticket-timeLimit Jtime" data-stime="2017.03.28" data-etime="2017.03.31">有效期至2017.03.31到期</div>
									</a>
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
		<foot></foot>
	</div>
</template>
<script type="text/javascript">
import { Tab, TabItem, Swiper, SwiperItem, Scroller, Spinner, XHeader } from 'vux'

export default {
	props: [],
	data() {
		return {
			index: 0,
			tabList: ["可使用", "不可使用"],
			demo2: "可使用",
			couponList: [1, 2, 3, 4],
			showHeight: "",
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
		XHeader
	},
	methods: {
		load3() {
			setTimeout(() => {
				this.$refs.myScroller.donePulldown()
			}, 2000)
		},
		onClickTab(index) {
			switch (index) {
				case 0:
					this.demo2 = '可使用';
					this.couponList = [1, 2, 3, 4];
					break;
				case 1:
					this.demo2 = '不可使用';
					this.couponList = [3, 4];
					break;

			}
			let _this = this;
			_this.$nextTick(() => {
				_this.$refs.myScroller.reset({
					top: 0
				})
			})
		}

	},
	mounted() {
		this.active("#myself");
		this.showHeight = screen.availHeight - $(".white").height() - $(".vux-tab").height() - 50 + "px";
	}
}
</script>
<style lang="less">
.coupon .ps-detail-content {
	z-index: 1;
	margin-top: 0;
	margin-bottom: 2rem;
}

.coupon .gift-list {
	padding: .4rem .52rem .1rem;
}

.coupon .gift-list li {
	width: 100%;
	height: 6.5rem;
	background: url(../../imgs/user_coupon.png) no-repeat;
	background-size: 100% auto;
	text-align: center;
}

.coupon .gift-list li .ticket-name {
	padding-top: .84rem;
	font-size: .48rem;
	color: #999;
}

.coupon .gift-list li .ticket-price {
	color: #eb6100;
	margin-top: .4rem;
	height: 1.7rem;
	line-height: 1;
	font-size: 2rem;
}

.coupon .gift-list li .ticket-info {
	height: .56rem;
	line-height: 1;
	margin-top: .44rem;
	font-size: .6rem;
	color: #eb6100;
}

.coupon .vux-header .vux-header-left a,
.vux-header .vux-header-left button,
.vux-header .vux-header-right a,
.vux-header .vux-header-right button {

	color: white;
}

.coupon .vux-header .vux-header-left .left-arrow:before {

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

.coupon .gift-list li .ticket-timeLimit {
	font-size: .4rem;
	color: #999;
	margin-top: .28rem;
}
</style>