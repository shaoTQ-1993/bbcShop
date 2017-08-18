<template>
	<div class="store-search">
		<div class="header">
			<span class="pic close-pic" v-on:click="back()"></span>
			<div class="input">
				<input type="text" placeholder="搜索店铺内商品"  v-model="quantity">
				<em class="search-pic" v-on:click="search()"><span class="pic"></span></em>
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
		props: [],
		data() {
			
			return {
				id:'',
				quantity:'',
				nearby: ['手机', '电脑', '移动电源', '零食', '饰品', '夏季新品凉鞋', '可口可乐', '鹿晗'],
				hot: ['手机', '电脑', '移动电源', '零食', '饰品', '夏季新品凉鞋', '可口可乐', '鹿晗'],
			}
		},
		components: {

		},
		methods: {
			back(){
				this.$router.go(-1);
			},
			search(){
				this.$router.push({ name: 'allStoreGoods', params: {id:this.id,keyword:this.quantity} });
			}
		},
		mounted() {
			this.id = this.$route.params.id;
			console.log("id",this.id);
		}
	}
</script>
<style type="text/css">
	.store-search {
		height: 100vh;
		background-color: #fff;
		text-align: left;
	}
	
	.store-search span.pic {
		display: inline-block;
		width: 1.2rem;
		height: 1.4rem;
		background-image: url(../../assets/search.png);
		background-repeat: no-repeat;
		background-size: cover;
	}
	
	.store-search .header {
		height: 2rem;
		line-height: 2rem;
		background: -webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#F0F0F0));
		border-bottom: 1px solid #D7D7D7;
	}
	
	.store-search .close-pic {
		background-position: 3px;
		float: left;
		margin-left: .5rem;
		margin-top: .4rem;
	}
	
	.store-search .input {
		width: 86%;
		float: right;
		position: relative;
	}
	
	.store-search input {
		border-radius: 5px;
		border: 1px solid #ccc;
		height: 1.4rem;
		width: 90%;
		padding-left: 5px;
		position: absolute;
		left: 0;
		top: .3rem;
	}
	
	.store-search .search-pic {
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
	
	.store-search .search-pic>span {
		background-position: -32px;
	}
	
	.store-search .nearby,
	.store-search .hot {
		padding: 0 1rem;
	}
	
	.store-search .nearby p,
	.store-search .hot p {
		height: 2rem;
		line-height: 2rem;
	}
	
	.store-search .nearby span.item,
	.store-search .hot span.item {
		font-size: .6rem;
		color: #999;
		background-color: #F0F2F5;
		padding: .2rem .5rem;
		border-radius: 5px;
		margin-right: .7rem;
		display: inline-block;
		margin-bottom: .7rem;
	}
	
	.store-search .nearby p .del-pic {
		float: right;
		background-position: -63px;
		margin-top: 8px;
	}
</style>