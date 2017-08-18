<template>
	<div class="head">
		<span class="back" v-on:click="back()"></span>
		<div class="search">
			<input type="text" v-model="quantity" placeholder="关键字搜索" />
			<router-link :to="{name:'search_all',params:{'keyword':quantity}}">
				<span class="search-pic"></span>
			</router-link>						
		</div>
		
	</div>
</template>
<script type="text/javascript">
	export default {
		name: 'app',
		data() {
			return {
				loginMess: '登录',
				quantity:''
			}
		},
		components: {

		},
		methods: {
			back(){
				this.$router.go(-1);
			}
		},
		mounted() {}

	}
</script>
<style>
	.head {
		overflow: hidden;
		background: -webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#EFEFEF));
		border-bottom: 1px solid #D7D7D7;
		width: 100%;
		height: 2rem;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
	}
	
	.head span {
		display: inline-block;
		height: 2rem;
		background-image: url(../assets/search.png);
		background-repeat: no-repeat;
		background-size: cover;

	
	}
	
	.head .back {
		width: 30px;
		height: 30px;
		float: left;
		background-image: url(../imgs/back.png);
		background-repeat: no-repeat;
		margin-left: 15px;
		margin-top: 10px;
	}
	
	.head .search {
		width: 88%;
		float: left;
		position: relative;
		margin-top: 1px;
	}
	
	.head .search input {
		border-radius: 5px;
		border: 1px solid #ccc;
		height: 1.4rem;
		width: 90%;
		padding-left: 5px;
		position: absolute;
		left: 0;
		top: .3rem;
	}
	
	.head .search .search-pic {
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
		background-position: -1.2rem 2px;
	}
	
	.head .goHome {
		width: 30px;
		height: 30px;
		float: right;
		background-image: url(../imgs/home2.png);
		background-repeat: no-repeat;
		margin-right: 25px;
		margin-top: 10px;
		
		
		
		
	}
</style>