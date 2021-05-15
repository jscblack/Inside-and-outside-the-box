<!--
 * @Author       : Gehrychiang
 * @LastEditTime : 2021-05-11 14:30:20
 * @Website      : www.yilantingfeng.site
 * @E-mail       : gehrychiang@aliyun.com
 * @ProbTitle    : (记得补充题目标题)
-->
<template>
	<view>
		<view>
			<view v-if="loading==false">
			<view class="avaterField">
				<view style="display: flex;align-items: center;justify-content:left">
				  <van-col span="4" offset="3">
					  <van-image
					  style="margin-left: 50rpx;"
						round
						fit="cover"
						width="5rem"
						height="5rem"
						:src="avatarUrl"
					  />
				  </van-col>
				  <van-col span="14" offset="3">
					   <p class="userNameField">{{nickName}}</p>
				  </van-col>
				</view>
			</view>
			<van-cell-group>
				<van-cell title="ㅤ我的纸条" icon="orders-o" is-link url="/pages/myNote/myNote" size="large" />
<!-- 				<van-cell title="ㅤ我的收藏" icon="like-o" is-link url="/pages/myFavorite/myFavorite" size="large" /> -->
			</van-cell-group>
			<van-cell-group title="ㅤ">
				<van-cell title="ㅤ指南" icon="question-o" is-link url="/pages/manual/manual" size="large" />
				<van-cell title="ㅤ设置" icon="setting-o" is-link url="/pages/setting/setting" size="large" />
			</van-cell-group>
		</view>
		<view v-else><me-loading></me-loading></view>
		<my-tabbar now=2></my-tabbar>
	</view>
	</view>
</template>

<script>
	import myTabbar from '../../components/myTabbar.vue'
	import meLoading from '../../components/meLoading.vue'
	export default {
		components: {
			myTabbar,
			meLoading
		},
		data() {
			return {
				avatarUrl:"",
				nickName:"",
				loading:true,
			}
		},
		onLoad(){
			wx.showNavigationBarLoading();
			let that = this;
			console.log("loading me")
			wx.cloud.callFunction({
				name:'get_user',
				success:function(res){
					console.log(res);
					that.avatarUrl=res.result.data._favicon;
					that.nickName=res.result.data._nickname;
					wx.hideNavigationBarLoading();
					that.loading=false;
				},
			});
		},
		onShow() {
			
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.userNameField{
		display: block;
		font-size: 40rpx; 
		width: 200rpx;
		text-align: center;
	},
	.avaterField{
		height: 230rpx;
		padding-top: 100rpx;
	}
</style>
