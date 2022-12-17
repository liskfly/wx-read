<template>
	<view>
		<view class="sort">
			<view class="list" v-for="(item,index) in sort" :key="index" @click="goRanking(item.name)">
					<image :src="item.cover"></image>
					<view class="name">
						{{item.name}}
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['sort'],
		methods:{
			goRanking(typeName) {
				if(typeName == '排行') {
					uni.navigateTo({
						url:`./bookRanking`
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sort {
		width: 100vw;
		display: flex;
		justify-content: space-around;

		.list {
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 80rpx;
					height: 80rpx;
				}

				.name {
					font-size: 26rpx;
				}
		}
	}
</style>
