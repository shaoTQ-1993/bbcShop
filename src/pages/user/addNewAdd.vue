<template>
	<div class="newAddress">
		<x-header style="background-color: #eb6100;">添加新地址</x-header>
		<div class="cont">
			<div class="task">
				<label>
					<em class="iconPic namePic"></em>
					<i>收货人</i>
				</label>
				<input type="text" class="urName" placeholder="请输入姓名" v-on:blur="judgeName()" v-model="urName" />
			</div>
	
			<div class="task">
				<label>
					<em class="iconPic phonePic"></em>
					<i>联系电话</i>
				</label>
				<input type="number" class="urPhone" placeholder="请输入电话" v-on:blur="judgePhone()" v-model="urPhone" />
			</div>
			<div class="task">
				<label>
					<em class="iconPic addPic"></em>
					<i>收货地址</i>
				</label>
				<group class="address">
					<x-address @on-hide="logHide" @on-show="logShow" :title="title2" v-model="valueAdd" :list="addressData" value-text-align="left"></x-address>
				</group>
			</div>
			<div class="add-info">
				<label>
					<em class="iconPic infoPic"></em>
					<i>地址详情</i>
				</label>
				<textarea name="address" id="fromAddrInfo" v-model="urAdd"></textarea>
			</div>
			<toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="添加成功" :position="position"></toast>
		</div>
	
		<div style="padding:15px;margin-top: 3rem;">
	
			<x-button @click.native="saveAdress('')" type="primary" style="background-color: #eb6100">保存</x-button>
		</div>
	</div>
</template>

<script>
import { Group, XInput, XTextarea, XAddress, ChinaAddressV3Data, XHeader, XButton, Toast } from 'vux'
export default {
	components: {
		Group,
		XInput,
		XTextarea,
		XAddress,
		ChinaAddressV3Data,
		XHeader,
		XButton,
		Toast
	},
	data() {
		return {
			urName: '',
			urPhone: '',
			valueAdd: ['辽宁省', '鞍山市', '铁东区'],
			addressData: ChinaAddressV3Data,
			urAdd: '',
			title2: '',
			value: '',
			position: 'default',
			showPositionValue: false

		}
	},

	methods: {
		/**** 城市选择器消失时调用  *****/
		logHide(str) {
			// 点击确定时
			if (str) {

				// 获取省市区各级的字符串
				var arrayString = $(".vux-popup-picker-value").text().split(" ");

				//获取省市各级的id
				var arrayId = this.valueAdd;

				console.log(arrayId, arrayString);
			} else {

			}
		},
		logShow(str) {
			console.log('on-show')
		},
		change(value) {
			console.log('change', value)
		},
		goBack() {
			this.$router.go(-1);
		},
		judgeName: function () {
			var nameL = $(".urName").val().length;
			console.log("nameL", nameL);
			if (nameL >= 10 || nameL == 0) {
				this.$vux.alert.show({
					title: '',
					content: '请输入正确格式的名字',
				});
				$(".urName").val("").focus();
			}
		},
		judgePhone: function () {
			var phoneL = $(".urPhone").val().length;
			console.log("PhoneL", phoneL);
			if (phoneL != 11) {
				this.$vux.alert.show({
					title: '',
					content: '请输入正确格式的手机号',
				});
				$(".urPhone").val("").focus();
			}
		},

		finishAdd: function () {

			var url = '/rest/addressList/addAddress';
			var data = {
				catId: id,
				pageNo: 1,
				pageSize: 50
			}
			var that = this;
			that.axios.post(url, data)
				.then(response => {
				})
		}
	},
	mounted() {
		this.active("#myself");
	},
}
</script>
<style>
.newAddress {
	background-color: #ffffff;
	min-height: 100vh;
}

.newAddress .pageTitle {
	height: 2.15rem;
	line-height: 1.7rem;
	text-align: left;
	text-indent: 1rem;
	border-bottom: .1rem #db0000 solid;
	background-color: #ffffff;
}

.newAddress .vux-header .vux-header-left a {
	color: white;
}

.newAddress .vux-header .vux-header-left .left-arrow:before {
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

.newAddress .pageTitle b {
	font-weight: 500;
	font-size: .6rem;
	line-height: 2rem;
	color: #db0000;
	float: left;
	text-indent: -.65rem;
}

.newAddress .pageTitle .addFinish {
	float: right;
	height: 2.1rem;
	width: 2.8rem;
	color: #FFFFFF;
	text-indent: .68rem;
	background-color: #EB6100;
	line-height: 2rem;
	font-size: .7rem;
}

.newAddress .cont {
	margin: 2.2rem .6rem;

	background-color: #ffffff;
}

.newAddress .task {
	line-height: 1.28rem;
	margin: .17rem 0;
	overflow: hidden;
	border-bottom: .04rem #EEEEEE solid;
	border-bottom-right-radius: .21rem;
	border-bottom-left-radius: .21rem;
}

.newAddress .address {
	margin: -.65rem 0;
	display: inline-block;
	float: left;
	width: 80%;
	margin-top: -1.86rem;
	margin-left: 4.28rem;
}

.newAddress label {
	margin-right: .4rem;
	width: 4rem;
	font-size: .6rem;
	color: #666;
	float: left;
	text-align: left;
}

.newAddress label i {
	font-style: normal;
	font-size: .6rem;
}

.newAddress .weui-cells {
	font-size: .6rem;
	color: #666;
}

.newAddress .weui-cells span.vux-popup-picker-value {
	width: 75%;
	display: inline-block;
	/*变成行内元素才可以设置宽高*/
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.newAddress .cont input {
	outline: none;
	color: #333;
	height: 1rem;
	border: none;
	float: left;
	font-size: .6rem;
	margin-top: .21rem;
}


.newAddress .weui-cell {
	padding: 0px 0px;
}

.newAddress .task .weui-cell_access .weui-cell__ft:after {
	display: none;
}

.newAddress .weui-cells:before {
	display: none;
}

.newAddress .weui-cells:after {
	display: none;
}

.newAddress .vux-cell-box:before {
	display: none;
}

.newAddress .add-info {
	display: inline-block;
	width: 100%;
	height: 100%;
	margin-top: -.21rem;
}

.newAddress .add-info textarea {
	float: left;
	font-size: .6rem;
	line-height: 1rem;
	border: 1px #EEEEEE solid;
	margin-left: 4.32rem;
	margin-top: -.8rem;
	overflow: hidden;
	resize: none;
	width: 9.13rem;
	height: 4.34rem;
}

.newAddress .weui-dialog__bd {
	font-size: .8rem;
}

.newAddress .weui-dialog__btn_primary {
	color: #EB6100;
}

.newAddress .pageTitle .block-pic {
	display: inline-block;
	width: 2rem;
	height: 2rem;
	background-repeat: no-repeat;
	-webkit-background-size: 100%;
	background-size: 100%;

	float: left;
	margin-left: -0.34rem;
}

.newAddress .pageTitle .goBack {
	background-image: url(../../imgs/go-back.png);
}

.newAddress .iconPic {
	display: inline-block;
	width: 1.1rem;
	height: 1.1rem;
	background-repeat: no-repeat;
	-webkit-background-size: 100%;
	background-size: 100%;
	margin-bottom: -.21rem;
	margin-right: .21rem;
}

.newAddress .namePic {
	background-image: url(../../imgs/urName.png);
}

.newAddress .phonePic {
	background-image: url(../../imgs/urPhone.png);
}

.newAddress .addPic {
	background-image: url(../../imgs/urAdd.png);
}

.newAddress .infoPic {}

.newAddress .vux-header .vux-header-left .left-arrow:before {
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

.newAddress .vux-header .vux-header-left a {
	color: white;
}
</style>


