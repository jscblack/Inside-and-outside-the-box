<template name="myWelcome">
	<view>
		<view class="main">
			倾述烦恼，分享快乐
		</view>
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
	.main{
		width: 600upx;
		height: 100upx;
		position: absolute;
		left: 50%;
		top: 40%;
		margin-top: -50upx;
		margin-left: -300upx;
		font-size: 60upx;
		text-align: center;
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
		text-align: center;
	}
</style>