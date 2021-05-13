<template>
	<view>
		<image :class="logoClass"src="https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/box.png" @click="onClickBox" mode="aspectFill"></image>
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
							title:'我再动一动(>ω･* )ﾉ',
							icon:'none',
							duration:1200
						});
					}, 200);
				}else if(this.$data.clickTimes==2){
					this.$data.logoClass="logoShaking";
					setTimeout(function(){
						that.$data.logoClass="logo";
						uni.showToast({
							title:'可以不要点了么(｡•́︿•̀｡)',
							icon:'none',
							duration:1200
						});
					}, 400);
				}else if(this.$data.clickTimes==3){
					this.$data.logoClass="logoShaking";
					setTimeout(function(){
						that.$data.logoClass="logo";
						uni.showToast({
							title:'不许再点了！(▼ヘ▼#)',
							icon:'none',
							duration:1200
						});
					}, 800);
				}else if(this.$data.clickTimes>=4){
						uni.showToast({
							title:'不动了，不动了，说什么也不动了(｀⌒´メ)',
							icon:'none',
							duration:1200
						});
					}
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
	.logo{
		height: 480upx;
		width: 480upx;
		margin-left: 130upx;
		margin-top: 130upx;
	}
	.logoShaking{
		height: 480upx;
		width: 480upx;
		margin-left: 130upx;
		margin-top: 130upx;
		animation: shaking 0.3s linear infinite;
		
	}
</style>
