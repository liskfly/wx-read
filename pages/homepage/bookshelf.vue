<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<view :style="{height:statusBarHeight+'px'}"></view>
			<view class="navbar-content" :style="{height:navBarHeight+'px',width:windowWidth+'px'}">
				<view class="navbar-search">
					<view class="hometop">
						<view class="pic">
							<image src="../../static/f99.png" mode=""></image>
							<image src="../../static/shy.png" @click="goSearch"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view :style="{height: statusBarHeight+navBarHeight+'px'}"></view>
		<view class="recommendlist">
			<view class="list" v-for="(item,index) in info" :key="index" @click="goDetail(item.id,item.title)">
				<image :src="item.cover" mode=""></image>
				<span class="author">{{item.author}}</span>
				<span class="title">{{item.title}}</span>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		list
	} from "../../data/recommendData.js"
	export default {
		data() {
			return {
				info: list.list,
				statusBarHeight: 20,
				/* 状态栏高度 */
				navBarHeight: 45,
				/* 导航栏高度 */
				windowWidth: 375,
				/* 窗口宽度 */
				/* 设定状态栏默认高度 */
				val: '' /* 导航栏搜索框的值 */
			}
		},
		created() {
			// 获取手机系统信息
			const info = uni.getSystemInfoSync()
			// 设置状态栏高度（H5顶部无状态栏小程序有状态栏需要撑起高度）
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			// 除了h5 app mp-alipay的情况下执行
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			// 获取胶囊的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info
				.statusBarHeight)
			this.windowWidth = menuButtonInfo.left
			// #endif
		},
		methods: {
			goDetail(id,title) {
				uni.navigateTo({
					url:`../bookbrowse/bookDetails?id=${id}&title=${title}`
				})
			},
			goSearch() {
				uni.navigateTo({
					url:`../bookSearch/bookSearch`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navbar {
		width: 100vw;
		height: 100vh;

		.hometop {
			width: 100vw;
			height: 100%;

			.pic {
				width: 100%;
				height: 100%;
				display: flex;

				image {
					width: 30px;
					height: 30px;
					margin: 0 20rpx;
				}
			}
		}

		.navbar-fixed {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			width: 100%;
			background-color: #fff;
			border-bottom: 1px solid lightgray;

			.navbar-content {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 45px;
				box-sizing: border-box;

				.navbar-search {
					display: flex;
					align-items: center;
					padding: 0 10px;
					width: 100%;
					height: 30px;
					border-radius: 30px;
					background-color: #fff;

					.navbar-search_icon {
						margin-right: 10px;
					}

					.navbar-search_text {
						width: 100%;
						font-size: 14px;
						color: #999;
					}
				}

				&.search {
					padding-left: 0;

					.navbar-content__search-icons {
						margin-left: 10px;
						margin-right: 10px;
					}

					.navbar-search {
						border-radius: 5px;
					}
				}
			}

		}

		.recommendlist {
			width: 100vw;
			margin-top: 20rpx;
			display: flex;
			flex-wrap: wrap;

			.list {
				width: 200rpx;
				height: 350rpx;
				margin: 0 calc((100% - 600rpx) / 6);
				display: flex;
				flex-direction: column;
				margin-bottom: 20rpx;
				
				.title {
					width: 200rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size: 28rpx;
				}
				
				.author {
					font-size: 22rpx;
					color: darkgray;
					margin:10rpx 0;
				}
				
				image {
					width: 100%;
					height: 300rpx;
					box-shadow: -10rpx 10rpx 10rpx lightgray;
				}
			}
		}
	}
</style>
