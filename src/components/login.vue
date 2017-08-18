<template>
	<div class="logMain" style="padding: 8px 0px;">
		<!--<form method="post" id="login_form">
			<div class="tel-block input-block">
				<input name="username" id="username" v-model="Tel" type="text" maxlength="11" placeholder="手机号码" autocomplete="off">
				<i class="ico-close r0"></i>
			</div>
			<div class="pass-block input-block">
				<input name="password" id="password" v-model="Pwd" type="password" placeholder="密码">
				<i class="ico-view"></i>
			</div>
			<div class="errorMsg"></div>
			<div class="btn-wrap">
				<a href="javascript:void(0);" v-on:click="login()">登录</a>
			</div>
			<input id="forward" name="forward" type="hidden" class="input_01" value="${forward!''}" />
			<input name="message" type="hidden" class="input_01" value="${message!''}" />
		</form>-->
		<img class="close-pic" src="../imgs/close2.png" v-on:click="close()" alt="" />
		<img class="logo-pic" src="http://img01.tobosu.net/manage/articles/2014/03-29/C5E6E0D9-6B40-E653-D4A2-3470A504AFC5.jpg" alt="" />
		<div class="login" v-if="loginR">
			<p>
				<input name="username" id="uName" class="uName" v-model="Tel" type="number" maxlength="11" placeholder="手机号码" autocomplete="off">
			</p>
			<p>
				<input name="password" id="pwd" class="Pwd" v-model="Pwd" type="password" placeholder="密码">
			</p>
			<p>
				<a class="login-btn" href="javascript:void(0);" v-on:click="login()">登录</a>
			</p>
			<p>忘记密码</p>
			<p>
				<!--<router-link :to="{name:'register'}">没有账号 ？ 去注册</router-link>-->
				<a href="javascript:void(0);" v-on:click="changePage('register')">没有账号 ？ 去注册</a>
			</p>
		</div>
		<div class="register" v-else>
			<p>
				<input type="text" id="regName" v-on:change="checkMobile()" class="uName" placeholder="手机号" />
			</p>
			<p class="verif">
				<input type="text" id="uVerif" class="uVerif" placeholder="短信验证码" />
				<span class="verif-btn" v-on:click="getVerif()">获取验证码</span>
			</p>
			<p>
				<input type="password" id="regPwd" class="Pwd" placeholder="密码" />
			</p>
			<p>
				<input type="password" id="rPwd" class="rPwd" placeholder="确认密码" />
			</p>
			<p class="txt-info"> * 密码只能是以字母开头，长度在6-18之间，只能包含数字，字母和下划线</p>
			<p>
				<a class="register-btn" href="javascript:void(0);" v-on:click="regSubmit()">注册</a>
			</p>
			<p>
				<!--<router-link :to="{name:'register'}">已有账号，进行登录</router-link>-->
				<a href="javascript:void(0);" v-on:click="changePage('login')">已有账号，进行登录</a>
			</p>
		</div>
	</div>
</template>
<script type="text/javascript">
	import md5 from 'js-md5'
    import ras from '../common/security.js'

	export default {
		props: [],
		data() {
			return {
				Tel: '',
				Pwd: '',
				modulus:'',
				exponent:'',
				loginR:true
				
			}
		},
		components: {},
		methods: {
			login() {
				var hash = md5.create();
				hash.update(this.Pwd);
				var pwd = hash.hex();
				if(this.Tel != '' && this.Pwd != '') {
//					var URL = '/rest/auth/login';
					var data = {
						'username': this.Tel,
						'password': pwd,
					}
					console.log(data);
//					var that = this;
//					that.axios.post(URL,data)
//						.then(function(){
//							alert(res.message);
//							if(window.localStorage) {
//								localStorage.setItem("isLogin", true);
//								that.$router.push({
//									path: '/home'
//								})
//							}
//						})
					data = JSON.stringify(data);
					var key = RSAUtils.getKeyPair(this.exponent, '', this.modulus);
					var login = RSAUtils.encryptedString(key, data);
					var url = '/rest/auth/login';
					var that = this;
					var data = {
						"loginInfo": login,
					};	
					
					var pathId = this.$route.query.toPath;
					that.axios.post(url, data)					
						.then(response => {		
							console.log(response);
							that.code = response.data.code;
							if(that.code == '0000') {
								var mess = JSON.stringify(response.data.data.member);
								console.log(mess);
								localStorage.setItem("myInfo", mess);
								localStorage.setItem("login", true);
								that.$router.push({
									name: 'home'
								});
							}else{
								this.$vux.alert.show({
						       		title: '',
						        	content: response.data.message,
						    	});  
							}
					})
				} else if(this.Tel == '') {
					this.$vux.alert.show({
			       		title: '',
			        	content: '请输入手机号',
			    		});  
   			
				} else {
					this.$vux.alert.show({
			       		title: '',
			        	content: '请输入密码',
			    		});  
   		
				}
			},
			changePage(str){
				if(str == 'register'){
					this.loginR = false;
				}else{
					this.loginR = true;
				}
			},//登录注册页面的切换
			close(){
				this.$router.go(-1);
			},
			getPublicKey() {
				console.log("getPublicKey");
				var url = '/rest/auth/getPublicKey';
				var that = this;
				that.axios.get(url)
					.then(response => {
						
						console.log(response);
						that.modulus = response.data.data.modulus;
						that.exponent = response.data.data.exponent;						
					})				
				},
			checkMobile(){
				var url = '/rest/userReg/checkMobileExist/'+$("#regName").val();
				var that = this;
				that.axios.get(url)
					.then(response=>{
						if(response.data.code == '0000'){
							if(response.data.data.result=='EXIST'){
								this.$vux.alert.show({
       							title: '',
        						content: '电话号码已被注册',
    							 });  
   								$("#regName").val("").focus();
							}
						}else{
							alert(response.data.message);
						}
					})
				
			},
			getVerif(){
				var url = '/rest/userReg/smsCode/'+$("#regName").val();
				var that = this;
				that.axios.get(url)
					.then(response=>{
						if(response.data.code == '0000'){
							that.validcode = response.data.data.validcode;
							window.clearInterval(this.timmer);
							var time = 60;
							this.str = time+"s";
							$(".verif-btn").text(this.str);
							that.timmer = setInterval(function(){
								if(time > 0){
									time--;
									that.str = time+"s";
									$(".verif-btn").text(that.str);
									$("#uVerif").val(that.validcode);
									window.clearInterval(this.timmer);
									$(".verif-btn").text("重新获取");
								}else{
									window.clearInterval(that.timmer);
									that.str = "再次获取";
									$(".verif-btn").text(that.str);
									$("#uVerif").val(that.validcode);
									window.clearInterval(this.timmer);
									$(".verif-btn").text("重新获取");
								}
							},1000);
						}else{
							alert(response.data.message);
						}
					})
			},
			regSubmit(){
				var regName = $("#regName").val();
				var regPwd = $("#regPwd").val();
				var rPwd = $("#rPwd").val();
				if(regPwd == rPwd){
					var hash = md5.create();
					hash.update(regPwd);
					var regPwd = hash.hex();
					var data = {
						"mobile": regName,
						"password": regPwd,
						"smsCode": this.validcode
					}
					data = JSON.stringify(data);
					
					var key = RSAUtils.getKeyPair(this.exponent, '', this.modulus);
					var reg = RSAUtils.encryptedString(key, data);
					var data = {
						'register':reg,
					}
					var url = '/rest/userReg/register';
					var that = this;
					var pathId = this.$route.query.toPath;
					
					console.log("register");
					that.axios.post(url,data)
						.then(response=>{
							console.log("res",response);
							if(response.data.code == '0000'){
								var mess = JSON.stringify(response.data.data.message);
								localStorage.setItem("message", mess);
								localStorage.setItem("login", true);
								that.$router.push({
									name: 'home'
								});
							}else{
								alert(response.data.message);
							}
						})
					
				}else{
					this.$vux.alert.show({
       					title: '',
        				content: '两次填写的密码不同，请重新填写',
    				});  
					$("#regPwd").val("");
					$("#rPwd").val("");
				}
				
			},//进行注册
		},
			mounted() {
				this.getPublicKey();
			}
	}
</script>
<style type="text/css">
	.logMain{
		background-color: #EB6100;
		min-height:100vh;
		color: #ffffff;
	}
	.login {
		width: 100%;
		color: #fff;
	}
	
	.logMain .close-pic {
		width: .8rem;
		margin-left: .6rem;
		display: block;
		
	}
	
	.logMain .logo-pic {
		display: block;
		width: 6.41rem;
		height:6.41rem;
		margin-left: auto;
		margin-right: auto;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
	
	.login p,.register p {
		width: 80%;
		margin-left: auto;
		margin-right: auto;
		line-height: 2rem;
		overflow: hidden;
		font-size: .7rem;
	}
	
	.login input,.register input {
		width: 100%;
		vertical-align: middle;
		height: 2rem;
		padding-left: .21rem;
		border-radius: 5rem;
		border: none;
		margin-bottom: .5rem;
		text-indent: 1em;
		color: #999;
		font-size: .56rem;
	}
	.register p.verif{
		position: relative;
	}
	.register .verif-btn{
		width: 30%;
		display: inline-block;
		position: absolute;
		right: 0;
		top: 0;
		background-color: #e8a274;
		color: #fff;
		border-top-right-radius: 2rem;
		border-bottom-right-radius: 2rem;
		/*border-bottom: 1px solid #7CCAF1;*/
		font-size: .5rem;
	}
	.register .txt-info{
	    color: #fff;
	    line-height: 1rem;
	    text-align: left;
	    font-size: .5rem;
	    padding-left: .42rem;
	}
	.login input::-webkit-input-placeholder,.register input::-webkit-input-placeholder {
		color: #999;
		opacity: 1;
	}
	
	.login a,.register a {
		color: #fff;
		font-size: .7rem;
	}
	
	.login .login-btn,.register .register-btn {
		display: inline-block;
		padding: 2px 1.1rem;
		border-radius: 5rem;
		width: 100%;
		background-color: #e8a274;
		border: none;
		height: 2rem;
		line-height: 2rem;
		letter-spacing: .21rem;
		margin-top: 1rem;
		font-size: .76rem;
	}
</style>