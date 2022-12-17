<template>
	<view>
		<view v-for="item,index in hot" :key="index">
			<view class="recommend" v-if="item.module == 52">
				<text class="name">{{item.name}}</text>
				<view class="first" @click="goDetail(item.list[0].id,item.list[0].title)">
					<image class="cover" :src="item.list[0].cover"></image>
					<view class="describe">
						<text class="title">{{item.list[0].title}}</text>
						<text class="author">{{item.list[0].author + '/' + item.list[0].category}}</text>
						<text class="content">{{item.list[0].content}}</text>
					</view>
				</view>
				<view class="hot-list">
					<view v-for="(book,num) in item.list" :key="num" :style="{margin : num == 0 ? '':'auto'}" @click="goDetail(book.id,book.title)">
						<view class="hot-item" v-if="num != 0">
							<image class="cover" :src="book.cover"></image>
							<text class="title">{{book.title}}</text>
							<text class="author">{{book.author}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="everyone" v-if="item.module == 36">
				<text class="name">{{item.name}}</text>
				<view class="book-list" v-for="(book,num) in item.list" :key="num"  @click="goDetail(book.id,book.title)">
					<image class="cover" :src="book.cover"></image>
					<view class="describe">
						<text class="title">{{book.title}}</text>
						<text class="author">{{book.author}}</text>
						<text class="content">{{book.content}}</text>
					</view>
				</view>
			</view>
			<view class="ranking" v-if="item.module == 34">
				<text class="name">{{item.name}}</text>
				<view class="book-list">
					<view class="book-item" v-for="(book,num) in item.list" :key="num"  @click="goDetail(book.id,book.title)">
						<image class="cover" :src="book.cover"></image>
						<image class="cover-top" src="../../static/tmq.9.png" v-if="num == 0"></image>
						<image class="cover-top" src="../../static/RmW.9.png" v-if="num == 1"></image>
						<image class="cover-top" src="../../static/K3u.9.png" v-if="num == 2"></image>
						<text class="title">{{book.title}}</text>
					</view>
				</view>
				<view class="see">
					<view class="see-box">
						<text class="see-name">{{item.more.name}}</text>
						<image class="see-cover" src="../../static/6lg.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="sole" v-if="item.module == 58">
				<text class="sole-name">{{item.name}}</text>
				<view class="sole-list">
					<view class="sole-item" v-for="book,num in item.list" :key="num"  @click="goDetail(book.id,book.title)">
						<image class="cover" :src="book.cover" mode=""></image>
						<text class="title">{{book.title}}</text>
						<text class="author">{{book.author}}</text>
					</view>
				</view>
			</view>
			<view class="romance" v-if="item.module == 51">
				<text class="romance-name">{{item.name}}</text>
				<view class="romance-list">
					<view class="romance-item" v-for="book,num in item.list" :key="num"  @click="goDetail(book.id,book.title)">
						<image :src="book.cover" class="item-cover"></image>
						<view class="item-details">
							<text class="title">{{book.title}}</text>
							<text class="category">{{book.category}}</text>
							<view class="see">
								<image class="see-cover" src="../../static/RxM.png"></image>
								<text class="clickCount">{{getNum(book.clickCount)}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['hot'],
		methods: {
			goDetail(id,title) {
				uni.navigateTo({
					url:`../bookbrowse/bookDetails?id=${id}&title=${title}`
				})
			},
			getNum(num) {
				let index = 0
				if (num > 10000) {
					index = parseFloat(num / 10000).toFixed(2) + '万次'
					return index
				} else {
					index = index + '次'
					return index
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recommend {
		box-sizing: border-box;
		width: 100vw;
		padding: 30rpx 15rpx 20rpx;
		border-bottom: solid 1rpx #e3e3e3;

		.name {
			font-size: 40rpx;
			font-weight: 600;
		}

		.first {
			display: flex;
			margin-top: 10rpx;

			.cover {
				width: 180rpx;
				height: 230rpx;
				margin-right: 20rpx;
			}

			.describe {
				width: 66vw;
				display: flex;
				flex-direction: column;
				overflow: hidden;

				.title {
					font-size: 30rpx;
					font-weight: 600;
				}

				.author {
					font-size: 24rpx;
					color: #aaaaaa;
					margin: 20rpx 0;
				}

				.content {
					font-size: 24rpx;
					color: #aaaaaa;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 4;
					-webkit-box-orient: vertical;
				}
			}
		}

		.hot-list {
			width: 100%;
			display: flex;
			margin-top: 20rpx;

			.hot-item {
				display: flex;
				flex-direction: column;

				.cover {
					width: 150rpx;
					height: 200rpx;
					box-shadow: -10rpx 10rpx 10rpx lightgray;
				}

				.title {
					width: 150rpx;
					font-size: 24rpx;
					margin: 16rpx 0;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}

				.author {
					width: 150rpx;
					font-size: 18rpx;
					color: #aaaaaa;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}
			}
		}
	}

	.everyone {
		box-sizing: border-box;
		width: 100vw;
		margin-top: 30rpx;
		padding: 0 30rpx 30rpx;
		border-bottom: solid 1rpx #e3e3e3;

		.name {
			font-size: 40rpx;
			font-weight: 600;
		}

		.book-list {
			display: flex;
			margin-top: 20rpx;

			.cover {
				width: 150rpx;
				height: 200rpx;
				margin-right: 20rpx;
				box-shadow: -10rpx 10rpx 10rpx lightgray;
			}

			.describe {
				width: 70vw;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.title {
					font-size: 40rpx;
					font-weight: 600;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}

				.author {
					font-size: 26rpx;
					color: #aaaaaa;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}

				.content {
					font-size: 30rpx;
					color: #aaaaaa;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
		}
	}

	.ranking {
		box-sizing: border-box;
		width: 100vw;
		padding: 30rpx 15rpx 20rpx;
		border-bottom: solid 1rpx #e3e3e3;

		.name {
			font-size: 40rpx;
			font-weight: 600;
		}

		.see {
			display: flex;

			.see-box {
				margin: auto;
				display: flex;
				align-items: center;

				.see-name {
					font-size: 24rpx;
					margin-right: 10rpx;
				}

				.see-cover {
					width: 24rpx;
					height: 28rpx;
				}
			}
		}

		.book-list {
			display: flex;
			margin: 30rpx 0;
			justify-content: space-between;

			.book-item {
				width: 220rpx;
				position: relative;
				display: flex;
				flex-direction: column;

				.cover {
					width: 220rpx;
					height: 300rpx;
					box-shadow: -10rpx 10rpx 10rpx lightgray;
				}

				.cover-top {
					width: 100%;
					height: 60rpx;
					position: absolute;
					top: -30rpx;
				}

				.title {
					font-size: 30rpx;
					margin-top: 16rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}
			}
		}
	}

	.sole {
		box-sizing: border-box;
		width: 100vw;
		padding: 30rpx 15rpx 20rpx;
		border-bottom: solid 1rpx #e3e3e3;

		.sole-name {
			font-size: 40rpx;
			font-weight: 600;
		}

		.sole-list {
			display: flex;
			justify-content: space-around;
			margin: 20rpx 0;

			.sole-item {
				width: 150rpx;
				display: flex;
				flex-direction: column;

				.cover {
					width: 150rpx;
					height: 200rpx;
					box-shadow: -10rpx 10rpx 10rpx lightgray;
				}

				.title {
					font-size: 30rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					margin: 20rpx 0;
				}

				.author {
					font-size: 20rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}
			}
		}
	}

	.romance {
		box-sizing: border-box;
		width: 100vw;
		padding: 30rpx 15rpx 20rpx;
		border-bottom: solid 1rpx #e3e3e3;

		.romance-name {
			font-size: 40rpx;
			font-weight: 600;
		}

		.romance-list {
			display: flex;
			margin: 20rpx;
			justify-content: space-between;
			flex-wrap: wrap;

			.romance-item {
				width: 45vw;
				display: flex;
				margin-bottom: 22rpx;

				.item-cover {
					width: 150rpx;
					height: 180rpx;
					margin-right: 10rpx;
					box-shadow: -10rpx 10rpx 10rpx lightgray;
				}

				.item-details {
					width: 30vw;
					display: flex;
					flex-direction: column;

					.title {
						font-size: 30rpx;
						font-weight: 600;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.category {
						font-size: 22rpx;
						margin-top: auto;
						margin-bottom: 10rpx;
					}
					
					.see {
						display: flex;
						align-items: center;
						
						.see-cover {
							width: 36rpx;
							height: 36rpx;
							margin-right: 4rpx;
						}
						
						.clickCount {
							font-size: 22rpx;
							color: #aeaeae;
						}
					}

				}
			}
		}
	}
</style>
