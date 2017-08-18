<template>
	<div class="category">
		<header class="header">
			<heads></heads>
		</header>
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
						<div v-for="child in secondList">
							<grid-item :link="{name:'search_res',params:{'catId':child.cat_id}}">
								<img slot="icon" v-bind:src="child.image">
								<span>{{child.name}}</span>
							</grid-item>
						</div>
					</grid>

				</div>
			</div>
	
		</div>
	</div>
</template>
<script type="text/javascript">
import heads from '../components/head'
import swipers from "../../static/swiper.min.js"
import { Grid, GridItem, GroupTitle, Loading } from 'vux'
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
		heads,
		Grid,
		GridItem,
		GroupTitle
	},
	methods: {
		Request() {
			var that = this;
			that.$vux.loading.show({
				text: 'Loading'
			})
			var URL = "/rest/cat/getCat";
			that.axios.get(URL)
				.then(response => {

					that.firstList = response.data.data.cat;
					that.hasChildren = that.firstList[0].hasChildren;
					that.secondList = that.firstList[0].children;
					that.$vux.loading.hide();

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
	},
	mounted() {
		this.active("#category");
		this.Request();
		var H = $(window).height() - $(".head").height();
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

.category .swiper-wrapper {
	height: auto;
}

.category .ps_class_bigger {
	width: 100%;
	position: absolute;
	bottom: 0;
	top: 2rem;
	background-color: #eee;
	z-index: 3;
	float: left;
}

.category .left_bar {
	float: left;
	width: 25%;
	min-height: 80vh;
	background-color: #fff;
	padding-bottom: 2rem;
	overflow: hidden;
}

.category .left_bar .left_item {
	height: 2rem;
	line-height: 2rem;
	text-align: center;
	box-sizing: border-box;
	border-bottom: 1px solid #F2F2F2;
	border-right: 1px solid #F2F2F2;
	font-size: 0.6rem;
}

.category .left_bar .left_item.li_active {
	background-color: #F3F5F7;
	/*	border: none !important;*/
	color: #eb6100;
}

.category .right_bar {
	background: #F3F5F7;
	overflow-y: scroll;
	padding-bottom: 0.5rem;
	font-size: 13px;
}

.category .weui-grid__icon {
	width: 70px;
	height: 70px;
	margin-bottom: 5px;
}

.category .weui-grid {
	padding: 15px 10px;
}

.category .weui-grid:before {
	border: none;
}

.category .weui-grid:after {
	border: none;
}

.category .weui-grids:after {
	border: none;
}
</style>