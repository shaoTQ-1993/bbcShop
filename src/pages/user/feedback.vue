<template>
	<div class="feedback">
		<x-header style="background-color: #eb6100">意见反馈</x-header>
	
		<div class="page">
			<div style="transition-property: transform; transform-origin: 0px 0px 0px; transform: translate(0px, 0px) scale(1) translateZ(0px);">
				<div class="Jform2">
					<textarea placeholder="请输入您的宝贵意见，我们将不断优化" id="content"></textarea>
					<a href="javascript:void(0);" class="button block" onclick="save();">提交</a>
				</div>
			</div>
	
		</div>
	</div>
</template>
 <script type="text/javascript">
import { XHeader } from 'vux'

export default {
	props: [],
	data() {
		return {
			showHeight: "",

		}
	},
	components: {
		XHeader
	},
	methods: {

	},
	mounted() {

	}
}
</script>
<style lang="">
.feedback .page {
	background-color: white;
	position: relative;
	z-index: 0;
	margin-top: 46px;
}
.feedback .Jform2 {
	padding: 2rem .52rem 0;
}

.feedback .Jform2 textarea {
	height: 5rem;
	margin-bottom: 2rem;
	font-size: .6rem;
	-webkit-appearance: none;
	box-shadow: none;
	border-radius: 0!important;
	background: #eee;
	padding: .56rem .1rem .1rem .6rem;
	width: 100%;
	color: #232323;
	border: 0;
	resize: none;
}

.feedback .button.block,
.feedback button.block {
	width: 100%;
	padding: 0 .3rem;
	line-height: 1.76rem;
	font-size: 0.64rem;
}
.feedback .vux-header .vux-header-left a {
	color: white;
}

.feedback .vux-header .vux-header-left .left-arrow:before {
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
.feedback .button,
.feedback button {
	color: #fff;
	background: #eb6100;
	font-size: .6rem;
	display: inline-block;
	padding: .14rem .3rem;
	border: none;
	cursor: pointer;
}
</style>