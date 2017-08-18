<template>
	<div class="merchant">
		<x-header style="background-color: #eb6100;">周边商家</x-header>
	
		<scroller style="margin-top: 46px;" lock-x :height=showHeight ref="scrollerEvent">
			<div class="storeList">
				<div class="storeItem" v-for="item in merchantList">
					<div class="storeInfo" v-on:click="OnClickStore(item)">
						<div class="storeTitle">{{item.site_name}}</div>
						<div class="range">{{item.distance}}{{item.parasang}}</div>
						<h4>{{item.address}}</h4>
					</div>
				</div>
			</div>
	
		</scroller>
	
		<el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
		</el-amap>
	</div>
</template>

<script>
import { XHeader, Loading, Scroller } from 'vux'

export default {

	data() {
		let self = this;
		return {
			merchantList: [],
			showHeight: "",
			center: [121.59996, 31.197646],
			lng: 0,
			lat: 0,
			loaded: false,
			plugin: [{
				pName: 'Geolocation',
				events: {
					init(o) {
						// o 是高德地图定位插件实例
						o.getCurrentPosition((status, result) => {
							if (result && result.position) {
								self.lng = result.position.lng;
								self.lat = result.position.lat;
								self.center = [self.lng, self.lat];
								self.getShopList();
							}
						});
					}
				}
			}]
		}
	},
	components: {
		XHeader,
		Loading,
		Scroller

	},
	methods: {
		getShopList() {
			var that = this;
			var parameters = { 'latitude': that.lat, 'longitude': that.lng };
			console.log(parameters);
			var url = '/rest/find/findMerchant';
			that.axios.post(url, parameters)
				.then(response => {
					console.log(response);
					that.merchantList = response.data.data.merchantList;
					that.$vux.loading.hide();
					that.$nextTick(() => {
						that.$refs.scrollerEvent.reset();
					})
				})

		},
		OnClickStore(item) {
			localStorage.setItem("storeInfo", JSON.stringify(item));
			this.$router.push({ name: 'map'});
			console.log(item);
		}

	},
	mounted() {
		this.showHeight = document.documentElement.clientHeight - 46 + 'px';
		this.$vux.loading.show({
			text: '正在定位'
		});

	}

}
</script>

<style>
.merchant .storeItem {
	height: 100px;
	padding: 10px 0;
}


.merchant .vux-header .vux-header-left a,
.vux-header .vux-header-left button,
.vux-header .vux-header-right a,
.vux-header .vux-header-right button {

	color: white;
}

.merchant .vux-header .vux-header-left .left-arrow:before {

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

.merchant .storeList {
	padding-bottom: 5px;
}

.merchant .storeItem .storeInfo {
	padding: 10px;
	text-align: left;
	height: 90px;
	border-bottom: 1px #EBEBEB solid;
}

.merchant .storeInfo .storeTitle {
	font-weight: 500;
	font-size: 20px;
	width: 180px;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical
}

.merchant .storeInfo h4 {
	font-weight: normal;
	font-size: 13px;
	margin-top: 10px;
	width: 75%;
	color: #6C6C6C;
}

.merchant .storeInfo .range {
	float: right;
	color: #666666;
	margin-left: 230px;
	margin-top: -20px;
	font-size: 13px;
}
</style>
