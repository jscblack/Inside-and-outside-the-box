<template>
	<view>
		<image id="box"src="/static/image/box.jpg" @click="onClickBox"></image>
		<image id="penImgae"src="/static/image/pen.png" @click="onClickRelease"></image>
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
			onClickBox(){
				uni.showToast({
					title:'箱子里还没有纸条哦',
					icon:'none',
					duration:2000
				})
			},
			onClickRelease(){
				uni.navigateTo({
					url:'/pages/release/release'
				})
			}
		}
	}
</script>
<style>
	page{
		background-color: ;
		height: 100%;
		width: 100%;
	}
</style>
<style scoped>
	#box{
		width: 600upx;
		height: 600upx;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -300upx;
		margin-left: -300upx;
	}
	#penImgae{
		width: 100upx;
		height: 100upx;
		position: fixed;
		left: 80%;
		top: 80%;
	}
</style>
