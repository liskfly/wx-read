<template>
	<view class="login">
		<view :style="{height:navHeight+'px',whith:'100vw'}" class="top"></view>
		<view class="user" @click="goLogin">
			<image :src="UserHead" class="user-head" v-if="!data.avatarUrl"></image>
			<view class="userName">
				<text v-if="!data.nickName">{{UserName}}</text>
			</view>
		</view>
		<view class="user-list">
			<view class="user-item">
				<image src="../../static/gWP.png"></image>
				<text>笔记</text>
				<image src="../../static/oMZ.png"></image>
			</view>
			<view class="user-item">
				<image src="../../static/fGo.png"></image>
				<text>已购和上传</text>
				<image src="../../static/oMZ.png"></image>
			</view>
			<view class="user-item">
				<image src="../../static/L56.png"></image>
				<text>在线客服</text>
				<image src="../../static/oMZ.png"></image>
			</view>
			<view class="user-item">
				<image src="../../static/_0R.png"></image>
				<text>积分商城</text>
				<image src="../../static/oMZ.png"></image>
			</view>
			<view class="user-item" @click="goCollection()">
				<image src="../../static/hNJ.png"></image>
				<text>收藏</text>
				<image src="../../static/oMZ.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 0,
				navHeight: 0,
				UserHead:'../../static/FoJ.png',
				UserName:'登录'
			}
		},
		onLoad: function(option) {
			this.getHieght()
			this.getUserData()
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
			goLogin() {
				if(this.UserHead == '../../static/FoJ.png'){
					uni.redirectTo({
						url: `./loginPage`
					})
				}
			},
			getUserData() {
				let that = this
				uni.getStorage({
					key: 'cookie',
					success: function (res) {
						that.UserHead = res.data.avatarUrl
						that.UserName = res.data.nickName
					}
				})
			},
			goCollection() {
				if(this.UserHead != '../../static/FoJ.png'){
					uni.navigateTo({
						url: `./bookCollection`
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		width: 100vw;
		height: 100vh;
		background-color: white;

		.user {
			box-sizing: border-box;
			width: 100vw;
			padding: 20rpx 30rpx;
			display: flex;
			align-items: center;
			margin-bottom: 90rpx;
			justify-content: space-between;

			.user-head {
				width: 180rpx;
				height: 180rpx;
			}

			.user-name {
				font-size: 60rpx;
			}

			.go {
				width: 60rpx;
				height: 60rpx;
			}
		}

		.top {
			position: sticky;
			top: 0;
			background-color: #f7f7f7;
		}

		.user-list {
			width: 100vw;

			.user-item {
				box-sizing: border-box;
				width: 100vw;
				padding: 20rpx 30rpx;
				display: flex;
				align-items: center;
				font-size: 30rpx;

				image {
					width: 30rpx;
					height: 30rpx;
				}

				text {
					margin-left: 20rpx;
					flex: 1;
				}
			}
		}
	}
</style>
