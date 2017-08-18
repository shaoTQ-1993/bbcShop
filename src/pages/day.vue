<template>
	<div class="day">
		<x-header style="background-color: #eb6100;">每日专题</x-header>
		<scroller style="margin-top: 46px;" lock-x :height=showHeight ref="scrollerEvent">
	
			<div class="themeList">
				<div class="themeItem" v-for="item in featureList">
					<div class="banner">
						<div class="title">
							<div>{{item.keyWord}}</div>
							<em v-on:click="themeInfo"></em>
						</div>
						<img :src="item.mimgShow " />
	
					</div>
	
					<div class="themeTxt">
						<h4>{{item.title}}</h4>
						<div class="themeInfo">
							{{item.abStract}}
						</div>
					</div>
	
				</div>
	
			</div>
		</scroller>
	
	</div>
</template>
<script type="text/javascript">
import { XHeader, Loading, Scroller } from 'vux'
export default {
	props: [],
	data() {
		return {
			featureList: [],
			showHeight: '',


		}
	},
	components: {
		XHeader,
		Loading,
		Scroller
	},
	methods: {
		getAllFeatureList: function () {
			var url = '/rest/feature/getAllFeatureList';
			var that = this;
			that.axios.get(url)
				.then(response => {
					that.featureList = response.data.data.featureList;
					console.log(that.featureList);
					that.$nextTick(() => {
						that.$refs.scrollerEvent.reset()
					})
					that.$vux.loading.hide();
				})
		},
		themeInfo(){
			
		},
	},
	mounted() {
		this.showHeight = document.documentElement.clientHeight - 46 + 'px';
		this.$vux.loading.show({
			text: 'Loading'
		});
		this.getAllFeatureList();

	}
}
</script>
<style type="text/css">
.fl {
	float: left;
}

.rl {
	float: right;
}

.day .themeList {

	margin: 10px;
}

.day .themeItem {
	background-color: #ffffff;
	height: 280px;
}

.day img {
	width: 100%;
	height: 150px;
}

.day .themeTxt {
	padding: 5px 0px;
}

.day h4 {
	margin-top: 5px;
	font-size: 23px;
	color: #000000;
}

.day .themeInfo {
	margin-top: 10px;
	text-align: center;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	font-size: 15px;
	padding: 0 10px;
	color: #BFBFBF;
}

.day .like {
	margin-right: 10px;
}

.day .like .icon {
	width: 28px;
	height: 28px;
	background: url(../imgs/haha.png);
}

.day .like i {
	display: inline-block;
	background-repeat: no-repeat;
	-webkit-background-size: 100%;
	background-size: 100%;
	margin-right: 8px;
}

.day .like b {
	margin-top: 3px;
	float: left;
	font-weight: 500;
	font-size: 17px;
	color: #db0000;
}

.day .title {
	width: 100%;
	height: 150px;
	position: absolute;
	display: inline-block;
	color: #FFFFFF;
	font-size: 23px;
	background-color: rgba(0, 0, 0, 0.3);
}
.day .title  div {
	padding-top: 50px;
}
.day .title em {
	display: inline-block;
	width: 55px;
	height: 50px;
	background: url(../imgs/open.png);
	background-repeat: no-repeat;
	-webkit-background-size: 100%;
	background-size: 100%;
}
</style>