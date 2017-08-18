<template>
	<div id="index_section" name="pos">
		<nav class="left">
			<router-link :to="{name:'home'}" v-if="user" class="txt">取消</router-link>
			<a v-else class="txt" v-on:click="user=true">返回</a>
		</nav>
		<!--背景 sta-->
		<div class="login-img-box"></div>
		<!--背景 end-->
		<article class="lazyimg" data-scroll="true">
			<div>
				<a class="n_logo" href="#"></a>
				<div v-if="user">
					<login></login>
					<div class="btn-tips">
						<a href="javascript:void(0)">忘记密码?</a>
						<a href="javascript:void(0)" class="fr" v-on:click="user=false">注册帐号</a>
					</div>
				</div>
				<div v-else>
					<register></register>
					<div class="btn-tips">
						<a href="javascript:void(0)" v-on:click="user=true" class="fr">帐号登录</a>
					</div>
				</div>
			</div>
		</article>
		<div class="n-agree" v-if="!user">
			<a href="/m/help-2-106.html">
				注册并同意，品尚服务协议
			</a>
		</div>
	</div>
</template>
<script type="text/javascript">
	import login from '../components/login'
	import register from '../components/register'
	export default {
		props: [],
		data() {
			return {
				user: true,
			}
		},
		components: {
			login,
			register,
		},
		method:{

		},
		mounted() {

		}
	}
</script>
<style type="text/css">
	@import "../../reset.css";
	#index_section {
		text-align: left;
	}
	
	#index_section .left {
		position: absolute;
		left: 0.5rem;
		top: 0.5rem;
		z-index:10;
	}
	
	#index_section .left .txt {
		color: #fff;
		font-size: 14px;
	}
	
	#index_section header {
		z-index: 5;
	}
	
	#index_section .login-img-box {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: url(../imgs/bg.jpg) no-repeat;
		background-size: 100% auto;
		z-index: 3;
	}
	
	#index_section article.lazyimg {
		position: absolute;
		bottom: 0;
		width: 100%;
		visibility: visible;
		display: block;
		background: 0 0;
		top: 0!important;
		z-index: 5;
		overflow: hidden;
	}
	
	#index_section article.lazyimg div a.n_logo {
		display: block;
		width: 10.96rem;
		height: 3.52rem;
		margin: 3.96rem auto 0;
		background: url(../imgs/logo1.png) center no-repeat;
		background-size: 8.36rem auto;
	}
	
	#index_section .btn-tips {
		width: 10.24rem;
		margin: 0 auto;
	}
	
	#index_section .btn-tips a {
		padding: .48rem 0;
		color: #fff;
		font-size: .52rem;
	}
	
	#index_section .n-agree {
		left: 0;
		right: 0;
		bottom: .64rem;
		position: absolute;
		z-index: 4;
		text-align: center;
	}
	
	#index_section .n-agree a {
		font-size: .48rem;
		color: #fff;
	}
</style>