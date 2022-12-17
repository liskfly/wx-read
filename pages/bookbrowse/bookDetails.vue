<template>
	<view>
		<view :style="{height:statusBarHeight+'px',whith:'100vw'}" class="top"></view>
		<view class="head" :style="{height:(navHeight-statusBarHeight) + 'px',top:statusBarHeight+'px'}">
			<image src="@/static/YA-.png" @click="navigateBack"></image>
		</view>
		<view class="bookdetail" v-if="load">
			<image class="cover" :src="detail.link[2].href"></image>
			<view class="authordetail">
				<text class="title">{{detail.title}}</text>
				<text class="name">{{'作者' + detail.author.name}}</text>
				<text class="click">{{detail["pris:subscribe"].clicks}}</text>
			</view>
		</view>
		<view class="text" v-if="load">
			<text>{{detail.content.text}}</text>
		</view>
		<view class="catalogue" @click="open" v-if="load">
			<view class="left">
				<image src="../../static/sIb.png" class="catalogue-cover"></image>
				<text>{{'共' + detail["pris:book"].totalArticleCount[1] + '章'}}</text>
			</view>
			<image src="../../static/4ZH.png" class="right"></image>
		</view>
		<uni-popup ref="popup" type="left" v-if="load">
			<view :style="{height:statusBarHeight+'px',whith:'100vw'}" class="top"></view>
			<view class="head" :style="{height:(navHeight-statusBarHeight) + 'px',top:statusBarHeight+'px'}">
				<image src="@/static/YA-.png" mode="" @click="close"></image>
			</view>
			<view class="catalogue-title" :style="{height:`calc(100vh - ${navHeight + 'px'})`}">
				<text class="title">目录</text>
				<view v-for="item,index in catalogue" :key="index" class="list" @click="goBrowse(index)">
					<text class="item-title">{{item.title}}</text>
				</view>
			</view>
		</uni-popup>
		<view class="bottom">
			<view class="btn-collection" @click="collection">
				<text class="collection" v-show="isCollection">收藏</text>
				<text class="iscollection" v-show="!isCollection">已收藏</text>
			</view>
			<view class="btn-read" @click="goBrowse(BookNum)">
				<text>继续阅读</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				show: false,
				detail: {},
				catalogue: [],
				statusBarHeight: 0,
				navHeight: 0,
				source_uuid:'',
				bookUrl:'',
				bookTitle:'',
				load:false,
				isCollection:true,
			}
		},
		onLoad(option) {
			this.getHieght()
			this.getBookMidden(option.id, option.title)
			this.getTop(option.id)
		},
		computed:{
			...mapState(['BookNum']),
		},
		methods: {
			open() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open('')
			},
			close() {
				this.$refs.popup.close()
			},
			getTop(id) {
				this.$.getChaper(id, {})
					.then(res => {
						this.catalogue = res.catalog
						this.source_uuid = res.book.sourceUuid
						this.isCollection = this.$.findCollection(this.source_uuid)
						this.load = true
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
			getBookMidden(id, title) {
				this.$.getBookDetail(`id=${id}&title=${title}`, {})
					.then(res => {
						this.detail = res.feed.entry
						this.bookTitle = res.feed.entry.title
						this.bookUrl = res.feed.entry.link[2].href
					})
			},
			navigateBack() {
				this.detail = {}
				uni.navigateBack()
			},
			goBrowse(num) {
				uni.setStorage({
					key: 'num',
					data:num
				})
				uni.navigateTo({
					url:`../bookbrowse/bookBrowse?source_uuid=${this.source_uuid}&num=${num}`
				})
			},
			collection() {
				this.isCollection = !this.isCollection
				this.$.allCollection(this.isCollection,this.source_uuid,this.bookTitle,this.bookUrl)
			},
			...mapMutations(["changeNum"]),
		}
	}
</script>

<style lang="scss" scoped>
	.bottom {
		width: 100vw;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		display: flex;
		font-size: 40rpx;
		
		.btn-collection {
			flex: 1;
			display: flex;
			
			.collection {
				margin: auto;
			}
			
			.iscollection {
				margin: auto;
				color: #aaaaaa;
			}
		}
		
		.btn-read {
			flex: 1;
			display: flex;
			background-color: #ff5500;
			
			text {
				color: white;
				margin: auto;
			}
		}
	}
	
	.catalogue-title {
		width: 100vw;
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;

		.title {
			font-size: 80rpx;
			margin: 20rpx;
		}

		.list {
			box-sizing: border-box;
			width: 100vw;
			padding: 10rpx 10rpx;
			border-bottom: 1rpx solid black;

			.item-title {
				font-size: 36rpx;
			}
		}
	}

	.catalogue {
		box-sizing: border-box;
		width: 100vw;
		padding: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.left {
			display: flex;
			align-items: center;

			.catalogue-cover {
				width: 40rpx;
				height: 40rpx;
			}

			text {
				line-height: 36rpx;
			}
		}

		.right {
			width: 18rpx;
			height: 30rpx;
		}
	}

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

	.bookdetail {
		box-sizing: border-box;
		width: 100vw;
		padding: 20rpx;
		display: flex;

		.cover {
			width: 220rpx;
			height: 300rpx;
			margin-right: 26rpx;
			box-shadow: -10rpx 10rpx 10rpx lightgray;
		}

		.authordetail {
			width: 45vw;
			display: flex;
			flex-direction: column;

			.title {
				font-size: 40rpx;
				font-weight: 700;
				margin-bottom: 30rpx;
			}

			.name {
				margin-bottom: 30rpx;
			}
		}
	}

	.text {
		padding: 20rpx;
		font-size: 26rpx;
	}
</style>
