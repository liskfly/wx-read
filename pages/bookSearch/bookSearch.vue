<template>
	<view class="search">
		<view :style="{height:statusBarHeight+'px',whith:'100vw'}" class="top"></view>
		<view class="head" :style="{height:(navHeight-statusBarHeight) + 'px',top:statusBarHeight+'px'}">
			<image src="@/static/YA-.png" @click="navigateBack"></image>
		</view>
		<uni-section type="line">
					<uni-search-bar placeholder="请输入" bgColor="#EEEEEE" @confirm="confirm"/>
		</uni-section>
		<view class="hot" v-show="!search[0]">
			<text class="title">热门搜索</text>
			<text>{{value}}</text>
			<view class="hot-list" v-if="list[0]">
				<view class="item" v-for="item,index in list" :key="index">
					<view class="num" :style="{backgroundColor:`${color[index]}`}">
						<text>{{index + 1}}</text>
					</view>
					<text class="name">{{item.name}}</text>
				</view>
			</view>
		</view>
		<view class="search-list" v-show="search">
			<view class="list" v-for="item,index in search" :key="index" @click="goDetail(item.bookId,item.title)">
				<image :src="item.cover" class="cover"></image>
				<view class="content">
					<!-- <text class="title">{{item.title}}</text> -->
					<rich-text :nodes="changeStr(item.title)"></rich-text>
					<text class="author">{{item.author+'/'+item.category}}</text>
					<text class="summary">{{item.summary}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				statusBarHeight: 0,
				navHeight: 0,
				searchValue: '',
				color:['red','orange','yellow'],
				search:[],
				Page:1,
				valueBefore:''
			}
		},
		onLoad(){
			this.getHotSearch()
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
			getHotSearch(){
				uni.request({
					url: `https://apis.netstart.cn/yunyuedu/search/getHotWords`,
					success: (res) => {
						this.list = res.data.list
					}
				})
			},
			navigateBack() {
				this.detail = {}
				uni.navigateBack()
			},
			confirm({value}) {
				uni.request({
					url: `https://apis.netstart.cn/yunyuedu/search/book.json?keyword=${value}&page=${this.Page}`,
					success: (res) => {
						this.search = res.data.data.books
					}
				})
				this.valueBefore = value
				this.searchValue = ''
			},
			changeStr (str) {
				let strs = '<div class="replace-title"><span>' + str.replace(new RegExp(this.valueBefore,'g'),`</span><span style="color:skyblue;">${this.valueBefore}</span><span>`) + '</span></div>'
				return strs
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		width: 100vw;
		height: 100vh;
		background-color: #f9f9f9;
		overflow: auto;
		
		.search-list {
			width: 100vw;
			background-color: white;
			
			.list {
				box-sizing: border-box;
				width: 100vw;
				padding: 40rpx;
				display: flex;
				justify-content: space-between;
				
				.cover {
					width: 160rpx;
					height: 240rpx;
					box-shadow: -10rpx 10rpx 10rpx lightgray;
				}
				
				.content {
					width: 65vw;
					display: flex;
					flex-direction: column;
					
					.author {
						font-size: 30rpx;
						color: #c7c7c7;
						font-weight: 500;
						flex: 1;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
					
					.summary {
						font-size: 30rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
				}
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
	
		.hot {
			box-sizing: border-box;
			width: 100vw;
			padding: 30rpx;
			
			.title {
				font-size: 26rpx;
				color: #484848;
			}
			
			.hot-list {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				
				.item {
					width: calc(50% - 30rpx);
					display: flex;
					
					.num {
						width: 30rpx;
						height: 30rpx;
						font-size: 26rpx;
						padding: 2rpx;
						border-radius: 999px;
						display: flex;
						margin-right: 40rpx;
						
						text {
							margin: 0 0 0 9rpx;
						}
					}
				}
			}
		}
	}
</style>