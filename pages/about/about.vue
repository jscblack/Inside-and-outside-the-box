<template>
	<view class="mainWindow">
		<image :class="logoClass"src="https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/box.png" @click="onClickBox" mode="aspectFill"></image>
		<p class="h1">开发人员</p>
		<van-divider />
		- 蒋世超
		<br />
		- 陈绍光
		<br />
		- 梁智达
		<br />
		- 曹传忠
		<p class="h1">项目源码</p>
		<van-divider />
		https://gitee.com/Kadia/Inside-and-outside-the-box
		<br />
		<button style="margin-top:5rpx" size="mini" plain=true @click="copyUrl">点击复制</button>
		<p class="h1">联系我们</p>
		<van-divider />
		请通过反馈联系我们<navigator style="color: #1989FA;" url="../feedback/feedback" >点击反馈</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				logoClass:"logo",
				clickTimes:0,
			}
		},
		onLoad() {
		},
		methods: {
			onClickBox(){
				this.$data.clickTimes=this.$data.clickTimes+1;
				const that=this;
				if(this.$data.clickTimes==1){
					this.$data.logoClass="logoShaking";
					setTimeout(function(){
						that.$data.logoClass="logo";
						uni.showToast({
							title:'我可以动哦(｡・`ω´･)',
							icon:'none',
							duration:1200
						});
					}, 200);
				}else if(this.$data.clickTimes==1){
					this.$data.logoClass="logoShaking";
					setTimeout(function(){
						that.$data.logoClass="logo";
						uni.showToast({
							title:'再动动(>ω･* )ﾉ',
							icon:'none',
							duration:1200
						});
					}, 200);
				}else if(this.$data.clickTimes==2){
					this.$data.logoClass="logoShaking";
					setTimeout(function(){
						that.$data.logoClass="logo";
						uni.showToast({
							title:'不要点了(｡•́︿•̀｡)',
							icon:'none',
							duration:1200
						});
					}, 400);
				}else if(this.$data.clickTimes>=3){
						uni.showToast({
							title:'(｀⌒´メ)',
							icon:'none',
							duration:1200
						});
					}
				},
				copyUrl(){
					wx.setClipboardData({
						data:'https://gitee.com/Kadia/Inside-and-outside-the-box'
					});
				}
			}
		}
	
</script>
<style>

</style>
<style scoped>
	@keyframes shaking{
	    0% { transform: rotate(0deg); }
	   10% { transform: rotate(-10deg); }
	   20% { transform: rotate(0deg); }
	   30% { transform: rotate(10deg); }
	   40% { transform: rotate(0deg); }
	   50% { transform: rotate(-10deg); }
	   60% { transform: rotate(0deg); }
	   70% { transform: rotate(10deg); }
	   80% { transform: rotate(0deg); }
	   90% { transform: rotate(-10deg); }
	   100% { transform: rotate(0deg); }
	}
	.mainWindow{
		margin: 25rpx;
	}
	.title{
		text-align: center;
		font-size: 70rpx;
	}
	.h1{
		font-size: 50rpx;
		margin-top: 80rpx;
	}
	.logo{
		height: 200upx;
		width: 200upx;
		margin-left: 250upx;
		margin-top: 80upx;
		margin-bottom: 50rpx;
	}
	.logoShaking{
		height: 200upx;
		width: 200upx;
		margin-left: 250upx;
		margin-top: 80upx;
		margin-bottom: 50rpx;
		animation: shaking 0.3s linear infinite;
	}
</style>
