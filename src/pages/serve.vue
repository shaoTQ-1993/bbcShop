<template>
	<div class="serve">
		<x-header style="background-color: #eb6100;">服务</x-header>
	
		<div class="ps_class_bigger" v-if="firstList">
			<div class="left_bar">
				<div class="swiper-wrapper">
					<div class="swiper-slide left_item" v-for="item in firstList" v-bind:index="item.cat_id" v-on:click="changeBlock(item.cat_id)">
						{{item.name}}
					</div>
				</div>
			</div>
	
			<div class="right_bar">
				<div v-if="hasChildren">
					<grid :rows="3">
						<grid-item v-for="child in secondList" :key="child">
	
							<img slot="icon" v-bind:src="child.image">
							<router-link :to="{name:'search_res',params:{'catId':child.cat_id}}">
								<span>{{child.name}}</span>
							</router-link>
						</grid-item>
					</grid>
					<!--<div v-for="child in secondList">
									<router-link :to="{name:'search_res',params:{'catId':child.cat_id}}">
							        	<img v-bind:src="child.image"  />
										<div>
							            	<a target="_blank" >{{child.name}}</a>
							            </div>
									</router-link>						
								</div>-->
	
				</div>
			</div>
	
		</div>
	</div>
</template>
<script type="text/javascript">
import { Grid, GridItem, GroupTitle, XHeader } from 'vux'
export default {
	props: [],
	data() {
		return {
			firstList: [],
			hasChildren: "",
			secondList: [],
			thirdList: [],
		}
	},
	components: {
		Grid,
		GridItem,
		GroupTitle,
		XHeader
	},
	methods: {
		Request() {
			var URL = "/rest/cat/getCat";
			var that = this;
			that.axios.get(URL)
				.then(response => {
					console.log(response);
					that.firstList = response.data.data.cat;
					that.hasChildren = that.firstList[0].hasChildren;
					that.secondList = that.firstList[0].children;

				})
		},
		changeBlock(index) {
			for (var i = 0; i < this.firstList.length; i++) {
				if (this.firstList[i].cat_id == index) {
					this.secondList = this.firstList[i].children;
				}
			}
			$(".left_item").each(function (item, obj) {
				if (obj.getAttribute("index") == index) {
					var left_item = document.querySelectorAll(".left_item");
					for (var i = 0; i < left_item.length; i++) {
						left_item[i].setAttribute("class", "left_item");
					}
					obj.setAttribute("class", "left_item li_active");
				}
			});
		},
		scroll() {
			$(window).scroll(function (e) {
				console.log($(this).scrollTop());
				console.log($(this).clientX);
			});
		},

	},
	mounted() {
		this.active("#category");
		this.Request();
		var H = $(window).height() - 46;
		$(".left_bar").css('height', H + 'px');
		$(".right_bar").css('height', H + 'px');
		/*this.scroll();*/

	},
	updata() {
		this.Request();
	},
	watch: {
		firstList: function () {
			this.$nextTick(function () {
				$(".left_item:first").addClass("li_active");
				var leftBar = new Swiper('.left_bar', {
					direction: 'vertical',
					slidesPerView: 'auto',
				});
			})
		}
	}
}
</script>
<style>
@import "../../reset.css";
@import '../../static/swiper.min.css';
body {
	background-color: #fff;
}

.serve .swiper-wrapper {
	height: auto;
}

.serve .ps_class_bigger {
	width: 100%;
	position: absolute;
	bottom: 0;
	top: 0rem;
	background-color: #eee;
	z-index: 3;
	float: left;
	margin-top: 46px;
}

.serve .vux-header .vux-header-left a,
.vux-header .vux-header-left button,
.vux-header .vux-header-right a,
.vux-header .vux-header-right button {

	color: white;
}

.serve .vux-header .vux-header-left .left-arrow:before {

	border: 1px solid white;
	content: "";
	position: absolute;
	width: 12px;
	height: 12px;
	border-width: 1px 0 0 1px;
	-webkit-transform: rotate(315deg);
	transform: rotate(315deg);
	top: 8px;
	left: 7px;
}

.serve .left_bar {
	float: left;
	width: 25%;
	min-height: 80vh;
	background-color: #fff;
	overflow: hidden;
}

.serve .left_bar .left_item {
	height: 2rem;
	line-height: 2rem;
	text-align: center;
	box-sizing: border-box;
	border-bottom: 1px solid #F2F2F2;
	border-right: 1px solid #F2F2F2;
	font-size: 0.6rem;
}

.serve .left_bar .left_item.li_active {
	background-color: #F3F5F7;
	/*	border: none !important;*/
	color: #f00;
}

.serve .right_bar {
	background: #F3F5F7;
	overflow-y: scroll;
	font-size: 13px;
}


.serve .right_bar .class_second {
	clear: both;
	font-size: 0.6rem;
	font-weight: 500;
	text-align: center;
	float: left;
	margin: 15px 85px;
	border-bottom: 1px #EEEEEE solid;
}

.serve .weui-grid__icon {
	width: 70px;
	height: 70px;
	margin-bottom: 5px;
}

.serve .weui-grid {
	padding: 15px 10px;
}

.serve .weui-grid:before {
	border: none;
}

.serve .weui-grid:after {
	border: none;
}
</style>