<template>
	<div class="new-goodsList">
		<x-header style="background-color: #eb6100;">最近上新</x-header>
		<div class="list" v-for='item in newGoodsList'>
			<div class="date-item"><span>{{item.createTime.createTime}}</span></div>
			<div class="item" v-for="i in item.goodsBackList">
				<div v-on:click="product(i.goodsId)">
					<img :src="i.thumbnailShow" />
					<p>{{i.name}}</p>
					<span class="price">{{i.price | currency}}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { XHeader} from 'vux'
	export default {
		props: [],
		data() {
			return {
				newGoodsList:[],				
			}
		},
		components: {
			XHeader
		},
		methods: {
			goBack() {
				this.$router.go(-1);
			},
			changeAct(e) {
				$('.nav span').removeClass('act');
				$(e.target).addClass('act');
			},
			getNewGoods(id){
				var that = this;
				var url = '/rest/merchant/getTheWeekGoods/'+id;
				that.axios.get(url)
					.then(response => {
						that.newGoodsList=response.data.data.goodsList;
						})
			},
			product(id){
				this.$router.push({ name: 'productDetail', params: { pro_id: id } });
				this.$router.go(0);
			}
		},
		mounted() {
			this.id = this.$route.params.id;
			this.getNewGoods(this.id);
		}
	}
</script>
<style type="text/css">
	.new-goodsList{
		margin-top: 48px;
	}
	.new-goodsList .list{
		overflow: hidden;
		margin-bottom: 20px;
	}
	.new-goodsList .list div.date-item{
		height: 2rem;
		line-height: 2rem;
	}
	.new-goodsList .list div.date-item span{
		background-color: #EEEEEE;
		padding: .6rem;
		font-size: .6rem;
		color: #666;
	}
	.new-goodsList .list div.date-item:after{
		content: '';
		display: block;
		border-bottom: 1px solid #dcdcdc;
		margin-top: -1rem;
	}
	.new-goodsList .list .item {
		width: 50%;
		float: left;
		border-right: 1px solid #eee;
		border-bottom: 1px solid #eee;
		padding: 2%;
		text-align: left;
		background-color: #fff;
	}
	
	.new-goodsList .list .item img {
		width: 171.5px;
		height: 171.5px;
	}
	
	.new-goodsList .list .item p {
		font-size: .6rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		height: 42px;
	}
	
	.new-goodsList .list .item span {
		font-size: .5rem;
		color: #fff;
		background-color: #f00;
		padding: 1px;
		margin-right: .2rem;
	}
	
	.new-goodsList .list .item span.price {
		color: #f00;
		background-color: #fff;
	}
</style>