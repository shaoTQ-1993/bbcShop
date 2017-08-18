<template>
	<div class="newActivity">
		<x-header style="background-color: #eb6100;">最新活动</x-header>
		<scroller style="margin-top: 46px;" lock-x :height=showHeight ref="scrollerEvent">
			<div class="activityList">
				<div class="activityItem" v-for="item in formTemplateList">
					<img :src="item.imgShow" />
					<div class="activityTxt">
						<h1>{{item.title}}</h1>
						<h3 v-show="item.beginTime">开始时间：{{item.beginTime}}</h3>
					</div>
					<div class="activityBtn">
						<div class="btn" v-on:click="activityInfo(item.formId)">查看详情</div>
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
			formTemplateList: [],
			showHeight: "",


		}
	},
	components: {
		XHeader,
		Loading,
		Scroller
	},
	methods: {
		getFormList: function () {
			var url = '/rest/form/getFormList';
			var that = this;
			that.axios.get(url)
				.then(response => {
					console.log(response);
					that.formTemplateList = response.data.data.formTemplateList;
					this.$nextTick(() => {
						this.$refs.scrollerEvent.reset()
					})
					that.$vux.loading.hide();

				})
		},
		activityInfo(index){
			this.$router.push({ name: 'activityInfo' , params: {id:index}});
		}
	},
	mounted() {
		this.showHeight = document.documentElement.clientHeight - 46 + 'px';
		this.$vux.loading.show({
			text: 'Loading'
		});
		this.getFormList();

	}
}
</script>
<style type="text/css">
.newActivity .activityList {
	padding: .5rem;
}

.newActivity .activityItem {

	height: 8.5rem;
	overflow: hidden;
	padding: 10px 10px;
	border: 1px solid #eee;
	border-radius: 20px;
	margin-bottom: 20px;
	box-shadow: 3px 3px 4px #eee
}

.newActivity img {
	width: 5rem;
	height: 5rem;
	margin-top: .5rem;
	float: left;
}

.newActivity .activityTxt {
	margin-left: .5rem;
	margin-top: 1rem;
	float: left;
	width: 8.5rem;
	-webkit-line-clamp: 2;
	overflow: hidden;

	text-align: left;
}

.newActivity h1 {
	font-weight: 500;
	font-size: 18px;
	overflow: hidden;
	margin-top: -5px;
}

.newActivity b {
	font-weight: 500;
	font-size: 16px;
	width: 6rem;
	overflow: hidden;
	float: left;
	margin-top: 5px;
}

.newActivity em {
	font-size: 16px;
	float: left;
	margin-left: 20px;
	margin-top: 10px;
	color: #eb6100;
}

.newActivity h3 {
	margin-top: 10px;
	font-size: 14px;
	float: left;
	text-align: left;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
	color: #BFBFBF;
}

.newActivity .activityBtn {
	float: left;
	width: 100%;
	overflow: hidden;
	padding-left: 8.5rem;
}

.newActivity .btn {
	width: 100px;
	border: 1px #eb6100 solid;
	float: left;
	margin-right: 30px;
	height: 40px;
	line-height: 40px;
	border-radius: 15px;
	color: #FFFFFF;
	background-color: #eb6100;
	border: none;
}
</style>