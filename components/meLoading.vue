<template>
	<view>
		<image class="boxImage" src="https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/box.png" mode="aspectFill"></image>
		<view class="msg">
			{{msg}}
		</view>
	</view>
</template>

<script>
	export default {
		name:"meLoading",
		data() {
			return {
				msg:'Loading Data...'
			};
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
	.boxImage{
		width: 200upx;
		height: 200upx;
		position: absolute;
		left: 50%;
		margin-left: -100upx;
		top: 30%;
		animation: shake 0.3s linear infinite;
	}
	.msg{
		width: 600upx;
		height: 100upx;
		position: absolute;
		left: 50%;
		top: 55%;
		margin-top: -50upx;
		margin-left: -300upx;
		font-size: 50upx;
		font-weight: 400;
		text-align: center;
	}
</style>
