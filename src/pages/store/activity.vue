<template>
	<div class="activity">
		<x-header>本店活动</x-header>
		<div class="item" v-for='item in activityList'>
			<router-link :to="{name:'storeActivity',params:{'id':item.url}}">
				<img :src="item.atturl"/>
				<span>{{item.aname}}</span>
			</router-link>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { XHeader} from 'vux'
	export default {
		props: [],
		data() {
			return {
				id:'',
				activityList:'',
			}
		},
		components: {
			XHeader
		},
		methods: {
			getActivity(id) {
			 	  var url = '/rest/shopMerchant/getMerchantAdv';
			      var that = this;
			      var data = {
			        merchantId: id
			      }
				    that.axios.post(url, data).then(response => {
				       	var adv=response.data.data.advsList;
				       	that.activityList=adv.mobile_merchant_activity[0].adColumnMap.adv.advList;
			      })
		},
		},
		mounted() {
			this.id = this.$route.params.id;
			this.getActivity(this.id);
		}
	}
</script>
<style type="text/css">
	.activity{
		min-height: 100vh;
		background-color: #fff;
		padding: .6rem;
	}
	.activity .item{
		position: relative;
		padding-top:1rem ;
		margin-top: 40px;
	}
	.activity .item img{
		width: 100%;
	}
	.activity .item span{
		position: absolute;
		left: 0;
		top: 0;
		display: inline-block;
		padding: 0 .2rem;
		background-color: #FF4500;
		color: #fff;
		height: 1rem;
		font-size: .6rem;
	}
</style>