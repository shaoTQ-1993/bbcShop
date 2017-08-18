<template>
	<div class="search-page">
		<div class="header">
			<span class="close-pic" v-on:click="back()"  style="margin-right: 10px;"></span>
			<div class="input">
				<input type="text" v-model="quantity" placeholder="请输入关键字">
				<router-link :to="{name:'search_all',params:{'keyword':quantity}}">
					<em class="search-pic" ><span class="pic"></span></em>
				</router-link>
				
			</div>
		</div>
		<div class="nearby" v-show="nearby.length > 0">
			<p>最近搜索<span class="pic del-pic"></span></p>
			<span class="item" v-for="item in nearby">{{item}}</span>
		</div>
		<div class="hot" v-show="hot.length > 0">
			<p>热门搜索</p>
			<span class="item" v-for="item in hot">{{item}}</span>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: 'app',
		data() {
			return {
				nearby: ['手机', '电脑', '移动电源', '零食', '饰品', '夏季新品凉鞋', '可口可乐', '鹿晗'],
				hot: ['手机', '电脑', '移动电源', '零食', '饰品', '夏季新品凉鞋', '可口可乐', '鹿晗'],
				quantity:''
			}
		},
		components: {

		},
		methods: {
			back(){
				this.$router.go(-1);
			},
			search(){
				this.$router.push({
					name:'category'
				});
			}
		},
		mounted() {

		}

	}
</script>
<style type="text/css">
	.search-page {
		height: 100vh;
		background-color: #fff;
		text-align: left;
	}
	
	.search-page span.pic {
		display: inline-block;
		width: 1.2rem;
		height: 1.4rem;
		background-image: url(../assets/search.png);
		background-repeat: no-repeat;
		background-size: cover;
	}
	
	.search-page .header {
		height: 2rem;
		line-height: 2rem;

		border-bottom: 1px solid #D7D7D7;

	}
	
	.search-page .close-pic {
		width: 30px;
		height: 30px;
		float: left;
		background-image: url(../imgs/close.png);
		background-repeat: no-repeat;
		margin-left: 25px;
		margin-top: 10px;
	}
	
	.search-page .input {
		width: 86%;
		margin-left: 55px;
		position: relative;
	}
	
	.search-page input {
		border-radius: 5px;
		border: 1px solid #ccc;
		height: 1.4rem;
		width: 90%;
		padding-left: 5px;
		position: absolute;
		left: 0;
		top: .3rem;
	}
	
	.search-page .search-pic {
		display: inline-block;
		width: 1.4rem;
		height: 1.4rem;
		background-color: #F5F5F5;
		position: absolute;
		right: 10%;
		top: .3rem;
		border: 1px solid #ccc;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	
	.search-page .search-pic>span {
		background-position: -32px;
	}
	
	.search-page .nearby,
	.search-page .hot {
		padding: 0 1rem;
	}
	
	.search-page .nearby p,
	.search-page .hot p {
		height: 2rem;
		line-height: 2rem;
	}
	
	.search-page .nearby span.item,
	.search-page .hot span.item {
		font-size: .6rem;
		color: #999;
		background-color: #F0F2F5;
		padding: .2rem .5rem;
		border-radius: 5px;
		margin-right: .7rem;
		display: inline-block;
		margin-bottom: .7rem;
	}
	
	.search-page .nearby p .del-pic {
		float: right;
		background-position: -63px;
		margin-top: 8px;
	}
</style>