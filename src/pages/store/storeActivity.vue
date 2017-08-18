<template>
	<div class="storeActivity">
		
		<x-header>{{activeName}}</x-header>
			<scroller style="margin-top: 46px;" lock-x scrollbar-y :height=showHeight ref="scroller">

				<div class="block">
					<!--商品列表 sta-->
			 			<ul class="new-list clearfix" >
						<li class="goodsItem" v-for="item in activityGoodsList" v-on:click="add(item.goodsId)" >
							
								<div class="goodsItem-img">
									<img slot="icon" :src="item.thumbnailShow" style="animation-name: slideOut; animation-duration: 0.2s;">
								</div>
								<div class="info-bar">
									<div class="tit" style="text-align: left;">{{item.name}}</div>
									<div class="price">￥{{item.price}}</div>
								</div>
						
						</li>
					</ul>
					<!--商品列表 end-->
				</div>
			</scroller>
	</div>
</template>
<script type="text/javascript">
import { XHeader,Scroller,Loading} from 'vux'
export default {

	data() {
		return {
			showHeight: "",
			activeName:'',
			activityGoodsList:''
		}
	},
	components: {
		XHeader,
		Scroller,
		Loading
	},
	methods: {
		getGoods(id) {
			var that = this;
			var url = '/rest/promotion/getPromotion/'+id;
			that.axios.get(url).then(response => {
				that.activeName=response.data.data.activity.activeName;
				that.activityGoodsList=response.data.data.activityGoodsList;
				that.$nextTick(() => {
					that.$refs.scroller.reset()
				});					
				that.$vux.loading.hide();
			});			
		},

	},
	mounted() {
		var id = this.$route.params.id;
		this.getGoods(id);
		this.$vux.loading.show({
			text: 'Loading'
		});
		this.showHeight = document.documentElement.clientHeight - 46 + 'px';
		

	}
}
</script>
<style>
.storeActivity .new-list {
	background: #fff;
    padding-left: 17px;
}

</style>