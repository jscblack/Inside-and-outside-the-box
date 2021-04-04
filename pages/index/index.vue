<template>
	<view>
		<view v-if="showWelcom" :class="welcomClass"><my-welcome></my-welcome></view>
		<view v-if="showMain" id="mainView">
			<image :class="boxClass"src="/static/image/box.png" @click="onClickBox"></image>
			<image id="penImgae"src="/static/image/pen.png" @click="onClickRelease"></image>
			<my-tabbar now=0></my-tabbar>
		</view>
	</view>
</template>

<script>
	import myTabbar from '../../components/myTabbar.vue'
	import myWelcome from '../../components/myWelcome.vue'
	export default {
		components: {
			myTabbar,
			myWelcome
		},
		data() {
			return {
				boxClass:'box',
				welcomClass:'loadWelcome',
				showWelcom:true,
				showMain:false,
			}
		},
		onLoad() {
			const that=this;
			setTimeout(function(){
				that['welcomClass']='distoryWelcome';
				setTimeout(function(){
					that['showWelcom']=false;
					that['showMain']=true;
				},2000);
			},3000);
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
				console.log('get');
				// wx.cloud.callFunction({
				// 	name:'pull_mininotes',
				// 	data:{
				// 	},
				// 	success:function(res){
				// 		console.log(res);
				// 	},
				// 	fail:function(err){
				// 		console.log(err);
				// 	}
				// });
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
	@keyframes load{
		0% { opacity: 0.0 ;}
		10% { opacity: 0.1 ; }
		20% { opacity: 0.2 ;}
		30% { opacity: 0.3 ; }
		40% { opacity: 0.4 ;}
		50% { opacity: 0.5 ;}
		60% { opacity: 0.6 ; }
		70% {opacity: 0.7; }
		80% { opacity: 0.8 ;}
		90% {opacity: 0.9 ;}
		100% {opacity: 1.0 ; }
	}
	@keyframes distory{
		0% { opacity: 1.0 ;}
		10% { opacity: 0.9 ; }
		20% { opacity: 0.8 ;}
		30% { opacity: 0.7 ; }
		40% { opacity: 0.6 ;}
		50% { opacity: 0.5 ;}
		60% { opacity: 0.4 ; }
		70% {opacity: 0.3; }
		80% { opacity: 0.2 ;}
		90% {opacity: 0.1 ;}
		100% {opacity: 0 ; }
	}
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
	.loadWelcome{
		animation: load 2s linear;
	}
	.distoryWelcome{
		animation: distory 2s linear;
		opacity:0.0;
	}
	#mainView{
		animation: load 2s linear;
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
		animation: shaking 0.3s linear infinite;
	}
	#penImgae{
		width: 100upx;
		height: 100upx;
		position: fixed;
		left: 80%;
		top: 65%;
	}
</style>
