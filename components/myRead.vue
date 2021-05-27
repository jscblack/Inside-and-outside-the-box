<template name="myRead">
	<view :class="mainClass">
		
		<view class="cover" @click="closeRead"></view>
		<view v-if="boxClass=='box'" class="readTot">
			<image  class="myReadBkTop"
				src="https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/newbktop.png">
			</image>
			<view  class="read">
				<van-action-sheet :show="showReport" :actions="reportList" cancel-text="点错啦" close-on-click-overlay
					@cancel="onCancelReport" @select="onSelect" />
				<view v-show="context!=''" class="author">
					<label @click="toReport">举报</label>
					<view class="authorInfo">
						<image class="favicon" :src="authorInfo.favicon" mode="aspectFill" /><label class="nickName"
							v-text="authorInfo.nickName"></label>
					</view>
					<van-icon style="text-align: right;" v-show="context!=''" :name="collectionName" size="30"
						@click="onClickCollection" />
				</view>
				<p style="text-align: center; font-weight: 500;">{{time}}</p>
				<p style="margin-top: 20upx;" v-text="context"></p>
				<view style="text-align: left;">
					<image :wx:for="image" wx:key="key" wx:for-item="item" :class="imageClass" :src="item"
						mode="aspectFill" @click="onClickIamge(item+'')" />
				</view>
			</view>
		</view>
		
		
		<image v-show="showBox" :class="boxClass"
			src="https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/box.png"
			mode="aspectFill" @click="onClickBox"></image>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		name: "myRead",
		props: {
			content: {
				type: Object,
				default: null,
			}
		},
		mounted() {
			//更新消息
			this.$options.methods.updateContent(this);
		},
		data() {
			return {
				boxClass: 'box',
				mainClass: 'main',
				imageClass: 'mulImage',
				authorInfo: {},
				context: '',
				image: [],
				time: '',
				collectionName: 'star-o',
				showReport: false,
				showBox: true,
				reportList: [{
					name: '色情低俗'
				}, {
					name: '违法犯罪'
				}, {
					name: '垃圾广告'
				}, {
					name: '造谣传谣'
				}, {
					name: '时政不实消息'
				}]
			};
		},
		methods: {
			//关闭
			closeRead() {
				const that = this;
				if (that['boxClass'] != 'box')
					return;
				that['mainClass'] = 'closeMain';
				that['boxClass'] = 'exit';
				setTimeout(function() {
					that.$emit('close');
				}, 500);
			},
			//摇箱子
			onClickBox() {
				const that = this;
				if (that['boxClass'] != 'box')
					return;
				that.$emit('onClickBox');
				that['boxClass'] = 'boxShaking';
				const srcurl = "/static/music/shakeBox.mp3";
				const innerAudioContext = wx.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = srcurl;
				setTimeout(function() {
					that.$options.methods.updateContent(that);
					that['boxClass'] = 'box';
				}, 1200);
			},
			//更新content
			updateContent(that) {
				function tansf(utc_datetime) {
					const time = new Date(utc_datetime);
					return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() +
						':' + time.getMinutes() + ':' + time.getSeconds();
				}
				
				if (that['content'] == null) {
					uni.showToast({
						title: '好像是一张空纸条',
						icon: 'none',
						duration: 1200
					});
					that['context'] = '';
					that['image'] = [];
					return;
				}
				that['collectionName'] = 'star-o';
				wx.cloud.callFunction({
					name: 'chk_fav',
					data: {
						note_id: that['content'].data._id,
					},
					success: function(res) {
						console.log('chk_fav success', res);
						if (res.result.errCode == 39000)
							that['collectionName'] = 'star';
					}
				});
				that['authorInfo'].favicon = that['content'].data.cre_user_favicon;
				that['authorInfo'].nickName = that['content'].data.cre_user;
				that['context'] = that['content'].data.note_words;
				const miniTime = Date.parse(that['content'].data.cre_time);
				const nowTime = new Date().getTime();
				if (nowTime - miniTime >= 24 * 60 * 60 * 1000)
					that['time'] = tansf(that['content'].data.cre_time);
				else if (nowTime - miniTime >= 60 * 60 * 1000)
					that['time'] = parseInt((nowTime - miniTime) / 3600000) + '小时前';
				else if (nowTime - miniTime >= 60 * 1000)
					that['time'] = parseInt((nowTime - miniTime) / 60000) + '分钟前';
				else
					that['time'] = '刚刚';
				if (that['content'].data.has_pic) {
					if (that['content'].data.note_pic.length == 1) {
						that['imageClass'] = 'oneImage';
					} else if (that['content'].data.note_pic.length == 2 || that['content'].data.note_pic.length == 4) {
						that['imageClass'] = 'twoImage';
					} else
						that['imageClass'] = 'mulImage';
					that['image'] = that['content'].data.note_pic;
				} else
					that['image'] = [];
				wx.cloud.callFunction({
					name: 'update_viewed',
					data: {
						mininote_id: that['content'].data._id
					},
					success: function(res) {
						console.log('update_viewed success', res);
					},
					fail: function(err) {
						console.log('update_viewed fail', err);
					}
				});
			},
			//预览图片
			onClickIamge(now) {
				const that = this;
				Vue.prototype.$imgHide.status = true;
				wx.previewImage({
					current: now,
					urls: that['image']
				})
			},
			//点击收藏
			onClickCollection() {
				const that = this;
				wx.cloud.callFunction({
					name: 'alter_fav',
					data: {
						note_id: that['content'].data._id,
						oper: that['collectionName'] == 'star-o' ? 1 : 2
					},
					success: function(res) {
						console.log('alter_fav success', res);
					},
					fail: function(err) {
						console.log('alter_fav fail', err);
					}
				});
				if (that['collectionName'] == 'star-o') {
					that['collectionName'] = 'star';
					wx.vibrateShort({
						'type': 'heavy'
					});
				} else
					that['collectionName'] = 'star-o';
			},
			//点击举报
			toReport() {
				const that = this;
				that['showReport'] = true;
				setTimeout(function() {
					that['showBox'] = false;
				}, 70);
			},
			//取消举报
			onCancelReport() {
				const that = this;
				that['showReport'] = false;
				setTimeout(function() {
					that['showBox'] = true;
				}, 200);
			},
			//得到举报信息
			onSelect(word) {
				const that = this;
				//发送后端请求
				const id=that['content'].data._id;
				const type=word.detail.name;
				console.log(id);
				console.log(type);
				wx.cloud.callFunction({
					name: "reportAbuse",
					data: {
						noteid: id,
						abuseType: type,
					},
					success: function(res) {
						uni.showToast({
							title: '感谢您的举报，我们会尽快核实',
							icon: 'none',
							duration: 1200
						});
					},
					fail: function(err) {
						uni.showToast({
							title: "举报失败，请稍后再试",
							icon: "none",
							duration: 2000,
						});
					},
				})
				//...
				
				that['onCancelReport']();
			}
		}
	}
</script>

<style scoped>
	@keyframes shaking {
		0% {
			transform: rotate(0deg);
		}

		10% {
			transform: rotate(-10deg);
		}

		20% {
			transform: rotate(0deg);
		}

		30% {
			transform: rotate(10deg);
		}

		40% {
			transform: rotate(0deg);
		}

		50% {
			transform: rotate(-10deg);
		}

		60% {
			transform: rotate(0deg);
		}

		70% {
			transform: rotate(10deg);
		}

		80% {
			transform: rotate(0deg);
		}

		90% {
			transform: rotate(-10deg);
		}

		100% {
			transform: rotate(0deg);
		}
	}

	@keyframes load {
		0% {
			opacity: 0.0;
		}

		100% {
			opacity: 1.0;
		}
	}

	@keyframes distory {
		0% {
			opacity: 1.0;
		}

		100% {
			opacity: 0;
		}
	}

	.main {
		animation: load 0.5s linear;
	}

	.closeMain {
		opacity: 0.0;
		animation: distory 0.5s linear;
	}
	
	.cover {
		width: 100%;
		height: 100%;
		top: 0upx;
		background-color: #888888;
		opacity: 0.8;
		position: fixed;
		z-index: 2;
	}
	.readTot {
		animation: load 0.5s linear;
		position: absolute;
		margin-left: 375upx;
		z-index: 4;
	}
	.myReadBkTop {
		//animation: load 0.5s linear;
		width: 608.5upx;
		height: 50upx;
		position: absolute;
		top: 102upx;
		left: 50%;
		margin-left: -305upx;
		z-index: 4;
	}
	.read {
		//animation: load 0.5s linear;
		width: 550upx;
		min-height: 100upx;
		position: absolute;
		top: 150upx;
		left: 50%;
		margin-left: -305upx;
		margin-bottom: 275upx;
		background-image: url('https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/newbk.png');
		z-index: 4;
		text-align: center;
		padding: 30upx;
		padding-top: 0;
		border-bottom-left-radius: 50upx;
		border-bottom-right-radius: 50upx;
	}
	
	.read p {
		width: 100%;
		text-align: left;
		word-wrap: break-word;
		word-break: break-all;
	}

	.author {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.authorInfo {
		display: flex;
		align-items: center;
	}

	.favicon {
		height: 2rem;
		width: 2rem;
		border-radius: 1rem;
	}

	.nickName {
		margin-left: 0.3rem;
		font-size: 1rem;
	}

	.oneImage {
		width: 525upx;
		height: 525upx;
		margin: 15upx;
	}

	.twoImage {
		width: 265upx;
		height: 265upx;
		margin: 5upx;
	}

	.mulImage {
		width: 175upx;
		height: 175upx;
		margin: 5upx;
	}

	.box {
		width: 150upx;
		height: 150upx;
		position: fixed;
		bottom: 5%;
		left: 50%;
		margin-left: -75upx;
		z-index: 3;
	}

	.exit {
		width: 150upx;
		height: 150upx;
		position: fixed;
		bottom: 5%;
		left: 50%;
		margin-left: -75upx;
		z-index: 2;
	}

	.boxShaking {
		width: 150upx;
		height: 150upx;
		position: fixed;
		bottom: 5%;
		left: 50%;
		margin-left: -75upx;
		z-index: 3;
		animation: shaking 0.3s linear infinite;
	}
</style>
