<template>
	<view>
		<view :style="{height:statusBarHeight+'px',whith:'100vw'}" class="top"></view>
		<view class="head" :style="{height:(navHeight-statusBarHeight) + 'px',top:statusBarHeight+'px'}">
			<image src="@/static/YA-.png" @click="navigateBack"></image>
		</view>
		<view class="list" v-for="item,index in rankingList" :key="index">
			<image :src="item.cover" class="listCover" mode=""></image>
			<view class="item">
				<text class="title">{{item.title}}</text>
				<text class="content">{{item.content}}</text>
				<text class="author">{{item.author + '  |  ' + item.category}}</text>
			</view>
			<image src="../../static/iD3.png" v-if="index == 0" class="rankingPic"></image>
			<image src="../../static/Cv8.png" v-if="index == 1" class="rankingPic"></image>
			<image src="../../static/Cv8.png" v-if="index == 2" class="rankingPic"></image>
			<text class="rankingNum" v-if="index>2">{{parseInt(index) + 1}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 0,
				navHeight: 0,
				rankingList: []
			}
		},
		onLoad(option) {
			this.getHieght()
			this.getRanking()
		},
		methods: {
			getHieght() {
				uni.getSystemInfo({
					success: (data) => {
						let custom = uni.getMenuButtonBoundingClientRect()
						this.statusBarHeight = data.statusBarHeight
						this.navHeight = custom.bottom + custom.top - data.statusBarHeight
					}
				})
			},
			getRanking() {
				uni.request({
					url: `https://apis.netstart.cn/yunyuedu/store/rankList.json?rankType=26&uuid=ca03da7b64ca443ab25ec3b662fa91e2&all=0`,
					success: (res) => {
						this.rankingList = res.data.list
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		position: sticky;
		top: 0;
		background-color: white;
		z-index: 10;
	}

	.head {
		width: 100vw;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #aaaaaa;
		position: sticky;
		background-color: white;
		z-index: 10;

		image {
			width: 30px;
			height: 30px;
			margin-left: 20rpx;
		}
	}
	
	.list {
		box-sizing: border-box;
		width: 100vw;
		padding: 20rpx 30rpx;
		display: flex;
		position: relative;
		
		.rankingPic {
			width: 80rpx;
			height: 30rpx;
			position: absolute;
			right: 20rpx;
			top: 10rpx;
		}
		
		.rankingNum {
			font-size: 30rpx;
			color: #d3d39e;
			position: absolute;
			right: 20rpx;
			top: 10rpx;
		}
		
		.listCover {
			width: 180rpx;
			height: 230rpx;
			margin-right: 20rpx;
		}
		
		.item {
			width: calc(100vw - 150px);
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			
			.title {
				font-size: 30rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}
			
			.content {
				font-size: 22rpx;
				color: #aaaaaa;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				margin-bottom: 60rpx;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			
			.author {
				font-size: 22rpx;
				color: #aaaaaa;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}
		}
	}
</style>
