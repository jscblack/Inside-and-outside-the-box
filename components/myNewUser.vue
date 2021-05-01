<template name="myNewUser">
	<view>
		<view class="mainWindow">
			<image  v-show="showImg" :src="image[now]" mode="aspectFill" @click="onClickImage"/>
			<button type="primary" plain="true" v-if="now==2" @click="onClickButton">开启你的旅行</button>
		</view>
	</view>
</template>

<script>
  export default {
    name:"myNewUser",
    data() {
		return {
			image:['https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/0.png',
				'https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/1.png',
				'https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/2.png'],
			now:0,
			showImg:true,
		};
    },
	methods:{
		//点击图片
		onClickImage(){
			const that=this;
			if(that['now']<2){
				that['showImg']=false;
				that['now']++;
				setTimeout(function(){
					that['showImg']=true;
				},100);
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
	.mainWindow{
		width: 100%;
		height: 100%;
		position: fixed;
	}
	image{
		width: 100%;
		height: 100%;
		animation: load 2s linear;
	}
	button{
		position: absolute;
		width: 300upx;
		height: 100upx;
		left: 50%;
		margin-left: -150upx;
		top: 70%;
	}
</style>