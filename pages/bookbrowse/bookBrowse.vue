<template>
	<view :class="isDark ? 'light':'dark'">
		<view :style="{height:statusBarHeight+'px',whith:'100vw'}" class="top"></view>
		<view class="head" :style="{height:(navHeight-statusBarHeight) + 'px',top:statusBarHeight+'px'}">
			<image src="@/static/YA-.png" @click="navigateBack"></image>
			<image src="../../static/sIb.png" @click="open"></image>
			<view class="">
				<image src="../../static/8p6.png" v-show="isDark" @click="changeColor"></image>
				<image src="../../static/AbW.png" v-show="!isDark" @click="changeColor"></image>
			</view>
		</view>
		<rich-text :nodes="strings"></rich-text>
		<view class="place-bottom" v-show="bottom" @click="showBottom"></view>
		<uni-popup ref="popupBottom" type="bottom" mask-background-color="rgba(0,0,0,0)">
			<view class="book-bottom">
				<view class="previous" @click="Chapters(-1)">上一章</view>
				<view class="book-catalogue"  @click="open">目录</view>
				<view class="next" @click="Chapters(1)">下一章</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup" type="left">
			<view :style="{height:navHeight+'px',whith:'50vw'}" class="top"></view>
			<view class="catalogue-title" :style="{height:`100vh`}">
				<text class="title">目录</text>
				<view v-for="item,index in bookList" :key="index" class="list" @click="getBookContent(parseInt(index))">
					<text class="item-title" :style="{color:num == index ? 'red':''}">{{item.title}}</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
import loginPageVue from '../loginpage/loginPage.vue'
	export default {
		data() {
			return {
				strings: '',
				statusBarHeight: 0,
				navHeight: 0,
				bookList:[],
				sUuid:0,
				num:0,
				isDark:true,
				bottom:true,
			}
		},
		onLoad:function(option) {
			this.getAll(option.source_uuid,option.num)
			this.getHieght()
			this.sUuid = option.source_uuid
			this.num = option.num
			uni.setStorage({
				key: 'num',
				data: option.num
			})
			this.isDark = uni.getStorageSync('color')
		},
		computed:{
			...mapState(['BookNum']),
		},
		methods: {
			open() {
				this.$refs.popup.open()
				this.$refs.popupBottom.close()
			},
			close() {
				this.$refs.popup.close()
			},
			getAll(source_uuid,num) {
				this.$.getMBookDetail(source_uuid, {
					// 传参参数名：参数值,如果没有，就不需要传
				}).then(res => {
					// 打印调用成功回调
					this.bookList = res.data.catalog
					this.$.getBookContent(`source_uuid=${source_uuid}&content_uuid=${this.bookList[num].uuid}`, {
						// 传参参数名：参数值,如果没有，就不需要传
					}).then(data => {
						// 打印调用成功回调
						this.strings = data.data.content.replace(/<p/g,'<p class="p"')
					})
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
				this.detail = {}
				uni.navigateBack({})
			},
			getBookContent(index) {
				this.strings = ''
				this.num = index
				this.changeNum(index)
				uni.setStorage({
					key: 'num',
					data: this.num,
				})
				uni.setStorage({
					key: 'num',
					data: this.num
				})
				this.$.getBookContent(`source_uuid=${this.sUuid}&content_uuid=${this.bookList[index].uuid}`, {
					// 传参参数名：参数值,如果没有，就不需要传
				}).then(data => {
					// 打印调用成功回调
					this.strings = data.data.content.replace(/<p/g,'<p class="p"')
				})
			},
			Chapters(index) {
				if(this.num < 1 && index == -1){
					uni.showToast({
						title: '这是第一章',
						duration: 2000
					})  
				}else if(this.num > this.bookList.length-1 && index == -1) {
					uni.showToast({
						title: '已无更多',
						duration: 2000
					}) 
				}else {
					this.num = parseInt(this.num) + parseInt(index)
					this.changeNum(this.num)
					this.getBookContent(this.num)
				}
			},
			showBottom(){
				this.$refs.popupBottom.open()
			},
			closeBottom(){
				this.$refs.popupBottom.close()
			},
			changeColor(){
				this.isDark = !this.isDark
				uni.setStorage({
					key: 'color',
					data: this.isDark,
				})
			},
			...mapMutations(["changeNum"])
		}
	}
</script>

<style lang="scss">
	.light {
		width: 100vw;
		height: 100vh;
		overflow: auto;
		background-color: #f7f7f7;
		
		.place-bottom {
			width: 100vw;
			height: 250rpx;
			position: fixed;
			bottom: 0;
		}
		
		.book-bottom {
			width: 100vw;
			background-color: #f6f4ec;
			display: flex;
			position: fixed;
			bottom: 0;
			
			.previous {
				flex: 1;
				font-size: 40rpx;
				margin: 40rpx 0;
				text-align: center;
			}
			
			.book-catalogue {
				flex: 1;
				font-size: 40rpx;
				margin: 40rpx 0;
				text-align: center;
			}
			
			.next {
				flex: 1;
				font-size: 40rpx;
				margin: 40rpx 0;
				text-align: center;
			}
		}
		
		.catalogue-title {
			width: 50vw;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: #f7f7f7;
			overflow: auto;
			
			.title {
				font-size: 60rpx;
			}
			
			.list {
				width: 100%;
				margin-top: 10rpx;
				padding-bottom: 10rpx;
				border-bottom: 0.1rpx solid #cfcfcf;
				
				.item-title {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}
				
				.light {
					color: red;
				}
			}
		}
		
		.top {
			position: sticky;
			top: 0;
			background-color: #f7f7f7;
		}
		
		.head {
			width: 100vw;
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #aaaaaa;
			position: sticky;
			background-color: #f7f7f7;
		
			image {
				width: 30px;
				height: 30px;
				margin-left: 20rpx;
			}
		}
		
		.head {
			width: 100vw;
		}

		.m-mb {
			height: calc(100vh - 60px);
			margin: 0 16px;

			.m-content {
				height: 100%;
				
				.p {
					margin-bottom: 20rpx;
				}
			}
		}
	}

	.dark {
		width: 100vw;
		height: 100vh;
		overflow: auto;
		color: #aaaaaa;
		background-color: #2c2c2c;
		
		.place-bottom {
			width: 100vw;
			height: 350rpx;
			position: fixed;
			bottom: 0;
		}
		
		.book-bottom {
			width: 100vw;
			background-color: #2c2c2c;
			display: flex;
			position: fixed;
			border-top: 0.1 solid #aaaaaa;
			bottom: 0;
			color: #aaaaaa;
			
			.previous {
				flex: 1;
				font-size: 40rpx;
				margin: 40rpx 0;
				text-align: center;
			}
			
			.book-catalogue {
				flex: 1;
				font-size: 40rpx;
				margin: 40rpx 0;
				text-align: center;
			}
			
			.next {
				flex: 1;
				font-size: 40rpx;
				margin: 40rpx 0;
				text-align: center;
			}
		}
		
		.catalogue-title {
			width: 50vw;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: #2c2c2c;
			overflow: auto;
			
			.title {
				font-size: 60rpx;
			}
			
			.list {
				width: 100%;
				margin-top: 10rpx;
				padding-bottom: 10rpx;
				border-bottom: 0.1rpx solid #cfcfcf;
				
				.item-title {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}
				
				.light {
					color: red;
				}
			}
		}
		
		.top {
			position: sticky;
			top: 0;
			background-color: #2c2c2c;
		}
		
		.head {
			width: 100vw;
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #aaaaaa;
			position: sticky;
			background-color: #2c2c2c;
		
			image {
				width: 30px;
				height: 30px;
				margin-left: 20rpx;
			}
		}
		
		.head {
			width: 100vw;
		}
		
		.m-mb {
			height: calc(100vh - 60px);
			margin: 0 16px;
		
			.m-content {
				height: 100%;
				
				.p {
					margin-bottom: 20rpx;
				}
			}
		}
	}
</style>
