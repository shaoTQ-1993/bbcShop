<template>
	<div class="editAddress">
		<x-header style="background-color: #eb6100;">{{titleName}}</x-header>
	
		<div class="cont">
	
			<div class="task">
				<label>
					<em class="iconPic namePic"></em>
					<i>收货人</i>
				</label>
				<input type="text" class="urName" placeholder="请输入姓名" v-model="urName" v-on:blur="judgeName()" />
			</div>
	
			<div class="task">
				<label>
					<em class="iconPic phonePic"></em>
					<i>联系电话</i>
				</label>
				<input type="number" class="urPhone" placeholder="请输入电话" v-model="urPhone" v-on:blur="judgePhone()" />
			</div>
			<div class="task">
				<label>
					<em class="iconPic addPic"></em>
					<i>收货地址</i>
				</label>
				<group class="address">
					<x-address @on-hide="logHide" @on-show="logShow" :title="title" v-model="valueAdd" :list="addressData" value-text-align="left"></x-address>
				</group>
			</div>
			<div class="add-info">
				<label>
					<em class="iconPic infoPic"></em>
					<i>地址详情</i>
				</label>
				<textarea name="address" id="fromAddrInfo" v-model="urAdd"></textarea>
			</div>
	
		</div>
		<toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text=text :position="position"></toast>
	
		<div style="padding:15px;margin-top: 3rem;">
	
			<x-button @click.native="save('')" type="primary" style="background-color: #eb6100">保存</x-button>
		</div>
	
	</div>
</template>

<script>
import { Group, XInput, XTextarea, XAddress, ChinaAddressV3Data, XHeader, Toast, XButton, Loading } from 'vux'

export default {
	components: {
		Group,
		XInput,
		XTextarea,
		XAddress,
		ChinaAddressV3Data,
		XHeader,
		Toast,
		XButton,
		Loading
	},
	data() {
		return {
			id: '',
			urName: '',
			urPhone: '',
			title: '',
			text: '',
			titleName: '',
			valueAdd: [],
			province: '', city: '', zone: '',
			provinceId: '', cityId: '', zoneId: '',
			addressData: [],
			urAdd: '',
			parameters: '',
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
				var arrayId = this.valueAdd;
				console.log(arrayId, arrayString);

				this.province = arrayString[0];
				this.city = arrayString[1];
				this.zone = arrayString[2];
				this.provinceId = arrayId[0];
				this.cityId = arrayId[1];
				this.zoneId = arrayId[2];
				//获取省市各级的id
			} else {

			}
		},
		logShow(str) {

		},
		goBack() {
			this.$router.go(-1);
		},
		showPosition(position) {
			this.position = position
			this.showPositionValue = true
		},
		save(position) {
			var nameL = $(".urName").val().length;
			var phoneL = $(".urPhone").val().length;
			var urAddL = $("#fromAddrInfo").val().length;

			if (nameL == 0 || phoneL != 11 || nameL == 0) {
				this.text = "请正确填写信息";
				this.showPosition(position);
				console.log(this.parameters);
			} else {
				if(this.id == 0){
					this.addAddress(position);

				}else{
					this.editAddress(position);
					
				}



			}
		},
		editAddress(position) {
			var arrayString = $(".vux-popup-picker-value").text().split(" ");
			var arrayId = this.valueAdd;
			this.province = arrayString[0];
			this.city = arrayString[1];
			this.zone = arrayString[2];
			this.provinceId = arrayId[0];
			this.cityId = arrayId[1];
			this.zoneId = arrayId[2];
			var parameters = {
				'addr_id':this.id,
				'name': this.urName,
				'mobile': this.urPhone,
				'province_id': this.provinceId,
				'province': this.province,
				'city_id': this.cityId,
				'city': this.city,
				'region_id': this.zoneId,
				'region': this.zone,
				'addr': this.urAdd,
				'def_addr': 0,
			};
			var that = this;
			var url = '/rest/addressList/updateAddr';
			that.axios.post(url,parameters)
				.then(response => {
					console.log(response);
					if (response.data.code == '0000') {
						that.text = "编辑成功";
						that.showPosition(position);
						that.goBack();
					}

				})



		},
		addAddress(position) {
			
			var arrayString = $(".vux-popup-picker-value").text().split(" ");
			var arrayId = this.valueAdd;
			this.province = arrayString[0];
			this.city = arrayString[1];
			this.zone = arrayString[2];
			this.provinceId = arrayId[0];
			this.cityId = arrayId[1];
			this.zoneId = arrayId[2];
			var parameters = {
				'name': this.urName,
				'mobile': this.urPhone,
				'province_id': this.provinceId,
				'province': this.province,
				'city_id': this.cityId,
				'city': this.city,
				'region_id': this.zoneId,
				'region': this.zone,
				'addr': this.urAdd,
				'def_addr': 0,
			};
			var that = this;
			var url = '/rest/addressList/addAddress';
			that.axios.post(url,parameters)
				.then(response => {
					console.log(response);
					if (response.data.code == '0000') {
						that.text = "添加成功";
						that.showPosition(position);
						that.goBack();
					}

				})



		},
		
		judgeName: function () {
			var that = this;
			var nameL = $(".urName").val().length;
			if (nameL >= 10 || nameL == 0) {
				this.$vux.alert.show({
					title: '',
					content: '请输入正确格式的名字',
				});
			}
		},

		judgePhone: function () {
			var that = this;
			var phoneL = $(".urPhone").val().length;
			if (phoneL != 11) {
				this.$vux.alert.show({
					title: '',
					content: '请输入正确格式的手机号',
				});
			}
		},

		getRegions: function () {
			var url = '/rest/regions';
			var that = this;
			that.axios.get(url)
				.then(response => {
					var regions = response.data.data.regions;
					for (var i = 0, len = regions.length; i < len; i++) {
						that.addressData.push({ 'name': regions[i].local_name, 'parent': regions[i].p_region_id.toString(), 'value': regions[i].region_id.toString() });

					}

					if (that.id == 0) {
						that.valueAdd = ["110000", '110100', '110101'];
						that.$vux.loading.hide()


					} else {
						var url = '/rest/addressList/' + that.id;
						that.axios.get(url)
							.then(response => {
								console.log(response);
								var addresInfor = response.data.data.address;
								that.urName = addresInfor.name;
								that.urPhone = addresInfor.mobile;
								that.urAdd = addresInfor.addr;
								that.valueAdd = [addresInfor.province_id.toString(), addresInfor.city_id.toString(), addresInfor.region_id.toString()];
								that.$vux.loading.hide()

							})

					}

				})
		}

	},
	mounted() {
		this.$vux.loading.show({
			text: 'Loading'
		})
		this.id = this.$route.params.add_id;
		if (this.id == 0) {
			this.titleName = '添加地址';

		} else {
			this.titleName = '编辑地址';

		}
		this.getRegions();

	},
}
</script>
<style>
.editAddress {
	background-color: #ffffff;
	min-height: 100vh;
}

.editAddress .pageTitle {
	height: 2.15rem;
	line-height: 1.7rem;
	text-align: left;
	text-indent: 1rem;
	border-bottom: .1rem #db0000 solid;
	background-color: #ffffff;
}

.editAddress .vux-header .vux-header-left a {
	color: white;
}

.editAddress .vux-header .vux-header-left .left-arrow:before {
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

.editAddress .pageTitle b {
	font-weight: 500;
	font-size: .6rem;
	line-height: 2rem;
	color: #db0000;
	float: left;
	text-indent: -.65rem;
}

.editAddress .pageTitle .addFinish {
	float: right;
	height: 2.1rem;
	width: 2.8rem;
	color: #FFFFFF;
	text-indent: .68rem;
	background-color: #EB6100;
	line-height: 2rem;
	font-size: .7rem;
}

.editAddress .cont {
	margin: 2.2rem .6rem;
	background-color: #ffffff;
}

.editAddress .task {
	line-height: 1.28rem;
	margin: .17rem 0;
	overflow: hidden;
	border-bottom: .04rem #EEEEEE solid;
	border-bottom-right-radius: .21rem;
	border-bottom-left-radius: .21rem;
}

.editAddress .address {
	margin: -.65rem 0;
	display: inline-block;
	float: left;
	width: 80%;
	margin-top: -1.86rem;
	margin-left: 4.28rem;
}

.editAddress label {
	margin-right: .4rem;
	width: 4rem;
	font-size: .6rem;
	color: #666;
	float: left;
	text-align: left;
}

.editAddress label i {
	font-style: normal;
	font-size: .6rem;
}

.editAddress .weui-cells {
	font-size: .6rem;
	color: #666;
}

.editAddress .weui-cells span.vux-popup-picker-value {
	width: 75%;
	display: inline-block;
	/*变成行内元素才可以设置宽高*/
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.editAddress .cont input {
	outline: none;
	color: #333;
	height: 1rem;
	border: none;
	float: left;
	font-size: .6rem;
	margin-top: .21rem;
}


.editAddress .weui-cell {
	padding: 0px 0px;
}

.editAddress .task .weui-cell_access .weui-cell__ft:after {
	display: none;
}

.editAddress .weui-cells:before {
	display: none;
}

.editAddress .weui-cells:after {
	display: none;
}

.editAddress .vux-cell-box:before {
	display: none;
}

.editAddress .add-info {
	display: inline-block;
	width: 100%;
	height: 100%;
	margin-top: -.21rem;
}

.editAddress .add-info textarea {
	float: left;
	font-size: .6rem;
	line-height: 1rem;
	margin-left: 4.32rem;
	margin-top: -.8rem;
	border: 1px #EEEEEE solid;
	overflow: hidden;
	resize: none;
	width: 9.13rem;
	height: 4.34rem;
}

.editAddress .pageTitle .block-pic {
	display: inline-block;
	width: 2rem;
	height: 2rem;
	background-repeat: no-repeat;
	-webkit-background-size: 100%;
	background-size: 100%;
	float: left;
	margin-left: -.34rem;
}

.editAddress .pageTitle .goBack {
	background-image: url(../../imgs/go-back.png);
}

.editAddress .iconPic {
	display: inline-block;
	width: 1.1rem;
	height: 1.1rem;
	background-repeat: no-repeat;
	-webkit-background-size: 100%;
	background-size: 100%;
	margin-bottom: -.21rem;
	margin-right: .21rem;
}

.editAddress .namePic {
	background-image: url(../../imgs/urName.png);
}

.editAddress .phonePic {
	background-image: url(../../imgs/urPhone.png);
}

.editAddress .addPic {
	background-image: url(../../imgs/urAdd.png);
}

.editAddress .infoPic {}
</style>


