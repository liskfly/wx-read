<template>
	<view class="bookcity">
		<view class="navbar">
			<view class="navbar-fixed">
				<!-- 状态栏小程序撑起高度 -->
				<view :style="{height:statusBarHeight+'px'}"></view>
				<view class="navbar-content" :style="{height:navBarHeight+'px',width:windowWidth+'px'}">
					<view class="navbar-search">
						<view class="navbar-search_icon" @click="goSearch">
							<image src="../../static/shy.png"></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 需要添加占位符高度  状态栏高度+导航栏高度（否则下面tab会塌陷）-->
			<view :style="{height: statusBarHeight+navBarHeight+'px'}"></view>
		</view>
		<van-tabs @click="changeTab" :offset-top="statusBarHeight+navBarHeight">
			<van-tab v-for="(item,index) in tab" :title="item.name" :key="index" :name="item.url">
		<view class="place"></view>
		<view v-if="loading">
			<uni-banner v-if="banner[0]" :banner="banner"></uni-banner>
			<uni-sort v-if="sort[0]" :sort="sort"></uni-sort>
			<uni-hot v-if="hot[0]" :hot="hot"></uni-hot>
		</view>
		<view class="loading" v-if="!loading">
			<view>正在加载</view>
		</view>
			</van-tab>
		</van-tabs>
	</view>
</template>

<script>
	import uniBanner from "./uni-banner.vue"
	import uniSort from "./uni-sort.vue"
	import uniHot from "./uni-hot.vue"
	import {
		tab
	} from "../../data/BookCity.js"
	export default {
		name: 'navbar',
		data() {
			return {
				tab: tab.navi,
				banner: [''],
				sort: [''],
				hot: [''],
				statusBarHeight: 20,
				/* 状态栏高度 */
				navBarHeight: 45,
				/* 导航栏高度 */
				windowWidth: 375,
				/* 窗口宽度 */
				val: '',
				active: 2,
				loading:false
			};
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
			this.changeTab({
				detail: {
					name: '/store/show.json?type=female_recommend&uuid=b229b022871941fea35edc7aceeed1ab'
				}
			})
			// #endif
		},
		methods: {
			getBanner(res) {
				this.banner = res.data.data.list[0].banners || ['']
			},
			getcontent({
				data
			}, num) {
				if (data.data.list[num].shortCut && data.data.list.length > num) {
					this.sort = data.data.list[num].shortCut
					this.getcontent({
						data: data
					}, num = num + 1)
				} else if (data.data.list.length > num) {
					this.sort = num == 1 ? [''] : this.sort
					this.hot = this.hot[0] == '' ? [data.data.list[num]] : [...this.hot, data.data.list[num]]
					if (num != data.data.list.length - 1) {
						this.getcontent({
							data: data
						}, num = num + 1)
					}
				}
				this.loading = true
			},
			changeTab({
				detail
			}) {
				this.hot = ['']
				this.sort = [''] 
				this.banner = ['']
				this.loading = false
				uni.request({
					url: `https://apis.netstart.cn/yunyuedu${detail.name}`,
					success: (res) => {
						this.getBanner(res)
						this.getcontent(res, 1)
					}
				})
			},
			goSearch() {
				uni.navigateTo({
					url:`../bookSearch/bookSearch`
				})
			}
		},
		components: {
			uniBanner,
			uniSort,
			uniHot
		}
	}
</script>

<style lang="scss" scoped>
	.bookcity {
		width: 100vw;
		height: 100vh;
		position: relative;
		
		.loading {
			width: 100vw;
			height: 60rpx;
			display: flex;
			align-items: center;
			
			.text {
				width: 100vw;
				font-size: 30rpx;
				text-align: center;
			}
		}
	
	.navbar {
		.navbar-fixed {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			width: 100%;
			background-color: #fff;
			margin-bottom: 20rpx;
			border-bottom: 1px solid lightgray;

			.navbar-content {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 15px;
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
						// width: 10px;
						// height: 10px;
						margin-right: 10px;

						image {
							width: 60rpx;
							height: 60rpx;
						}
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
	}

	.place {
		width: 100vw;
		height: 20rpx;
	}
	}
</style>
