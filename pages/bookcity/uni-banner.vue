<template>
	<view>
		<swiper style="height: 300rpx;" previous-margin="100rpx" next-margin="100rpx" @change="handlechange"
			:current="mycurrent" :indicator-dots="false" :circular="true" :interval="3000" :duration="1000"
			:autoplay="autoplay">
			<swiper-item v-for="(i,index) in banner" :key="index">
				<view :class="['swiper-item',index==mycurrent ? 'active' : '']">
					<image :src="i.cover" style="width: 100%;height: 100%;" @click="goDetail(i.p_id,i.name)"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: ['banner'],
		data() {
			return {
				mycurrent: 0,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods: {
			goDetail(id,title) {
				uni.navigateTo({
					url:`../bookbrowse/bookDetails?id=${id}&title=${title}`
				})
			},
			handlechange(e) {
				this.mycurrent = e.detail.current
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-item {
		border-radius: 30rpx;
		overflow: hidden;
		// 像这种多张轮播图同时出现在一屏的情况下就不要指定width了，不然你会发现previous-margin和 next-margin会出现想不到的效果
		// 如果想要设置宽每一张轮播图的宽度，只需要设置previous-margin和next-margin就可以了，想要设置高度直接改下面的height就可以了
		// width: 450rpx;
		height: 85%;
		transform: scale(0.8);
		transition: all 0.5s ease;
		text-align: center;
		transition: all 0.5s ease-in-out;

		&.active {
			transform: scale(1);
		}
	}
</style>
