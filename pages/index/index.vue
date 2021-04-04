<template>
	<view>
		<image :class="boxClass"src="/static/image/box.png" @click="onClickBox"></image>
		<image id="penImgae"src="/static/image/pen.png" @click="onClickRelease"></image>
		<my-tabbar now=0></my-tabbar>
	</view>
</template>

<script>
	import myTabbar from '../../components/myTabbar.vue'
	export default {
		components: {
			myTabbar
		},
		data() {
			return {
				boxClass:'box',
			}
		},
		onLoad() {

		},
		methods: {
			//摇箱子
			onClickBox(){
				const that=this;
				if(that['boxClass']=='boxShaking')
					return ;
				that['boxClass']='boxShaking';
				const srcurl="/static/music/shakeBox.mp3";
				const innerAudioContext = wx.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = srcurl;	
				setTimeout(function(){ 
					that['boxClass']='box';
				}, 1000);
				wx.cloud.callFunction({
					name:'pull_mininotes',
					data:{
					},
					success:function(res){
						console.log(res);
					},
					fail:function(err){
						console.log(err);
					}
				});
			},
			//发布内容
			onClickRelease(){
				const that=this;
				if(that['boxClass']=='boxShaking')
					return ;
				uni.navigateTo({
					url:'/pages/release/release'
				})
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
	.box{
		width: 500upx;
		height: 500upx;
		position: absolute;
		left: 50%;
		top: 40%;
		margin-top: -250upx;
		margin-left: -250upx;
	}
	.boxShaking{
		width: 500upx;
		height: 500upx;
		position: absolute;
		left: 50%;
		top: 40%;
		margin-top: -250upx;
		margin-left: -250upx;
		animation: shaking 0.4s linear infinite;
	}
	#penImgae{
		width: 100upx;
		height: 100upx;
		position: fixed;
		left: 80%;
		top: 65%;
	}
</style>
