<template>
	<div class="log_main">
		<div class="user_txt">
			<div class="user_head"><img src="" alt="" /></div>
			<p class="user_info">
				<span>亲爱的<em class="user_name"></em></span>
				<span>为了您的账户安全，请关联您的手机号</span>
			</p>
		</div>
		<div class="line"></div>
		<form method="post" id="login-form">
			<div class="tel-block input-block">
				<input name="username" id="username" v-model="Tel" type="text" maxlength="11" placeholder="手机号码" autocomplete="off">
				<i class="ico-close r0"></i>
			</div>
			<div class="Veri-Code">
				<div class="code-input">
					<input type="number" autocomplete="off" id="mobileCode" name="mobileCode" maxlength="6" placeholder="输入验证码" />
				</div>
				<span class="code-txt" data-for="0" data-dis='true'>获取验证码</span>
			</div>
			<div class="errorMsg"></div>
			<div class="btn-wrap">
				<a href="javascript:void(0);" v-on:click="login()">立即绑定登录</a>
			</div>
			<input id="forward" name="forward" type="hidden" class="input_01" value="${forward!''}" />
			<input name="message" type="hidden" class="input_01" value="${message!''}" />
		</form>
	</div>
</template>
<script type="text/javascript">
	import md5 from 'js-md5'
	export default {
		props: [],
		data() {
			return {
				Tel: '',
				Pwd: '',
			}
		},
		components: {},
		methods: {
			login() {
				var hash = md5.create();
				hash.update(this.Pwd);
				var pwd = hash.hex();
				if(this.Tel != '' && this.Pwd != '') {
					var URL = '/rest/auth/login';
					var that = this;
					var data = {
						username: that.Tel,
						password: pwd,

					}
					that.axios.post(url, data)
						.then(response => {
							alert(res.message);
							if(window.localStorage) {
								localStorage.setItem("isLogin", true);
								that.$router.push({
									path: '/home'
								})
							}
						}).catch(error => {
							alert('登录失败');
						});
				} else if(this.Tel == '') {
					alert('请输入手机号码！');
				} else {
					alert('请输入密码！');
				}
			},

			mounted() {}

		}
	}
</script>
<style type="text/css">
	.log_main {
		width: 100%;
		height: 100vh;
		background-color: #fff;
		position: relative;
		z-index: 9;
	}
	
	.user_txt {
		overflow: hidden;
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		padding: .8rem 6%;
	}
	
	.user_txt>.user_head {
		width: 20%;
		overflow: hidden;
		display: inline-block;
	}
	
	.user_txt>.user_head img {
		width: 2.2rem;
		height: 2.2rem;
		border-radius: 1.1rem;
		float: left;
	}
	
	.user_txt>.user_info {
		float: right;
		width: 79%;
		display: inline-block;
		text-align: left;
		font-size: 14px;
		padding-top: 10px;
	}
	
	.user_txt>.user_info span {
		display: block;
	}
	
	.line {
		background-color: #eee;
		width: 100%;
		height: 5px;
	}
	
	#login-form {
		width: 10.24rem;
		margin: 2rem auto;
	}
	
	#login-form .input-block {
		margin-bottom: .44rem;
		line-height: 1.6rem;
		height: 1.6rem;
	}
	
	#login-form .input-block input {
		vertical-align: inherit;
		font-size: .56rem;
		outline: 0;
		border: none;
		background: #eee;
		line-height: 1.8;
		height: 1.6rem;
		width: 100%;
		text-align: left;
		text-indent: 1em;
	}
	
	#login-form .Veri-Code {
		margin-bottom: .44rem;
		line-height: 1.6rem;
		height: 1.6rem;
		display: -webkit-flex!important;
	}
	
	#login-form .Veri-Code .code-input {
		-webkit-flex: 1!important;
		-webkit-box-flex: 1;
		word-wrap: break-word;
		word-break: break-all;
		background-color: #eee;
	}
	
	#login-form .Veri-Code .code-input input {
		vertical-align: inherit;
		font-size: .56rem;
		outline: 0;
		border: none;
		background: rgba(255, 255, 255, .2);
		line-height: 1.8;
		height: 1.6rem;
		width: 100%;
		text-align: left;
		text-indent: 1em;
	}
	
	#login-form .Veri-Code .code-txt {
		position: relative;
		display: block;
		font-size: .56rem;
		width: 3.8rem;
		height: 1.36rem;
		line-height: 1.36rem;
		top: .16rem;
		margin-left: .64rem;
		background: 0 0;
		border: .04rem solid #000;
		text-align: center;
	}
	
	#login-form .btn-wrap {
		background-color: #000;
	}
	
	#login-form .btn-wrap a {
		display: block;
		width: 100%;
		height: 1.76rem;
		line-height: 1.76rem;
		padding: 0 .3rem;
		font-size: .72rem;
		background: 0 0;
		border-radius: 0;
		border: 1px solid #fff;
		text-align: center;
		cursor: pointer;
		color: #fff;
	}
	
	.fr {
		float: right;
	}
</style>