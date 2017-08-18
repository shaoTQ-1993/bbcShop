<template>
	<div class="themeInfo">
		<x-header style="background-color: #eb6100;">专题详情</x-header>
		<div class="themeBanner">
			<img :src="feature" />
		</div>

          			<ul class="new-list clearfix" >
				<li class="goodsItem" v-for="item in goodsList" v-on:click="add(item.goodsId)" >
					
						<div class="goodsItem-img">
							<img slot="icon" :src="item.thumbnailShow" style="animation-name: slideOut; animation-duration: 0.2s;">
						</div>
						<div class="info-bar">
							<div class="tit">{{item.name}}</div>
							<div class="price">￥{{item.price}}</div>
						</div>
				
				</li>
			</ul>

		</div>
		
		
	
</template>
<script type="text/javascript">
	import headtitle from '../components/header'
	import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem ,Scroller,XHeader} from 'vux'
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
				testTitle:['春','夏'],
				num:0,
				list2:['春','夏'],
				demo2:'春',
				index: 0,
				id:'',
				feature:''
				
				
			}
		},
		components: {
			Tab,
		    TabItem,
		    Sticky,
		    Divider,
		    XButton,
		    Swiper,
		    SwiperItem,
		    Scroller,
		    XHeader
		},
		methods: {
			change(e,index){
				this.num=index;
			},
			onScroll (pos) {
     			 this.scrollTop = pos.top
    		},
    		getThemeInfo(id){
    			var that=this;
					that.$vux.loading.show({
									text: 'Loading'
								})
    			this.show = true;
				var url = "/rest/feature/featureDetail/" + id;

				that.axios.get(url)
					.then(response => {
					
						that.feature = response.data.data.feature.mimgShow;
					
						that.goodsList=response.data.data.goodsList;
						that.$vux.loading.hide();
						})
				},
			add(index) {
				
			    this.$router.push({ name: 'productDetail', params: { pro_id: index } });
			    this.$router.go(0);

   			 }
    		
    
		},
		mounted() {
			var that = this;
			that.id = this.$route.params.id;
			this.getThemeInfo(that.id);


		}
	}
</script>
<style type="text/css">
	@import "../../reset.css";

.themeInfo .header{
	height: 2rem;
	background-color:#FFFFFF;
	position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    line-height: 2rem;
    font-size: 16px;
    border-bottom: 1px #EEEEEE solid;
    padding-right: 20px;
    text-align: center;
}

.themeInfo .themeBanner{
	height: 230px;
	margin-bottom: 20px;

}
.themeInfo .themeBanner img{
	width: 100%;
	height: 230px;
	border-bottom: 1px #EEEEEE solid;
}
.themeInfo .themeSelect{
	height: 40px;
	border-bottom: 2px #EEEEEE solid;
}
.themeInfo .themeSelect .selectItem{
	width: 80px;
	height: 100%;
	float: left;
	line-height: 40px;
	color: #000000;
	
}
.themeInfo .selectTitle{
	height: 40px;
	border-bottom: 1px #EEEEEE solid;
	line-height: 40px;
	font-size: 15px;
	margin-bottom: 10px;

}
.themeInfo ul{
	border-bottom: 1px #EEEEEE solid;
}
.themeInfo .active{
	border-bottom: 1px #000000 solid;
	width: 20px;
}

</style>