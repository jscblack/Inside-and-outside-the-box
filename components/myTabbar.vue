<template name="myTabbar">
	<view>
		<view class="main">
			<image class="world" src="https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/world.jpg" @click="onClick0"></image>
			<image class="user" src="https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/user.png" @click="onClick1"></image>
		</view>
	</view>
</template>

<script>
  export default {
    name:"myTabbar",
	props: {
			now:{
				type: Number,
				default: -1
			},
			able:{
				type:Boolean,
				default:true
			}
	},
    data() {
		return {
			
		};
    },
	methods:{
		onClick0(){
			if(this['now']==0||this['able']==false)
				return ;
			uni.switchTab({
				url:'/pages/index/index'
			})
		},
		onClick1(){
			if(this['now']==1||this['able']==false)
				return ;
			uni.switchTab({
				url:'/pages/me/me'
			})
		}
	}
  }
</script>

<style scoped> 
	.main{
		width: 400upx;
		height: 100upx;
		position: fixed;
		left: 50%;
		margin-left: -200upx;
		top: 85%;
		border: 4upx solid #000000;
		border-radius: 200upx;
		
	}
	.world{
		margin-left: 80upx;
		margin-right: 40upx;
		margin-top: 10upx;
		height: 80upx;
		width: 80upx;
	}
	.user{
		margin-right: 80upx;
		margin-left: 40upx;
		margin-top: 10upx;
		height: 80upx;
		width: 80upx;
	}
</style>