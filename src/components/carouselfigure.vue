<template lang="html">
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="img in imgs">
				<img :src="img.atturl" class="swiper_img" />
			</div>
		</div>
		<div class="swiper-pagination"></div>

	</div>
</template>

<script>
	import swipers from "../../static/swiper.min.js"

	export default {
		data() {
			return {
				imgs: []
			}
		},
		methods: {
			car_fig() {
				var url = '/rest/index/getAdv/mobile';
				var that = this;
				that._get(
					url,
					function(res) {
						that.imgs = res.data.advsList.wx_index_banner[0].adColumnMap.banner.advList;
					},
					function(res) {

					});
			}

		},
		mounted() {
				this.car_fig();
		},
		updated() {
			var mySwiper = new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				autoplay: 3000,
				speed: 1000,
				loop: true,
			});
		}
	}
</script>

<style lang="css">
	@import '../../static/swiper.min.css';
	.swiper-container {
		background-color: #ffffff;
	}
	
	.swiper_img {
		height: 7rem;
		width: 100%;
	}
</style>