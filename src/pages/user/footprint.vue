<template>
	<div class="footprint">
		<x-header style="background-color: #eb6100;">我的足迹</x-header>
		<scroller style="margin-top: 46px;" lock-x :height=showHeight ref="scrollerEvent">
			<div class="ps-content">
				<ul class="pro-list clearfix">
					<li v-for="one in footPrint">
						<div v-on:click="add(one.goods_id)">
							<img :src="one.thumbnail">
							<div class="info-bar">
								<div class="tit">{{one.name}}</div>
								<span class="price" v-if="one.coupPrice > 0">{{one.coupPrice | currency}}</span>
								<span class="price">{{one.price | currency}}</span>
	
							</div>
						</div>
					</li>
				</ul>
			</div>
		</scroller>
	
	</div>
</template>
 <script type="text/javascript">
import { XHeader, Scroller,Loading } from 'vux'

export default {
	props: [],
	data() {
		return {
			footPrint: [],
			showHeight: '',
		}
	},
	components: {
		XHeader,
		Scroller,
		Loading
	},
	methods: {
		footprint() {
			var that=this;
				that.$vux.loading.show({
								text: 'Loading'
							})
			var url = '/rest/visited/getMyVisitedList';
			that.axios.get(url).then(response => {
			
				that.footPrint = response.data.data.visitedList;
				that.$nextTick(() => {
					that.$refs.scrollerEvent.reset()
				})
				that.$vux.loading.hide();
			})

		},

		add(index) {

			this.$router.push({
				name: 'productDetail',
				params: {
					pro_id: index
				}
			});

		}
	},
	mounted() {
		this.showHeight = document.documentElement.clientHeight - 46 + 'px';
		this.footprint();
	}
}
</script>
<style lang="less">
.footprint .ps_love_outer {
	background: url(../../imgs/ps_maybe_love.png) no-repeat;
	background-size: 100% 100%;
	height: 1.7rem !important;
	margin: 0.72rem 0 0.72rem 0;
}

.footprint .pro-list {
	background: #fff;
	padding-bottom: 0.5rem;
	overflow: hidden;
}

.footprint .pro-list li {
	float: left;
    overflow: hidden;
    margin-top: .2rem;
    width: 45%;
    height: 7.4rem;
    position: relative;
    margin-left: 0.77rem;
    margin-bottom: 15px;

}

.footprint .pro-list li:nth-child(even) {
	margin-left: 0;
	margin-right: 0.77rem;
}

.footprint .pro-list li img {
	width: 5.2rem;
	height: 5.2rem;
	display: block;
	margin: 0 auto;
	color: #000000;
}

.footprint .vux-header .vux-header-left a,
.vux-header .vux-header-left button,
.vux-header .vux-header-right a,
.vux-header .vux-header-right button {

	color: white;
}

.footprint .vux-header .vux-header-left .left-arrow:before {

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

.footprint .pro-list li a {
	margin: 0 .5rem;
	position: relative;
	height: 100%;
	display: block;
}

.footprint .pro-list li .info-bar {
	position: absolute;
	left: 1.7rem;
	bottom: -1rem;
	height: 2.62rem;
	width: 64%;
	background: #ffffff;
}

.footprint .pro-list li .info-bar:nth-child(odd) {
	left: 0;
	right: 1.7rem;
}

.footprint .pro-list .info-bar .tit {
	font-size: .48rem;
	height: .68rem;
	line-height: .68rem;
	margin: .2rem 0 0;
	overflow: hidden;
	text-align: left;
}

.footprint .pro-list .info-bar .price {
	font-size: 0.56rem;
	display: block;
	text-align: left;
}

.footprint .pro-list .info-bar .price i {
	padding-right: 0.24rem;
}
</style>