<template>
	<view>
		<view v-if="showWelcom" :class="welcomClass"><my-welcome></my-welcome></view>
		<view v-if="showMain" id="mainView">
			<image :class="boxClass"src="/static/image/box.png" @click="onClickBox" mode="aspectFill"></image>
			<image id="penImgae"src="/static/image/pen.png" @click="onClickRelease"></image>
			<my-tabbar now=0 :able="boxClass=='box'"></my-tabbar>
			<my-read v-if="showRead" :content="content[0]" @close="closeRead" @onClickBox="onClickReadBox"></my-read>
		</view>
	</view>
</template>

<script>
	import myTabbar from '../../components/myTabbar.vue'
	import myWelcome from '../../components/myWelcome.vue'
	import myRead from '../../components/myRead.vue'
	export default {
		components: {
			myTabbar,
			myWelcome,
			myRead
		},
		data() {
			return {
				showRead:false,
				boxClass:'box',
				welcomClass:'loadWelcome',
				showWelcom:true,
				showMain:false,
				content:[]
			}
		},
		onLoad() {
			const that=this;
			setInterval(function(){
				if(that['content'].length<5)
					that.$options.methods.updateContent(that);
				console.log(that['content'].length);
			},500);
			setTimeout(function(){
				that['welcomClass']='distoryWelcome';
				setTimeout(function(){
					that['showWelcom']=false;
					that['showMain']=true;
				},200);
			},300);
		},
		onUnload() {
			console.log('onUnload');
		},
		methods: {
			//关闭阅读
			closeRead(){
				const that=this
				that['showRead']=false;
				that.$options.methods.onClickReadBox(that);
			},
			//摇箱子
			onClickBox(){
				const that=this;
				if(that['boxClass']!='box')
					return ;
				that['boxClass']='boxShaking';
				const srcurl="/static/music/shakeBox.mp3";
				const innerAudioContext = wx.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = srcurl;	
				setTimeout(function(){ 
					that['showRead']=true;
					that['boxClass']='box';
				}, 1200);
			},
			//点击read的箱子
			onClickReadBox(that){
				let _that=that;
				if(typeof(that)=='undefined')
					_that=this;
				if(_that['content'].length>0)
					_that['content'].shift();
			},
			// 更新content
			updateContent(that){
				wx.cloud.callFunction({
					name:'pull_mininotes',
					data:{
					},
					success:function(res){
						console.log(res);
						that['content'].push(res.result);
					},
					fail:function(err){
						console.log(err);
					}
				});
			},
			// 发布内容
			onClickRelease(){
				const that=this;
				if(that['boxClass']!='box')
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
		100% {opacity: 1.0 ; }
	}
	@keyframes distory{
		0% { opacity: 1.0 ;}
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
		position: fixed;
		left: 50%;
		top: 40%;
		margin-top: -250upx;
		margin-left: -250upx;
	}
	.boxShaking{
		width: 500upx;
		height: 500upx;
		position: fixed;
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
