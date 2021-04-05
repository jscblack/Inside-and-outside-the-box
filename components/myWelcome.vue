<template name="myWelcome">
	<view>
		<view class="main">
			倾述烦恼，分享喜悦
		</view>
		<image class="boxImage" src="../static/image/box.png"></image>
		<view class="footer">
			箱里箱外 -- 您身边的情感伙伴
		</view>
	</view>
</template>

<script>
  export default {
    name:"myWelcome",
    data() {
		return {
			
		};
    },
	methods:{
		
	}
  }
</script>

<style scoped> 
	@keyframes shake{
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
	@keyframes down{
	    0% {  top: 0%;}
	   100% { top: 60%; }
	}
	.main{
		width: 600upx;
		height: 100upx;
		position: absolute;
		left: 50%;
		top: 40%;
		margin-top: -50upx;
		margin-left: -300upx;
		font-size: 60upx;
		font-weight: 600;
		text-align: center;
	}
	.boxImage{
		width: 200upx;
		height: 200upx;
		position: absolute;
		left: 50%;
		margin-left: -100upx;
		top: 60%;
		animation: shake 0.3s linear infinite,down 2s linear;
	}
	.footer{
		width: 600upx;
		height: 100upx;
		position: absolute;
		left: 50%;
		top: 80%;
		margin-top: -50upx;
		margin-left: -300upx;
		font-size: 30upx;
		font-weight: 400;
		text-align: center;
	}
</style>