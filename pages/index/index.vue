<template>
	<view>
		<view v-if="showWelcom" :class="welcomClass">
			<my-welcome></my-welcome>
		</view>
		<my-new-user v-if="showNewUser" @onClickButton="getUser"></my-new-user>
		<van-transition :show="showMain==true" name="fade" duration=1000>
			<my-tabbar now=0 :able="boxClass=='box'"></my-tabbar>
			<van-transition :show="showMain==true&&showTrans==true" name="fade">
				<image :class="boxClass"
					src="https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/box.png"
					@click="onClickBox" mode="aspectFill"></image>
				<image id="penImgae"
					src="cloud://meet-the-world-2g7kshiy287c49fe.6d65-meet-the-world-2g7kshiy287c49fe-1305360411/static/image/pen.svg"
					@click="onClickRelease"></image>
				<van-transition :show="showRead==true" name="fade">
					<my-read v-if="showRead" :content="content[0]" ref="boxerer" @close="closeRead"
						@onClickBox="onClickReadBox"></my-read>
				</van-transition>
			</van-transition>
			<van-popup
			  :show="showPop"
			  closeable
			  round
			  close-icon="close"
			  close-icon-position="top-right"
			  position="bottom"
			  custom-style="height: 35%"
			  @close="onPopClose"
			><view style="margin-top: 40upx;margin-left: 20upx;margin-right:20upx;font-size: 35upx;">欢迎使用箱里箱外</br>您可以点击中间的惊喜箱子或是摇晃手机来抽取其他用户的公开小纸条。请注意，任何一张小纸条只会出现一次，如果遇到共鸣的那一张请不要吝啬于收藏！</br>您可以通过点击笔来写小纸条，来与其他人分享快乐，共诉烦恼。</view></van-popup>
		</van-transition>
	</view>
</template>

<script>
	import myTabbar from '../../components/myTabbar.vue'
	import myWelcome from '../../components/myWelcome.vue'
	import myRead from '../../components/myRead.vue'
	import myNewUser from '../../components/myNewUser.vue'
	import Vue from 'vue'
	export default {
		components: {
			myTabbar,
			myWelcome,
			myRead,
			myNewUser
		},
		data() {
			return {
				showRead: false,
				boxClass: 'box',
				welcomClass: 'loadWelcome',
				showWelcom: true,
				showMain: false,
				showNewUser: false,
				isOldUser: false,
				content: [],
				showTrans: false,
				stopUpdate: false,
				showPop:false
			}
		},
		onLoad() {
			const that = this;
			//获取消息
			setInterval(function() {
				if (that['content'].length < 2)
					that.$options.methods.updateContent(that);
			}, 500);
			// 判断是不是老用户
			wx.cloud.callFunction({
				name: 'check_usr',
				data: {},
				success: function(res) {
					if (res.result.errMsg == "check_usr:ok_has_usr")
						that['isOldUser'] = true;
				}
			});
			//欢迎页面结束
			setTimeout(function() {
				that['welcomClass'] = 'distoryWelcome';
				setTimeout(function() {
					that['showWelcom'] = false;
					if (that['isOldUser'])
						that['showMain'] = true;
					else
						that['showNewUser'] = true;
				}, 2000);
			}, 3000);
			setTimeout(function() {
				if(!that['isOldUser']){
					that['showPop']=true;
				}
			}, 5000);
		},
		onShow() {
			if (Vue.prototype.$imgHide.status == true) {
				Vue.prototype.$imgHide.status = false;
				return;
			}
			this['showTrans'] = true;
			const that = this;
			wx.onAccelerometerChange(function(e) {
				// //console.log(e.x)
				// //console.log(e.y)
				// //console.log(e.z)
				if ((e.x > 0.8 || e.y > 0.8)&&that['showPop']==false) {
					if (that['showRead'] == false) {
						that.onClickBox();
					} else {
						that.$refs.boxerer.onClickBox();
						that.onClickReadBox();
					}
				}
			})
		},
		onHide() {
			wx.offAccelerometerChange()
			if (Vue.prototype.$imgHide.status == true) {
				return;
			}
			this['showTrans'] = false;
		},
		methods: {
			//用户信息
			getUser() {
				const that = this;
				wx.getUserProfile({
					'desc': '展示用户信息',
					success: function(userInfo) {
						wx.cloud.callFunction({
							name: 'upload_usr',
							data: {
								user_nickname: userInfo.userInfo.nickName,
								user_favicon: userInfo.userInfo.avatarUrl
							},
							success: function(res) {
								if (res.result.errCode == 29000) {
									that['showNewUser'] = false;
									that['showMain'] = true;
								}
							}
						});
					},
				});
			},
			//关闭阅读
			closeRead() {
				const that = this;
				that['showRead'] = false;
				that.$options.methods.onClickReadBox(that);
			},
			//摇箱子
			onClickBox() {
				const that = this;
				that.stopUpdate == false;
				if (that['boxClass'] != 'box')
					return;
				that['boxClass'] = 'boxShaking';
				const srcurl = "/static/music/shakeBox.mp3";
				const innerAudioContext = wx.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = srcurl;
				setTimeout(function() {
					that['showRead'] = true;
					that['boxClass'] = 'box';
				}, 1200);
			},
			onPopClose() {
				console.log("onPopClose");
				const that = this;
				that['showPop'] = false;
				console.log(that['showPop']);
			},
			//点击read的箱子
			onClickReadBox(that) {
				let _that = that;
				if (typeof(that) == 'undefined')
					_that = this;
				if (_that['content'].length > 0)
					_that['content'].shift();
				_that.stopUpdate = false;
			},
			// 获取新消息到content数组
			updateContent(that) {
				if (that.stopUpdate == true)
					return;
				wx.cloud.callFunction({
					name: 'pull_mininotes',
					data: {},
					success: function(res) {
						console.log('pull success', res);
						if (res.result.errCode == 14600) {
							for (let tmpContent of that['content']) {
								if (tmpContent.data._id == res.result.data._id) {
									return;
								}
							}
							that['content'].push(res.result);
						} else if (res.result.errCode == 14602)
							that.stopUpdate = true;
					},
					fail: function(err) {
						//console.log('updateContent fail', err);
						that.stopUpdate = true;
					}
				});
			},
			// 发布内容
			onClickRelease() {
				const that = this;
				if (that['boxClass'] != 'box')
					return;
				uni.navigateTo({
					url: '/pages/release/release'
				})
			}
		}
	}
</script>
<style>

</style>
<style scoped>
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

	.loadWelcome {
		animation: load 2s linear;
	}

	.distoryWelcome {
		animation: distory 2s linear;
		opacity: 0.0;
	}

	#mainView {
		animation: load 2s linear;
	}

	.box {
		width: 500upx;
		height: 500upx;
		position: fixed;
		left: 50%;
		top: 40%;
		margin-top: -250upx;
		margin-left: -250upx;
	}

	.boxShaking {
		width: 500upx;
		height: 500upx;
		position: fixed;
		left: 50%;
		top: 40%;
		margin-top: -250upx;
		margin-left: -250upx;
		animation: shaking 0.3s linear infinite;
	}

	#penImgae {
		width: 120upx;
		height: 120upx;
		position: fixed;
		left: 72%;
		top: 65%;
	}
</style>
