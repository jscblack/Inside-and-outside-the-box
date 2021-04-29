<template>
	<view>
		<view v-if="showWelcom" :class="welcomClass"><my-welcome></my-welcome></view>
		<my-new-user v-if="showNewUser"  @onClickButton="getUser"></my-new-user>
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
	import myNewUser from '../../components/myNewUser.vue'
	export default {
		components: {
			myTabbar,
			myWelcome,
			myRead,
			myNewUser
		},
		data() {
			return {
				showRead:false,
				boxClass:'box',
				welcomClass:'loadWelcome',
				showWelcom:true,
				showMain:false,
				showNewUser:false,
				isOldUser:false,
				content:[]
			}
		},
		onLoad() {
			const that=this;
			setInterval(function(){
				if(that['content'].length<5)
					that.$options.methods.updateContent(that);
			},500);
			// 判断是不是老用户
			// ...
			setTimeout(function(){
				that['welcomClass']='distoryWelcome';
				setTimeout(function(){
					that['showWelcom']=false;
					if(that['isOldUser'])
						that['showMain']=true;
					else
						that['showNewUser']=true;
				},2000);
			},3000);
		},
		methods: {
			//用户信息
			getUser(){
				const that=this;
				wx.getUserProfile({
					'desc':'展示用户信息',
					success: function(res) {
						console.log(res);
						//调用后端
						//...
						that['showNewUser']=false;
						that['showMain']=true;
					},
				});
			},
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
			// 获取新消息到content数组
			updateContent(that){
				wx.cloud.callFunction({
					name:'pull_mininotes',
					data:{
					},
					success:function(res){
						console.log('updateContent success',res);
						if(res.result.errCode==14600){
							for(let tmpContent of that['content']){
								if(tmpContent.data._id==res.result.data._id){
									return ;
								}
							}
							that['content'].push(res.result);
						}
					},
					fail:function(err){
						console.log('updateContent fail',err);
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
