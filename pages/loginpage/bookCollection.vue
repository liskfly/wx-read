<template>
	<view class="collection">
		<view :style="{height:statusBarHeight+'px',whith:'100vw'}" class="top"></view>
		<view class="head" :style="{height:(navHeight-statusBarHeight) + 'px',top:statusBarHeight+'px'}">
			<image src="@/static/YA-.png" @click="navigateBack"></image>
		</view>
<!-- 		<view class="collection-title">
			<text>收藏</text>
		</view> -->
		<view class="collection-list" v-if="collection[0]">
			<view class="collection-item" v-for="(item,index) in collection"  :style="{margin : (index+1 % 3) == 2 ? '0 calc(50vw - 165px) 20rpx':'0 0 20rpx'}" @click="goDetail(item.id,item.title)">
				<image class="cover" :src="item.url"></image>
				<text class="title">{{item.title}}</text>
			</view>
		</view>
<!-- 		<view class="" v-if="collection[0]">
			<image src=""></image>
		</view> -->
	</view>
</template>

<script>
	export default {
		data (){
			return {
				collection:[],
				statusBarHeight: 0,
				navHeight: 0,
			}
		},
		onLoad(){
			this.getCollectionList()
			this.getHieght()
		},
		methods:{
			goDetail(id,title) {
				uni.navigateTo({
					url:`../bookbrowse/bookDetails?id=${id}&title=${title}`
				})
			},
			getHieght() {
				uni.getSystemInfo({
					success: (data) => {
						let custom = uni.getMenuButtonBoundingClientRect()
						this.statusBarHeight = data.statusBarHeight
						//导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度。
						this.navHeight = custom.bottom + custom.top - data.statusBarHeight
					}
				})
			},
			navigateBack() {
				uni.navigateBack()
			},
			getCollectionList() {
				let that = this
				uni.getStorage({
					key: 'collection',
					success: function (res) {
						console.log(res);
						that.collection = res.data
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.collection {
		width: 100vw;
		
		.top {
			position: sticky;
			top: 0;
			background-color: white;
		}
		
		.head {
			width: 100vw;
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #aaaaaa;
			position: sticky;
			background-color: white;
		
			image {
				width: 30px;
				height: 30px;
				margin-left: 20rpx;
			}
		}
		
		.collection-list {
			box-sizing: border-box;
			width: 100vw;
			padding:0 30rpx;
			display: flex;
			flex-wrap: wrap;
			margin-top: 30rpx;
			
			.collection-item {
				width: 200rpx;
				height: 310rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				
				.cover {
					width: 200rpx;
					height: 310rpx;
					margin-bottom: 20rpx;
					box-shadow: -10rpx 10rpx 10rpx lightgray;
				}
				
				.title {
					font-size: 30rpx;
				}
			}
		}
	}
</style>