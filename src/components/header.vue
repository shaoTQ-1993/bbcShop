
<template>
	<div class="headerContent">
		<div class="white">
			<ul class="headerbox wbox">
				<li class="xm-search">
					<router-link :to="{name:'search'}" class="input-block">
						<input type="text" name="search-button" id="search-button" placeholder="请输入关键词" />
						<i class="xm-search-icon"></i>
					</router-link>
					<router-link :to="{name:'login'}" class="login-btn">{{loginMess}}</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
	name: 'app',
	data() {
		return {
			loginMess: '登录',
		}
	},
	components: {

	},
	methods: {

	},
	mounted() {
		if (localStorage.getItem("login") == 'true') { // 已经登陆
			$(".login-btn").hide();
		}

	}

}
</script>
<style>
.headerContent {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 99;
}

.headerContent .white {
	background: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(0, 0, 0, 0.6)), to(rgba(0, 0, 0, 0)));
}

.headerContent .white.act {
	background: #FD4433;
}

.headerContent .white ul.headerbox {
	width: 100%;
	display: flex;
}

.headerContent .white ul.headerbox li {
	height: 46px;
	line-height: 46px;
}

.headerContent .white ul li.xm-search {
	width: 100%;
}

.headerContent .white ul li.xm-search .input-block {
	width: 86%;
	float: left;
	position: relative;
}

.headerContent .white ul li.xm-search .login-btn {
	float: left;
	width: 14%;
	display: inline-block;
	color: #fff;
	/* text-align: left; */
	font-size: .6rem;
}

.headerContent .white ul li.xm-search #search-button {
	border: none;
	width: 90%;
	height: 30px;
	padding-left: 1.6rem;
	border-radius: .6rem;
	background-color: #fff;
}

.headerContent .white ul li.xm-search a i {
	width: 0.8rem;
	height: 30px;
	background: url(../imgs/index-ico.png) no-repeat;
	background-size: 8.04rem auto;
	background-position: 0 -1rem;
	margin: 0.48rem 0 0 0.2rem;
	position: absolute;
	left: 6%;
	top: 3px;
}
</style>

