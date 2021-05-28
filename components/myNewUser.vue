<template name="myNewUser">
	<view>
		<view class="mainWindow">
			<view class="text1" v-if="now==0">欢迎来到箱里箱外<br/>小纸条与情感交汇的地方</view>
			<view class="text2" v-if="now==1"  >在这里你可以透过小纸条看见别人眼中的世界<br/>在这里你可以透过小纸条倾诉你的不悦<br/>在这里你可以透过小纸条独享你的那一份确幸</view>
			<view class="text1" v-if="now==2"  >愿你的好心情能伴随着小纸条越走越远<br/>而坏心情则像天空的乌云被风吹散</view>
			<view class="text1" v-if="now>=3"  >下一张纸条会是什么呢？<br/>^_^</view>
			<image  v-show="showImg" :src="image[now]" mode="aspectFill" @click="onClickImage"/>
			<button type="primary" plain="true" v-if="now==4" @click="onClickButton">开启你的旅行</button>
		</view>
	</view>
</template>

<script>
  export default {
    name:"myNewUser",
    data() {
		return {
			image:['cloud://meet-the-world-2g7kshiy287c49fe.6d65-meet-the-world-2g7kshiy287c49fe-1305360411/static/image/newUser1.png',
				'cloud://meet-the-world-2g7kshiy287c49fe.6d65-meet-the-world-2g7kshiy287c49fe-1305360411/static/image/newUser2.png',
				'cloud://meet-the-world-2g7kshiy287c49fe.6d65-meet-the-world-2g7kshiy287c49fe-1305360411/static/image/newUser3.png',
				'cloud://meet-the-world-2g7kshiy287c49fe.6d65-meet-the-world-2g7kshiy287c49fe-1305360411/static/image/newUser4.png'],
			now:0,
			showImg:true,
		};
    },
	methods:{
		//点击图片
		onClickImage(){
			const that=this;
			if(that['now']<4){
				that['showImg']=false;
				that['now']++;
				setTimeout(function(){
					that['showImg']=true;
				},200);
			}
		},
		//点击按钮开始
		onClickButton(){
			const that=this;
			that.$emit('onClickButton');
		}
	}
  }
</script>

<style scoped> 
	@keyframes load{
		0% { opacity: 0.0 ;}
		100% {opacity: 1.0 ; }
	}
	@keyframes barLoad{
		0% { opacity: 0.0 ; top: 120%;}
		100% {opacity: 1.0 ; top: 60%;}
	}
	.mainWindow{
		width: 100%;
		height: 100%;
		position: fixed;
	}
	.text1{
		animation: load 2s linear;
		font-size: 50upx;
		text-align: center;
		margin-top: 300upx;
		line-height: 80upx;
	}
	.text2{
		animation: load 2s linear;
		font-size: 40upx;
		text-align: center;
		margin-top: 260upx;
		line-height: 60upx;
	}
	image{
		width: 160%;
		animation: load 2s linear;
		margin-top: 100upx;
		margin-left: -225upx;
	}
	button{
		animation: barLoad 2s linear;
		position: absolute;
		width: 300upx;
		height: 100upx;
		left: 50%;
		margin-left: -150upx;
		top: 60%;
	}
</style>