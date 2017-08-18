<template>
	<div class="log-main">
		<form action="register.html?widgetid=mobile_register&action=MobileRegister" method="post" id="register_form_mobile">
			<div class="input-block">
				<input name="username" id="username" type="text" class="Jtel" maxlength="11" placeholder="手机号码">
				<i class="ico-close"></i>
			</div>
			<div class="Veri-Code">
				<div class="code-input">
					<input type="number" autocomplete="off" id="mobileCode" name="mobileCode" maxlength="6" placeholder="输入验证码" />
				</div>
				<span class="code-txt" data-for="0" data-dis='true'>获取验证码</span>
			</div>
			<div class="input-block">
				<input type="password" class="Jpass" placeholder="密码">
				<i class="ico-view"></i>
			</div>
			<div class="btn-wrap">
				<a href="javascript:void(0);">注册</a>
				<input id="forward" name="forward" type="hidden" value="${forward!''}" />
			</div>
		</form>
	</div>
</template>
<script type="text/javascript">
export default {
		props: [],
		data() {
			return {
				
			}
		},
		components: {
			
		},
		methods:{

		},
		mounted() {

		}
	}
</script>
<style type="text/css">
	.log-main {
		width: 10.24rem;
		margin: 0 auto;
	}
	
	.log-main .input-block {
		position: relative;
		margin-bottom: .44rem;
		line-height: 1.6rem;
		height: 1.6rem;
	}
	
	.log-main .input-block input {
		vertical-align: inherit;
		color: rgba(255, 255, 255, .6);
		font-size: .56rem;
		outline: 0;
		border: none;
		background: rgba(255, 255, 255, .2);
		line-height: 1.8;
		height: 1.6rem;
		width: 100%;
		text-align: center;
	}
	
	.log-main .Veri-Code {
		position: relative;
		margin-bottom: .44rem;
		line-height: 1.6rem;
		height: 1.6rem;
		display: -webkit-flex!important;
	}
	
	.log-main .Veri-Code .code-input {
		-webkit-flex: 1!important;
		-webkit-box-flex: 1;
		word-wrap: break-word;
		word-break: break-all;
	}
	
	.log-main .Veri-Code .code-input input {
		vertical-align: inherit;
		color: rgba(255, 255, 255, .6);
		font-size: .56rem;
		outline: 0;
		border: none;
		background: rgba(255, 255, 255, .2);
		line-height: 1.8;
		height: 1.6rem;
		width: 100%;
		text-align: center;
	}
	
	.log-main .Veri-Code .code-txt {
		position: relative;
		display: block;
		font-size: .56rem;
		width: 3.8rem;
		height: 1.36rem;
		line-height: 1.36rem;
		top: .16rem;
		margin-left: .64rem;
		background: 0 0;
		border: .04rem solid #fff;
		color: #fff;
		text-align: center;
	}
	
	.log-main .btn-wrap>a {
		display: block;
		width: 100%;
		height: 1.76rem;
		line-height: 1.76rem;
		padding: 0 .3rem;
		font-size: .72rem;
		background: 0 0;
		border-radius: 0;
		border: 1px solid #fff;
		color: #fff;
		text-align: center;
	}
	
	.log-main .btn-wrap>input {
		vertical-align: inherit;
		color: rgba(255, 255, 255, .6);
		font-size: .56rem;
		outline: 0;
		border: none;
		background: rgba(255, 255, 255, .2);
		line-height: 1.8;
		height: 1.6rem;
		width: 100%;
		text-align: center;
	}
	
</style>