<template>
	<div class="address-page">
		<div class="shadow" style="display: none;">
			<div id="fullbg" class="fullbg"></div>
			<div id="dialog" class="dialog">
				<div class="dialogWrap">
					<div class="RUSure">确认删除该地址吗？</div>
					<div class="chance">
						<span v-on:click="addCancel">取消</span>
						<span v-on:click="willDelete">删除</span>
					</div>
				</div>
			</div>
		</div>
		<x-header style="background-color: ">地址管理</x-header>
		<scroller style="margin-top: 46px;" lock-x :height=showHeight ref="scroller">
			<div class="addBottom">
				<div class="addressInfo" v-for="(item,$index) in info">
					<div class="infoWrap">
						<div class="addTop">
							<span class="addName">{{item.name}}</span>
							<span class="addPhone">{{item.mobile}}</span>
						</div>
						<div class="addInfo">{{item.province}}{{item.city}}{{item.region}}{{item.addr}}</div>
						<div class="addBottom">
							<span>
								<!-- <em class="block-pic pic" v-bind:class="[{'':item.def_addr == 1}]"></em> -->
	
								<em class="block-pic pic" v-show="item.def_addr != 1 "></em>
								<em class="block-pic pic2" v-show="item.def_addr == 1 "></em>
	
								<!-- <i v-bind:class="{'addActive':num != $index }" v-on:click="setDefault($event,$index)">设为默认地址</i> -->
								<i v-show="item.def_addr != 1" class="setDefault" v-on:click="setDefault($event,$index)">设为默认地址</i>
								<i v-show="item.def_addr == 1" class="addActive" v-on:click="setDefault($event,$index)">默认地址</i>
	
							</span>
							<div class="addEdit">
								<span class="addDelete" v-on:click="addDelete($index)">删除</span>
								<router-link :to="{name:'editAdd',params:{'add_id':item.addr_id}}">
									<span>编辑</span>
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
				<span v-show="status2.pulldownStatus === 'default'"></span>
				<span class="pulldown-arrow" v-show="status2.pulldownStatus === 'down' || status2.pulldownStatus === 'up'" :class="{'rotate': status2.pulldownStatus === 'up'}">↓</span>
				<span v-show="status2.pulldownStatus === 'loading'">
					<spinner type="ios-small"></spinner>
				</span>
			</div>
		</scroller>
		<div class="addNew">
			<router-link :to="{name:'editAdd',params:{'add_id':'0'}}">
				添加新地址
			</router-link>
		</div>
	
	</div>
</template>
<script type="text/javascript">
import { Scroller, Spinner, XHeader, Loading } from 'vux'
export default {
	props: [],
	components: {
		Scroller,
		Spinner,
		XHeader,
		Loading

	},
	data() {
		return {
			showHeight: "",
			status2: {
				pulldownStatus: 'default'
			},
			num: '',
			info: [],
		}
	},
	methods: {

		setData: function (id) {
			console.log(id);
		},
		setDefault: function (e, index) {
			var that = this;
			that.$vux.loading.show({
				text: 'Loading'
			})
			var addr_id = that.info[index].addr_id;
			var url = '/rest/addressList/default';
			that.axios.post(url, { 'id': addr_id })
				.then(response => {
					that.getAddressList();
				})


		},
		addDelete: function (index) {
			this.num = index;
			var bh = $(".address-page").height();
			var bw = $(".address-page").width();
			$('#fullbg').css({
				height: bh,
				width: bw,
				display: "block"
			});
			$(".shadow").show();
		},

		addCancel: function () {
			$(".shadow").hide();
		},
		willDelete: function () {
			$(".shadow").hide();
			var that = this;
			that.$vux.loading.show({
				text: 'Loading'
			})
			var addr_id = that.info[that.num].addr_id;
			var url = '/rest/addressList/' + addr_id;
			that.axios.delete(url)
				.then(response => {
					that.getAddressList();

				})

		},
		load3() {
			setTimeout(() => {
				this.$refs.scroller.donePulldown()
			}, 2000)
		},
		getAddressList() {
			var url = '/rest/addressList/getAddressList';
			var that = this;
			that.axios.get(url)
				.then(response => {
					that.info = response.data.data.addressList;
					that.$nextTick(() => {
						that.$refs.scroller.reset();

					})
					that.$vux.loading.hide();

				})
		}

	},


	mounted() {
		this.showHeight = document.documentElement.clientHeight - 96 + 'px';
		this.getAddressList();
	}
}
</script>
<style>
.address-page {
	background-color: #eeeeee;
	color: #000000;
	overflow: hidden;
}

.address-page .pageTitle {
	height: 2rem;
	line-height: 2rem;
	text-align: left;
	text-indent: 1rem;
	border-bottom: .1rem #db0000 solid;
	background-color: #ffffff;
}

.address-page .vux-header .vux-header-left a {
	color: white;
}

.address-page .vux-header .vux-header-left .left-arrow:before {
	content: "";
	position: absolute;
	width: 12px;
	height: 12px;
	border: 1px solid white;
	border-width: 1px 0 0 1px;
	-webkit-transform: rotate(315deg);
	transform: rotate(315deg);
	top: 8px;
	left: 7px;
}

.address-page .pageTop {
	height: 2.5rem;
}

.address-page .pageTitle b {
	font-weight: 500;
	font-size: .6rem;
	line-height: 2rem;
	color: #db0000;
}

.addNew {
	display: -webkit-box;
	display: box;
	position: fixed;
	left: 0;
	bottom: 0;
	height: 50px;
	line-height: 0;
	width: 100%;
	z-index: 97;
	background: #fff;
}

.addNew a {
	line-height: 50px;
	border-radius: 0;
	padding: 0!important;
	height: 50px;
	text-align: center;
	position: relative;
	-webkit-box-flex: 1;
	box-flex: 1;
	display: block;
	background: #eb6100;
	font-size: .64rem;
	color: white;
}

.address-page .addBottom {}

.address-page .addressInfo {
	background-color: #FFFFFF;
	margin-bottom: 5%;
	padding: 1rem 0;
}

.address-page .addressInfo .infoWrap {
	margin: 0rem 1rem;
	overflow: hidden;
}

.address-page .addressInfo .addTop {
	font-size: .7rem;
}

.address-page .addressInfo .addTop .addName {
	color: #EB6100;
	text-align: left;
	float: left;
}

.address-page .addressInfo .addTop .addPhone {
	color: #EB6100;
	text-align: right;
	float: right;
}

.address-page .addressInfo .addInfo {
	margin-top: 1.3rem;
	margin-left: 0rem;
	text-align: left;
	border-bottom: .04rem #CECECE solid;
	font-size: .6rem;
}

.address-page .addressInfo .addBottom {
	width: 100%;
	height: 5%;
	margin-top: .5rem;
}

.address-page .addressInfo .addBottom .addActive {
	color: #EB6100;
}


.address-page .addressInfo .addBottom span {
	color: #000000;
	font-size: .5rem;
	font-family: "微软雅黑";

	float: left;
	margin-right: 20%;
}

.address-page .addressInfo .addBottom .addEdit {
	height: 5%;
	float: right;
	width: 40%;
	margin-right: 0rem;
}

.address-page .addressInfo .addBottom .addEdit span {
	height: 1rem;
	float: right;
	margin-left: 1rem;
	margin-right: 0rem;
}

.address-page .addressInfo .addBottom .addEdit .addDelete {
	color: red;
}

.address-page #fullbg {

	display: block;
	background-color: gray;
	left: 0;
	opacity: 0.5;
	position: absolute;
	top: 0;
	z-index: 3;
	filter: alpha(opacity=50);
	-moz-opacity: 0.5;
	-khtml-opacity: 0.5;
}

.address-page #dialog {
	background-color: #fff;
	height: 4rem;
	left: 45%;
	margin: -4.4rem -4.4rem;
	padding: 0.01rem;
	position: fixed !important;
	/* 浮动对话框 */
	position: absolute;
	top: 50%;
	width: 60%;
	z-index: 5;
	display: block;
}

.address-page #dialog .dialogWrap {
	font-size: .5rem;
	margin-top: .9rem;
	margin-left: .85rem;
	height: 60%;
	width: 84%;
	text-align: left;
}

.address-page #dialog .dialogWrap .chance {
	font-size: .48rem;
	margin-top: .9rem;
	margin-right: 0rem;
	float: right;
}

.address-page #dialog .dialogWrap .chance span {
	margin-right: .4rem;
	color: #EB6100;
}

.address-page .addressTitle {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 59;
}

.address-page .addressTitle .white {
	background: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(0, 0, 0, 0)), to(rgba(0, 0, 0, 0)));
}

.address-page .addressTitle .white.act {
	background: #FD4433;
}

.address-page .addressTitle .white ul.headerbox {
	width: 100%;
	display: flex;
}

.address-page .addressTitle .white ul.headerbox li {

	line-height: 1.56rem;
}

.address-page .addressTitle .white ul li.xm-search {
	width: 100%;
}

.address-page .addBottom span i {
	font-style: normal;
}

.address-page .addBottom .block-pic {
	display: inline-block;
	width: .4rem;
	height: .4rem;
	background-repeat: no-repeat;
	-webkit-background-size: 100%;
	background-size: 100%;
	margin-right: .21rem;
}

.address-page .addBottom .pic {
	background-image: url(../../imgs/default-home.png);
	width: .43rem;
	height: .43rem;
}

.address-page .addBottom .pic2 {
	background-image: url(../../imgs/default-home2.png);
	width: .43rem;
	height: .43rem;
}

.address-page .vux-scroller-bbs1c {
	height: 28.5rem;
}
</style>