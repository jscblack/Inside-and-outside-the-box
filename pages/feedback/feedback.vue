<template>
	<view>
		<view class="mainWindow">
			<view style="display: flex;margin-left: 10upx;">
				<van-icon name="contact" /><input :class="inputClass" type="email" v-model="email" placeholder="请输入您的邮箱"
					@blur="checkEmail" @focus="nowInput" />
			</view>
			<textarea v-model="context" placeholder="请输入反馈内容"></textarea>
			<button id="submit" plain="true" @click="onClickSubmit">提交反馈</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: '',
				context: '',
				inputClass: 'normal'
			}
		},
		onLoad() {},
		methods: {
			//提交反馈
			onClickSubmit() {
				const that = this;
				console.log(that['email']);
				console.log(that['context']);
				if (that['inputClass'] == 'errEmail') {
					uni.showToast({
						title: '邮箱格式不符合要求哦',
						icon: 'none',
						duration: 1200
					});
					return;
				} else if (that['context'] == '') {
					uni.showToast({
						title: '还没有输入反馈内容哦',
						icon: 'none',
						duration: 1200
					});
					return;
				}
				wx.cloud.callFunction({
					name: "feedBack",
					data: {
						mail: that.email,
						feedBack: that.context,
					},
					success: function(res) {
						console.log(res);
						wx.setClipboardData({
							data: res.result.data._id,
							success() {
								uni.hideToast(); //关键代码，剪贴成功立马给我隐藏提示
								uni.showToast({
									title: '感谢您的反馈，我们会尽快回复，受理ID已复制至您的剪贴板',
									icon: 'none',
									duration: 2000
								});
								setTimeout(function(){
									uni.navigateBack();
								},2000);
								
							}
						});

					},
					fail: function(err) {
						uni.showToast({
							title: "反馈失败，请稍后再试",
							icon: "none",
							duration: 2000,
						});
					},
				});

			},
			//检查邮箱
			checkEmail() {
				const that = this;
				var isEmail = /^\w+\@+[0-9a-zA-Z]+\.(com|com.cn|edu|hk|cn|net)$/;
				if (!isEmail.test(that['email']))
					that['inputClass'] = 'errEmail';
				else
					that['inputClass'] = 'okEmail';
			},
			//input得到焦点
			nowInput() {
				const that = this;
				that['inputClass'] = 'normal';
			}
		}
	}
</script>
<style>

</style>
<style scoped>
	.mainWindow {
		padding: 1rem;
	}

	textarea {
		width: 90%;
		margin: 0 auto;
		padding: 1rem;
		background-color: #F1F1F1;
		border-radius: 0.25rem;
		text-align: left;
		overflow: auto;
		margin-bottom: 1rem;
		margin-top: 20upx;
	}

	input {
		margin-left: 10upx;
	}

	.normal {}

	.errEmail {
		color: red;
	}

	.okEmail {
		/* 		color: #4CD964; */
	}
</style>
