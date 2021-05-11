<template name="myTabbar">
	<view>
		<view class="main">
			<image class="world" :src="worldSrc" @click="onClick0"></image>
			<image class="fav" :src="favSrc" @click="onClick1"></image>
			<image class="person" :src="personSrc" @click="onClick2"></image>
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
	created() {
		if(this['now']==0){
			this['worldSrc']="https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/worlds.svg";
		}else if(this['now']==1){
			this['favSrc']="https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/favs.svg";
		}else if(this['now']==2){
			this['personSrc']="https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/persons.svg";
		}
	},
    data() {
		return {
			worldSrc:"https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/world.svg",
			favSrc:"https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/fav.svg",
			personSrc:"https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/person.svg"
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
			// var page = getCurrentPages().pop();
			// if (page.$page.fullPath == '/pages/myFavorite/myFavorite'){
			// 	page.destroy();
			// 	// page.onLoad();
			// }
			// console.log(page.$page.fullPath)
			uni.switchTab({
				url:'/pages/myFavorite/myFavorite',
			})
		},
		onClick2(){
			if(this['now']==2||this['able']==false)
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
		width: 500upx;
		height: 100upx;
		position: fixed;
		left: 50%;
		margin-left: -250upx;
		top: 85%;
		border: 2upx solid #000000;
		border-radius: 200upx;
		background-color: #FFFFFF;
		
	}
	.world{
		margin-left: 50upx;
		margin-right: 40upx;
		margin-top: 10upx;
		height: 80upx;
		width: 80upx;
	}
	.fav{
		margin-left: 40upx;
		margin-right: 40upx;
		margin-top: 10upx;
		height: 80upx;
		width: 80upx;
	}
	.person{
		margin-left: 40upx;
		margin-right: 50upx;
		margin-top: 10upx;
		height: 80upx;
		width: 80upx;
	}
</style>