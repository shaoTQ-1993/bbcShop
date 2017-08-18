<template>
	<div class="feature-detail">
		<header class="header">
			<headtitle></headtitle>
		</header>
		<div class="ps-detail-content" v-html="mcontent">{{mcontent}}</div>
	</div>
</template>
<script type="text/javascript">
	import headtitle from '../components/header'
	export default {
		data() {
			return {
				featureId: '',
				mcontent: "",
			}
		},
		components: {
			headtitle
		},
		methods: {
			Request() {
				var url = '/rest/feature/featureDetail';
				var that = this;
				var data = {
					featureId: that.featureId
				}
				that.axios.post(url, data).then(response => {
					that.mcontent = response.data.data.featur.mcontent;

				})
			}
		},
		mounted() {
			// 获取url传的tab参数
			this.featureId = this.$route.params.feature_id;
			this.Request();
		}
	}
</script>
<style>
	.feature-detail .ps-detail-content {
		z-index: 100;
	}
</style>