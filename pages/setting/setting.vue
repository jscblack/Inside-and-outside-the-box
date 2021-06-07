<template>
	<view>
		<van-cell-group>
			<van-cell title="同步微信头像/昵称" size="large" is-link @click="updateUserInfo" />
			<van-cell title="清除所有浏览记录" size="large" is-link @click="clearViewedRecord" />
			<van-cell title="关于我们" is-link url="/pages/about/about" size="large" />
		</van-cell-group>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {},
		methods: {
			updateUserInfo() {
				const that = this;
				wx.getUserProfile({
					'desc': '展示用户信息',
					success: function(userInfo) {
						uni.showLoading({
							title: '正在同步...',
							mask: true
						});
						wx.clearStorageSync();
						wx.clearStorage();
						wx.cloud.callFunction({
							name: 'upload_usr',
							data: {
								user_nickname: userInfo.userInfo.nickName,
								user_favicon: userInfo.userInfo.avatarUrl
							},
							success: function(res) {
								uni.hideLoading();
								wx.showModal({
									title: '提示',
									content: '需要重启小程序才能生效哦，是否立即重启？',
									success(res) {
										if (res.confirm) {
											wx.reLaunch({
												url: '../index/index'
											});
										}
									}
								});
							}
						});
					},
				});
			},
			clearViewedRecord (){
				wx.showModal({
					title: '提示',
					content: '确定要清除您的浏览记录吗？（这只会清除浏览记录，即会推送您曾经看过的纸条，并不会清除您的收藏）',
					success(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '正在清除...',
								mask: true
							});
							wx.cloud.callFunction({
								name:'deleteViewed',
								success:function(res){
									uni.hideLoading();
									wx.showModal({
										title: '提示',
										content: '需要重启小程序才能生效哦，是否立即重启？',
										success(res) {
											if (res.confirm) {
												wx.reLaunch({
													url: '../index/index'
												});
											}
										}
									});
								},
							});
						}
					}
				});
			}
		}
	}
</script>

<style scoped>

</style>
