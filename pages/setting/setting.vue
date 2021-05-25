<template>
	<view>
		<van-cell-group>
			<van-cell title="同步微信头像/昵称" size="large" is-link @click="updateUserInfo"/>
			<van-cell title="反馈" is-link url="/pages/feedback/feedback" size="large" />
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
		onLoad() {
		},
		methods: {
			updateUserInfo(){
				const that = this;
				wx.getUserProfile({
					'desc': '展示用户信息',
					success: function(userInfo) {
						uni.showLoading({
							title:'正在同步...',
							mask:true
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
									success (res) {
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
			}
		}
	}
</script>

<style scoped>

</style>
