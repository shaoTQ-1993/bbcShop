<template>
	<div class="theme">
		<x-header style="background-color: #eb6100;">专题分类</x-header>
		<div class="themeList">
			
			<div class="themeItem" v-for="item in featureList">
				<router-link :to="{name:'themeInfo',params:{id:item.id}}">
					<img :src="item.pcImgShow" />
					<div class="themeTxt">
						<h5 class="themeTitle">{{item.title}}</h5>
						<h4 class="themeDate">{{item.opdate}}</h4>
					</div>
				</router-link>				
			</div>

		</div>
	</div>
</template>
<script type="text/javascript">
	import {XHeader,Loading} from 'vux'
	export default {
		props: [],
		data() {
			return {
				hasGoods:'',
				goodsList: '',
				disabled: false,
				selectArr: [],
				quantity:0,
				totalPrice:0.0,
				newnum:0,
				id:'',
				featureList:[]
				
			}
		},
		components: {
			XHeader,
			Loading
		},
		methods: {
			getThemeList(id) {
					var that=this;
						that.$vux.loading.show({
										text: 'Loading'
									})
					this.show = true;
					var url = "/rest/feature/featureCat/" + id;


					that.axios.get(url)
						.then(response => {
							
							that.featureList = response.data.data.featureList;
							that.$vux.loading.hide();
						})
				},	
		},
		mounted() {
				var that=this;			
				that.id = this.$route.params.id;
				this.getThemeList(that.id);


		}
	}
</script>
<style type="text/css">
	@import "../../reset.css";

.theme .themeList{
	background-color: #0E90D2;
	margin-top: 2rem;
}
.theme .themeItem{
	height: 230px;
	border-bottom: 1px #000000 solid;
}
.theme .themeItem img{
	width: 100%;
	height: 230px;
}
.theme .themeItem .themeTxt{
	position: absolute;
    margin-top: -54px;
    left: 0;
    display: block;
    width: 100%;
    height: 2rem;
    line-height: 1.4rem;
    background: rgba(0, 0, 0, .5);
    color:#FFFFFF;
    text-align: left;
    padding-left: .4rem;
    font-size: .6rem;
}
.theme .themeTxt h5{
	font-weight: normal;
    font-size: 15px;
}
.theme .themeTxt h4{
	font-weight: normal;
    margin-top: -13px;
}
.vux-header .vux-header-left .left-arrow:before {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    border: 1px solid white;
    border-width: 1px 0 0 1px;
    -webkit-transform: rotate(315deg);
    transform: rotate(315deg);
    top: 8px;
    left: 7px;
}
.vux-header .vux-header-left a {
    color: white;
}
</style>